/**
 * Developed by Anthony Cox in 2025
 * 
 * Revisions (January 2026):
 * - Added the ability to set a default value for the text input field.
 */
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BaseFormInput } from '../../components';
import { HTMLElementManager } from '../modules';

/* Set up the element manager required by this component */
const htmlElementManager = new HTMLElementManager();

/**
 * Text Input component allowing a user to enter text data as part of a form in the web application. The text input can be enabled or disabled, it can also
 * be rendered in an error state with an error message in the case of a form validation issue.
 * 
 * The text input component is left aligned by default but can also be centrally aligned if desired.
 *
 * This component is intended for use with the Main component.
 */
const TextInput = props => {
  useEffect(() => {
    if (props.defaultValue !== undefined && props.defaultValue.length > 0) {
      /* Only set a default value for the text input component if one has been declared */
      setDefaultTextInputValue(props.defaultValue);
    }
  }, []);

  /**
   * Generates the ID for the input component
   * @returns {string}
   */
  const getIdInputDOMElement = () => {
    return `${props.id}--text-input`;
  };

  /**
   * Retrieves the DOM element for the input component
   * @returns {HTMLElement}
   */
  const getInputDOMElement = () => {
    return document.querySelector(`input[id="${getIdInputDOMElement()}"]`);
  };

  /**
   * Sets the default value to the input component
   * @param {string} defaultValue 
   */
  const setDefaultTextInputValue = defaultValue => {
    const textInputElement = getInputDOMElement();
    htmlElementManager.setDOMElement(textInputElement);
    htmlElementManager.setValue(defaultValue);
  };

  /* Determine whether an error message is set to the component */
  let isErrorState = false;
  props.errorMessage !== undefined && props.errorMessage.length > 0 ? isErrorState = true : isErrorState = false;

  return <BaseFormInput alignment={props.alignment || 'left'} errorMessage={props.errorMessage} id={getIdInputDOMElement()} isDisabled={props.isDisabled || false}
    isError={isErrorState} isOptional={props.isOptional}  label={props.label} name={props.name} type="text" />;
}
TextInput.propTypes = {
  /** The alignment of the text input component. The input field by default will be left aligned but can be centre aligned if desired. */
  alignment: PropTypes.oneOf([ 'centre', 'left' ]),
  /** The default value for the text input component. This property is used to pass existing values into a text input component in the form. */
  defaultValue: PropTypes.string,
  /** The error message to be output beneath the component. If an error message is to be output then the isError state will automatically be enabled. */
  errorMessage: PropTypes.string,
  /** The unique identifier for this component. */
  id: PropTypes.string.isRequired,
  /** Switch to set whether the component is disabled or not. By default the component is enabled. */
  isDisabled: PropTypes.bool,
  /** Switch to mark the text input component as optional. By default all text input fields are not marked as optional fields. */
  isOptional: PropTypes.bool,
  /** The label text content to be linked to the text input component. */
  label: PropTypes.string.isRequired,
  /** The name attribute value to be set to the text input component */
  name: PropTypes.string,
};
export default TextInput;
