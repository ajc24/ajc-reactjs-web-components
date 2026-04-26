/**
 * Developed by Anthony Cox in 2026
 */
import React from 'react';
import PropTypes from 'prop-types';
import Paragraph from '../text/Paragraph.jsx';
import './css/dialog-content.css';
import '../css/common.css';

/**
 * Dialog Content component which renders the content of a dialog. The content is left aligned at all times.
 * You may render a number of different components within the dialog, specified via a list of json and via the **contentData** property.
 * 
 * It is intended for use with the Dialog component.
 */
const DialogContent = props => {
  /* Set the styling for the dialog content container element */
  let containerCss = 'dialog-content-container';
  props.backgroundColour === 'grey' ? containerCss += ' background-grey-body' : containerCss += ' background-white';

  /* Set the styling for the dialog content inner container element */
  const innerContentCss = 'dialog-content-inner screen-width-content-inner';

  return (
    <div id={`${props.id}--dialog-content`} className={containerCss}>
      <div className={innerContentCss}>
        {
          props.contentData.map((contentDataItem, index) => {
            const idAndKey = `dialog-content-section-${index}`;
            if (contentDataItem.type === 'paragraph') {
              return <Paragraph alignment="left" id={idAndKey} key={idAndKey}>
                {contentDataItem.content}
              </Paragraph>;
            }
            return null;
          })
        }
      </div>
    </div>
  );
}
DialogContent.propTypes = {
  /** The background colour for the dialog content. The default colour for the background is white. */
  backgroundColour: PropTypes.oneOf([ 'white', 'grey' ]),
  /** The text content to be displayed as the dialogs content. */
  contentData: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
      type: PropTypes.oneOf([ 'paragraph' ]),
    })
  ).isRequired,
  /** The unique identifier for the dialogs content. */
  id: PropTypes.string.isRequired,
};
export default DialogContent;
