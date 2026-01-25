/**
 * Developed by Anthony Cox in 2025
 * 
 * Revisions (January 2026):
 * - Updated to latest React code standards.
 * - Improved logic and event handling.
 */
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { getColourCombination } from '../data/colour-combinations';
import {
  HTMLElementManager,
  EventManager,
  KeyboardEventManager,
} from '../modules';
import '../css/common.css';
import './css/menu-bar-common.css';
import './css/menu-bar-item.css';

const maximumMenuItemLinkHeight = 45;

/* Set up the event and component managers for this component */
const htmlElementManager = new HTMLElementManager();
htmlElementManager.setMaxContainerHeight(maximumMenuItemLinkHeight);

const eventManager = new EventManager();
const keyboardEventManager = new KeyboardEventManager();

/**
 * Menu Bar Item hyperlink component intended for use with the Menu Bar component. This component allows a user to click the menu item or
 * interact with the item via the keyboard (spacebar and enter key presses supported) and from there, will be redirected to another page
 * in the web application.
 * 
 * If enableBrowserRouterSupport is enabled, this component will then become dependent on the BrowserRouter component
 * in "react-router". If you intend on using this component in this way then please make sure to render it inside
 * a BrowserRouter component in your React web application.
 */
const MenuBarItem = props => {
  const [ isMenuBarItemHidden, setIsMenuBarItemHidden ] = useState(true);

  useEffect(() => {
    if (props.isHidden === false) {
      /* Mark the component as visible */
      setIsMenuBarItemHidden(false);
      setMenuBarItemAsVisible();
      handleTextContentHeight();
    } else {
      /* Mark the component as hidden (default visibility state) */
      setIsMenuBarItemHidden(true);
      setMenuBarItemAsHidden();
    }
  }, [ props.isHidden ]);

  /**
   * Retrieves the menu bar items container element from the DOM
   * @returns {HTMLElement}
   */
  const getContainerDOMElement = () => {
    return document.querySelector(`div[id="${props.id}--menu-bar-item"]`);
  };

  /**
   * Retrieves the menu bar items hyperlink element from the DOM
   * @returns {HTMLElement}
   */
  const getHyperlinkDOMElement = () => {
    return document.querySelector(`a[id="${getIdHyperlinkDOMElement()}"]`);
  };

  /**
   * Retrieves the ID linked to the menu bar items hyperlink element
   * @returns {string}
   */
  const getIdHyperlinkDOMElement = () => {
    return `${props.id}--menu-bar-item-hyperlink`;
  };

  /**
   * Retrieves the links span element from the DOM
   * @returns {HTMLElement}
   */
  const getSpanDOMElement = () => {
    return document.querySelector(`div[id="${props.id}--menu-bar-item"] > a > span`);
  };

  /**
   * Ensures onclick events are disabled when the element is marked as hidden
   * @param {event} event
   */
  const handleOnClick = event => {
    if (isMenuBarItemHidden === true) {
      eventManager.setEvent(event);
      eventManager.preventDefault();
    }
  };

  /**
   * Handles click events on the hyperlinks span element
   * @param {Event} event 
   */
  const handleOnClickSpan = event => {
    /* Disable the default event */
    eventManager.setEvent(event);
    eventManager.preventDefault();

    /* Execute the click action on the hyperlink element */
    htmlElementManager.setDOMElement(getHyperlinkDOMElement());
    htmlElementManager.click();
  };

  /**
   * Handle key down events on the hyperlink
   * @param {Event} event 
   */
  const handleOnKeyDown = event => {
    keyboardEventManager.setEvent(event);
    if (keyboardEventManager.isSpaceKeyEvent() === true) {
      /* Ensure that a spacebar key press also correctly redirects the user to the specified URL */
      htmlElementManager.setDOMElement(keyboardEventManager.getEventTarget());
      htmlElementManager.click();
    }
  };

  /**
   * Handles the height of the menu item link text content. The height of the text content
   * should not exceed the height of the item container itself.
   */
  const handleTextContentHeight = () => {
    htmlElementManager.setDOMElement(getSpanDOMElement());
    htmlElementManager.truncateElementTextContentByContainerHeight();
  };

  /**
   * Sets the menu bar item as hidden in the UI 
   */
  const setMenuBarItemAsHidden = () => {
    htmlElementManager.setDOMElement(getContainerDOMElement());
    htmlElementManager.setOpacity_Hidden();
  };

  /**
   * Sets the menu bar item as visible in the UI 
   */
  const setMenuBarItemAsVisible = () => {
    htmlElementManager.setDOMElement(getContainerDOMElement());
    htmlElementManager.setOpacity_Visible();
  };

  /* Determine the background colour and font colour for the component - setting white background colour with black font text colour as the default */
  const { backgroundColour, fontColour } = getColourCombination(props.backgroundColour);

  /* Set the styling for the menu bar item container element */
  let containerCss = 'menu-bar-item-container background-transparent menu-bar-common-transitions';
  if (props.addRightSideSpacing === true) {
    containerCss += ' menu-bar-item-container-right-side-spacing';
  }
  /* Set the styling for the internal hyperlink element */
  const hyperlinkCss = `menu-bar-item-hyperlink background-${backgroundColour} font-default font-${fontColour}`;

  /* Set the styling for the hyperlinks internal text content */
  const hyperlinkInnerContentCss = 'menu-bar-item-inner-content';

  return (
    <div className={containerCss} id={`${props.id}--menu-bar-item`}>
      { 
        props.enableBrowserRouterSupport === true &&
          /* Render the BrowserRouter version of the hyperlink */
          <Link to={`${props.href}`} aria-hidden={`${isMenuBarItemHidden}`} aria-label={props.children} className={hyperlinkCss}
            id={`${getIdHyperlinkDOMElement()}`} onClick={handleOnClick} onKeyDown={handleOnKeyDown} role="link"
            tabIndex={isMenuBarItemHidden === true ? '-1' : '0'} title={props.children}>
              <span className={hyperlinkInnerContentCss} onClick={handleOnClickSpan}>
                {props.children}
              </span>
          </Link>
      }
      {
        (props.enableBrowserRouterSupport === undefined || props.enableBrowserRouterSupport === false) &&
          /* By default - render a standard HTML hyperlink */
          <a aria-hidden={`${isMenuBarItemHidden}`} aria-label={props.children} className={hyperlinkCss} id={`${getIdHyperlinkDOMElement()}`}
            onClick={handleOnClick} onKeyDown={handleOnKeyDown} role="link" tabIndex={isMenuBarItemHidden === true ? '-1' : '0'} title={props.children}
            href={props.href}>
              <span className={hyperlinkInnerContentCss} onClick={handleOnClickSpan}>
                {props.children}
              </span>
          </a>
      }
    </div>
  );
}
MenuBarItem.propTypes = {
  /** Optional right side spacing (margin) of 8px to be used when separating multiple menu bar item components. By default this spacing is disabled. */
  addRightSideSpacing: PropTypes.bool,
  /** The background colour for the menu bar item. The default colour for the background is white. */
  backgroundColour: PropTypes.oneOf([ 'gold', 'green', 'grey', 'navy-and-gold', 'navy-and-white', 'red', 'white' ]),
  /** The menu bar items text content. */
  children: PropTypes.string,
  /** Sets whether this component is intended for use with a BrowserRouter component. If enabled, a Link component will be used instead of a HTML hyperlink. */
  enableBrowserRouterSupport: PropTypes.bool,
  /** The URL to which the user will be redirected to after clicking on the menu bar item. */
  href: PropTypes.string.isRequired,
  /** The unique identifier for this component. */
  id: PropTypes.string.isRequired,
  /** Sets whether the menu bar item is visible or hidden. Is set to hidden by default until specified otherwise. */
  isHidden: PropTypes.bool,
};
export default MenuBarItem;
