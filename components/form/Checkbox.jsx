/**
 * Developed by Anthony Cox in 2025
 * 
 * Revisions (January 2026):
 * - Added the ability to set a default selection for the checkbox.
 * - Added the ability to mark the checkbox as mandatory or optional (default).
 */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './css/form-checkbox.css';
import '../css/common.css';
import {
  HTMLElementManager,
  MouseEventManager,
} from '../modules';

/* Set up the element and component managers required by this component */
const htmlElementManager = new HTMLElementManager();
const mouseEventManager = new MouseEventManager();

/**
 * Checkbox component allowing a user to select / deselect a checkbox option in the web application. The checkbox can be enabled or disabled, it can also
 * be rendered in an error state with an error message in the case of a form validation issue.
 * 
 * The checkbox component is left aligned by default but can also be centrally aligned if desired.
 *
 * This component is intended for use with the Main component.
 */
const Checkbox = props => {
  const [ isChecked, setIsChecked ] = useState(false);

  useEffect(() => {
    if (props.defaultSelection !== undefined) {
      /* Only set a default selection for the checkbox component if one has been declared */
      setDefaultCheckboxValue(props.defaultSelection);
    }
  }, []);

  /**
   * Generates the ID for the input checkbox component
   * @returns {string}
   */
  const getIdInputCheckboxDOMElement = () => {
    return `${props.id}--checkbox`;
  };

  /**
   * Generates the ID for the checkbox label component
   * @returns {string}
   */
  const getIdLabelDOMElement = () => {
    return `${props.id}--checkbox-label`;
  };

  /**
   * Retrieves the DOM element for the input checkbox component
   * @returns {HTMLElement}
   */
  const getInputCheckboxDOMElement = () => {
    return document.querySelector(`input[id="${getIdInputCheckboxDOMElement()}"]`);
  };

  /**
   * Handles click events on the checkbox and / or checkbox label
   * @param {Event} event 
   */
  const handleOnClick = event => {
    mouseEventManager.setEvent(event);
    if (props.isDisabled !== true && mouseEventManager.isLeftClickEvent()) {
      setIsChecked(!isChecked);

      /* Only execute any custom functionality if it has been set */
      if (props.onClick !== undefined) {
        props.onClick();
      }
    }
  };

  /**
   * Sets the default value to the checkbox component
   * @param {string} defaultSelection 
   */
  const setDefaultCheckboxValue = defaultSelection => {
    const checkboxElement = getInputCheckboxDOMElement();
    htmlElementManager.setDOMElement(checkboxElement);
    htmlElementManager.setChecked(defaultSelection);
    setIsChecked(defaultSelection);
  };

  /* Set the styling for the container element */
  const containerCss = 'form-checkbox-container background-transparent';
    
  /* Set the styling for the inner container element */
  let innerContainerCss = 'form-checkbox-container-inner';
  props.alignment === 'centre'
    ? innerContainerCss += ' form-checkbox-container-inner-alignment-centre' : innerContainerCss += ' form-checkbox-container-inner-alignment-left';

  /* Set the styling for the checkbox input element container */
  const inputContainerCss = 'form-checkbox-input-container';

  /* Set the styling for the checkbox element */
  const checkboxCss = 'form-checkbox';

  /* Set the styling foe the label container element */
  const labelContainerCss = 'form-checkbox-label-container';

  /* Set the styling for the label element */
  let labelCss = 'form-checkbox-label font-default font-black';
  props.isDisabled === true ? labelCss += ' form-checkbox-label-disabled' : labelCss += '';

  /* Set the styling for the error container element */
  let errorContainerCss = 'form-checkbox-error font-default font-red';
  props.alignment === 'centre'
    ? errorContainerCss += ' form-checkbox-container-inner-alignment-centre' : errorContainerCss += ' form-checkbox-container-inner-alignment-left';
  
  /* Set the styling for the mandatory checkbox asterisk display */
  const asteriskCss = 'font-default font-red';

  /* Set the styling for the error span element */
  const errorSpanCss = 'form-checkbox-error-span';

  /* Determine whether the checkbox is an optional form component or not */
  const isCheckboxOptional = (props.isOptional === true || props.isOptional === undefined) ? true : false;

  return (
    <div className={containerCss}>
      <div className={innerContainerCss}>
        <div className={inputContainerCss}>
          <input aria-checked={isChecked} aria-disabled={props.isDisabled || false} aria-labelledby={getIdLabelDOMElement()} className={checkboxCss}
            data-optional={isCheckboxOptional} disabled={props.isDisabled || false} id={getIdInputCheckboxDOMElement()} name={props.name} onClick={handleOnClick}
            tabIndex={props.isDisabled === true ? "-1" : "0"} type="checkbox" />
        </div>
        <div className={labelContainerCss}>
          <label className={labelCss} htmlFor={getIdInputCheckboxDOMElement()} id={getIdLabelDOMElement()} onClick={handleOnClick}>
            {props.label}{isCheckboxOptional === false && <span className={asteriskCss}>&nbsp;*</span>}
          </label>
        </div>
      </div>
      {
        props.errorMessage !== undefined && props.errorMessage.length > 0 &&
          <div className={errorContainerCss}>
            <span className={errorSpanCss}>{props.errorMessage}</span>
          </div>
      }
    </div>
  );
}
Checkbox.propTypes = {
  /** The alignment of the checkbox component. The checkbox and its label by default will be left aligned but can be centre aligned if desired. */
  alignment: PropTypes.oneOf([ 'centre', 'left' ]),
  /** The default selection for the checkbox component. This property is used to pass existing values into a checkbox component in the form. */
  defaultSelection: PropTypes.bool,
  /** The error message to be output beneath the checkbox component. */
  errorMessage: PropTypes.string,
  /** The unique identifier for this component. */
  id: PropTypes.string.isRequired,
  /** Switch to set whether the component is disabled or not. By default the component is enabled. */
  isDisabled: PropTypes.bool,
  /** Switch to mark the checkbox component as optional. By default all checkbox components are assumed as being optional fields. */
  isOptional: PropTypes.bool,
  /** The label text content to be linked to the checkbox component. */
  label: PropTypes.string.isRequired,
  /** The name attribute value to be set to the checkbox component */
  name: PropTypes.string,
  /** The custom functionality to be executed when a click event on the checkbox is fired. */
  onClick: PropTypes.func,
};
export default Checkbox;
