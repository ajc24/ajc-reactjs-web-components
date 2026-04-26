/**
 * Developed by Anthony Cox in 2025
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

/* Set the element and keyboard managers modules for this component */
const htmlElementManager = new HTMLElementManager();
const keyboardEventManager = new KeyboardEventManager();

/**
 * The Dialog component renders a modal dialog on top of a full page mask to the user. The intention of the dialog is to display important information
 * to the user and to provide a clear call to action for the user to take in response to this information. The dialog component is highly customisable
 * with properties to set the background colour of the dialog and its buttons, the content and title text content, the list of buttons to be rendered in the
 * dialog and custom functionality to be executed on escape key presses.
 * 
 * This component incorporates the Dialog Title, Dialog Content and Dialog Button components to render the full dialog.
 */
const Dialog = props => {
  const [ activeDialogElementId, setActiveDialogElementId ] = useState(null);
  const [ handleActiveDialogElementIdChange, setHandleActiveDialogElementIdChange ] = useState(false);
  const [ handleIsDisplayedChange, setHandleIsDisplayedChange ] = useState(false);
  const [ handleTabBackwardsEvent, setHandleTabBackwardsEvent ] = useState(false);
  const [ handleTabForwardsEvent, setHandleTabForwardsEvent ] = useState(false);
  const [ isDisplayed, setIsDisplayed ] = useState(false);

  useEffect(() => {
    if (props.isDisplayed !== isDisplayed) {
      /* Set the isDisplayed state based on the property change and start the process of handling the display change */
      setIsDisplayed(props.isDisplayed);
      setHandleIsDisplayedChange(true);
    }

    if (handleActiveDialogElementIdChange) {
      /* Focus on the currently active element in the dialog */
      handleFocus_ActiveElement();
      setHandleActiveDialogElementIdChange(false);
    }

    if (handleIsDisplayedChange) {
      if (isDisplayed) {
        setTimeout(() => {
          /* On first time loading the dialog focus on the first tabbable element within the dialog */
          setActiveDialogElementId_FirstDialogElement();
        }, 100);

        /* Ensure the dialogs keyboard handler is set while the dialog is visible */
        globalThis.window.addEventListener('keydown', handleOnKeyDown_Dialog);
      } else {
        /* Clean up on hiding the dialog */
        cleanup();
      }
      setHandleIsDisplayedChange(false);
    }

    if (handleTabBackwardsEvent) {
      /* Process tab backwards navigation events in the dialog */
      handleOnKeyDown_TabBackwards();
      setHandleTabBackwardsEvent(false);
    }

    if (handleTabForwardsEvent) {
      /* Process tab forwards navigation events in the dialog */
      handleOnKeyDown_TabForwards();
      setHandleTabForwardsEvent(false);
    }
  }, [ handleActiveDialogElementIdChange, handleIsDisplayedChange, handleTabBackwardsEvent, handleTabForwardsEvent, props.isDisplayed ]);

  /**
   * Clean up on hiding the dialog by resetting the active dialog element and removing the dialog keyboard event handler
   */
  const cleanup = () => {
    setActiveDialogElementId(null);
    globalThis.window.removeEventListener('keydown', handleOnKeyDown_Dialog);
  };

  /**
   * Dispatches a focus event on the currently active tabbable element in the dialog
   */
  const focusOnActiveDialogElement = () => {
    const activeElement = document.getElementById(activeDialogElementId);
    htmlElementManager.setDOMElement(activeElement);
    htmlElementManager.focus();
  };

  /**
   * Retrieves all of the IDs from all of the tabbable dialog elements
   * @returns {Array.<string>}
   */
  const getAllTabbableDialogElementIds = () => {
    const allTabbableElements = getAllTabbableDialogElements();
    const listOfIds = [];
    let index = 0;
    while (index < allTabbableElements.length) {
      listOfIds.push(allTabbableElements[index].getAttribute('id'));
      index += 1;
    }
    return listOfIds;
  };

  /**
   * Retrieves all of the elements which can be tabbed to which are inside the dialog
   * @returns {Array.<HTMLElement>}
   */
  const getAllTabbableDialogElements = () => {
    const dialogElement = getDialogDOMElement();
    if (dialogElement !== null) {
      const allTabbableElements = dialogElement.querySelectorAll('[tabindex]');
      return Array.from(allTabbableElements);
    }
    return [];
  };

  /**
   * Returns the dialogs DOM element
   * @returns {HTMLElement}
   */
  const getDialogDOMElement = () => {
    return document.querySelector('[role="dialog"]');
  };

  /**
   * Applies a focus state to the currently active element in the dialog
   */
  const handleFocus_ActiveElement = () => {
    const activeElement = document.getElementById(activeDialogElementId);
    htmlElementManager.setDOMElement(activeElement);
    htmlElementManager.focus();
  };

  /**
   * Handles the key down events for the dialog, particularly around handling focus
   * @param {KeyboardEvent} event 
   */
  const handleOnKeyDown_Dialog = event => {
    keyboardEventManager.setEvent(event);
    const dialogElement = getDialogDOMElement();

    if (isDisplayed && dialogElement !== null && keyboardEventManager.isTabKeyEvent()) {
      keyboardEventManager.preventDefault();
      const currentlyActiveElementId = document.activeElement.getAttribute('id');

      if (currentlyActiveElementId === null || currentlyActiveElementId.includes('--dialog-') === false) {
        /* A tab key event has been fired from outside the dialog - shift focus back to the last active element in the dialog */
        setHandleActiveDialogElementIdChange(true);
      } else if (keyboardEventManager.isShiftKeyPressed()) {
        /* Tabbing backwards to the previous tabbable element */
        setHandleTabBackwardsEvent(true);
      } else {
        /* Tabbing forwards to the next tabbable element */
        setHandleTabForwardsEvent(true);
      }
    }
    if (keyboardEventManager.isEscapeKeyEvent()) {
      /* Ensure cleanup occurs on escape key presses to hide the dialog */
      cleanup();
    }
  };

  /**
   * Handles keyboard events to tab backwards to the previous tabbable element in the dialog.
   * If the first tabbable element has been reached, this function will loop focus back to the last tabbable element in the dialog.
   */
  const handleOnKeyDown_TabBackwards = () => {
    /* Retrieve all of the elements which can be tabbed to which are inside the dialog */
    const allTabbableElements = getAllTabbableDialogElements();
    const allTabbableElementIds = getAllTabbableDialogElementIds();
    const indexOfActiveDialogElement = allTabbableElements.indexOf(activeDialogElementId);

    /* Retrieve the index of the currently active element in the dialog and calculate the index of the next element to focus on */
    const indexOfActiveDialogElementId = allTabbableElementIds.indexOf(activeDialogElementId);
    let targetIndex = indexOfActiveDialogElementId - 1;
    if (targetIndex < 0) {
      /* If we have reached the first tabbable element then we want to loop back to the last tabbable element in the dialog */
      targetIndex = allTabbableElementIds.length - 1;
    }
    /* Set the active dialog element ID to be the ID of the target element and trigger the focus change */
    const targetActiveElementId = allTabbableElementIds[targetIndex];
    setActiveDialogElementId(targetActiveElementId);
    setHandleActiveDialogElementIdChange(true);
  };

  /**
   * Handles keyboard events to tab forwards to the next tabbable element in the dialog.
   * If the last tabbable element has been reached, this function will loop focus back to the first tabbable element in the dialog.
   */
  const handleOnKeyDown_TabForwards = () => {
    /* Retrieve all of the dialogs tabbable elements plus their IDs */
    const allTabbableElements = getAllTabbableDialogElements();
    const allTabbableElementIds = getAllTabbableDialogElementIds();

    /* Retrieve the index of the currently active element in the dialog and calculate the index of the next element to focus on */
    const indexOfActiveDialogElementId = allTabbableElementIds.indexOf(activeDialogElementId);
    let targetIndex = indexOfActiveDialogElementId + 1;
    if (targetIndex === allTabbableElementIds.length) {
      /* If we have reached the last tabbable element then we want to loop back to the first tabbable element in the dialog */
      targetIndex = 0;
    }
    /* Set the active dialog element ID to be the ID of the target element and trigger the focus change */
    const targetActiveElementId = allTabbableElementIds[targetIndex];
    setActiveDialogElementId(targetActiveElementId);
    setHandleActiveDialogElementIdChange(true);
  };

  /**
   * Sets the active dialog element ID to be the ID of the first tabbable element in the dialog and triggers the focus change to this element
   */
  const setActiveDialogElementId_FirstDialogElement = () => {
    const allTabbableElements = getAllTabbableDialogElements();
    setActiveDialogElementId(allTabbableElements[0].getAttribute('id'));
    setHandleActiveDialogElementIdChange(true);
  };

  /* Set the styling for the dialog container element */
  const dialogContainerCss = 'dialog-container screen-width-content-inner';

  return (
    <React.Fragment>
      {
        props.isDisplayed === true &&
          <FullPageMask allowOnKeyDownEvents={true} enableEscapeKey={true} handleEscapeKeyPress={props.handleEscapeKeyPress} id={props.id} isDisplayed={props.isDisplayed}>
            {/* Render the dialog component in the centre of the full page mask */}
            <div aria-labelledby={`${props.id}--dialog-title--heading`} aria-describedby={`${props.id}--dialog-content`} aria-modal={true} className={dialogContainerCss}
              id={`${props.id}--dialog`} role="dialog">
                <DialogTitle backgroundColour={props.backgroundColour} id={props.id}>
                  {props.dialogTitleTextContent}
                </DialogTitle>
                <DialogContent backgroundColour={props.backgroundColour} contentData={props.contentData} id={props.id} />
                <DialogButton backgroundColour={props.backgroundColour} buttonColour={props.buttonColour} buttonData={props.buttonData} id={props.id} />
            </div>
          </FullPageMask>
      }
    </React.Fragment>
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
