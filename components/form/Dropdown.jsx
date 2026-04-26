/**
 * Developed by Anthony Cox in 2025
 * 
 * Revisions (February 2026)
 * - Added ability to mark the dropdown as mandatory or optional.
 * - Added functionality to default select the first item in the dropdown or the user can custom-set any option as the default.
 * - Improved logic throughout the component.
 * - Added the ability to execute custom onChange functionality after each dropdown selection.
 */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import usePrevious from '../data/react-functions';
import {
  EventManager,
  HTMLElementManager,
} from '../modules';
import './css/form-dropdown.css';
import '../css/common.css';

/* Initialise the event and element managers for this module */
const eventManager = new EventManager();
const htmlElementManager = new HTMLElementManager();

/**
 * Standard dropdown menu component allowing for a render of a single dropdown menu in a form in a web application.
 * 
 * The dropdown can be enabled or disabled, it can also be rendered in an error state with an error message in the case of a form validation issue. It supports rendering
 * a group of option items which can be selected by an end user. This component is left aligned by default but can also be centrally aligned if desired.
 *
 * The dropdown component is intended for use with the Main component.
 */
const Dropdown = props => {
  const [ isDisabled, setIsDisabled ] = useState(false);
  const prevIsDisabled = usePrevious(isDisabled);

  useEffect(() => {
    if (props.optionsList.itemsList !== undefined && props.optionsList.itemsList.length === 0) {
      /* If no option items have been specified, the dropdown will be disabled by default */
      setIsDisabled(true);
    } else if (props.isDisabled !== undefined && props.isDisabled !== prevIsDisabled) {
      /* Alter the isDisabled status for this component since the isDisabled property has now changed */
      setIsDisabled(props.isDisabled);
    }

    if (props.defaultValue !== undefined) {
      /* Set the default option as the specified value in the dropdown */
      setDefaultSelectedOption(props.defaultValue);
    } else {
      /* Set the default option as the first value in the dropdown */
      setDefaultSelectedOption(props.optionsList.itemsList[0].value);
    }
  }, [ props.defaultValue, props.isDisabled, props.optionsList ]);

  /**
   * Generates the ID for the label component
   * @returns {string}
   */
  const getIdLabelDOMElement = () => {
    return `${props.id}--dropdown-menu-label`;
  };

  /**
   * Generates the ID for the select component
   * @returns {string}
   */
  const getIdSelectDOMElement = () => {
    return `${props.id}--dropdown-menu`;
  };

  /**
   * Retrieves the select DOM element
   * @returns {HTMLElement}
   */
  const getSelectDOMElement = () => {
    return document.querySelector(`select[id="${getIdSelectDOMElement()}"]`);
  };

  /**
   * Handles change events dispatched to the dropdown menu component
   * @param {Event} event 
   */
  const handleOnChange = event => {
    eventManager.setEvent(event);
    eventManager.preventDefault();

    if (props.onChange !== undefined) {
      /* Pass this selection to the custom on change functionality */
      props.onChange(eventManager.getEventTargetValue());
    }
  };

  /**
   * Sets the default selected option for the dropdown menu
   * @param {string} optionValue 
   */
  const setDefaultSelectedOption = optionValue => {
    const selectElement = getSelectDOMElement();
    htmlElementManager.setDOMElement(selectElement);
    htmlElementManager.setOptionSelectedByValue(optionValue);
  };

  /* Set the styling for the container element */
  const containerCss = 'dropdown-container background-transparent';

  /* Set the styling for the label container element */
  let labelContainerCss = 'dropdown-common-container';
  props.alignment === 'centre' ? labelContainerCss += ' dropdown-alignment-centre' : labelContainerCss += ' dropdown-alignment-left';

  /* Set the styling for the label element */
  const labelCss = 'dropdown-label font-default font-black';

  /* Set the styling for the select container element */
  let selectContainerCss = 'dropdown-common-container';
  props.alignment === 'centre' ? selectContainerCss += ' dropdown-alignment-centre' : selectContainerCss += ' dropdown-alignment-left';

  /* Set the styling for the dropdown element */
  let selectCss = 'dropdown background-white font-default font-black';
  
  /* Determine if the error state is desired */
  const isError = props.errorMessage !== undefined ? true : false;

  /* Set whether the input element is disabled */
  isDisabled === true ? selectCss += ' dropdown-disabled' : selectCss += '';

  /* Set the error state to enabled if desired and only if the dropdown element is also enabled */
  (isDisabled === false && isError === true) ? selectCss += ' dropdown-error' : selectCss += '';
  
  /* Set the dropdown element as enabled if all other settings are not currently being used (ie. element is enabled and with no error) */
  (isDisabled === false && isError === false) ? selectCss += ' dropdown-enabled' : selectCss += '';

  /* Set the styling for the option group label element */
  const optionGroupLabelCss = 'dropdown-option-group-label';

  /* Set the styling for the mandatory dropdown asterisk display */
  const asteriskCss = 'font-default font-red';
  
  /* Set the styling for the error message container element */
  let errorMessageContainerCss = 'dropdown-error-container font-default font-red';
  props.alignment === 'centre' ? errorMessageContainerCss += ' dropdown-alignment-centre' : errorMessageContainerCss += ' dropdown-alignment-left';

  /* Decide whether this component is a mandatory component or an optional one */
  let isOptionalDropdown = true;
  if (props.isDisabled !== true && props.isOptional !== true) {
    isOptionalDropdown = false;
  }
  
  return (
    <div className={containerCss}>
      <div className={labelContainerCss}>
        <label className={labelCss} htmlFor={getIdSelectDOMElement()} id={getIdLabelDOMElement()}>
          {props.label}{isOptionalDropdown === false && <span className={asteriskCss}>&nbsp;*</span>}
        </label>
      </div>
      <div className={selectContainerCss}>
        <select aria-disabled={isDisabled} aria-labelledby={getIdLabelDOMElement()} className={selectCss} disabled={isDisabled}
          id={getIdSelectDOMElement()} name={props.name} onChange={handleOnChange} tabIndex={isDisabled === true ? "-1" : "0"}>
            <optgroup className={optionGroupLabelCss} label={`${props.optionsList.groupLabel}`}>
              {
                props.optionsList.itemsList.map((item, index) => {
                  return <option id={`${props.id}--dropdown-menu-item-${index}`} key={`${props.id}--dropdown-menu-item-${index}`} value={item.value}>{item.title}</option>
                })
              }
            </optgroup>
        </select>
      </div>
      {
        props.errorMessage !== undefined &&
          <div className={errorMessageContainerCss}>
            <span id={`${props.id}--dropdown-menu-error-message`}>{props.errorMessage}</span>
          </div>
      }
    </div>
  );
}
Dropdown.propTypes = {
  /** The alignment of the dropdown component. The dropdown and its label by default will be left aligned but can be centre aligned if desired. */
  alignment: PropTypes.oneOf([ 'centre', 'left' ]),
  /** The default selected option for the dropdown component. This property is used to pass existing values into a dropdown component in the form. */
  defaultValue: PropTypes.string,
  /** The error message to be output beneath the dropdown menu. If an error message is to be output then the dropdown itself will also be put into an error state. */
  errorMessage: PropTypes.string,
  /** The unique identifier for this component. */
  id: PropTypes.string.isRequired,
  /** Switch to set whether the component is disabled or not. By default the component is enabled. */
  isDisabled: PropTypes.bool,
  /** Switch to mark the dropdown field component as optional. By default all dropdowns are not marked as optional fields. */
  isOptional: PropTypes.bool,
  /** The label text content to be linked to the dropdown component. */
  label: PropTypes.string.isRequired,
  /** The name attribute value to be set to the dropdown component. */
  name: PropTypes.string,
  /** Custom functionality which will be invoked when the user changes the value of the dropdown component. This functionality will receive the value of the dropdown selection as a parameter. */
  onChange: PropTypes.func,
  /** The list of options to be rendered in the dropdown menu. */
  optionsList: PropTypes.shape({
    groupLabel: PropTypes.string,
    itemsList: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
  }),
};
export default Dropdown;
