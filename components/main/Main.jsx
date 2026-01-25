/**
 * Developed by Anthony Cox in 2025
 */
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import PageTemplateConfig from '../modules/PageTemplateConfig';
import '../css/common.css';
import './css/main.css';

/**
 * Main component in which all of the main web application page content can be rendered.
 * This component auto-handles screen widths from the most commonly used mobile screen sizes (360x800) to the most commonly used desktop sizes (1920x1080).
 * 
 * The minimum height of the component is 370px which suits rendering on mobile devices. This minimum height will expand to fit larger sizes and render
 * more content as and when required.
 */
const Main = props => {
  useEffect(() => {
    /* Setup the default CSS styling for the page which is rendering this component */
    PageTemplateConfig.setupDocumentBodyCss();

    /* Set the title for the current web page only if it has not already been set */
    document.title = props.title;
  }, []);

  /* Set the styling for the main element */
  const mainCss = 'main-root screen-width-root background-white font-default font-black';

  /* Set the styling for the outer content element */
  let outerContentCss = 'main-outer screen-width-content-outer';
  props.backgroundColour === 'grey' ? outerContentCss += ' background-grey-body' : outerContentCss += ' background-white';

  /* Set the styling for the inner content element */
  const innerContentCss = 'main-inner screen-width-content-inner';
  return (
    <main id={props.id !== undefined ? props.id : 'default--main'} className={mainCss} aria-label={props.title}>
      <div className={outerContentCss}>
        <div className={innerContentCss}>
          {props.children}
        </div>
      </div>
    </main>
  );
}
Main.propTypes = {
  /** The background colour for the main content area. The default colour for the background is white. */
  backgroundColour: PropTypes.oneOf([ 'white', 'grey' ]),
  /** The content to be displayed within the main content area. */
  children: PropTypes.any,
  /** The unique identifier for this component. */
  id: PropTypes.string,
  /** The title of the current web page being displayed. This title will be rendered in the browser tab. */
  title: PropTypes.string.isRequired,
};
export default Main;
