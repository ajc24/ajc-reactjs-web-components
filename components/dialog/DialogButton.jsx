/**
 * Developed by Anthony Cox in 2026
 */
import React from 'react';
import PropTypes from 'prop-types';
import { getColourCombination } from '../data/colour-combinations.js';
import './css/dialog-button.css';
import '../menu-bar/css/menu-bar-common.css';
import '../css/common.css';

/**
 * Dialog Button component which renders the buttons of a dialog. The buttons are right aligned at all times. You are permitted
 * to render a maximum of three buttons in the dialog button container. The last button in the list of buttons is always assumed to be the
 * primary button and will be styled according to the colour specified via the **buttonColour** property.
 * The remaining buttons are secondary buttons and will always have a white background with black font text colour.
 * 
 * It is intended for use with the Dialog component.
 */
const DialogButton = props => {

  /* Determine the background colour and font colour for the component - setting white background colour with black font text colour as the default */
   const { backgroundColour, fontColour } = getColourCombination(props.buttonColour);

  /* Set the styling for the dialog button container element */
  let containerCss = 'dialog-button-container';
  props.backgroundColour === 'grey' ? containerCss += ' background-grey-body' : containerCss += ' background-white';

  /* Set the styling for the dialog button inner container element */
  const containerInnerCss = 'dialog-button-container-inner screen-width-content-inner';

  /* Set the styling for the dialogs button element */
  const primaryButtonCss = `dialog-button background-${backgroundColour} font-default font-${fontColour}`;
  const secondaryButtonCss = 'dialog-button background-white font-default font-black';

  return (
    <div id={`${props.id}--dialog-button-container`} className={containerCss}>
      <div className={containerInnerCss}>
        {
          props.buttonData.map((buttonDataItem, index) => {
            /* Set the id and key for the dialog button container element */
            const containerIdAndKey = `${props.id}--dialog-button-${index}`;

            /* Set the styling for the dialog button content and inner content elements */
            const buttonContentCss = 'dialog-button-content';
            const buttonContentInnerCss = 'dialog-button-content-inner';

            /* Determine if this button should be a primary button or a secondary button - the last button in the list of buttons is always the primary button */
            const buttonCss = index === props.buttonData.length - 1 ? primaryButtonCss : secondaryButtonCss;
            return (
              <div id={containerIdAndKey} key={containerIdAndKey} className={buttonContentCss}>
                <div className={buttonContentInnerCss}>
                  <button aria-label={`${buttonDataItem.textContent}`} className={buttonCss} id={`${buttonDataItem.id}--dialog-button-${index}`} onClick={buttonDataItem.onClick}
                    tabIndex="0" title={`${buttonDataItem.textContent}`}>
                      {buttonDataItem.textContent}
                  </button>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}
DialogButton.propTypes = {
  /** The background colour for the dialogs button container. The default colour for the background is white. */
  backgroundColour: PropTypes.oneOf([ 'white', 'grey' ]),
  /** The background colour for the primary button in the list of dialog buttons. The default colour for the primary buttons background is white. */
  buttonColour: PropTypes.oneOf([ 'gold', 'green', 'grey', 'navy-and-gold', 'navy-and-white', 'red', 'white' ]),
  /** The list of dialog buttons to be displayed. A maximum of three buttons may be rendered. The last rendered button is always assumed to be the primary button. */
  buttonData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      onClick: PropTypes.func,
      textContent: PropTypes.string,
    })
  ).isRequired,
  /** The unique identifier for the dialogs button container. */
  id: PropTypes.string.isRequired,
};
export default DialogButton;
