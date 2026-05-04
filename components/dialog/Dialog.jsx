/**
 * Developed by Anthony Cox in 2025
 * 
 * Revisions (May 2026):
 * - Updated the component to support the latest version of the Full Page Mask component.
 * - Improved all round functionality so that tabbing between dialog elements no longer breaks out from the dialog.
 * - Improved the global event listener handling of Escape key presses.
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DialogButton from './DialogButton.jsx';
import DialogContent from './DialogContent.jsx';
import DialogTitle from './DialogTitle.jsx';
import FullPageMask from '../page-mask/FullPageMask.jsx';
import {
  HTMLElementManager,
  KeyboardEventManager,
} from '../modules';
import './css/dialog.css';
import '../css/common.css';

/**
 * The Dialog component renders a modal dialog on top of a full page mask to the user. The intention of the dialog is to display important information
 * to the user and to provide a clear call to action for the user to take in response to this information. The dialog component is highly customisable
 * with properties to set the background colour of the dialog and its buttons, the content and title text content, the list of buttons to be rendered in the
 * dialog and custom functionality to be executed on escape key presses.
 * 
 * This component incorporates the Dialog Title, Dialog Content and Dialog Button components to render the full dialog.
 */
const Dialog = props => {
  const [ init, setInit ] = useState(false);

  useEffect(() => {
    if (props.isDisplayed && init === false) {
      globalThis.window.addEventListener('keydown', handleOnKeyDown_Dialog);
      setInit(true);
    }
  }, [ props.isDisplayed]);

  /**
   * Retrieves the DOM element for the full page mask container element which contains the dialog
   * @returns {HTMLElement}
   */
  const getFullPageMaskContainerDOMElement = () => {
    return document.querySelector(`[id="${getIdFullPageMaskContainerDOMElement()}"]`);
  };

  /**
   * Retrieves the ID set to the dialog element
   * @returns {string}
   */
  const getIdDialogDOMElement = () => {
    return `${props.id}--dialog`;
  };

  /**
   * Retrieves the ID set to the full page mask container element which contains the dialog
   * @returns {string}
   */
  const getIdFullPageMaskContainerDOMElement = () => {
    return `${props.id}--full-page-mask`;
  };

  /**
   * Handles key down events while the dialog is displayed, specifically handling Escape key presses.
   * @param {Event} event
   */
  const handleOnKeyDown_Dialog = event => {
    const htmlElementManager = new HTMLElementManager();
    const keyboardEventManager = new KeyboardEventManager();

    keyboardEventManager.setEvent(event);
    const fullPageMaskElement = getFullPageMaskContainerDOMElement();
    htmlElementManager.setDOMElement(fullPageMaskElement);

    if (htmlElementManager.getVisibility() === true && keyboardEventManager.isEscapeKeyEvent()) {
      /* Escape key press detected while dialog is displayed */
      keyboardEventManager.preventDefault();
      if (props.handleEscapeKeyPress !== undefined) {
        /* If the user has specified custom escape key press functionality - execute this functionality */
        props.handleEscapeKeyPress();
      }
    }
  };

  /* Set the styling for the dialog container element */
  const dialogContainerCss = 'dialog-container screen-width-content-inner';

  return (
    <FullPageMask id={props.id} isDisplayed={props.isDisplayed}>
      {/* Render the dialog component in the centre of the full page mask */}
      <div aria-labelledby={`${props.id}--dialog-title--heading`} aria-describedby={`${props.id}--dialog-content`} aria-modal={true} className={dialogContainerCss}
        id={getIdDialogDOMElement()} role="dialog">
          <DialogTitle backgroundColour={props.backgroundColour} id={props.id}>
            {props.dialogTitleTextContent}
          </DialogTitle>
          <DialogContent backgroundColour={props.backgroundColour} contentData={props.contentData} id={props.id} />
          <DialogButton backgroundColour={props.backgroundColour} buttonColour={props.buttonColour} buttonData={props.buttonData} id={props.id} />
      </div>
    </FullPageMask>
  );
}
Dialog.propTypes = {
  /** The background colour for the dialog component. The default colour for the background is white. */
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
  /** The text content to be displayed as the dialogs content. */
  contentData: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
      type: PropTypes.oneOf([ 'paragraph' ]),
    })
  ).isRequired,
  /** The text content for the dialog title. */
  dialogTitleTextContent: PropTypes.string.isRequired,
  /** Custom functionality to be executed when the user presses the Escape key to hide the component. */
  handleEscapeKeyPress: PropTypes.func,
  /** The unique identifier for this component. */
  id: PropTypes.string.isRequired,
  /** Switch to set whether the dialog component is displayed or not. By default the component is not displayed. */
  isDisplayed: PropTypes.bool,
};
export default Dialog;
