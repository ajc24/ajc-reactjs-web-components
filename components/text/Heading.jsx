/**
 * Developed by Anthony Cox in 2025
 * 
 * Revisions (April 2026):
 * - Added a boolean switch prop to allow for a heading to be used as a dialog title, which adds the appropriate ARIA attributes to the heading element.
 */
import PropTypes from 'prop-types';
import './css/text-heading.css';
import '../css/common.css';

/**
 * Heading component which renders a heading intended for use with a paragraph of text. The text content in the
 * heading is left aligned by default but can also be displayed centrally if desired. The font size of the
 * text content is 1em (18px).
 */
const Heading = props => {
  let headingCss = 'heading background-transparent font-default font-black';
  props.alignment === 'centre' ? headingCss += ' heading-alignment-centre' : headingCss += ' heading-alignment-left';

  return (
    <h3 aria-label={props.isDialogTitle ? props.children : undefined} className={headingCss} id={props.id !== undefined ? `${props.id}--heading` : undefined}
      title={props.isDialogTitle ? props.children : undefined}>
        {props.children}
    </h3>
  );
}
Heading.propTypes = {
  /* The alignment of the heading text content. The text by default will be left aligned but can be centre aligned at all times. */
  alignment: PropTypes.oneOf([ 'centre', 'left' ]),
  /** The text content to be displayed as the heading. */
  children: PropTypes.string,
   /** The unique identifier for this component. Setting an identifier on heading text content is completely optional. */
  id: PropTypes.string,
   /** Indicates whether this heading is being used as a dialog title. By default, this is false. */
  isDialogTitle: PropTypes.bool,
};
export default Heading;
