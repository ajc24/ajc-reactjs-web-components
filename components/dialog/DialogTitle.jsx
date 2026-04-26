/**
 * Developed by Anthony Cox in 2026
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Heading from '../text/Heading.jsx';
import { HTMLElementManager } from '../modules';
import './css/dialog-title.css';
import '../css/common.css';

const maximumHeadingHeight = 45;

/* Set up the component managers for this component */
const htmlElementManager = new HTMLElementManager();
htmlElementManager.setMaxContainerHeight(maximumHeadingHeight);

/**
 * Dialog Title component which renders a heading intended for use as the title of a dialog. The text content in the
 * heading is left aligned at all times. The font size of the text content is 1em (18px).
 * 
 * It is intended for use with the Dialog component.
 */
const DialogTitle = props => {
  const [init, setInit] = useState(false);

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
   * Gets the dialogs heading DOM element
   * @returns {HTMLElement}
   */
  const getHeading1DOMElement = () => {
    return document.querySelector(`[id^="${props.id}--dialog-title"]`);
  };

  /**
   * Handles the screen width and accounts for whether the dialog title text content
   * needs to be truncated to fit within the maximum height of the dialog title container.
   */
  const handleScreenWidth = () => {
    htmlElementManager.setDOMElement(getHeading1DOMElement());
    htmlElementManager.truncateElementTextContentByContainerHeight();
  }

  /* Set the styling for the dialog title container element */
  let containerCss = 'dialog-title-container';
  props.backgroundColour === 'grey' ? containerCss += ' background-grey-body' : containerCss += ' background-white';

  /* Set the styling for the dialog title inner container element */
  const innerContentCss = 'dialog-title-content-inner screen-width-content-inner';

  return (
    <div className={containerCss}>
      <div className={innerContentCss}>
        <Heading alignment="left" id={`${props.id}--dialog-title`} isDialogTitle={true}>
          {props.children}
        </Heading>
      </div>
    </div>
  );
}
DialogTitle.propTypes = {
  /** The background colour for the dialog title. The default colour for the background is white. */
  backgroundColour: PropTypes.oneOf([ 'white', 'grey' ]),
  /** The text content to be displayed as the dialogs title. */
  children: PropTypes.string,
  /** The unique identifier for the dialogs title. */
  id: PropTypes.string.isRequired,
};
export default DialogTitle;
