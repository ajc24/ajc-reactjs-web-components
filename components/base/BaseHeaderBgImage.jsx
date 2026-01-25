/**
 * Developed by Anthony Cox in 2025
 */
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import BaseHeader from './BaseHeader.jsx';

const defaultId = 'default--base-header-bg-image';

/**
 * Baseline component setting the template for all Header with background image components to be developed from.
 * This baseline auto-handles screen widths from the most commonly used mobile screen sizes (360x800) to the most commonly used desktop sizes (1920x1080).
 * The default height of the component is 165px.
 */
const BaseHeaderBgImage = props => {
  const headerId = props.id !== undefined ? props.id : defaultId;

  useEffect(() => {
    /* Set the background image to the outer content element */
    const headerOuterContentElement = document.querySelector(`header[id="${headerId}"] > div[data-headerbgimage]`);
    headerOuterContentElement.style.backgroundImage = `url(${props.backgroundImageSrc})`;
    headerOuterContentElement.dataset.headerbgimage = 'true';
  }, []);

  return (
    <BaseHeader backgroundColour="white" id={headerId}>
      {props.children}
    </BaseHeader>
  );
}
BaseHeaderBgImage.propTypes = {
  /** The background image data to be displayed. Your background image should be tailored to suit the dimensions of 1920x165. */
  backgroundImageSrc: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]).isRequired,
  /** The content to be displayed within the header component. */
  children: PropTypes.any,
  /** The unique identifier for the header. */
  id: PropTypes.string,
};
export default BaseHeaderBgImage;
