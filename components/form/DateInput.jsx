/**
 * Developed by Anthony Cox in 2025
 */
import PropTypes from 'prop-types';
import { BaseFormInput } from '../../components';

/**
 * Date Input component allowing a user to enter a date as part of a form in the web application. The date input can be enabled or disabled, it can also
 * be rendered in an error state with an error message in the case of a form validation issue.
 * 
 * The date input component is left aligned by default but can also be centrally aligned if desired.
 *
 * This component is intended for use with the Main component.
 */
const DateInput = props => {
  /* Determine whether an error message is set to the component */
  let isErrorState = false;
  props.errorMessage !== undefined && props.errorMessage.length > 0 ? isErrorState = true : isErrorState = false;

  return <BaseFormInput alignment={props.alignment || 'left'} errorMessage={props.errorMessage} id={`${props.id}--date-input`} isDisabled={props.isDisabled || false}
    isError={isErrorState}  label={props.label} name={props.name} type="date" />;
}
DateInput.propTypes = {
  /* The alignment of the date input component. The input field by default will be left aligned but can be centre aligned if desired. */
  alignment: PropTypes.oneOf([ 'centre', 'left' ]),
  /** The error message to be output beneath the component. If an error message is to be output then the isError state will automatically be enabled. */
  errorMessage: PropTypes.string,
  /** The unique identifier for this component. */
  id: PropTypes.string.isRequired,
  /** Switch to set whether the component is disabled or not. By default the component is enabled. */
  isDisabled: PropTypes.bool,
  /** The label text content to be linked to the date input component. */
  label: PropTypes.string.isRequired,
  /** The name attribute value to be set to the date input component */
  name: PropTypes.string,
};
export default DateInput;
