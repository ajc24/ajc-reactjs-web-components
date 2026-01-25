/**
 * Developed by Anthony Cox in 2025
 */
import PropTypes from 'prop-types';
import './css/text-paragraph.css';
import '../css/common.css';

/**
 * Paragraph component which renders a simple paragraph of text content to the user. The text content in the
 * paragraph is left aligned by default but can also be displayed centrally if desired. The font size of the
 * text content is 1em (16px).
 */
const Paragraph = props => {
  let paragraphCss = 'paragraph background-transparent font-default font-black';
  props.alignment === 'centre' ? paragraphCss += ' paragraph-alignment-centre' : paragraphCss += ' paragraph-alignment-left';

  return (
    <p className={paragraphCss} id={props.id !== undefined ? `${props.id}--paragraph` : undefined}>
      {props.children}
    </p>
  );
}
Paragraph.propTypes = {
  /* The alignment of the paragraph text content. The text by default will be left aligned but can be centre aligned at all times. */
  alignment: PropTypes.oneOf([ 'centre', 'left' ]),
  /** The text content to be displayed inside the paragraph. */
  children: PropTypes.string,
   /** The unique identifier for this component. Setting an identifier on paragraph text content is completely optional. */
  id: PropTypes.string,
};
export default Paragraph;
