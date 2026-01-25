/**
 * Developed by Anthony Cox in 2025
 */
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { PageTemplateConfig } from '../modules';
import { getColourCombination } from '../data/colour-combinations';
import '../css/common.css';
import './css/base-footer.css';

/**
 * Baseline component setting the template for all Footer components to be developed from.
 * This baseline auto-handles screen widths from the most commonly used mobile screen sizes (360x800) to the most commonly used desktop sizes (1920x1080).
 * 
 * The minimum height of the component is 55px, expanding to whatever height is suitable for the content within.
 */
const BaseFooter = props => {
  useEffect(() => {
    /* Setup the default CSS styling for the page which is rendering this component */
    PageTemplateConfig.setupDocumentBodyCss();
  }, []);

  /* Determine the background colour and font colour for the component - setting white background colour with black font text colour as the default */
  const { backgroundColour, fontColour } = getColourCombination(props.backgroundColour);

  /* Set the styling for the navigation element */
  const footerCss = `footer-root screen-width-root background-white font-default font-${fontColour}`;

  /* Set the styling for the outer content element */
  const outerContentCss = `footer-outer screen-width-content-outer background-${backgroundColour}`;

  /* Set the styling for the inner content element */
  const innerContentCss = 'footer-inner screen-width-content-inner';
  return (
    <footer role="contentinfo" id={props.id !== undefined ? props.id : 'default--base-footer'} className={footerCss}>
      <div className={outerContentCss}>
        <div className={innerContentCss}>
          {props.children}
        </div>
      </div>
    </footer>
  );
}
BaseFooter.propTypes = {
  /** The background colour for the footer. The default colour for the background is white. */
  backgroundColour: PropTypes.oneOf([ 'gold', 'green', 'grey', 'navy-and-gold', 'navy-and-white', 'red', 'white' ]),
  /** The content to be displayed within the footer template component. */
  children: PropTypes.any,
  /** The unique identifier for this component. */
  id: PropTypes.string,
};
export default BaseFooter;
