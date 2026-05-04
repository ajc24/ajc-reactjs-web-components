/**
 * Developed by Anthony Cox in 2025
 * 
 * Revisions (April 2026):
 * - Added a smoother transition effect for the children components rendered in the full page mask. This was added
 *   as sometimes you would see elements "jump" from the top of the screen to the centre of the screen as the window
 *   height was dynamically applied to the full page mask container element. Now the children components will fade in
 *   more smoothly when the mask is rendered.
 * 
 * Revisions (May 2026):
 * Full overhaul of the full page mask component implemented. This was due to other issues now becoming apparent such as incorrect tab key press handling affecting inner dialog components.
 * - Improved the CSS styling / structure for the element. Cleaner and more efficient centering of all children elements implemented.
 * - The element is no longer only rendered / attached to the DOM when called upon. Now it is permanently rendered in the DOM but is marked as visible / hidden as required.
 * - Added smooth in and out transitions for the fading in and out of the full page mask as required.
 * - Tabbable elements (elements marked with a tabindex) rendered within the full page mask are disabled by default and when the mask is hidden.
 * - Tabbable elements are all re-enabled when the mask is visible. This does not affect DOM elements that have a tabindex deliberately set to -1. These elements are ignored and left with their tabindex set to -1.
 * - When the mask is visible, focus is auto applied to the first tabbable element if one exists.
 * - When the mask is visible, tabbing between elements will correctly cycle between all tabbable elements within the scope of the full page mask content.
 * - When the mask is visible, you cannot tab away from the focusable elements within the full page mask content.
 * - If you manually remove focus from the full page mask content area, tabbing on the keyboard will return focus back to the content area at the first tabbable element again.
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './css/mask-full-page.css';
import {
  HTMLElementManager,
  KeyboardEventManager,
} from '../modules';

/* Set the data for the full page mask component */
const backgroundColour_SemiOpaque = 'rgba(0, 0, 0, 0.5)';
const backgroundColour_Transparent = 'transparent';
const transitionTime_Opactity = 250;

/* Set the element and keyboard managers modules for this component */
// const htmlElementManager = new HTMLElementManager();
// const keyboardEventManager = new KeyboardEventManager();

/**
 * Full Page Mask component which covers the screen in a slightly transparent mask, allowing for the priority children content
 * to be rendered clearly above the main content of the web page underneath.
 * 
 * The children content will be rendered centrally both vertically and horizontally within the full page mask component.
 */
