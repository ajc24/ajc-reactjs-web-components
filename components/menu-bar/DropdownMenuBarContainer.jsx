/**
 * Developed by Anthony Cox in 2025
 * 
 * Revisions (January 2026):
 * - Fixed the max hyperlink text height to support 1.4 line height.
 * - Major logic rewrites to simplify component behaviour. Now the isHidden property solely manages all component visibility states.
 * - Added custom onClick and onKeyDown properties to allow other UI elements to manage isHidden for both internal and external DOM events.
 */
import { useEffect } from 'react';
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
import './css/menu-bar-dropdown-container.css';

const containerMaximumWidth = 328;
const dropdownHyperlinkContainerCss = 'dropdown-menu-bar-container-row-hyperlink-container';
const dropdownMenuBarItemButtonId = '--button--dropdown-menu-bar-item';
const maximumHyperlinkTitleHeight = 23;
const menuBarItemHyperlinkId = '--menu-bar-item-hyperlink';
const rightmostScreenPadding = 16;

/* Set up the component and event managers for this component */
const htmlElementManager = new HTMLElementManager();
htmlElementManager.setMaxContainerHeight(maximumHyperlinkTitleHeight);

const eventManager = new EventManager();
const keyboardEventManager = new KeyboardEventManager();

/**
 * Dropdown Menu Bar Container component which is used to render the hyperlinks associated with a dropdown menu item.
 * This component is intended for use with the Menu Bar component. It has been designed to fit within the boundaries
 * of the most commonly used mobile screen sizes (360x800).
 * 
 * In the case that a hyperlinks text content exceeds the width of the container, the text content will be truncated
 * by one character at a time until the text content successfully fits.
 * 
 * By enabling auto-focus this component is also fully supported by keyboard controls without the user having to first
 * press the Tab key to apply focus. Once the container gains focus, it cannot lose focus again until the user closes
 * the container using the close icon or clicks to select a hyperlink. Hyperlinks can also be selected using the
 * enter key and / or space key.
 * 
 * If enableBrowserRouterSupport is enabled, this component will then become dependent on the BrowserRouter component
 * in "react-router". If you intend on using this component in this way then please make sure to render it inside
 * a BrowserRouter component in your React web application.
 */
