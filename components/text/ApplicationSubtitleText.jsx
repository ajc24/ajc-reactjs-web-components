/**
 * Developed by Anthony Cox in 2025
 * 
 * Revisions (January 2026):
 * - Updated to latest React code standards.
 * - Minor logic rewrites and improvements.
 */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { HTMLElementManager } from '../modules';
import '../css/common.css';
import './css/text-application-subtitle.css';

/* Set up the component managers used by this component */
const htmlElementManager = new HTMLElementManager();

/**
 * Application subtitle text component which renders the supporting text for the title text of the web application to the user. This component is
 * intended for use underneath the Application Title Text component, rendered inside both the default and tall Header components but can also be rendered
 * standalone. The subtitle text content can be left aligned or centre aligned.
 * 
 * The subtitle text content will be automatically hidden from view in the event that the title text component has been wrapped and / or truncated to fit on
 * smaller screens (ie. mobile phone screen sizes). It is also hidden from view in the event that the container for the subtitle text content exceeds the
 * width of the screen.
 * 
 * The text content itself can be rendered in black or white colour, with black font colour being the default.
 */
const ApplicationSubtitleText = props => {
  const [ init, setInit ] = useState(false);
  const [ isResizing, setIsResizing ] = useState(false);
  const [ isSubtitleTextHidden, setIsSubtitleTextHidden ] = useState(false);
  const [ paragraphRightPos, setParagraphRightPos ] = useState(0);

  useEffect(() => {
    if (init === false) {
      /* First time component initialisation */
      setRightmostSubtitleTextPosition();

      /* Watch over all future window resize events - we will want to alter the visibility of the text to suit whether the title text is wrapped or not */
      globalThis.window.addEventListener('resize', setRightmostSubtitleTextPosition);
      setInit(true);
    }
    if (isResizing === true) {
      /* Now that we have started resizing, handle the visibility of the application subtitle text content  */
      handleVisibility();
      setIsResizing(false);
    }
  }, [ isResizing ]);

  /**
   * Retrieves the application title text element linked to this component from the DOM
   * @returns {HTMLElement}
   */
  const getApplicationTitleTextDOMElement = () => {
    return document.querySelector(`[id="${props.applicationTitleTextId}--application-title-text"]`);
  };

  /**
   * Retrieves the application subtitle texts container element from the DOM
   * @returns {HTMLElement}
   */
  const getContainerDOMElement = () => {
    return document.querySelector(`[id="${getIdContainerDOMElement()}"]`);
  };

  /**
   * Retrieves the ID set to the application subtitle texts container DOM element
   * @returns {string}
   */
  const getIdContainerDOMElement = () => {
    return `${props.id}--application-subtitle-text`;
  };

  /**
   * Retrieves the ID set to the application subtitle texts paragraph DOM element
   * @returns {string}
   */
  const getIdParagraphDOMElement = () => {
    return `${props.id}--paragraph--application-subtitle-text`;
  };

  /**
   * Retrieves the application subtitle texts paragraph element from the DOM
   * @returns {HTMLElement}
   */
  const getParagraphDOMElement = () => {
    return document.querySelector(`[id="${getIdParagraphDOMElement()}"]`);
  };

  /**
   * Handles the visibility of the subtitle text component. When the header title text component
   * is marked as having its text wrapped, this component will be set to hidden. Also if the
   * subtitle text element itself extends beyond the end of the screen, it will also be set to hidden.
   * In all other cases, the subtitle text will be marked as visible.
   */
  const handleVisibility = () => {
    let isHidden = false;
    htmlElementManager.setDOMElement(getContainerDOMElement());
    
    if (htmlElementManager.isValidDOMElement()) {
      /* Check 1: Does the paragraph element exceed the width of the container */
      const subtitleContainerDimensions = htmlElementManager.getBoundingClientRect();
      const containerRightPos = subtitleContainerDimensions.right;

      if (paragraphRightPos > 0 && containerRightPos > 0) {
        if (paragraphRightPos > containerRightPos) {
          /* The subtitle will exceed the screen limits - hide the subtitle component */
          isHidden = true;
        }
      }
      /* Check 2: Does the title text element have text that has wrapped */
      if (isHidden === false) {
        /* Determine whether text wrapping has occurred in the title text element */
        htmlElementManager.setDOMElement(getApplicationTitleTextDOMElement());
        let dataWrap = false;
        if (htmlElementManager.isValidDOMElement()) {
          dataWrap = htmlElementManager.getData_Boolean('wrap');
        }
        /* Whether the title text has wrapped (true) or not wrapped (false) will align with whether the subtitle text should be hidden (true) or visible (false) */
        isHidden = dataWrap;
      }
    }
    /* Update component state to reflect whether this component is visible or hidden */
    setIsSubtitleTextHidden(isHidden);
  };

  /**
   * Sets the rightmost position of the subtitle text element. This is only changed if another resizing
   * process is not already active in the browser. Follows this action by marking the resizing process as active.
   */
  const setRightmostSubtitleTextPosition = () => {
    htmlElementManager.setDOMElement(getParagraphDOMElement());
    if (isResizing === false) {
      if (isSubtitleTextHidden === false) {
        /* The subtitle text element is visible - set the rightmost position of the element and then start resizing process */
        const subtitleTextRefDimensions = htmlElementManager.getBoundingClientRect();
        const subtitleTextRightPos = subtitleTextRefDimensions.right;
        if (subtitleTextRightPos > 0) {
          /* Sometimes a null element results in a rightmost position of 0. Ignore when this happens and only set a valid rightmost position. */
          setParagraphRightPos(subtitleTextRightPos);
        }
      }
      setIsResizing(true);
    }
  };

  /* Set the styling for the container element */
  let containerCss = 'background-transparent subtitle-text-container';
  if (props.applicationTitleTextId !== undefined && isSubtitleTextHidden === false) {
    /**
     * In the case where application title text is rendered above the subtitle text content and the subtitle
     * text content is marked as visible, ensure there is appropriate spacing applied between both elements.
     * 
     * Do not apply this spacing if the subtitle text content is hidden since this will incorrectly add padding
     * to the bottom of the application title text, despite there not being any subtitle text content underneath.
     */
    containerCss += ' subtitle-text-container-upper-spacing';
  }
  props.headerId === undefined ? containerCss += ' common-component-width' : containerCss += ''.trim();
  props.alignment === 'centre' ? containerCss += ' subtitle-text-alignment-centre' : containerCss += ' subtitle-text-alignment-left';

  /* Set the styling for the subtitle text font */
  let textOutputCss = 'subtitle-text-font-default';
  props.textColour === 'white' ? textOutputCss += ' font-white' : textOutputCss += ' font-black';
  isSubtitleTextHidden === true ? textOutputCss += ' hidden' : textOutputCss += ''.trim();

  return (
    <div id={getIdContainerDOMElement()} className={containerCss}>
      <p id={getIdParagraphDOMElement()} className={textOutputCss} aria-hidden={isSubtitleTextHidden}>
        {props.children}
      </p>
    </div>
  );
}
ApplicationSubtitleText.propTypes = {
  /* The alignment of the subtitle text content. The text by default will be left aligned but can be centre aligned at all times. */
  alignment: PropTypes.oneOf([ 'centre', 'left' ]),
  /** The unique identifier of the ApplicationTitleText component alongside which this subtitle text component is rendered. */
  applicationTitleTextId: PropTypes.string,
  /** The content to be displayed as the subtitle text. */
  children: PropTypes.string,
  /** The unique identifier of the Header component in which this subtitle text component is rendered. */
  headerId: PropTypes.string,
  /** The unique identifier for this component. */
  id: PropTypes.string.isRequired,
  /** The colour of the text to be displayed, either in a black or white colour. By default the black colour is pre-selected. */
  textColour: PropTypes.oneOf([ 'black', 'white' ]),
};
export default ApplicationSubtitleText;