const FullPageMask = props => {
  const [ init, setInit ] = useState(false);
  const [ listOfTabIndexElements, setListOfTabIndexElements ] = useState([]);

  useEffect(() => {
    if (props.isDisplayed) {
      /* Mark the component as visible */
      setIsDisplayed();
    } else {
      /* By default or on registering the relevant property change, mark the component as hidden */
      setIsHidden();
    }
    if (init === false) {
      setTimeout(() => {
        /**
         * Perform first time component initialisation.
         * Since setIsHidden is always executed on first time render and waits for the opacity transition time to complete,
         * we also need to delay this first time initialisation process until after that transition time has completed or
         * else the use of htmlElementManager will clash and cause unintended behavior.
         */
        const allTabbableContentElements = getAllTabbableContentElements();
        setListOfTabIndexElements(allTabbableContentElements);
        let index = 0;
        while (index < allTabbableContentElements.length) {
          /* Disable all currently active tabbable elements within the full page mask content element */
          const htmlElementManager = new HTMLElementManager();
          htmlElementManager.setDOMElement(allTabbableContentElements[index]);
          htmlElementManager.setTabIndex(-1);
          index += 1;
        }

        globalThis.window.addEventListener('keydown', handleOnKeyDown_Tab);
        setInit(true);
      }, transitionTime_Opactity);
    }
  }, [ props.isDisplayed ]);

  /**
   * Retrieves all tabbable elements rendered within the full page mask content element
   * @returns {Array.<HTMLElement>}
   */
  const getAllTabbableContentElements = () => {
    const fullPageMaskContentElement = getFullPageMaskContentDOMElement();
    const htmlElementManager = new HTMLElementManager();
    htmlElementManager.setDOMElement(fullPageMaskContentElement);

    let allTabbableElements = [];
    if (htmlElementManager.isValidDOMElement()) {
      allTabbableElements = fullPageMaskContentElement.querySelectorAll('[tabindex]');
    }

    /* Some elements with a tab index might be deliberately set to -1 to prevent them from being tabbable - we need to ignore these elements if they exist */
    let index = 0;
    const listOfValidTabbableElements = [];
    while (index < allTabbableElements.length) {
      htmlElementManager.setDOMElement(allTabbableElements[index]);
      if (htmlElementManager.getTabIndex() === 0) {
        listOfValidTabbableElements.push(htmlElementManager.getDOMElement());
      }
      index += 1;
    }
    return listOfValidTabbableElements;
  };

  /**
   * Retrieves the DOM element for the full page mask fixed container element
   * @returns {HTMLElement}
   */
  const getFullPageMaskContainerFixedDOMElement = () => {
    return document.querySelector(`[id="${getIdFullPageMaskContainerFixedDOMElement()}"]`);
  };

  /**
   * Retrieves the DOM element for the full page mask content element
   * @returns {HTMLElement}
   */
  const getFullPageMaskContentDOMElement = () => {
    return document.querySelector(`[id="${getIdFullPageMaskContentDOMElement()}"]`);
  };

  /**
   * Retrieves the ID set to the full page mask fixed container element
   * @returns {string}
   */
  const getIdFullPageMaskContainerFixedDOMElement = () => {
    return `${props.id}--full-page-mask`;
  };

  /**
   * Retrieves the ID set to the full page mask content element
   * @returns {string}
   */
  const getIdFullPageMaskContentDOMElement = () => {
    return `${props.id}--content--full-page-mask`;
  };

  /**
   * Handler for tab key presses while this component is visible to the user
   * @param {Event} event 
   */
  const handleOnKeyDown_Tab = event => {
    const htmlElementManager = new HTMLElementManager();
    const keyboardEventManager = new KeyboardEventManager();

    keyboardEventManager.setEvent(event);
    const allTabbableContentElements = getAllTabbableContentElements();

    if (allTabbableContentElements.length > 0 && keyboardEventManager.isTabKeyEvent()) {
      /* Tabbable elements exist within the content area of the full page mask. Perform all handling required by these elements */
      const currentFocusedElement = keyboardEventManager.getEventTarget();

      if (keyboardEventManager.isShiftKeyPressed() && currentFocusedElement === allTabbableContentElements[0]) {
        /* Tabbing backwards from the first tabbable element within the full page mask content - redirect focus to the last tabbable element */
        keyboardEventManager.preventDefault();
        htmlElementManager.setDOMElement(allTabbableContentElements[allTabbableContentElements.length - 1]);
        htmlElementManager.focus();
      } else if (keyboardEventManager.isShiftKeyPressed() === false && currentFocusedElement === allTabbableContentElements[allTabbableContentElements.length - 1]) {
        /* Tabbing forwards from the last tabbable element within the full page mask content - redirect focus to the first tabbable element */
        keyboardEventManager.preventDefault();
        htmlElementManager.setDOMElement(allTabbableContentElements[0]);
        htmlElementManager.focus();
      } else if (allTabbableContentElements.indexOf(currentFocusedElement) === -1 && allTabbableContentElements.length > 0) {
        /* If we have clicked away from the tabbable elements in the content area then we need to return focus back to the first tabbable element in the content */
        keyboardEventManager.preventDefault();
        htmlElementManager.setDOMElement(allTabbableContentElements[0]);
        htmlElementManager.focus();
      }
    } else {
      /* No tabbable elements exist within the content area of the full page mask but it might still be marked as visible */
      const fullPageMaskContainerFixedElement = getFullPageMaskContainerFixedDOMElement();
      htmlElementManager.setDOMElement(fullPageMaskContainerFixedElement);
      if (htmlElementManager.getVisibility() === true && keyboardEventManager.isTabKeyEvent()) {
        /* If the full page mask is visible then disable all tab events within the content area no matter what the event target is */
        keyboardEventManager.preventDefault();
      }
    }
  };

  /**
   * Sets the full page mask component as displayed
   */
  const setIsDisplayed = () => {
    const htmlElementManager = new HTMLElementManager();
    const fullPageMaskContainerFixedElement = getFullPageMaskContainerFixedDOMElement();

    /* Change the CSS properties of the fixed container element to mark the full page mask as visible */
    htmlElementManager.setDOMElement(fullPageMaskContainerFixedElement);
    htmlElementManager.setBackgroundColour(backgroundColour_SemiOpaque);
    htmlElementManager.setZIndex(5);
    htmlElementManager.setVisibility_Visible();
    htmlElementManager.setOpacity_Visible();

    let index = 0;
    while (index < listOfTabIndexElements.length) {
      /* Enable all tabbable elements within the full page mask content element */
      htmlElementManager.setDOMElement(listOfTabIndexElements[index]);
      htmlElementManager.setTabIndex(0);
      index += 1;
    }
    if (listOfTabIndexElements.length > 0) {
      /**
       * Set the focus to the first tabbable element within the full page mask content element if any such element exists.
       * 
       * Use a small timeout here in case the component calling upon this also uses a full page mask, in which case firing this
       * focus event immediately might not work as expected.
       */
      setTimeout(() => {
        htmlElementManager.setDOMElement(listOfTabIndexElements[0]);
        htmlElementManager.focus();
      }, 50);
    } else {
      /* Remove focus from whatever element triggered the page mask to be rendered */
      document.activeElement.blur();
    }
  };

  /**
   * Sets the full page mask component as hidden
   */
  const setIsHidden = () => {
    const htmlElementManager = new HTMLElementManager();
    const fullPageMaskContainerFixedElement = getFullPageMaskContainerFixedDOMElement();

    /* Initially set the opacity to hidden which will trigger the transition effect to hide the full page mask */
    htmlElementManager.setDOMElement(fullPageMaskContainerFixedElement);
    htmlElementManager.setOpacity_Hidden();
    setTimeout(() => {
      /* On completion of the transition effect, change the remaining CSS properties of the fixed container element to mark the full page mask as hidden */
      htmlElementManager.setVisibility_Hidden();
      htmlElementManager.setZIndex(-5);
      htmlElementManager.setBackgroundColour(backgroundColour_Transparent);

      let index = 0;
      while (index < listOfTabIndexElements.length) {
        /* Disable all currently active tabbable elements within the full page mask content element */
        htmlElementManager.setDOMElement(listOfTabIndexElements[index]);
        htmlElementManager.setTabIndex(-1);
        index += 1;
      }
    }, transitionTime_Opactity);
  };

  /* Set the styling for the masks container fixed (outer) element */
  const maskContainerFixedCss = 'full-page-mask-container-fixed';

  /* Set the styling for the masks container flex (inner) element */
  const maskContainerFlexCss = 'full-page-mask-container-flex';

  /* Set the styling for the masks content element */
  const maskContentCss = 'full-page-mask-content';

  return (
    <div className={maskContainerFixedCss} id={getIdFullPageMaskContainerFixedDOMElement()}>
      <div className={maskContainerFlexCss}>
        <div className={maskContentCss} id={getIdFullPageMaskContentDOMElement()}>
          {props.children}
        </div>
      </div>
    </div>
  );
}
FullPageMask.propTypes = {
  /** The content to be rendered centrally horizontally and vertically within the full page mask. */
  children: PropTypes.any,
  /** The unique identifier for this component. */
  id: PropTypes.string.isRequired,
  /** Switch to set whether the loading spinner component is displayed or not. By default the component is not displayed. */
  isDisplayed: PropTypes.bool,
};
export default FullPageMask;