const DropdownMenuBarContainer = props => {

  useEffect(() => {
    if (props.isHidden === false) {
      /* Mark the component as visible */
      setContainerAsVisible();
      handleHyperlinkTitleWidths();
      document.addEventListener('click', handleOnClickExternalElements);
    } else {
      /* Default set the component as hidden */
      setContainerAsHidden();
      document.removeEventListener('click', handleOnClickExternalElements);
    }
    /* Manage the current positioning for this component */
    const currentTop = props.top || 0;
    const currentLeft = props.left || 0;
    setPosition(currentTop, currentLeft);

  }, [ props.isHidden, props.left, props.top ]);

  /**
   * Retrieves all of the hyperlink elements from the DOM
   * @returns {Array.<HTMLElement>}
   */
  const getAllHyperlinkDOMElements = () => {
    return document.querySelectorAll(`div[id="${getIdContainerDOMElement()}"] > div[class="${dropdownHyperlinkContainerCss}"] > a`);
  };

  /**
   * Retrieves the close button for the dropdown menu bar container element from the DOM
   * @returns {HTMLElement}
   */
  const getCloseButtonDOMElement = () => {
    return document.querySelector(`button[id="${getIdCloseButtonDOMElement()}"]`);
  };

  /**
   * Retrieves the dropdown menu bar container element from the DOM
   * @returns {HTMLElement}
   */
  const getContainerDOMElement = () => {
    return document.querySelector(`div[id="${getIdContainerDOMElement()}"]`);
  };

  /**
   * Retrieves the first available hyperlink element from the DOM
   * @returns {HTMLElement | null}
   */
  const getFirstHyperlinkDOMElement = () => {
    htmlElementManager.setDOMElements(getAllHyperlinkDOMElements());
    return htmlElementManager.getDOMElements_FirstIndex();
  };

  /**
   * Retrieves the ID for the close button DOM element
   * @returns {string}
   */
  const getIdCloseButtonDOMElement = () => {
    return `${props.id}--${props.backgroundColour || 'white'}--close--dropdown-menu-bar-container`;
  };

  /**
   * Retrieves the ID for the container DOM element
   * @returns {string}
   */
  const getIdContainerDOMElement = () => {
    return `${props.id}--${props.backgroundColour || 'white'}--dropdown-menu-bar-container`;
  };

  /**
   * Retrieves the ID of the last available hyperlink in the container
   * @returns {string}
   */
  const getIdLastHyperlinkDOMElement = () => {
    htmlElementManager.setDOMElement(getLastHyperlinkDOMElement());
    return htmlElementManager.getId();
  };

  /**
   * Retrieves the last available hyperlink element from the DOM
   * @returns {HTMLElement | null}
   */
  const getLastHyperlinkDOMElement = () => {
    htmlElementManager.setDOMElements(getAllHyperlinkDOMElements());
    return htmlElementManager.getDOMElements_LastIndex();
  };

  /**
   * Truncates hyperlink title text if required so that it fits within the allocated container size
   */
  const handleHyperlinkTitleWidths = () => {
    const allHyperlinkTitleElements = document.querySelectorAll('span[id$="--title--dropdown-menu-bar-container-item"]');
    for (let index = 0; index < allHyperlinkTitleElements.length; index += 1) {
      /* Truncate the text for each individual hyperlink element if required */
      htmlElementManager.setDOMElement(allHyperlinkTitleElements[index]);
      htmlElementManager.truncateElementTextContentByContainerHeight();
    }
  };

  /**
   * Handles click events on the dropdown menu bar containers close icon
   * @param {Event} event 
   */
  const handleOnClickCloseIcon = event => {
    /* Prevent the default click action from occurring */
    eventManager.setEvent(event);
    eventManager.preventDefault();

    if (props.onClickCloseIcon !== undefined) {
      /* Execute any custom functionality set to this component */
      props.onClickCloseIcon();
    }
  };

  /**
   * Handles click events on external DOM elements, passing control over to the custom functionality specified if
   * a matching external event is triggered:
   * - If the user has clicked on another dropdown menu bar item that is not the parent of this container component.
   * - If the user has clicked on any other standard single menu bar item hyperlink.
   * @param {Event} event 
   */
  const handleOnClickExternalElements = event => {
    eventManager.setEvent(event);
    const eventTargetId = eventManager.getEventTargetId();
    if (
      (eventTargetId.includes(dropdownMenuBarItemButtonId) === true && eventTargetId !== props.parentDropdownMenuBarItemId) ||
      (eventTargetId.includes(menuBarItemHyperlinkId) === true)
    ) {
      /* Execute the custom functionality for handling external element events if it has been specified */
      if (props.onClickExternalElements !== undefined) {
        props.onClickExternalElements();
      }
    }
  };

  /**
   * Ensures that the container is hidden if the user selects one of the hyperlinks
   */
  const handleOnClickHyperlink = () => {
   if (props.onClickHyperlink !== undefined) {
      /* Execute any custom functionality set to this component */
      props.onClickHyperlink();
    }
  };

  /**
   * Handle key down events on the close button
   * @param {Event} event 
   */
  const handleOnKeyDownCloseIcon = event => {
    keyboardEventManager.setEvent(event);
    if (keyboardEventManager.isShiftKeyPressed() && keyboardEventManager.isTabKeyEvent()) {
      /* If shift + tab have been pressed on the close button element, cycle focus back to the last hyperlink element */
      const eventTargetId = keyboardEventManager.getEventTargetId();
      if (eventTargetId === getIdCloseButtonDOMElement()) {
        keyboardEventManager.preventDefault();
        htmlElementManager.setDOMElement(getLastHyperlinkDOMElement());
        htmlElementManager.focus();
      }
    } else if (keyboardEventManager.isEscapeKeyEvent()) {
      if (props.onKeyDownCloseIcon !== undefined) {
        /* Execute any custom functionality set to this component */
        props.onKeyDownCloseIcon();
      }
    } else if (keyboardEventManager.isEnterKeyEvent() || keyboardEventManager.isSpaceKeyEvent()) {
      /* Hide the container element if either the enter or space keys are pressed */
      keyboardEventManager.preventDefault();

      if (props.onKeyDownCloseIcon !== undefined) {
        /* Execute any custom functionality set to this component */
        props.onKeyDownCloseIcon();
      }
    }
  };

  /**
   * Handle key down events on the hyperlink
   * @param {Event} event 
   */
  const handleOnKeyDownHyperlink = event => {
    keyboardEventManager.setEvent(event);
    if (keyboardEventManager.isSpaceKeyEvent()) {
      /* Ensure that a spacebar key press also correctly redirects the user to the specified URL */
      htmlElementManager.setDOMElement(keyboardEventManager.getEventTarget());
      htmlElementManager.click();
    } else if (keyboardEventManager.isShiftKeyPressed() === false && keyboardEventManager.isTabKeyEvent()) {
      /* If the tab key has been pressed on the last hyperlink element, cycle focus back to the close button element */
      const eventTargetId = keyboardEventManager.getEventTargetId();
      if (eventTargetId === getIdLastHyperlinkDOMElement()) {
        keyboardEventManager.preventDefault();
        htmlElementManager.setDOMElement(getCloseButtonDOMElement());
        htmlElementManager.focus();
      }
    } else if (keyboardEventManager.isEscapeKeyEvent()) {
      if (props.onKeyDownHyperlink !== undefined) {
        /* Execute any custom functionality set to this component */
        props.onKeyDownHyperlink();
      }
    }
  };

  /**
   * Marks the container element as hidden in the DOM
   */
  const setContainerAsHidden = () => {
    htmlElementManager.setDOMElement(getContainerDOMElement());
    htmlElementManager.setVisibility_Hidden();
  };

  /**
   * Marks the container element as visible in the DOM and applies
   * auto-focus to the first hyperlink in the container if required
   * (ie. if a keyboard event has triggered this functionality)
   */
  const setContainerAsVisible = () => {
    htmlElementManager.setDOMElement(getContainerDOMElement());
    htmlElementManager.setVisibility_Visible();

    if (props.enableAutoFocus === true) {
      /* Auto focus on the first available hyperlink in the container element if required */
      htmlElementManager.setDOMElement(getFirstHyperlinkDOMElement());
      htmlElementManager.focus();
    }
  };

  /**
   * Sets the position for the container to be rendered at
   * @param {string} newTop 
   * @param {string} newLeft 
   */
  const setPosition = (newTop = 0, newLeft = 0) => {
    const rightmostScreenPos = globalThis.window.innerWidth;
    const rightmostContainerPos = newLeft + containerMaximumWidth + rightmostScreenPadding;
    
    let finalLeft = newLeft;
    if (rightmostContainerPos > rightmostScreenPos) {
      const exceedsRightmostScreenPosBy = rightmostContainerPos - rightmostScreenPos;
      finalLeft -= exceedsRightmostScreenPosBy;
    }
    /* Set the new position of the component */
    htmlElementManager.setDOMElement(getContainerDOMElement());
    htmlElementManager.setLeft(finalLeft);
    htmlElementManager.setTop(newTop);
  };

  /* Determine the background colour and font colour for the component - setting white background colour with black font text colour as the default */
  const { backgroundColour, fontColour } = getColourCombination(props.backgroundColour);

  /* Set the styling for the container element */
  const containerCss = `dropdown-menu-bar-container background-${backgroundColour}`;

  /* Set the styling for the top and bottom rows of the container */
  const topRowCss = `dropdown-menu-bar-container-row-top background-${backgroundColour}`;
  const topRowCloseButtonCss = `dropdown-menu-bar-container-row-top-close background-${backgroundColour} font-default font-${fontColour}`;
  const bottomRowCss = `dropdown-menu-bar-container-row-bottom background-${backgroundColour}`;

  /* Set the styling for the rows of hyperlinks to be rendered in the container */
  const hyperlinkCss = `dropdown-menu-bar-container-row-hyperlink background-${backgroundColour} font-default font-${fontColour}`;
  const hyperlinkTitleCss = 'dropdown-menu-bar-container-row-hyperlink-title';

  /* Determine the visibility of the container based on the property setting */
  const isContainerHidden = props.isHidden !== undefined ? props.isHidden : true;

  return (
    <div aria-hidden={isContainerHidden} className={containerCss} id={getIdContainerDOMElement()}>
      <div className={topRowCss}>
        <button aria-label="Close this dropdown menu." className={topRowCloseButtonCss} dangerouslySetInnerHTML={{ __html: '&nbsp;&nbsp;&nbsp;&Chi;&nbsp;&nbsp;&nbsp;' }}
          id={`${getIdCloseButtonDOMElement()}`} onClick={handleOnClickCloseIcon} onKeyDown={handleOnKeyDownCloseIcon} tabIndex={isContainerHidden === true ? '-1' : '0'}
          title="Close this dropdown menu."/>
      </div>
      <div className={dropdownHyperlinkContainerCss}>
        {
          props.dropdownMenuBarItemsList.map((dropdownMenuBarItemData, index) => {
            if (props.enableBrowserRouterSupport === true) {
              /* Render the BrowserRouter version of the hyperlink */
              return <Link aria-label={`${dropdownMenuBarItemData.title}`} className={hyperlinkCss} id={`${index}--${dropdownMenuBarItemData.id}--dropdown-menu-bar-container-item`}
                key={`${index}--${dropdownMenuBarItemData.id}--dropdown-menu-bar-container-item`} onClick={handleOnClickHyperlink} onKeyDown={handleOnKeyDownHyperlink}
                tabIndex={isContainerHidden === true ? '-1' : '0'} title={`${dropdownMenuBarItemData.title}`} to={dropdownMenuBarItemData.href}>
                  <span id={`${index}--${dropdownMenuBarItemData.id}--title--dropdown-menu-bar-container-item`} className={hyperlinkTitleCss}>
                    {dropdownMenuBarItemData.title}
                  </span>
              </Link>
            }
            /* By default - render a standard HTML hyperlink */
            return <a aria-label={`${dropdownMenuBarItemData.title}`} className={hyperlinkCss} id={`${index}--${dropdownMenuBarItemData.id}--dropdown-menu-bar-container-item`}
              key={`${index}--${dropdownMenuBarItemData.id}--dropdown-menu-bar-container-item`} onClick={handleOnClickHyperlink} onKeyDown={handleOnKeyDownHyperlink}
              tabIndex={isContainerHidden === true ? '-1' : '0'} title={`${dropdownMenuBarItemData.title}`} href={dropdownMenuBarItemData.href}>
                <span id={`${index}--${dropdownMenuBarItemData.id}--title--dropdown-menu-bar-container-item`} className={hyperlinkTitleCss}>
                  {dropdownMenuBarItemData.title}
                </span>
            </a>
          })
        }
      </div>
      <div className={bottomRowCss} />
    </div>
  );
}
DropdownMenuBarContainer.propTypes = {
  /** The background colour for the dropdown menu bar container. The default colour for the background is white. */
  backgroundColour: PropTypes.oneOf([ 'gold', 'green', 'grey', 'navy-and-gold', 'navy-and-white', 'red', 'white' ]),
  /** The list of dropdown menu bar items to be rendered in the container component. */
  dropdownMenuBarItemsList: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      id: PropTypes.string,
      title: PropTypes.string,
    })
  ).isRequired,
  /** Automatically enables focus on the first hyperlink in the container. Suitable for use when the container is accessed via the keyboard. */
  enableAutoFocus: PropTypes.bool,
  /** Sets whether this component is intended for use with a BrowserRouter component. If enabled, a Link component will be used instead of a HTML hyperlink. */
  enableBrowserRouterSupport: PropTypes.bool,
  /** The unique identifier for this component. */
  id: PropTypes.string.isRequired,
  /** Sets whether the dropdown menu bar container is visible or hidden. Is set to hidden by default until specified otherwise. */
  isHidden: PropTypes.bool,
  /** The leftmost position for the container to be rendered at on-screen. */
  left: PropTypes.number,
  /** Custom functionality to be executed after clicking to close the container component via a mouse click event on the close icon. */
  onClickCloseIcon: PropTypes.func,
  /** Custom functionality to be executed after clicking on an external DOM element (ie. an element not rendered inside the container). */
  onClickExternalElements: PropTypes.func,
  /** Custom functionality to be executed after clicking to select a hyperlink element within the container component. */
  onClickHyperlink: PropTypes.func,
  /** Custom functionality to be executed after using the keyboard to close the container component while focused on the close icon. */
  onKeyDownCloseIcon: PropTypes.func,
  /** Custom functionality to be executed after using the keyboard to select a hyperlink element within the container component. */
  onKeyDownHyperlink: PropTypes.func,
  /** The unique identifier for the parent dropdown menu bar item component for this container component. */
  parentDropdownMenuBarItemId: PropTypes.string,
  /** The upper position for the container to be rendered at on-screen. */
  top: PropTypes.number,
};
export default DropdownMenuBarContainer;
