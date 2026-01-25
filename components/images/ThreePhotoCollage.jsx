/**
 * Developed by Anthony Cox in 2025
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InformativeImage from './InformativeImage.jsx';
import {
  divide_Integer,
  getBoundingClientRect,
  multiply_Integer,
} from '../data/dom-measurements';
import './css/image-three-photo-collage.css';

const initialMarginTop = 65;
const maximumImageWidth = 620;

/**
 * Three Photo Collage component which is intended for use inside the Main component in the web application. Renders three photos in a collage
 * with two photos being placed side by side in the upper section of the collage and a single photo overlapping them slightly in the lower section.
 * 
 * This component auto-handles screen widths from the most commonly used mobile screen sizes (360x800) to the most commonly used desktop sizes (1920x1080)
 * and will automatically adjust the heights and widths of the images to suit the current screen size.
 */
const ThreePhotoCollage = props => {
  const [ height, setHeight ] = useState(0);
  const [ width, setWidth ] = useState(0);

  useEffect(() => {
    /* Auto handle the initial screen size after a slight pause to give the page time to load */
    setTimeout(() => {
      handleWindowResize(true);
    }, 50);

    /* For all future screen resize events, ensure that the image dimensions are handled correctly */
    window.addEventListener('resize', handleWindowResize);
  }, []);

  /**
   * Retrieves the ID set to the lower image container element
   * @returns {string}
   */
  const getIdLowerImageContainerDOMElement = () => {
    return `${props.id}--lower-section--three-photo-collage`;
  };

  /**
   * Retrieves the ID set to the root container element
   * @returns {string}
   */
  const getIdRootContainerDOMElement = () => {
    return `${props.id}--three-photo-collage`;
  };

  /**
   * Retrieves the ID set to the upper images container element
   * @returns {string}
   */
  const getIdUpperImagesContainerDOMElement = () => {
    return `${props.id}--upper-section--three-photo-collage`;
  };

  /**
   * Retrieves the DOM element for the lower image container element
   * @returns {HTMLElement}
   */
  const getLowerImageContainerDOMElement = () => {
    return document.querySelector(`div[id="${getIdLowerImageContainerDOMElement()}"]`);
  };

  /**
   * Retrieves the DOM element for the root container element
   * @returns {HTMLElement}
   */
  const getRootContainerDOMElement = () => {
    return document.querySelector(`div[id="${getIdRootContainerDOMElement()}"]`);
  };

  /**
   * Retrieves the DOM element for the right sided upper image container element
   * @returns {HTMLElement}
   */
  const getUpperImageRightContainerDOMElement = () => {
    return document.querySelector(`div[id="${getIdUpperImagesContainerDOMElement()}"] > div[class*="three-photo-collage--upper-image-right"]`);
  };

  /**
   * Handler for screen resize events - the images width and height need to be determined based on the new screen size
   * @param {boolean} onLoadPage
   */
  const handleWindowResize = (onLoadPage = false) => {
    const rightUpperImageContainerElement = getUpperImageRightContainerDOMElement();
    if (rightUpperImageContainerElement !== null) {
      /* Get the full width of the image container */
      const imageContainerDimensions = getBoundingClientRect(rightUpperImageContainerElement);
      const imageContainerWidth = imageContainerDimensions.width;

      /* Get the lower image container element */
      const lowerImageContainerElement = getLowerImageContainerDOMElement();

      /* For every 15 pixels less than the maximum permitted width - reduce the margin top allowance by 1px */
      const imagePixelReduction = maximumImageWidth - imageContainerWidth;
      const marginTopPixelReduction = divide_Integer(imagePixelReduction, 15);
      const marginTop = `-${initialMarginTop - marginTopPixelReduction}px`;

      /* Set the new margin top CSS value to the lower image container element */
      lowerImageContainerElement.style.marginTop = marginTop;
      
      /* Set the height and width of the images based on the current container width */
      setHeight(multiply_Integer(imageContainerWidth, 0.75));
      setWidth(imageContainerWidth);

      if (onLoadPage === true) {
        const rootContainerElement = getRootContainerDOMElement();
        rootContainerElement.style.opacity = 1;
      }
    }
  };

  /* Set the styling for the root element */
  const rootCss = 'three-photo-collage-root';

  /* Set the styling for the upper images container element */
  const upperImagesContainerCss = 'three-photo-collage-upper-images-container';

  /* Set the styling for the leftmost image container in the upper images container element */
  const upperImageLeftContainerCss = 'three-photo-collage--upper-image-left three-photo-collage-image-container three-photo-collage-image-container-spacing';

  /* Set the styling for the rightmost image container in the upper images container element */
  const upperImageRightContainerCss = 'three-photo-collage--upper-image-right three-photo-collage-image-container';

  /* Set the styling for the lower image container element */
  const lowerImageContainerCss = 'three-photo-collage-lower-image-container';

  /* Set the styling for the lower image render element */
  let lowerImageRenderCss = '';
  props.borderColour === 'grey' ? lowerImageRenderCss += ' three-photo-collage-image-border-grey' : lowerImageRenderCss += ' three-photo-collage-image-border-white';

  return (
    <div className={rootCss} id={getIdRootContainerDOMElement()}>
      <div className={upperImagesContainerCss} id={getIdUpperImagesContainerDOMElement()}>
        <div className={upperImageLeftContainerCss}>
          <InformativeImage alt={props.imageUpperLeftData.alt} height={height} id={props.id} src={props.imageUpperLeftData.src} width={width} />
        </div>
        <div className={upperImageRightContainerCss}>
          <InformativeImage alt={props.imageUpperRightData.alt} height={height} id={props.id} src={props.imageUpperRightData.src} width={width} />
        </div>
      </div>
      <div className={lowerImageContainerCss} id={getIdLowerImageContainerDOMElement()}>
        <div className={lowerImageRenderCss}>
          <InformativeImage alt={props.imageLowerData.alt} height={height} id={props.id} src={props.imageLowerData.src} width={width} />
        </div>
      </div>
    </div>
  );
}
ThreePhotoCollage.propTypes = {
  /** The border colour used for the collage. Ideally you would set this to match the background colour of the Main component. The default colour for the border is white. */
  borderColour: PropTypes.oneOf([ 'white', 'grey' ]),
  /** The unique identifier for this component. */
  id: PropTypes.string.isRequired,
  /** The data for the image to be rendered centrally in the lower section of the collage. */
  imageLowerData: PropTypes.shape({
    alt: PropTypes.string,
    src: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
  }).isRequired,
  /** The data for the image to be rendered to the left side of the upper section of the collage. */
  imageUpperLeftData: PropTypes.shape({
    alt: PropTypes.string,
    src: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
  }).isRequired,
  /** The data for the image to be rendered to the right side of the upper section of the collage. */
  imageUpperRightData: PropTypes.shape({
    alt: PropTypes.string,
    src: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
  }).isRequired,
};
export default ThreePhotoCollage;
