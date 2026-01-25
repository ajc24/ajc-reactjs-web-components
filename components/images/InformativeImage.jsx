/**
 * Developed by Anthony Cox in 2025
 */
import PropTypes from 'prop-types';
import { BaseImage } from '../';

/**
 * Informative Image component which describes an image which is used to provide information to a user in a web application.
 * The height and width of the image are fully customisable as is the alt text.
 * On click events are fully disabled.
 */
const InformativeImage = props => {
  return (
    <BaseImage id={`${props.id}--informative-image`} src={props.src} height={props.height} width={props.width} alt={props.alt} onClick={undefined} />
  );
}
InformativeImage.propTypes = {
  /** The alternate text to be attached to the image and read out by screen readers. */
  alt: PropTypes.string.isRequired,
  /** The height of the image. */
  height: PropTypes.number,
  /** The unique identifier for this component. */
  id: PropTypes.string.isRequired,
  /** The image data to be displayed. */
  src: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]).isRequired,
  /** The width of the image. */
  width: PropTypes.number,
};
export default InformativeImage;
