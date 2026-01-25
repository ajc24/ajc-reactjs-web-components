/**
 * Developed by Anthony Cox in 2025
 * 
 * Revisions (January 2026):
 * - Updated to latest React code standards.
 * - Major logic rewrites and improved event handling.
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DropdownMenuBarContainer from './DropdownMenuBarContainer.jsx';
import { getColourCombination } from '../data/colour-combinations.js';
import { getWindowPageYOffset_Integer } from '../data/dom-measurements.js';
import {
  HTMLElementManager,
  EventManager,
  KeyboardEventManager,
} from '../modules';
import '../css/common.css';
import './css/menu-bar-common.css';
import './css/menu-bar-dropdown-item.css';
import './css/menu-bar-item.css';

/* CSS styling parameters */
const maximumMenuBarItemButtonHeight = 55;

/* Arrow icon inner HTML settings */
const downArrowInnerHTML = '&nbsp;<br />&darr;';
const upArrowInnerHTML = '&nbsp;<br />&uarr;';

/* Create the component and event managers for this component */
const htmlElementManager = new HTMLElementManager();
htmlElementManager.setMaxContainerHeight(maximumMenuBarItemButtonHeight);

const eventManager = new EventManager();
const keyboardEventManager = new KeyboardEventManager();

/**
 * Dropdown Menu Bar Item component which is intended for use with the Menu Bar component. This component will render
 * a clickable menu bar item to the user. Clicking this item will open a dropdown menu container element which contains
 * all of the hyperlinks associated with the dropdown menu bar item. Everything has been designed to fit within the
 * boundaries of the most commonly used mobile screen sizes (360x800) to the most commonly used desktop sizes (1920x1080).
 * 
 * By design only a single dropdown menu bar item can be selected at any one time, also only one dropdown menu bar container
 * element can be rendered at any one time.
 * 
 * All dropdown menu bar items and dropdown menu bar container hyperlinks are fully interactive via both mouse and keyboard.
 * 
 * If enableBrowserRouterSupport is enabled, this component will then become dependent on the BrowserRouter component
 * in "react-router". If you intend on using this component in this way then please make sure to render it inside
 * a BrowserRouter component in your React web application.
 */
