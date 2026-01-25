/**
 * Developed by Anthony Cox in 2025
 */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getBoundingClientRect } from '../data/dom-measurements';
import '../css/common.css';
import './css/button-tabslist.css';

const maximumButtonSpanTextHeight = 45;

/**
 * Tabs List component which is designed to be rendered within the Main component. This component will render up to a maximum of three tabs which when selected,
 * will render the linked content in the tab panel area below it. The tab buttons are rendered horizontally and are fully selectable via both mouse and keyboard
 * interactions.
 * 
 * If interacting with this component via the keyboard:
 * - The currently active button tab is default selected on applying focus to this component.
 * - Switching focus between the button tabs list is achieved by using the left and right arrow keys.
 * - Pressing the Space or Enter keys will select / activate the button tab which is currently in focus.
 * - Pressing the Tab key on a button tab will switch focus to the currently rendered tab panel below the button tabs list.
 */
const TabsList = props => {
  const [ buttonFocusNext, setButtonFocusNext ] = useState(false);
  const [ buttonFocusPrevious, setButtonFocusPrevious ] = useState(false);
  const [ buttonIndex, setButtonIndex ] = useState(0);
  const [ focusIndex, setFocusIndex ] = useState(0);
  const [ init, setInit ] = useState(false);

  useEffect(() => {
    /* Mark the currently selected content as visible */
    setVisibilityContentDOMElements();

    if (init === false) {
      /* Ensure that the text content rendered in each of the tab list buttons does not exceed the button size */
      handleTextContentHeight();

      /* Mark the one time initialisation functionality as completed */
      setInit(true);
    }
    if (buttonFocusNext === true) {
      /* An action to focus on the next button in the tab list has been called - shift focus to the next button in the tab list */
      setFocusNextTabListButton();
      setButtonFocusNext(false);
    } else if (buttonFocusPrevious === true) {
      /* An action to focus on the previous button in the tab list has been called - shift focus to the previous button in the tab list */
      setFocusPreviousTabListButton();
      setButtonFocusPrevious(false);
    }
  }, [ buttonFocusNext, buttonFocusPrevious, buttonIndex ]);

  /**
   * Returns the button DOM element at the specified index
   * @param {number} index 
   * @returns {HTMLElement}
   */
  const getButtonDOMElementAtIndex = index => {
    return document.querySelector(`button[id="${getIdButtonDOMElementAtIndex(index)}"]`);
  };

  /**
   * Returns the upper hidden button DOM element
   * @param {number} index 
   * @returns {HTMLElement}
   */
  const getButtonHiddenUpperDOMElement = () => {
    return document.querySelector(`button[id="${getIdButtonHiddenUpperDOMElement()}"]`);
  };

  /**
   * Returns the tabs list button span DOM element
   * @param {number} index 
   * @returns {HTMLElement}
   */
  const getButtonSpanDOMElementAtIndex = index => {
    return document.querySelector(`span[id="${getIdButtonSpanDOMElementAtIndex(index)}"]`);
  };

  /**
   * Returns the content element container DOM element at the specified index
   * @param {number} index 
   * @returns {HTMLElement}
   */
  const getContentDOMElementAtIndex = index => {
    return document.querySelector(`div[id="${getIdContentDOMElementAtIndex(index)}"]`);
  };

  /**
   * Returns the ID of the content element container DOM element at the specified index
   * @param {number} index 
   * @returns {string}
   */
  const getIdButtonDOMElementAtIndex = index => {
    return `${props.id}--button-${index}--tabs-list`;
  };

  /**
   * Returns the ID of the upper hidden button DOM element
   * @returns {string}
   */
  const getIdButtonHiddenUpperDOMElement = () => {
    return `${props.id}--button-hidden-upper--tabs-list`;
  };

  /**
   * Returns the ID of the tabs list button span DOM element
   * @param {number} index
   * @returns {string}
   */
  const getIdButtonSpanDOMElementAtIndex = index => {
    return `${props.id}--button-span-${index}--tabs-list`;
  };

  /**
   * Returns the ID of the content element container DOM element at the specified index
   * @param {number} index 
   * @returns {string}
   */
  const getIdContentDOMElementAtIndex = index => {
    return `${props.id}--content-${index}--tabs-list`;
  };

  /**
   * Handles click events on the tabs list button components
   * @param {Event} event 
   */
  const handleOnClickTabListButton = event => {
    event.preventDefault();
    const selectedButtonIndex = parseInt(event.target.dataset.index, 10);
    setButtonIndex(selectedButtonIndex);
    setFocusIndex(selectedButtonIndex);
  };

  /**
   * Handles click events on the tabs list button span elements
   * @param {Event} event
   */
  const handleOnClickTabsListButtonSpan = event => {
    event.preventDefault();
    const selectedButtonIndex = parseInt(event.target.dataset.index, 10);
    const selectedButtonElement = getButtonDOMElementAtIndex(selectedButtonIndex);
    selectedButtonElement.click();
  };

  /**
   * Handles focus events on the tab list container component. By default the currently selected button
   * gains focus on applying focus to the tab list container.
   * @param {Event} event 
   */
  const handleOnFocusTabListContainer = () => {
    if (buttonFocusNext === false && buttonFocusPrevious === false) {
      /* If we are not performing an action to navigate to the next or previous tabs list buttons, default apply focus to the active / selected tabs list button element */
      const selectedButtonElement = getButtonDOMElementAtIndex(buttonIndex);
      selectedButtonElement.focus();
    }
  };

  /**
   * Handles key presses on the tab list buttons.
   * - When the user presses the Tab key on a button, focus will shift to the currently active tab panel.
   * - When the user presses the Shift & Tab buttons simultaneously, focus will shift back to the previously focusable element in the DOM.
   * - When the user presses the right arrow key on a button, focus will shift to the next tab in the list.
   * - When the user presses the left arrow key on a button, focus will shift to the previous tab in the list.
   * @param {Event} event 
   */
  const handleOnKeyDownTabsListButton = event => {
    if (event.key === 'Tab') {
      if (event.shiftKey === true) {
        /* When navigating back out of the tabs list, set focus to the hidden button element which in turn will auto-shift focus back to the previous focusable DOM element */
        const hiddenButtonElement = getButtonHiddenUpperDOMElement();
        hiddenButtonElement.focus();
      } else {
        /* If just the tab key is pressed on the button, shift focus to the content element (tabpanel) */
        const selectedContentElement = getContentDOMElementAtIndex(buttonIndex);
        selectedContentElement.focus();
      }
      /**
       * Since we are tabbing to the content area / back to the previously focusable element, reset the focus index
       * so that once we return focus back to the tab list, the selected button will be correctly registered as having focus again.
       */
      setFocusIndex(buttonIndex);
    } else if (event.key === 'ArrowRight') {
      /* Mark the action to focus on the next tab in the tab list as true */
      setButtonFocusNext(true);
    } else if (event.key === 'ArrowLeft') {
      /* Mark the action to focus on the previous tab in the tab list as true */
      setButtonFocusPrevious(true);
    }
  };

  /**
   * Handles the height of the tabs list button span text content. The height of the text content
   * should not exceed the maximum height of the button itself.
   */
  const handleTextContentHeight = () => {
    const numberOfButtonSpanElements = props.buttonsList.length > 3 ? 3 : props.buttonsList.length;
    let spanIndex = 0;
    while (spanIndex < numberOfButtonSpanElements) {
      /* Retrieve the span element from the DOM and determine its height and text content */
      const spanElement = getButtonSpanDOMElementAtIndex(spanIndex);
      if (spanElement !== null) {
        let spanDimensions = getBoundingClientRect(spanElement);
        let spanHeight = spanDimensions.height;
        let spanTextContent = spanElement.textContent;
        while (spanTextContent.length > 0 && spanHeight > maximumButtonSpanTextHeight) {
          /* Remove the last character in the string and add three dots to the string end to suggest truncation has occurred */
          spanTextContent = `${spanTextContent.substring(0, spanTextContent.length - 1).trim()}...`;

          /* Set the new text content string and determine the new height of the element */
          spanElement.textContent = spanTextContent;
          spanDimensions = getBoundingClientRect(spanElement);
          spanHeight = spanDimensions.height;

          if (spanHeight > maximumButtonSpanTextHeight) {
            /* Remove the obsolete three dots at the end of the string for the next iteration of the loop */
            spanTextContent = spanTextContent.substring(0, spanTextContent.length - 3).trim();
          }
        }
      }
      spanIndex += 1;
    }
  };

  /**
   * Tab List Button element focus management - sets focus on to the next tab list button in the list
   */
  const setFocusNextTabListButton = () => {
    /* Determine the target button index for the next button in the list and ensure that the focus index is set to suit that */
    const maxIndex = props.buttonsList.length > 3 ? 2 : props.buttonsList.length - 1;
    const targetIndex = focusIndex + 1 > maxIndex ? 0 : focusIndex + 1;
    setFocusIndex(targetIndex);

    /* Focus on the next button in the tab list */
    const nextTab = getButtonDOMElementAtIndex(targetIndex);
    if (nextTab !== null) {
      nextTab.focus();
    }
  };

  /**
   * Tab List Button element focus management - sets focus on to the previous tab list button in the list
   */
  const setFocusPreviousTabListButton = () => {
    /* Determine the target button index for the previous button in the list and ensure that the focus index is set to suit that */
    const maxIndex = props.buttonsList.length > 3 ? 2 : props.buttonsList.length - 1;
    const targetIndex = focusIndex - 1 < 0 ? maxIndex : focusIndex - 1;
    setFocusIndex(targetIndex);

    /* Focus on the previous button in the tab list */
    const previousTab = getButtonDOMElementAtIndex(targetIndex);
    if (previousTab !== null) {
      previousTab.focus();
    }
  };

  /**
   * Sets the visibility for the tab panel components. Only the tab panel component linked to the currently
   * selected button will be marked as visible. All other tab panel components will be marked as hidden.
   */
  const setVisibilityContentDOMElements = () => {
    let index = 0;
    const maxIndex = props.buttonsList.length > 3 ? 3 : props.buttonsList.length;
    while (index < maxIndex) {
      const currentContentElement = getContentDOMElementAtIndex(index);
      if (index === buttonIndex) {
        /* Mark the content element as visible */
        currentContentElement.style.display = 'flex';
      } else {
        /* Mark the content element as hidden */
        currentContentElement.style.display = 'none';
      }
      index += 1;
    }
  };

  /* Set the CSS styling for the container element */
  const containerCss = 'tabs-list-container';

  /* Set the CSS styling for the hidden button element */
  const buttonHiddenCss = 'tabs-list-button-hidden';

  /* Set the CSS styling for the button container element */
  const buttonContainerCss = 'tabs-list-button-container font-default font-black';

  /* Set the CSS styling for the button tab element */
  const buttonTabCss = 'tabs-list-button-tab font-default background-transparent';

  /* Set the CSS styling for the content container element */
  const contentContainerCss = 'tabs-list-content-container background-transparent font-default font-black';
  const contentInnerCss = 'tabs-list-content-inner';

  return (
    <div className={containerCss} id={`${props.id}--tabs-list`}>
      <button aria-hidden="true" className={buttonHiddenCss} id={getIdButtonHiddenUpperDOMElement()} tabIndex="-1" />
      <div className={buttonContainerCss} onFocus={handleOnFocusTabListContainer} role="tablist">
        {
          props.buttonsList.map((buttonTextContent, index) => {
            if (index <= 2) {
              /* Only output a maximum of three selectable buttons */
              return (
                <button aria-controls={getIdContentDOMElementAtIndex(index)} aria-label={buttonTextContent} aria-selected={buttonIndex === index} className={buttonTabCss}
                  data-index={`${index}`} id={getIdButtonDOMElementAtIndex(index)} key={getIdButtonDOMElementAtIndex(index)} onClick={handleOnClickTabListButton}
                  onKeyDown={handleOnKeyDownTabsListButton} role="tab" tabIndex="0" title={buttonTextContent}>
                    <span data-index={`${index}`} id={getIdButtonSpanDOMElementAtIndex(index)} onClick={handleOnClickTabsListButtonSpan}>{buttonTextContent}</span>
                </button>
              );
            }
            return null;
          })
        }
      </div>
      <div className={contentContainerCss}>
        {
          props.contentList.map((contentElement, index) => {
            if (index <= 2) {
              /* Only output a maximum of three content elements in line with the buttons list */
              return (
                <div aria-hidden={!buttonIndex === index} aria-labelledby={getIdButtonDOMElementAtIndex(index)} className={contentInnerCss} id={getIdContentDOMElementAtIndex(index)}
                  key={getIdContentDOMElementAtIndex(index)} role="tabpanel" tabIndex="-1">
                    {contentElement}
                </div>
              );
            }
            return null;
          })
        }
      </div>
    </div>
  );
};
TabsList.propTypes = {
  /** The list of buttons to be rendered as button tabs supporting up to a maximum of three buttons. Selecting a button tab will alter the content rendered in the tab panel. */
  buttonsList: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** The list of content elements to be rendered as tab panels. Up to a maximum of three content elements are supported. */
  contentList: PropTypes.arrayOf(PropTypes.element).isRequired,
  /** The unique identifier for this component. */
  id: PropTypes.string.isRequired,
};
export default TabsList;
