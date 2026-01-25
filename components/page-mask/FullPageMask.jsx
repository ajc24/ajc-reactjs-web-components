/**
 * Developed by Anthony Cox in 2025
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './css/mask-full-page.css';
import {
  HTMLElementManager,
  KeyboardEventManager,
} from '../modules';

/* Set the element and keyboard managers modules for this component */
const htmlElementManager = new HTMLElementManager();
const keyboardEventManager = new KeyboardEventManager();

/**
 * Full Page Mask component which covers the screen in a slightly transparent mask, allowing for the priority children content
 * to be rendered clearly above the main content of the web page underneath. The mask can be optionally set as removeable via
 * pressing the Escape key.
 * 
 * The children content will be rendered centrally both vertically and horizontally within the full page mask component.
 */
const FullPageMask = props => {

  useEffect(() => {
    if (props.isDisplayed === true) {
      /* Set the loading spinner as displayed */
      setIsDisplayed();
    } else {
      /* Set the loading spinner as hidden */
      setIsHidden();
    }
  }, [ props.isDisplayed ]);

  /**
   * Retrieves the DOM element for the full page mask container element
   * @returns {HTMLElement}
   */
  const getFullPageMaskContainerDOMElement = () => {
    return document.querySelector(`div[id="${getIdFullPageMaskContainerDOMElement()}"]`);
  };

  /**
   * Retrieves the ID set to the full page mask container element
   * @returns {string}
   */
  const getIdFullPageMaskContainerDOMElement = () => {
    return `${props.id}--full-page-mask`;
  };

  /**
   * Handler for key presses while this component is visible to the user
   * @param {Event} event 
   */
  const handleOnKeyDown = event => {
    keyboardEventManager.setEvent(event);

    if (props.isDisplayed === true) {
      /* Prevent all other key down events from working - we do not want to allow focus to be applied to any components underneath the full page mask */
      keyboardEventManager.preventDefault();

      if (props.enableEscapeKey === true && keyboardEventManager.isEscapeKeyEvent() && props.handleEscapeKeyPress !== undefined) {
        /* Invoke the custom follow-on functionality after the escape key press if specified */
        props.handleEscapeKeyPress();
      }
    }
  };

  /**
   * Sets the full page mask component as displayed
   */
  const setIsDisplayed = () => {
    const fullPageMaskContainerElement = getFullPageMaskContainerDOMElement();
    if (fullPageMaskContainerElement !== null && props.enableEscapeKey === true) {
      /* Ensure global key presses are handled, including handling for Escape key presses if desired */
      globalThis.window.addEventListener('keydown', handleOnKeyDown);
    }
    /* Set the height for the full page mask container */
    htmlElementManager.setDOMElement(fullPageMaskContainerElement);
    htmlElementManager.setHeight(globalThis.window.innerHeight);
  };

  /**
   * Sets the full page mask component as hidden
   */
  const setIsHidden = () => {
    const fullPageMaskContainerElement = getFullPageMaskContainerDOMElement();
    if (fullPageMaskContainerElement !== null && props.enableEscapeKey === true) {
      /* Ensure global key presses are no longer handled since the component will be no longer visible */
      globalThis.window.removeEventListener('keydown', handleOnKeyDown);
    }
  };

  /* Set the styling for the masks container element */
  const maskContainerCss = 'full-page-mask-container';

  /* Set the styling for the masks inner container column element */
  const maskContainerInnerColumnCss = 'full-page-mask-container-inner-column';

  /* Set the styling for the masks inner container row element */
  const maskContainerInnerRowCss = 'full-page-mask-container-inner-row';

  return (
    <React.Fragment>
      {
        props.isDisplayed === true &&
          <div className={maskContainerCss} id={getIdFullPageMaskContainerDOMElement()}>
            <div className={maskContainerInnerColumnCss}>
              <div className={maskContainerInnerRowCss}>
                {props.children}
              </div>
            </div>
          </div>
      }
    </React.Fragment>
  );
}
FullPageMask.propTypes = {
  /** The content to be rendered centrally horizontally and vertically within the full page mask. */
  children: PropTypes.any,
  /** Switch to enable closing / hiding the loading spinner by using the Escape key on the keyboard. By default this functionality is disabled. */
  enableEscapeKey: PropTypes.bool,
  /** Custom functionality to be executed when the user presses the Escape key to hide the component. */
  handleEscapeKeyPress: PropTypes.func,
  /** The unique identifier for this component. */
  id: PropTypes.string.isRequired,
  /** Switch to set whether the loading spinner component is displayed or not. By default the component is not displayed. */
  isDisplayed: PropTypes.bool,
};
export default FullPageMask;
