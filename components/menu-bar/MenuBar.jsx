/**
 * Developed by Anthony Cox in 2025
 * 
 * Revisions (January 2026):
 * - Updated to latest React code standards.
 * - Minor logic rewrites and improvements.
 */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BaseMenuBar from '../base/BaseMenuBar.jsx';
import MenuBarItem from './MenuBarItem.jsx';
import DropdownMenuBarItem from './DropdownMenuBarItem.jsx';
import ScrollMenuBarItemsLeft from './ScrollMenuBarItemsLeft.jsx';
import ScrollMenuBarItemsRight from './ScrollMenuBarItemsRight.jsx';
import { divide_Integer } from '../data/dom-measurements';
import { HTMLElementManager } from '../modules';
import './css/menu-bar.css';

const menuBarItemAnimationTime = 250;
const menuBarItemWidth = 100;
const menuBarItemWidthWithMargin = 108;

/* Set up the component managers for this component */
const htmlElementManager = new HTMLElementManager();

/**
 * Menu Bar component to be used in the web application. This component allows for a number of menu bar items and
 * dropdown menu items to be rendered, each offering navigation options for the user to navigate around the application.
 * If the number of menu bar items are too many to fit within the confines of the screen width, the user is presented with
 * buttons with which to scroll through all available menu bar items.
 * 
 * If enableBrowserRouterSupport is enabled, this component will then become dependent on the BrowserRouter component
 * in "react-router". If you intend on using this component in this way then please make sure to render it inside
 * a BrowserRouter component in your React web application.
 */
