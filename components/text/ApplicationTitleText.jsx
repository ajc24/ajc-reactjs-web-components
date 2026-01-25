/**
 * Developed by Anthony Cox in 2025
 */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { parseFloat_1DecimalPlace } from '../data/dom-measurements';
import { HTMLElementManager } from '../modules';
import '../css/common.css';
import './css/text-application-title.css';

const maxEm = 3;
const truncateTextHeightCutoff = 95;

/* Set up the component managers for this component */
const htmlElementManager = new HTMLElementManager();

/**
 * Application title text component which renders the name / title of the web application to the user. This component is intended for use in both
 * the default and tall Header components but can also be rendered standalone. The title text content can be left aligned or centre aligned.
 * 
 * The application title text content is initially rendered at 3em in size and will be automatically reduced in size down to a minimum size of 2em,
 * to fit on smaller screens (ie. mobile phone screen sizes). If the title text still does not fit on-screen after the font size reduction has taken
 * place, it will then be truncated.
 * 
 * The title text can be rendered in black or white colour, each with a white outline or black outline respectively.
 */
const ApplicationTitleText = props => {
  const [ init, setInit ] = useState(false);
  const [ isWrapped, setIsWrapped ] = useState(false);

  useEffect(() => {
    if (init === false) {
      /* First time component initialisation */
      handleScreenWidth();

      /* Watch over all future window resize events - we will want to alter the text to suit the screen size */
      globalThis.window.addEventListener('resize', handleScreenWidth);
      setInit(true);
    }
  }, []);

  /**
   * Gets the container DOM element rendered with this component
   * @returns {HTMLElement}
   */
  const getContainerDOMElement = () => {
    return document.querySelector(`div[id="${props.id}"]`);
  };

  /**
   * Retrieves the current rightmost position of the heading elements container DOM element
   * @returns {number}
   */
  const getContainerDOMElement_RightmostPos = () => {
    htmlElementManager.setDOMElement(getContainerDOMElement());
    return htmlElementManager.getRight();
  };

  /**
   * Gets the heading 1 DOM element rendered with this component
   * @returns {HTMLElement}
   */
  const getHeading1DOMElement = () => {
    return document.querySelector(`div[id="${props.id}"] > h1`);
  };

  /**
   * Determines the height of the heading 1 DOM element
   * @returns {number}
   */
  const getHeading1DOMElement_Height = () => {
    htmlElementManager.setDOMElement(getHeading1DOMElement());
    return htmlElementManager.getHeight();
  };

  /**
   * Determines the rightmost position of the heading 1 DOM element
   * @returns {number}
   */
  const getHeading1DOMElement_RightmostPos = () => {
    htmlElementManager.setDOMElement(getHeading1DOMElement());
    return htmlElementManager.getRight();
  };

  /**
   * Gets the text content currently set to the heading element
   * @returns {string}
   */
  const getHeading1DOMElement_TextContent = () => {
    htmlElementManager.setDOMElement(getHeading1DOMElement());
    return htmlElementManager.getTextContent();
  };

  /**
   * Handles resize events in the browser. This function will reduce the heading element font size
   * and truncate the text until it fits perfectly within the width of the window
   */
  const handleScreenWidth = () => {
    /* Ensure we're outputting the full string before assessing for truncation */
    resetTitleTextContentToDefault();

    /* Reduce the font size and wrap the text if required */
    reduceFontSizeAndWrapTextIfRequired();

    /* Truncate the text (if required) by gradually removing whole words from the text content */
    const isTruncated = truncateTextByRemovingWholeWords();

    /* If the truncation by cutting off words did not suit the text - truncate by cutting off characters instead */
    if (isTruncated === false) {
      truncateTextByRemovingCharacters();
    }
  };

  /**
   * Reduces the font size in order for the title text to fit on smaller screens.
   * If the text still does not fit on-screen after the font size is reduced to a minimum value then wrap the text.
   */
  const reduceFontSizeAndWrapTextIfRequired = () => {
    /* Determine the positions of the text and the current container element width */
    let h1RightPos = getHeading1DOMElement_RightmostPos();
    let containerRightPos = getContainerDOMElement_RightmostPos();
    
    /* Set the heading 1 DOM element to the component manager */
    htmlElementManager.setDOMElement(getHeading1DOMElement());

    /* Steadily reduce the font size until the text fits on-screen - do not drop below 2em font size */
    let em = maxEm;
    while (htmlElementManager.isValidDOMElement() && em >= 2 && containerRightPos < h1RightPos) {
      htmlElementManager.setFontSize(em);
      h1RightPos = getHeading1DOMElement_RightmostPos();

      /* Reduce the em value by 0.1 and ensure the value remains at one decimal place at the most after editing (ie. 2.9, 2.8, 2.7 etc.) */
      em -= 0.1;
      em = parseFloat_1DecimalPlace(em);
    }
    /* If 2em font size was not enough for the title text to fit on-screen - wrap the text */
    containerRightPos = getContainerDOMElement_RightmostPos();

    /* Set the heading 1 DOM element back as the source of the common component manager before setting any truncation parameters */
    htmlElementManager.setDOMElement(getHeading1DOMElement());
    if (htmlElementManager.isValidDOMElement() && containerRightPos < h1RightPos) {
      /* Set the text to wrap and center align */
      htmlElementManager.setTextAlign_Center();
      htmlElementManager.setWhiteSpace_Normal();
      setIsWrapped(true);
    }
  };

  /**
   * Resets the title text contents value and font size to their default values
   */
  const resetTitleTextContentToDefault = () => {
    /* Set the heading 1 element as the source */
    htmlElementManager.setDOMElement(getHeading1DOMElement());

    /* Restore the full text content to the heading element by applying the full aria-label text value to the heading element */
    htmlElementManager.setTextContent(htmlElementManager.getAriaLabel());

    /* Set the text to its maximum potential size and reset the whiteSpace CSS property so that there is no text wrap */
    htmlElementManager.setFontSize(maxEm);
    htmlElementManager.setWhiteSpace_NoWrap();
    setIsWrapped(false);
  };

  /**
   * Sets the heading 1 DOM element text content to the specified text content
   * @param {string} newTextContent
   * @returns {boolean}
   */
  const setHeading1DOMElement_TextContent = newTextContent => {
    htmlElementManager.setDOMElement(getHeading1DOMElement());
    return htmlElementManager.setTextContent(newTextContent);
  };

  /**
   * Truncates the heading element text content by gradually cutting off each character one by one
   */
  const truncateTextByRemovingCharacters = () => {
    let h1RightPos = getHeading1DOMElement_RightmostPos();
    let containerRightPos = getContainerDOMElement_RightmostPos();

    let titleTextString = getHeading1DOMElement_TextContent();
    while (containerRightPos < h1RightPos) {
      /* Truncate the text - in this case the word wrap has gone beyond two lines */
      titleTextString = `${titleTextString.substring(0, titleTextString.length - 1).trim()}...`;
      setHeading1DOMElement_TextContent(titleTextString);
      
      /* Get the new right position of the heading element */
      h1RightPos = getHeading1DOMElement_RightmostPos();
      if (containerRightPos < h1RightPos) {
        /* Remove the obsolete three dots at the end of the string for the next character truncation */
        titleTextString = titleTextString.substring(0, titleTextString.length - 3).trim();
        setHeading1DOMElement_TextContent(titleTextString);
      }
    }
  };

  /**
   * Attempts to truncate the heading element text content by gradually cutting off words in the text
   * @returns {boolean}
   */
  const truncateTextByRemovingWholeWords = () => {
    let currentHeadingHeight = getHeading1DOMElement_Height();
    let titleTextString = getHeading1DOMElement_TextContent();
    let truncatedString = false;
    if (currentHeadingHeight > truncateTextHeightCutoff) {
      /* Truncate the text - in this case the word wrap has gone beyond two lines */
      while (truncatedString === false && titleTextString.indexOf(' ') >= 0) {
        /* We have a title text entry with spaces between the words - cut off each word until we fit within the boundaries */
        titleTextString = `${titleTextString.substring(0, titleTextString.lastIndexOf(' ')).trim()}...`;
        setHeading1DOMElement_TextContent(titleTextString);

        /* Get the new height of the element */
        currentHeadingHeight = getHeading1DOMElement_Height();
        if (currentHeadingHeight < truncateTextHeightCutoff) {
          /* We have now truncated the title enough for it to fit within the boundaries again */
          truncatedString = true;
        }
      }
    }
    if (truncatedString === false && titleTextString.lastIndexOf('...') === titleTextString.length - 3) {
      /* Remove the obsolete three dots at the end of the string since the truncation by removing spaces was not enough for the text to fit the screen */
      titleTextString = titleTextString.substring(0, titleTextString.length - 3).trim();
      setHeading1DOMElement_TextContent(titleTextString);
    }
    return truncatedString;
  };

  /* Set the styling for the container element */
  let containerCss = 'background-transparent title-text-container';
  props.headerId === undefined ? containerCss += ' common-component-width' : containerCss += ''.trim();
  props.alignment === 'centre' ? containerCss += ' title-text-alignment-centre' : containerCss += ' title-text-alignment-left';

  /* Set the styling for the title text font */
  let textOutputCss = 'title-text-font-default';
  props.textColour === 'white' ? textOutputCss += ' title-text-font-white' : textOutputCss += ' title-text-font-black';

  return (
    <div id={`${props.id}`} className={containerCss} data-wrap={`${isWrapped}`}>
      <h1 className={textOutputCss} aria-label={`${props.children}`} title={`${props.children}`}>
        {props.children}
      </h1>
    </div>
  );
}
ApplicationTitleText.propTypes = {
  /* The alignment of the title text content. The text by default will be left aligned until wrapped to a new line but can be centre aligned at all times. */
  alignment: PropTypes.oneOf([ 'centre', 'left' ]),
  /** The content to be displayed as the title text. */
  children: PropTypes.string,
  /** The unique identifier of the Header component in which this title text component is rendered. */
  headerId: PropTypes.string,
  /** The unique identifier for this component. */
  id: PropTypes.string.isRequired,
  /** The colour of the text to be displayed, either that of black with a white outline or white with a black outline. By default black with a while outline is pre-selected. */
  textColour: PropTypes.oneOf([ 'black', 'white' ]),
};
export default ApplicationTitleText;
