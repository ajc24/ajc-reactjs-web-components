/**
 * Developed by Anthony Cox in 2025
 */
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getColourCombination } from '../data/colour-combinations';
import {
  HTMLElementManager,
  MouseEventManager,
} from '../modules';
import './css/base-button.css';
import '../css/common.css';

const maximumBaseButtonTextContentHeight = 45;

const htmlElementManager = new HTMLElementManager();
htmlElementManager.setMaxContainerHeight(maximumBaseButtonTextContentHeight);

const mouseEventManager = new MouseEventManager();

/**
 * Base button component allowing for a render of a Button or Submit button type in a form in a web application.
 * 
 * The button can be rendered in a range of different background colours to match the colours chosen for the Menu Bar
 * and Footer components in the UI. Custom onClick functionality can also be specified. This component is also fully keyboard
 * accessible and can be rendered in a disabled state where desired.
 * 
 * The base button component can be rendered standalone but is intended for use within the Main component.
 */
const BaseButton = props => {
  useEffect(() => {
    /* Ensure the text content assigned to the button does not exceed the boundary of the button */
    handleTextContentHeight();
  }, []);

  /**
   * Retrieves the buttons inner span element from the DOM
   * @returns {HTMLElement}
   */
  const getSpanDOMElement = () => {
    return document.querySelector(`button[id="${props.id}--base-button"] > span`);
  };

  /**
   * Handles click events on the button. Only left click events are supported.
   * @param {Event} event 
   */
  const handleClickButton = event => {
    mouseEventManager.setEvent(event);
    mouseEventManager.preventDefault();
    if (mouseEventManager.isLeftClickEvent() === true && props.onClick !== undefined) {
      /* Only execute the custom functionality for left click events */
      props.onClick();
    }
  };

  /**
   * Handles the height of the buttons text content. The height of the text content
   * should not exceed the height of the button container itself.
   */
  const handleTextContentHeight = () => {
    htmlElementManager.setDOMElement(getSpanDOMElement());
    htmlElementManager.truncateElementTextContentByContainerHeight();
  };

  /* Determine the background colour and font colour for the component - setting white background colour with black font text colour as the default */
  const { backgroundColour, fontColour } = getColourCombination(props.backgroundColour);

  /* Set the styling for the container element */
  let containerCss = 'button-container';
  props.addRightSideSpacing === true ? containerCss += ' button-container-right-side-spacing' : containerCss += '';
  props.isDisabled === true ? containerCss += ' button-standard-disabled' : containerCss += ' button-standard-enabled';

  /* Set the styling for the button element */
  const buttonCss = `button-standard background-${backgroundColour} font-default font-${fontColour}`;

  /* Set the styling for the button span element */
  const buttonSpanCss = 'button-standard-span';

  return (
    <div className={containerCss}>
      <button aria-disabled={props.isDisabled || false} aria-label={`${props.children}`} className={buttonCss} disabled={props.isDisabled || false}
        id={`${props.id}--base-button`} onClick={handleClickButton} tabIndex={props.isDisabled === true ? '-1' : '0'} title={`${props.children}`}
        type={props.type === 'submit' ? 'submit' : 'button'}>
          <span className={buttonSpanCss}>
            {props.children}
          </span>
      </button>
    </div>
  );
}
BaseButton.propTypes = {
  /** Optional right side spacing (margin) of 8px to be used when separating multiple button components. By default this spacing is disabled. */
  addRightSideSpacing: PropTypes.bool,
  /** The background colour for the button component. The default colour for the background is white. */
  backgroundColour: PropTypes.oneOf([ 'gold', 'green', 'grey', 'navy-and-gold', 'navy-and-white', 'red', 'white' ]),
  /** The text label to be set to the button. */
  children: PropTypes.string.isRequired,
  /** The unique identifier for this component. */
  id: PropTypes.string.isRequired,
  /** Switch to set whether the component is disabled or not. By default the component is enabled. */
  isDisabled: PropTypes.bool,
  /** Custom onClick functionality to be set to the button. */
  onClick: PropTypes.func,
  /** The type of the button to be rendered. By default a "button" type is pre-selected but you can also choose a "submit" button for rendering in forms. */
  type: PropTypes.oneOf([ 'button', 'submit' ]),
}
export default BaseButton;