const MenuBar = props => {
  const [ centralContentWidthUpdated, setCentralContentWidthUpdated ] = useState(false);
  const [ index, setIndex ] = useState(0);
  const [ indexUpdated, setIndexUpdated ] = useState(false);
  const [ init, setInit ] = useState(false);
  const [ isProcessing, setIsProcessing ] = useState(false);
  const [ maxIndex, setMaxIndex ] = useState(0);
  const [ menuBarItemsHidden, setMenuBarItemsHidden ] = useState(true);
  const [ scrollMenuBarItemsLeftHidden, setScrollMenuBarItemsLeftHidden ] = useState(true);
  const [ scrollMenuBarItemsRightHidden, setScrollMenuBarItemsRightHidden ] = useState(true);

  useEffect(() => {
    if (init === false) {
      /* Set the menu bar up based on the current screen size */
      handleScreenWidth();

      /* Watch over all future window resize events, we will want to alter the number of rendered menu bar items to suit the screen size */
      globalThis.window.addEventListener('resize', handleScreenWidth);
      setInit(true);
    }
    if (centralContentWidthUpdated === true) {
      /* After the central content width has been used to set state, finalise the updates in this area */
      handleCentralContentWidthUpdate();
      setCentralContentWidthUpdated(false);
    }
    if (indexUpdated === true) {
      /* Process index changes which happen while processing, setting whether the scroll buttons should be rendered and ensure menu items are no longer hidden */
      handleMenuBarUpdates_ScrollItems_ScreenResize();
      setIndexUpdated(false);
    }
  }, [ centralContentWidthUpdated, indexUpdated ]);

  /**
   * Retrieves the central content element from the DOM
   * @returns {HTMLElement}
   */
  const getCentralContentElement = () => {
    return document.querySelector(`div[id="${props.id}--central-content--${props.backgroundColour}--menu-bar"]`);
  };

  /**
   * After updating the central content width in state - set the menu bar items as visible again and finish all processing
   */
  const handleCentralContentWidthUpdate = () => {
    setTimeout(() => {
      handleMenuBarUpdates_ScrollItems_ScreenResize();
      setIsProcessing(false);
    }, menuBarItemAnimationTime);
  };

  /**
   * Handles menu bar item updates which need to occur after either scrolling the menu items or resizing the screen
   */
  const handleMenuBarUpdates_ScrollItems_ScreenResize = () => {
    /* Process index changes which happen while processing - setting whether the scroll buttons should be rendered and ensure menu items are no longer hidden */
    setScrollMenuBarItemsLeftHidden(index === 0);
    setMenuBarItemsHidden(false);
    setScrollMenuBarItemsRightHidden((index + maxIndex) >= props.menuBarItemsList.length);
  };

  /**
   * Handles on click events on the "Scroll menu bar items to the left" button
   */
  const handleOnClickScrollMenuBarItemsLeft = () => {
    if (isProcessing === false) {
      /* Enable is processing and mark the current set of menu bar items as hidden */
      setIsProcessing(true);
      setMenuBarItemsHidden(true);

      setTimeout(() => {
        /* After the "hide menu bar items" animation has completed - set the new current index position */
        let newIndex = index - maxIndex;
        if (newIndex < 0) {
          newIndex = 0;
        }
        setIndex(newIndex);
        setIndexUpdated(true);
        setIsProcessing(false);
      }, menuBarItemAnimationTime);
    }
  };

  /**
   * Handles on click events on the "Scroll menu bar items to the right" button
   */
  const handleOnClickScrollMenuBarItemsRight = () => {
    if (isProcessing === false) {
      /* Enable is processing and mark the current set of menu bar items as hidden */
      setIsProcessing(true);
      setMenuBarItemsHidden(true);

      setTimeout(() => {
        /* After the "hide menu bar items" animation has completed - set the new current index position */
        let newIndex = index + maxIndex;
        if (newIndex > props.menuBarItemsList.length) {
          newIndex = props.menuBarItemsList.length;
        }
        setIndex(newIndex);
        setIndexUpdated(true);
        setIsProcessing(false);
      }, menuBarItemAnimationTime);
    }
  };

  /**
   * Handles resize events in the browser. This function will hide the currently displayed menu bar
   * items, then determine the maximum number of menu bar items that can be rendered inside the central
   * content area of the menu bar based on the current screen size and finally mark all menu items as
   * visible again
   */
  const handleScreenWidth = () => {
    /* Enable is processing and mark the current set of menu bar items as hidden */
    setIsProcessing(true);
    setMenuBarItemsHidden(true);

    setTimeout(() => {
      /* After the "hide menu bar items" animation has completed - set the new central content width */
      setCentralContentWidth();
    }, menuBarItemAnimationTime);
  };

  /**
   * Resets the current menu bar item index and sets the maximum index to suit
   * the current screen size
   */
  const setCentralContentWidth = () => {
    /* Determine the current width of the central content element */
    htmlElementManager.setDOMElement(getCentralContentElement());
    const centralContentDimensions = htmlElementManager.getBoundingClientRect();
    let centralContentWidth = centralContentDimensions.width;

    if (centralContentWidth > 0) {
      /**
       * Sometimes a null component is returned when this functionality is fired - only proceed with processing if a valid element has been found with a valid width.
       * If we branch into here, reset the current index and determine how many menu bar item elements will fit within the width of the component
       */
      const newIndex = 0;
      let newMaxIndex = 0;
      if (centralContentWidth > menuBarItemWidth) {
        /* Account for the smallest menu bar item width item first, remove its width from the central content width */
        newMaxIndex += 1;
        centralContentWidth -= menuBarItemWidth;
      }
      /* Now account for all of the other menu bar item widths which will include margins, determine how many items will fit within the central content width */
      const remainder = divide_Integer(centralContentWidth, menuBarItemWidthWithMargin);
      newMaxIndex += remainder;

      /* Set these indexes in state */
      setMaxIndex(newMaxIndex);
      setIndex(newIndex);
      setCentralContentWidthUpdated(true);
    }
  };

  const centralContentCss = 'menu-bar-central-content';

  return (
    <BaseMenuBar backgroundColour={props.backgroundColour} id={`${props.id}--${props.backgroundColour}--menu-bar`}>
      <ScrollMenuBarItemsLeft backgroundColour={props.backgroundColour} id={props.id} isHidden={scrollMenuBarItemsLeftHidden}
        onClick={handleOnClickScrollMenuBarItemsLeft}/>
      <div id={`${props.id}--central-content--${props.backgroundColour}--menu-bar`} className={centralContentCss}>
        {
          props.menuBarItemsList.map((menuBarItemData, itemIndex) => {
            if (itemIndex >= index && itemIndex < (index + maxIndex)) {
              let addRightSideSpacing = true;
              if (itemIndex === ((index + maxIndex) - 1) || itemIndex === props.menuBarItemsList.length - 1) {
                /* Do not add right side spacing for the last rendered item in the current output and / or the last rendered item in the list */
                addRightSideSpacing = false;
              }
              if (menuBarItemData.dropdownMenuBarItemsList === undefined) {
                return <MenuBarItem addRightSideSpacing={addRightSideSpacing} backgroundColour={props.backgroundColour}
                  enableBrowserRouterSupport={props.enableBrowserRouterSupport || false} href={menuBarItemData.href} id={menuBarItemData.id}
                  isHidden={menuBarItemsHidden} key={menuBarItemData.id}>
                    {menuBarItemData.title}
                </MenuBarItem>;
              }
              if (menuBarItemData.dropdownMenuBarItemsList !== undefined) {
                return <DropdownMenuBarItem addRightSideSpacing={addRightSideSpacing} backgroundColour={props.backgroundColour}
                  dropdownMenuBarItemData={menuBarItemData} enableBrowserRouterSupport={props.enableBrowserRouterSupport || false} id={menuBarItemData.id}
                  isHidden={menuBarItemsHidden} key={menuBarItemData.id} />
              }
            }
            return null;
          })
        }
      </div> 
      <ScrollMenuBarItemsRight backgroundColour={props.backgroundColour} id={props.id} isHidden={scrollMenuBarItemsRightHidden}
        onClick={handleOnClickScrollMenuBarItemsRight}/>
    </BaseMenuBar>
  );
};
MenuBar.propTypes = {
  /** The background colour for the menu bar. The default colour for the background is white. */
  backgroundColour: PropTypes.oneOf([ 'gold', 'green', 'grey', 'navy-and-gold', 'navy-and-white', 'red', 'white' ]),
  /** Sets whether this component is intended for use with a BrowserRouter component. If enabled, a Link component will be used instead of a HTML hyperlink. */
  enableBrowserRouterSupport: PropTypes.bool,
  /** The unique identifier for this component. */
  id: PropTypes.string.isRequired,
  /** The list of menu bar items to be rendered in the menu bar. */
  menuBarItemsList: PropTypes.arrayOf(
    PropTypes.shape({
      dropdownMenuBarItemsList: PropTypes.arrayOf(
        PropTypes.shape({
          href: PropTypes.string,
          id: PropTypes.string,
          title: PropTypes.string,
        })
      ),
      href: PropTypes.string,
      id: PropTypes.string,
      title: PropTypes.string,
    })
  ),
};
export default MenuBar;
