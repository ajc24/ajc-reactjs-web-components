/**
 * Developed by Anthony Cox in 2025
 * 
 * Revisions (January 2026):
 * - Added the ability to mark the base form input as mandatory (default) or optional.
 */
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import './css/base-form-input.css';
import '../css/common.css';

/**
 * Base Form Input component allowing a user to enter text or date data as part of a form in the web application. This baseline
 * component supports rendering a text input, a password input or a date input. All input elements can be enabled or disabled, they can also
 * be rendered in an error state with an error message in the case of a form validation issue.
 * 
 * The base form input component is left aligned by default but can also be centrally aligned if desired.
 * 
 * This component is intended for use with the Main component.
 */
const BaseFormInput = props => {

  useEffect(() => {
    if (props.type === 'date') {
      /* Set todays date as the default */
      setDefaultDate();
    }
  }, []);

  /**
   * Gets the ID for the input element
   * @returns {string}
   */
  const getIdInputElement = () => {
    const id = props.id !== undefined ? props.id : 'default--base-form-input';
    return id;
  };

  /**
   * Gets the ID for the label element
   * @returns {string}
   */
  const getIdLabelElement = () => {
    const id = props.id !== undefined ? `${props.id}-label` : 'default--base-form-input-label';
    return id;
  };

  /**
   * Retrieves the input DOM element
   * @returns {HTMLElement}
   */
  const getInputDOMElement = () => {
    return document.querySelector(`input[id="${getIdInputElement()}"]`);
  };

  /**
   * Sets the default date for the component to todays date
   */
  const setDefaultDate = () => {
    /* Get todays date attributes */
    const todaysDate = new Date();
    const date = todaysDate.getDate();
    const month = todaysDate.getMonth() + 1;
    const year = todaysDate.getFullYear();

    /* Generate the string output for todays date */
    const dateOutput = date >= 10 ? `${date}` : `0${date}`;
    const monthOutput = month >= 10 ? `${month}` : `0${month}`;
    const yearOutput = `${year}`;

    /* Set the default date to the input element */
    const inputElement = getInputDOMElement();
    inputElement.value = `${yearOutput}-${monthOutput}-${dateOutput}`;
  };

  /* Set the styling for the container element */
  const containerCss = 'form-input-container background-transparent';

  /* Set the styling for the label container element */
  let labelContainerCss = 'form-input-common-container';
  props.alignment === 'centre' ? labelContainerCss += ' form-input-alignment-centre' : labelContainerCss += ' form-input-alignment-left';

  /* Set the styling for the label element */
  const labelCss = 'form-input-label font-default font-black';

  /* Set the styling for the mandatory checkbox asterisk display */
  const asteriskCss = 'font-default font-red';

  /* Set the styling for the input container element */
  let inputContainerCss = 'form-input-common-container';
  props.alignment === 'centre' ? inputContainerCss += ' form-input-alignment-centre' : inputContainerCss += ' form-input-alignment-left';

  /* Set the styling for the input element */
  let inputCss = 'form-input background-white font-default font-black';
  
  /* Determine if the disabled state is desired and / or the error state is desired */
  const isDisabled = props.isDisabled === true ? true : false;
  const isError = props.isError === true ? true : false;

  /* Set whether the input element is disabled */
  isDisabled === true ? inputCss += ' form-input-disabled' : inputCss += '';

  /* Set the error state to enabled if desired and only if the input element is also enabled */
  (isDisabled === false && isError === true) ? inputCss += ' form-input-error' : inputCss += '';
  
  /* Set the input element as enabled if all other settings are not currently being used (ie. element is enabled and with no error) */
  (isDisabled === false && isError === false) ? inputCss += ' form-input-enabled' : inputCss += '';
  
  /* Set the styling for the error message container element */
  let errorMessageContainerCss = 'form-input-error-container font-default font-red';
  props.alignment === 'centre' ? errorMessageContainerCss += ' form-input-alignment-centre' : errorMessageContainerCss += ' form-input-alignment-left';

  /* Decide whether this component is a mandatory component or an optional one */
  let isOptionalFormInput = true;
  if (props.isDisabled !== true && props.isOptional !== true) {
    isOptionalFormInput = false;
  }

  return (
    <div className={containerCss}>
      <div className={labelContainerCss}>
        <label className={labelCss} htmlFor={getIdInputElement()} id={getIdLabelElement()}>
          {props.label}{isOptionalFormInput === false && <span className={asteriskCss}>&nbsp;*</span>}
        </label>
      </div>
      <div className={inputContainerCss}>
        <input aria-disabled={props.isDisabled || false} aria-labelledby={getIdLabelElement()} className={inputCss} data-optional={`${props.isOptional || false}`}
          disabled={props.isDisabled || false} id={getIdInputElement()} name={props.name} tabIndex={props.isDisabled === true ? "-1" : "0"}
          type={props.type !== undefined ? props.type : 'text'} />
      </div>
      {
        props.isError === true && props.errorMessage !== undefined &&
          <div className={errorMessageContainerCss}>
            <span id={props.id !== undefined ? `${props.id}-error-message` : 'default--base-form-input-error-message'}>{props.errorMessage}</span>
          </div>
      }
    </div>
  );
}
BaseFormInput.propTypes = {
  /** The alignment of the form input component. The input field by default will be left aligned but can be centre aligned if desired. */
  alignment: PropTypes.oneOf([ 'centre', 'left' ]),
  /** The error message to be output beneath the input component. If an error message is to be output, then the isError state should also be enabled. */
  errorMessage: PropTypes.string,
  /** The unique identifier for this component. */
  id: PropTypes.string,
  /** Switch to set whether the component is disabled or not. By default the component is enabled. */
  isDisabled: PropTypes.bool,
  /** Switch to set whether a validation error has been found in the components text data entry. By default this error mode is disabled. */
  isError: PropTypes.isError,
  /** Switch to mark the form input field component as optional. By default all input fields are not marked as optional fields. */
  isOptional: PropTypes.bool,
  /** The label text content to be linked to the form input component. */
  label: PropTypes.string.isRequired,
  /** The name attribute value to be set to the form input component */
  name: PropTypes.string,
  /** The type to be set to the input element. By default a text input element is rendered. */
  type: PropTypes.oneOf([ 'date', 'password', 'text' ]),
};
export default BaseFormInput;
