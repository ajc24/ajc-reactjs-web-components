/**
 * Developed by Anthony Cox in 2025
 */
import PropTypes from 'prop-types';
import BaseHeaderTall from '../base/BaseHeaderTall.jsx';
import InformativeImage from '../images/InformativeImage.jsx';
import './css/header.css';

/**
 * Tall Header component with logo image. This header component auto-handles screen widths from the most commonly used mobile screen sizes (360x800)
 * to the most commonly used desktop sizes (1920x1080). The height of the header component is 320px.
 * 
 * The logo image is a centrally aligned informative image rendered within the tall header and is set to a maximum of 328px in width and 304px in
 * height to cater for the smallest supported screen size.
 */
const HeaderTallLogo = props => {
  const containerCss = 'tall-header-logo-container';

  return (
    <BaseHeaderTall backgroundColour={props.backgroundColour} id={`${props.id}--header-tall-logo`}>
      <div className={containerCss}>
        <InformativeImage alt={props.alt} height="304" id={props.id} src={props.src} width="328" />
      </div>
    </BaseHeaderTall>
  );
}
HeaderTallLogo.propTypes = {
  /** The alternate text to be attached to the image and read out by screen readers. */
  alt: PropTypes.string.isRequired,
  /** The background colour for the tall header. The default colour for the background is white. */
  backgroundColour: PropTypes.oneOf([ 'white', 'grey' ]),
  /** The unique identifier for the tall header. */
  id: PropTypes.string.isRequired,
  /** The image data to be displayed as the tall header logo. */
  src: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]).isRequired,
};
export default HeaderTallLogo;