const DropdownMenuBarItem = props => {
  const [ enableAutoFocus, setEnableAutoFocus ] = useState(false);
  const [ isContainerHidden, setIsContainerHidden ] = useState(true);
  const [ isItemSelected, setIsItemSelected ] = useState(false);
  const [ itemArrowInnerHTML, setItemArrowInnerHTML ] = useState(downArrowInnerHTML);
  const [ itemDeselectedViaKeyboardEvent, setItemDeselectedViaKeyboardEvent ] = useState(false);
  const [ left, setLeft ] = useState(0);
  const [ top, setTop ] = useState(0);

  useEffect(() => {
    if (props.isHidden === false) {
      /* Mark the component as visible */
      setMenuBarItemAsVisible();
      handleMenuBarItemTextContentHeight();
    } else {
      /* Default visibility state - mark the component as hidden */
      setMenuBarItemAsHidden();
    }
    if (itemDeselectedViaKeyboardEvent === true) {
      /* If a keyboard event has been used to deselect the menu bar item and hide the container, return focus back to the menu bar item again */
      focusOnButtonDOMElement();
      setItemDeselectedViaKeyboardEvent(false);
    }
  }, [ itemDeselectedViaKeyboardEvent, props.isHidden ]);

  /**
   * Applies focus to the dropdown menu bar items button element
   */
  const focusOnButtonDOMElement = () => {
    htmlElementManager.setDOMElement(getButtonDOMElement());
    htmlElementManager.focus();
  };

  /**
   * Retrieves the dropdown menu bar items arrow element from the DOM
   * @returns {HTMLElement}
   */
  const getArrowDOMElement = () => {
    return document.querySelector(`button[id="${getIdButtonDOMElement()}"] > span[class="dropdown-menu-bar-button-arrow"]`);
  };

  /**
   * Retrieves the dropdown menu bar items button element from the DOM
   * @returns {HTMLElement}
   */
  const getButtonDOMElement = () => {
    return document.querySelector(`button[id="${getIdButtonDOMElement()}"]`);
  };

  /**
   * Retrieves the dropdown menu bar items title element from the DOM
   * @returns {HTMLElement}
   */
  const getTitleDOMElement = () => {
    return document.querySelector(`button[id="${getIdButtonDOMElement()}"] > span[class="dropdown-menu-bar-button-title"]`);
  };

  /**
   * Retrieves the ID for the dropdown menu bar items button DOM element
   * @returns {string}
   */
  const getIdButtonDOMElement = () => {
    return `${props.dropdownMenuBarItemData.id}--${props.backgroundColour || 'white'}--button--dropdown-menu-bar-item`;
  };

  /**
   * Handles onClick events on container components, which in every case (close icon clicks + hyperlink clicks)
   * will mark the menu bar item as deselected and hide the container
   */
  const handleOnClick_Container = () => {
    setMenuBarItemAsDeselected();
  };

  /**
   * Since the span elements for the dropdown menu bar items button sit on top of the button, click events are
   * sometimes registered on the span elements and not the button, which can cause problems with the external elements
   * click handlers. Therefore explicitly redirect span element clicks to be button element clicks instead.
   * @param {Event} event 
   */
  const handleOnClick_Span = event => {
    eventManager.setEvent(event);
    eventManager.preventDefault();

    /* Redirect the click event to the menu item button component */
    htmlElementManager.setDOMElement(getButtonDOMElement());
    htmlElementManager.click();
  };

  /**
   * When the element is visible click events will mark the dropdown menu bar container element
   * as visible / hidden depending on the components selection status.
   * @param {event} event
   * @param {boolean} newEnableAutoFocus
   */
  const handleOnClick_MenuBarItem = (event, newEnableAutoFocus = false) => {
    eventManager.setEvent(event);
    eventManager.preventDefault();
    if (props.isHidden === false) {
      /* Only handle click events on the menu bar item if the item is visible */
      if (isItemSelected === true) {
        /* Mark the item as deselected again */
        setMenuBarItemAsDeselected();
      } else {
        /* Mark the menu bar item as selected */
        htmlElementManager.setDOMElement(getButtonDOMElement());
        const buttonElementDimensions = htmlElementManager.getBoundingClientRect();

        /**
         * Retrieve the bottom and left positions of the button - these will act as the top and the left positions
         * of the dropdown menu bar container component. Add an extra pixel to the bottom position to ensure that
         * there is a nice decorative space between the menu bar item and the menu bar container
         */
        const bottom = buttonElementDimensions.bottom + getWindowPageYOffset_Integer() + 1;
        const left = buttonElementDimensions.left;
        
        /* Set state to reflect that the menu bar item is now selected */
        setIsItemSelected(true);
        setItemArrowInnerHTML(upArrowInnerHTML);

        /* Set the state to be passed down to the dropdown menu container component */
        setLeft(left);
        setTop(bottom);
        setEnableAutoFocus(newEnableAutoFocus);
        setIsContainerHidden(false);
      }
    }
  };

  /**
   * Handles onKeyDown events on the container components close icon which will
   * mark the menu bar item as deselected and hide the container
   */
  const handleOnKeyDown_Container_CloseIcon = () => {
    /* Ensure auto-focus is applied to the menu bar item component after closing the container using any supported event on the close icon */
    setMenuBarItemAsDeselected(true);
  };

  /**
   * Handles onKeyDown events on the container components hyperlinks which will
   * mark the menu bar item as deselected and hide the container
   */
  const handleOnKeyDown_Container_Hyperlink = () => {
    /* Ensure auto-focus is applied to the menu bar item component after using the "Escape" key on a hyperlink to close the container */
    setMenuBarItemAsDeselected(true);
  };

  /**
   * Handles key press events on the button - both space and enter key presses should activate the button and also ensure
   * that auto-focus is enabled on the container element.
   * @param {Event} event 
   */
  const handleOnKeyDown_MenuBarItem = event => {
    keyboardEventManager.setEvent(event);
    if (keyboardEventManager.isEnterKeyEvent() || keyboardEventManager.isSpaceKeyEvent()) {
      /* If the enter key or the space key have been pressed, ensure a click event occurs with auto focus enabled */
      handleOnClick_MenuBarItem(event, true);
      handleOnMouseLeave_MenuBarItem();
    }
  };

  /**
   * Resets the CSS styling hover changes for the title and arrow elements when the user
   * moves the mouse pointer away from the element again
   */
  const handleOnMouseLeave_MenuBarItem = () => {
    /* Reset the padding for the title element */
    htmlElementManager.setDOMElement(getTitleDOMElement());
    htmlElementManager.setPaddingLeft(5);

    /* Reset the width of the arrow element and remove the arrow icon */
    htmlElementManager.setDOMElement(getArrowDOMElement());
    htmlElementManager.setMinWidth(5);
    htmlElementManager.setWidth(5);
    htmlElementManager.setVisibility_Hidden();
  };

  /**
   * When the user hovers over the title and arrow elements, change the styling to
   * display the arrow icon by altering the CSS styling of both elements.
   */
  const handleOnMouseOver_MenuBarItem = () => {
    /* Remove the padding from the title element */
    htmlElementManager.setDOMElement(getTitleDOMElement());
    htmlElementManager.setPaddingLeft(0);

    /* Increase the width of the arrow element and render the arrow icon */
    htmlElementManager.setDOMElement(getArrowDOMElement());
    htmlElementManager.setMinWidth(10);
    htmlElementManager.setWidth(10);
    htmlElementManager.setVisibility_Visible();
  };

  /**
   * Handles the height of the dropdown menu items title text content. The height of the text content
   * should not exceed the height of the button container element.
   */
  const handleMenuBarItemTextContentHeight = () => {
    htmlElementManager.setDOMElement(getTitleDOMElement());
    htmlElementManager.truncateElementTextContentByContainerHeight();
  };

  /**
   * Disables auto focus and ensures the dropdown menu item is no longer marked as selected
   * and the container element is no longer visible as a result
   * @param {boolean} newItemDeselectedViaKeyboardEvent
   */
  const setMenuBarItemAsDeselected = (newItemDeselectedViaKeyboardEvent = false) => {
    setEnableAutoFocus(false);
    setIsContainerHidden(true);
    setIsItemSelected(false);
    setItemArrowInnerHTML(downArrowInnerHTML);
    setItemDeselectedViaKeyboardEvent(newItemDeselectedViaKeyboardEvent);
  };

  /**
   * Sets the dropdown menu bar items button as hidden in the UI 
   */
  const setMenuBarItemAsHidden = () => {
    /* Ensure state is updated to reflect that the dropdown menu bar items button is now hidden */
    setIsContainerHidden(true);
    setIsItemSelected(false);
    
    /* Set the button elements opacity so that it is now hidden */
    htmlElementManager.setDOMElement(getButtonDOMElement());
    htmlElementManager.setOpacity_Hidden();
  };

  /**
   * Sets the dropdown menu bar items button as visible in the UI
   */
  const setMenuBarItemAsVisible = () => {
    /* Set the button elements opacity so that it is now visible */
    htmlElementManager.setDOMElement(getButtonDOMElement());
    htmlElementManager.setOpacity_Visible();
  };

  /* Determine the background colour and font colour for the component - setting white background colour with black font text colour as the default */
  const { backgroundColour, fontColour } = getColourCombination(props.backgroundColour);

  /* Set the styling for the dropdown menu bar items button element */
  let buttonCss = `dropdown-menu-bar-button menu-bar-common-transitions background-${backgroundColour} font-default font-${fontColour}`;
    if (props.addRightSideSpacing === true) {
      buttonCss += ' menu-bar-item-container-right-side-spacing';
    }
  /* Set the styling for the button and arrow elements */
  const buttonTitleCss = 'dropdown-menu-bar-button-title';
  const buttonArrowCss = 'dropdown-menu-bar-button-arrow';

  /* Determine whether the menu item button element is visible or not */
  const isButtonHidden = props.isHidden !== undefined ? props.isHidden : true;

  return (
    <React.Fragment>
      <button aria-label={`${props.dropdownMenuBarItemData.title} dropdown menu item.`} className={buttonCss}
        data-isselected={`${isItemSelected}`} id={getIdButtonDOMElement()} onBlur={handleOnMouseLeave_MenuBarItem} onClick={handleOnClick_MenuBarItem}
        onFocus={handleOnMouseOver_MenuBarItem} onKeyDown={handleOnKeyDown_MenuBarItem} onMouseLeave={handleOnMouseLeave_MenuBarItem} onMouseOver={handleOnMouseOver_MenuBarItem}
        tabIndex={isButtonHidden === true ? '-1' : '0'} title={`${props.dropdownMenuBarItemData.title}`}>
          <span onClick={handleOnClick_Span} className={buttonTitleCss}>
            {props.dropdownMenuBarItemData.title}
          </span>
          <span onClick={handleOnClick_Span} className={buttonArrowCss} dangerouslySetInnerHTML={{ __html: `${itemArrowInnerHTML}` }} />
      </button>
      <DropdownMenuBarContainer backgroundColour={props.backgroundColour} dropdownMenuBarItemsList={props.dropdownMenuBarItemData.dropdownMenuBarItemsList}
        enableAutoFocus={enableAutoFocus} enableBrowserRouterSupport={props.enableBrowserRouterSupport || false} id={props.id} isHidden={isContainerHidden} left={left}
        onClickCloseIcon={handleOnClick_Container} onClickExternalElements={handleOnClick_Container} onClickHyperlink={handleOnClick_Container}
        onKeyDownCloseIcon={handleOnKeyDown_Container_CloseIcon} onKeyDownHyperlink={handleOnKeyDown_Container_Hyperlink} parentDropdownMenuBarItemId={getIdButtonDOMElement()}
        top={top} />
    </React.Fragment>
  );
};
DropdownMenuBarItem.propTypes = {
  /** Optional right side spacing (margin) of 8px to be used when separating multiple dropdown menu bar item components. By default this spacing is disabled. */
  addRightSideSpacing: PropTypes.bool,
  /** The background colour for the dropdown menu bar item. The default colour for the background is white. */
  backgroundColour: PropTypes.oneOf([ 'gold', 'green', 'grey', 'navy-and-gold', 'navy-and-white', 'red', 'white' ]),
  /** The dropdown menu bar item data used to render the menu bar item and the links in the dropdown menu bar container element. */
  dropdownMenuBarItemData: PropTypes.shape({
    dropdownMenuBarItemsList: PropTypes.arrayOf(
      PropTypes.shape({
        href: PropTypes.string,
        id: PropTypes.string,
        title: PropTypes.string,
      })
    ),
    id: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  /** Sets whether this component is intended for use with a BrowserRouter component. If enabled, a Link component will be used instead of a HTML hyperlink. */
  enableBrowserRouterSupport: PropTypes.bool,
  /** The unique identifier for this component. */
  id: PropTypes.string.isRequired,
  /** Sets whether the dropdown menu bar item is visible or hidden. Is set to hidden by default until specified otherwise. */
  isHidden: PropTypes.bool,
};
export default DropdownMenuBarItem;
