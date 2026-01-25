/**
 * Developed by Anthony Cox in 2025
 * 
 * Revisions (January 2026):
 * - Updated to latest React code standards.
 * - Minor logic improvements so that the isHidden property now handles all visibility states
 */
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getColourCombination } from '../data/colour-combinations';
import {
  HTMLElementManager,
  EventManager,
  KeyboardEventManager,
} from '../modules';
import '../css/common.css';
import './css/menu-bar-common.css';
import './css/menu-bar-scroll-items.css';

/* Create the event managers for this component */
const htmlElementManager = new HTMLElementManager();
const eventManager = new EventManager();
const keyboardEventManager = new KeyboardEventManager();

/**
 * Scroll Menu Bar Items Left button component intended for use with the Menu Bar component. This component allows a user to click to view the previous set
 * of menu bar items in the menu bar. This button is necessary in circumstances where there are too many menu bar items to comfortably fit within the width
 * of the screen. Keyboard events are also supported with both the spacebar and enter key interactions acting as click events on the button.
 */
const ScrollMenuBarItemsLeft = props => {
  
  useEffect(() => {
    if (props.isHidden === false) {
      /* Mark the component as visible */
      setContainerDOMElementAsVisible();
    } else {
      /* Default mark the component as hidden */
      setContainerDOMElementAsHidden();
    }
  }, [ props.isHidden ]);

  /**
   * Retrieves the scroll menu bar items left container element from the DOM
   * @returns {HTMLElement}
   */
  const getContainerDOMElement = () => {
    return document.querySelector(`div[id="${props.id}--container--scroll-menu-bar-items-left"]`);
  };

  /**
   * Ensures onclick events are disabled when the element is marked as hidden, otherwise
   * the provided onClick function property is executed
   * @param {event} event
   */
  const handleOnClick = event => {
    if (props.isHidden === false) {
      /* Execute the provided onClick functionality only if the component is marked as visible */
      props.onClick();
    } else {
      /* Default action is to prevent the click event from occurring */
      eventManager.setEvent(event);
      eventManager.preventDefault();
    }
  };

  /**
   * Handle key down events on the button
   * @param {Event} event 
   */
  const handleOnKeyDown = event => {
    keyboardEventManager.setEvent(event);
    if (keyboardEventManager.isSpaceKeyEvent()) {
      /* Ensure that a spacebar key press also correctly fires a click event on the button */
      htmlElementManager.setDOMElement(keyboardEventManager.getEventTarget());
      htmlElementManager.click();
    }
  };

  /**
   * Sets the scroll menu bar items left button as hidden in the UI 
   */
  const setContainerDOMElementAsHidden = () => {
    htmlElementManager.setDOMElement(getContainerDOMElement());
    htmlElementManager.setOpacity_Hidden();
  };

  /**
   * Sets the scroll menu bar items left button as visible in the UI
   */
  const setContainerDOMElementAsVisible = () => {
    htmlElementManager.setDOMElement(getContainerDOMElement());
    htmlElementManager.setOpacity_Visible();
  };

  /* Determine the background colour and font colour for the component - setting white background colour with black font text colour as the default */
  const { backgroundColour, fontColour } = getColourCombination(props.backgroundColour);

  /* Set the styling for the scroll menu bar items left container element */
  const containerCss = 'scroll-menu-bar-items-container background-transparent menu-bar-common-transitions scroll-menu-bar-items-container-right-side-spacing';

  /* Set the styling for the button element */
  const buttonCss = `scroll-menu-items-button background-${backgroundColour} font-default font-${fontColour}`;

  return (
    <div className={containerCss} id={`${props.id}--container--scroll-menu-bar-items-left`}>
      <button aria-hidden={`${props.isHidden}`} aria-label="Scroll the list of menu bar items to the left." className={buttonCss}
        id={`${props.id}--scroll-menu-bar-items-left`} onClick={handleOnClick} onKeyDown={handleOnKeyDown}
        tabIndex={props.isHidden === true ? '-1' : '0'} type="button" dangerouslySetInnerHTML={{ __html: 'Prev<br />&larr;' }} />
    </div>
  );
}
ScrollMenuBarItemsLeft.propTypes = {
  /** The background colour for the scroll menu bar items left button. The default colour for the background is white. */
  backgroundColour: PropTypes.oneOf([ 'gold', 'green', 'grey', 'navy-and-gold', 'navy-and-white', 'red', 'white' ]),
  /** The unique identifier for this component. */
  id: PropTypes.string.isRequired,
  /** Sets whether the scroll menu bar items left button is visible or hidden. Is set to hidden by default until specified otherwise. */
  isHidden: PropTypes.bool,
  /** The custom functionality to be executed on clicking the button. */
  onClick: PropTypes.func.isRequired,
};
export default ScrollMenuBarItemsLeft;
