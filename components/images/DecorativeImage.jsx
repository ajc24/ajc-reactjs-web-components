/**
 * Developed by Anthony Cox in 2025
 */
import PropTypes from 'prop-types';
import { BaseImage } from '../';

/**
 * Decorative Image component which describes an image which is used solely for decoration in a web application.
 * The height and width of the image are fully customisable. You can not define alt text for this image.
 * On click events are fully disabled.
 */
const DecorativeImage = props => {
  return (
    <BaseImage id={`${props.id}--decorative-image`} src={props.src} height={props.height} width={props.width} alt="" onClick={undefined} />
  );
}
DecorativeImage.propTypes = {
  /** The height of the image. */
  height: PropTypes.number,
  /** The unique identifier for this component. */
  id: PropTypes.string.isRequired,
  /** The image data to be displayed. */
  src: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]).isRequired,
  /** The width of the image. */
  width: PropTypes.number,
};
export default DecorativeImage;
