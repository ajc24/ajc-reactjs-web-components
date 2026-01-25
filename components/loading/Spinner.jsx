/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import PropTypes from 'prop-types';
import FullPageMask from '../page-mask/FullPageMask.jsx';
import './css/loading-spinner.css';
import '../css/common.css';

/**
 * Spinner component which renders a loading spinner to the user. The spinner component is rendered centrally both vertically
 * and horizontally and is rendered on top of a full page mask which ensures that any / all background content is temporarily
 * covered and therefore cannot be interacted with.
 * 
 * Optionally you can set the spinner to be disabled / hidden using the "Escape" key on the keyboard.
 */
const Spinner = props => {

  /* Determine the colour scheme to be used for the component - defaulting to the white colour scheme */
  const spinnerColour = props.colour || 'white';

  /* Set the styling for the spinner container element */
  const spinnerContainerCss = 'spinner-container';

  /* Set the styling for the spinner inner container element */
  const spinnerInnerContainerCss = 'spinner-inner-container';

  /* Set the styling for the spinning loader component */
  const spinnerDivCss = 'spinner-div spinner-font font-default font-black';
  const spinnerComponentCss = `spinner spinner-colour-${spinnerColour}`;

  /* Determine the text output to be rendered underneath the spinner */
  const spinnerTextContent = props.children || 'Please Wait';

  return (
    <React.Fragment>
      {
        props.isDisplayed === true &&
          <FullPageMask enableEscapeKey={props.enableEscapeKey} handleEscapeKeyPress={props.handleEscapeKeyPress} id={props.id} isDisplayed={props.isDisplayed}>
            {/* Render the spinner content in the centre of the page */}
            <div className={spinnerContainerCss}>
              <div className={spinnerInnerContainerCss}>

                {/* Render the spinner and loading message components */}
                <div className={spinnerDivCss}>
                  <div className={spinnerComponentCss} />
                </div>
                <div className={spinnerDivCss}>
                  <span>{spinnerTextContent}</span>
                </div>
              </div>
            </div>
          </FullPageMask>
      }
    </React.Fragment>
  );
}
Spinner.propTypes = {
  /** The text content to be displayed underneath the spinner component. By default a "Please Wait" message is output. */
  children: PropTypes.string,
  /** The colour scheme for the loading spinner component. The default colour for the background is white. */
  colour: PropTypes.oneOf([ 'gold', 'green', 'grey', 'navy-and-gold', 'navy-and-white', 'red', 'white' ]),
  /** Switch to enable closing / hiding the loading spinner by using the Escape key on the keyboard. By default this functionality is disabled. */
  enableEscapeKey: PropTypes.bool,
  /** Custom functionality to be executed when the user presses the Escape key to hide the component. */
  handleEscapeKeyPress: PropTypes.func,
  /** The unique identifier for this component. */
  id: PropTypes.string.isRequired,
  /** Switch to set whether the loading spinner component is displayed or not. By default the component is not displayed. */
  isDisplayed: PropTypes.bool,
};
export default Spinner;
