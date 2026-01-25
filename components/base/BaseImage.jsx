/**
 * Developed by Anthony Cox in 2025
 */
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './css/base-image.css';

const defaultHeightAndWidth = 100;

/**
 * Baseline component for rendering images in the application.
 * This component allows for images to be fully customised in a variety of ways.
 */
const BaseImage = props => {
  /* Set the reference to the base image component */
  const baseImageRef = useRef(null);

  useEffect(() => {
    /* Set the functionality to be executed when the on load event is fired */
    baseImageRef.current.addEventListener('load', onLoadSetImageOpacityToVisible);

    /* Set the functionality to be executed when the on mouse down event is fired */
    if (props.onClick !== undefined) {
      baseImageRef.current.addEventListener('mousedown', mouseDownCustomFunction);
    } else {
      baseImageRef.current.addEventListener('mousedown', mouseDownDisableLeftAndCenterClickEvents);
    }
  }, []);

  /**
   * Executes the custom specified functionality for left click events on the image
   * @param {Event} event 
   */
  const mouseDownCustomFunction = event => {
    mouseDownDisableLeftAndCenterClickEvents(event);
    if (event.button === 0) {
      /* Only execute the custom functionality for left click events */
      props.onClick();
    }
  };

  /**
   * Disables all default mouse down events on the image for center (scroll wheel) and left mouse clicks
   * @param {Event} event 
   */
  const mouseDownDisableLeftAndCenterClickEvents = event => {
    if (event.button === 0 || event.button === 1) {
      /* Disable the left click / scroll wheel click action */
      event.preventDefault();
    }
  };

  /**
   * Sets the opacity of the image to visible when the on load event is fired.
   * This function is especially useful when used in conjunction with transitions to fade loaded images into view.
   */
  const onLoadSetImageOpacityToVisible = () => {
    baseImageRef.current.style.opacity = 1;
    baseImageRef.current.removeEventListener('load', onLoadSetImageOpacityToVisible);
  };

  /* Set the CSS styling for the image */
  const imageCss = 'image';

  /* Set the alternative text for the image - assume a decorative image and only change if it is an informative or functional image */
  let altText = '';
  if (props.alt !== undefined) {
    altText = `${props.alt}`;
  }
  /* Set the size for the image - assume a default size or set the custom size if provided */
  let imageHeight = defaultHeightAndWidth;
  let imageWidth = defaultHeightAndWidth;
  if (props.height !== undefined) {
    /* Set the custom height for the image */
    imageHeight = props.height;
  }
  if (props.width !== undefined) {
    /* Set the custom width for the image */
    imageWidth = props.width;
  }  
  return (
    <img id={props.id !== undefined ? props.id : 'default--base-image'} className={imageCss} src={props.src} width={imageWidth} height={imageHeight} alt={altText}
      ref={baseImageRef} />
  );
}
BaseImage.propTypes = {
  /** The alternate text to be attached to the image and read out by screen readers. */
  alt: PropTypes.string,
  /** The height of the image. */
  height: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  /** The unique identifier for this component. */
  id: PropTypes.string,
  /** The custom functionality to be executed when the mouse down on image event is fired. */
  onClick: PropTypes.func,
  /** The image data to be displayed. */
  src: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]).isRequired,
  /** The width of the image. */
  width: PropTypes.number,
};
export default BaseImage;
