/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import PropTypes from 'prop-types';
import BaseFooter from '../base/BaseFooter.jsx';
import './css/footer.css';

/**
 * A very basic / simple Footer component which is intended to render a single line of information / text content
 * as supporting information to the web page content or the web application itself.
 * 
 * The text will be centrally aligned both vertically and horizontally within the footer and can be rendered in bold if desired.
 */
const Footer = props => {
  let containerCss = 'footer-small-container';
  props.isBoldFont === true ? containerCss += ' footer-small-font-bold' : containerCss += ' footer-small-font-not-bold';

  return (
    <BaseFooter backgroundColour={props.backgroundColour} id={`${props.id}--footer`}>
      <div className={containerCss}>
        {
          props.isBoldFont === undefined &&
            <React.Fragment>{props.children}</React.Fragment>
        }
        {
          props.isBoldFont !== undefined && props.isBoldFont === true &&
            <b>{props.children}</b>
        }
        {
          props.isBoldFont !== undefined && props.isBoldFont === false &&
            <React.Fragment>{props.children}</React.Fragment>
        }
      </div>
    </BaseFooter>
  );
}
Footer.propTypes = {
  /** The background colour for the footer. The default colour for the background is white. */
  backgroundColour: PropTypes.oneOf([ 'white', 'grey' ]),
  /** The text content to be displayed within the footer. */
  children: PropTypes.string,
  /** The unique identifier for the footer. */
  id: PropTypes.string.isRequired,
  /** If enabled the footers text content will be rendered in bold. This setting is disabled by default. */
  isBoldFont: PropTypes.bool,
};
export default Footer;
