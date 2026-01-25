/**
 * Developed by Anthony Cox in 2025
 */
import PropTypes from 'prop-types';
import { BaseButton } from '../../components';
import './css/form-buttons.css';

/**
 * Submit button component allowing for a render of a single submit button type in a form in a web application.
 * 
 * The button can be rendered in a range of different background colours to match the colours chosen for the Menu Bar
 * and Footer components in the UI. Custom onClick functionality can also be specified. This component is also fully keyboard
 * accessible and can be rendered in a disabled state where desired. The submit button component is left aligned by default
 * but can also be centrally aligned if desired.
 * 
 * The submit button component is intended for use within the Main component.
 */
const SubmitButton = props => {
  /* Set the styling for the container element */
  let containerCss = 'form-buttons-container';
  props.alignment === 'centre' ? containerCss += ' form-buttons-container-alignment-centre' : containerCss += ' form-buttons-container-alignment-left';

  return (
    <div className={containerCss}>
      <BaseButton backgroundColour={props.backgroundColour || 'white'} id={`${props.id}--submit-button`} isDisabled={props.isDisabled || false} onClick={props.onClick}
        type="submit">
          {props.children}
      </BaseButton>
    </div>
  );
}
SubmitButton.propTypes = {
  /* The alignment of the submit button component. The button field by default will be left aligned but can be centre aligned if desired. */
  alignment: PropTypes.oneOf([ 'centre', 'left' ]),
  /** The background colour for the submit button. The default colour for the background is white. */
  backgroundColour: PropTypes.oneOf([ 'gold', 'green', 'grey', 'navy-and-gold', 'navy-and-white', 'red', 'white' ]),
  /** The text label to be set to the button. */
  children: PropTypes.string.isRequired,
  /** The unique identifier for this component. */
  id: PropTypes.string.isRequired,
  /** Switch to set whether the submit button is disabled or not. By default the button is enabled. */
  isDisabled: PropTypes.bool,
  /** Custom onClick functionality to be set to the submit button. */
  onClick: PropTypes.func,
};
export default SubmitButton;
