/**
 * Developed by Anthony Cox in 2025
 */
import PropTypes from 'prop-types';
import ApplicationSubtitleText from '../text/ApplicationSubtitleText.jsx';
import ApplicationTitleText from '../text/ApplicationTitleText.jsx';
import BaseHeaderBgImage from '../base/BaseHeaderBgImage.jsx';
import DecorativeImage from '../images/DecorativeImage.jsx';
import './css/header.css';

/**
 * Header All component which renders a small header that includes all supported features: it will have a background image, it will have a logo image,
 * it will contain both application title and subtitle text content. Every component rendered within this header will be left aligned.
 *
 * This header component auto-handles screen widths from the most commonly used mobile screen sizes (360x800) to the most commonly used desktop sizes (1920x1080).
 * The height of the header component is 165px.
 * 
 * Since the logo image is supported by the application title text and subtitle text, the image type for the logo is automatically set to that of
 * a decorative image type.
 */
const HeaderAll = props => {
  const containerCss = 'header-all-container';
  const logoContainerCss = 'header-all-logo-container';
  const textContainerCss = 'header-all-text-container';
  const textSpacingCss = 'header-all-text-spacing';

  return (
    <BaseHeaderBgImage backgroundImageSrc={props.backgroundImageSrc} id={`${props.id}--header-all`}>
      <div className={containerCss}>
        <div id={`${props.id}--header-all--logo-container`} className={logoContainerCss}>
          <DecorativeImage height="133" id={props.id} src={props.logoImageSrc} width="133" />
        </div>
        <div id={`${props.id}--header-all--text-container`} className={textContainerCss}>
          <ApplicationTitleText alignment="left" headerId={props.id} id={props.id} textColour={props.titleTextColour}>
            {props.titleTextContent}
          </ApplicationTitleText>
          <ApplicationSubtitleText alignment="left" applicationTitleTextId={props.id} headerId={props.id} id={props.id} textColour={props.subtitleTextColour}>
            {props.subtitleTextContent}
          </ApplicationSubtitleText>
        </div>
      </div>
    </BaseHeaderBgImage>
  );
}
HeaderAll.propTypes = {
  /** The background image data to be displayed. Your background image should be tailored to suit the dimensions of 1920x165. */
  backgroundImageSrc: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]).isRequired,
  /** The unique identifier for the header. */
  id: PropTypes.string.isRequired,
  /** The image data to be displayed as the header logo. */
  logoImageSrc: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]).isRequired,
  /** The colour of the subtitle text content to be displayed, either that of black with a white outline or white with a black outline. By default the black colour is pre-selected. */
  subtitleTextColour: PropTypes.oneOf([ 'black', 'white' ]),
  /** The text content to be rendered as the subtitle text. */
  subtitleTextContent: PropTypes.string.isRequired,
  /** The colour of the title text content to be displayed, either that of black with a white outline or white with a black outline. By default black with a while outline is pre-selected. */
  titleTextColour: PropTypes.oneOf([ 'black', 'white' ]),
  /** The text content to be rendered as the title text. */
  titleTextContent: PropTypes.string.isRequired,
};
export default HeaderAll;
