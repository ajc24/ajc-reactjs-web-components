/**
 * Developed by Anthony Cox in 2025
 */
import PropTypes from 'prop-types';
import BaseHeader from './BaseHeader.jsx';

/**
 * Baseline component setting the template for all tall Header components to be developed from.
 * This baseline auto-handles screen widths from the most commonly used mobile screen sizes (360x800) to the most commonly used desktop sizes (1920x1080).
 * The default height of the component is 320px.
 */
const BaseHeaderTall = props => {
  return (
    <BaseHeader backgroundColour={props.backgroundColour} id={props.id !== undefined ? props.id : 'default--base-header-tall'}
      customSizeClass="header-size-tall">
        {props.children}
    </BaseHeader>
  );
}
BaseHeaderTall.propTypes = {
  /** The background colour for the header. The default colour for the background is white. */
  backgroundColour: PropTypes.oneOf([ 'white', 'grey' ]),
  /** The content to be displayed within the header component. */
  children: PropTypes.any,
  /** The unique identifier for the header. */
  id: PropTypes.string,
};
export default BaseHeaderTall;
