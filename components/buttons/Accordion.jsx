/**
 * Developed by Anthony Cox in 2025
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getBoundingClientRect } from '../data/dom-measurements';
import '../css/common.css';
import './css/button-accordion.css';

const maximumAccordionButtonTextHeight = 34;

/**
 * Accordion component which renders a decorative button to the user. After clicking to enable the button, the content of the accordion then becomes visible
 * underneath the button. Multiple accordion components can be rendered at any one time on a screen and by default all accordion components can be expanded
 * simultaneously. If you wish to restrict this functionality so that only one component can be expanded at a time, there is a property available that can be
 * set to achieve that.
 */
const Accordion = props => {
  const [ isSelected, setIsSelected ] = useState(false);

  useEffect(() => {
    /* Truncate the accordion buttons text if necessary */
    handleButtonTitleTextContentHeight();

    /* Ensure that window resize events will continue checking for the need for text truncation */
    window.addEventListener('resize', handleButtonTitleTextContentHeight);
  }, []);

  /**
   * Retrieves the accordions button title text element from the DOM
   * @returns {HTMLElement}
   */
  const getAccordionButtonTitleTextDOMElement = () => {
    return document.querySelector(`span[id="${getIdAccordionButtonTitleTextDOMElement()}"]`);
  };

  /**
   * Retrieves the ID for the accordions button element
   * @returns {string}
   */
  const getIdAccordionButtonDOMElement = () => {
    return `${props.id}--accordion-button`;
  };

  /**
   * Retrieves the ID for the accordions content element
   * @returns {string}
   */
  const getIdAccordionContentDOMElement = () => {
    return `${props.id}--accordion-content`;
  };

  /**
   * Retrieves the ID for the accordions button title text element
   * @returns {string}
   */
  const getIdAccordionButtonTitleTextDOMElement = () => {
    return `${props.id}--accordion-button-title-text`;
  };

  /**
   * Handles click events on the button, marking the accordion as selected / deselected
   * @param {Event} event 
   */
  const handleClickButton = () => {
    if (isSelected === false && props.allowMultipleOpenAccordions === false) {
      /**
       * If the current accordion instance is not selected, this click event will mark it as selected.
       * In this case, any other open accordions on this page should be closed.
       */
      const allRenderedSelectedButtonElements = document.querySelectorAll('button[id$="--accordion-button"][class*="accordion-button-selected"]');
      let index = 0;
      while (index < allRenderedSelectedButtonElements.length) {
        const accordionElement = allRenderedSelectedButtonElements[index];
        const accordionId = accordionElement.getAttribute('id');
        if (accordionId !== getIdAccordionButtonDOMElement()) {
          /* Only try to close accordions that are not this accordion instance */
          accordionElement.click();
        }
        index += 1;
      }
    }
    setIsSelected(!isSelected);
  };

  /**
   * Handles the height of the accordion buttons title text content. The height of the text content
   * should not exceed the height of the button itself.
   */
  const handleButtonTitleTextContentHeight = () => {
    /* Retrieve the button title text element from the DOM and determine its height and text content */
    const spanElement = getAccordionButtonTitleTextDOMElement();
    if (spanElement !== null) {
      /* Restore the full text content to the span element - this will cater for if the screen size has increased */
      spanElement.textContent = props.buttonTextContent;

      /* Now determine the current span elements dimensions and reduce the text output to suit the current screen size */
      let spanDimensions = getBoundingClientRect(spanElement);
      let spanHeight = spanDimensions.height;
      let spanTextContent = spanElement.textContent;
      while (spanTextContent.length > 0 && spanHeight > maximumAccordionButtonTextHeight) {
        /* Remove the last character in the string and add three dots to the string end to suggest truncation has occurred */
        spanTextContent = `${spanTextContent.substring(0, spanTextContent.length - 1).trim()}...`;

        /* Set the new text content string and determine the new height of the element */
        spanElement.textContent = spanTextContent;
        spanDimensions = getBoundingClientRect(spanElement);
        spanHeight = spanDimensions.height;
        if (spanHeight > maximumAccordionButtonTextHeight) {
          /* Remove the obsolete three dots at the end of the string for the next iteration of the loop */
          spanTextContent = spanTextContent.substring(0, spanTextContent.length - 3).trim();
        }
      }
    }
  };

  /* Set the styling for the container element */
  const containerCss = 'accordion-container';

  /* Set the styling for the button element */
  let buttonCss = 'accordion-button font-default';
  isSelected === true ? buttonCss += ' accordion-button-selected background-green font-white' : buttonCss += ' accordion-button-deselected background-white font-black';

  /* Set the styling for the button text element */
  const buttonTextCss = 'accordion-button-text';

  /* Set the styling for the button icon container element */
  const buttonIconContainerCss = 'accordion-button-icon-container';

  /* Set the styling for the button icon inner container element */
  const buttonIconContainerInnerCss = 'accordion-button-icon-inner-container';

  /* Set the styling for the different segments of the button icon element */
  const iconBottomLeftCss = `accordion-button-icon-sizing accordion-button-icon-bottom-left-${isSelected === true ? 'selected' : 'deselected'}`;
  const iconBottomRightCss = `accordion-button-icon-sizing accordion-button-icon-bottom-right-${isSelected === true ? 'selected' : 'deselected'}`;
  const iconTopLeftCss = `accordion-button-icon-sizing accordion-button-icon-top-left-${isSelected === true ? 'selected' : 'deselected'}`;
  const iconTopRightCss = `accordion-button-icon-sizing accordion-button-icon-top-right-${isSelected === true ? 'selected' : 'deselected'}`;

  /* Set the styling for the content container element */
  const contentContainerCss = 'accordion-content-container background-transparent font-default font-black';
  
  return (
    <div className={containerCss}>
      <button aria-controls={getIdAccordionContentDOMElement()} aria-expanded={isSelected} aria-label={props.buttonTextContent} className={buttonCss} onClick={handleClickButton}
        id={getIdAccordionButtonDOMElement()} tabIndex="0" title={props.buttonTextContent}>
          {/* Render the accordion text content */}
          <span className={buttonTextCss} id={getIdAccordionButtonTitleTextDOMElement()}>{props.buttonTextContent}</span>

          {/* Render the accordion icon */}
          <span className={buttonIconContainerCss}>
            <span className={buttonIconContainerInnerCss}>
              <span className={iconTopLeftCss} />
              <span className={iconTopRightCss} />
            </span>
            <span className={buttonIconContainerInnerCss}>
              <span className={iconBottomLeftCss} />
              <span className={iconBottomRightCss} />
            </span>
          </span>
      </button>
      <div aria-hidden={!isSelected} className={contentContainerCss} id={getIdAccordionContentDOMElement()}>
        {
          isSelected === true &&
            <React.Fragment>{props.children}</React.Fragment>
        }
      </div>
    </div>
  );
};
Accordion.propTypes = {
  /** Switch to allow multiple accordions to be expanded simultaneously. If disabled only one accordion can be opened at any one time. By default this option is enabled. */
  allowMultipleOpenAccordions: PropTypes.bool,
  /** The text content to be assigned to the accordions button component. */
  buttonTextContent: PropTypes.string.isRequired,
  /** The content to be rendered on expanding the accordion component. */
  children: PropTypes.any,
  /** The unique identifier for this component. */
  id: PropTypes.string.isRequired,
};
export default Accordion;
