/**
 * Developed by Anthony Cox in 2025
 */
import PropTypes from 'prop-types';
import { BaseFileInput } from '../../components';

/**
 * File upload PDF component allows a user to select a PDF document file from their local machine with the intention of uploading the file to the server.
 * 
 * The file upload PDF component can be enabled or disabled, it can also be rendered in an error state with an error message in the case of a form validation issue. This
 * component can be rendered in a number of different colour themes, matching the same colours used by other components. The accepted size of the file to be uploaded is fully
 * customisable and is set to a default of 20MB. Finally this component is left aligned by default but can also be centrally aligned if desired.
 *
 * The file upload PDF component is intended for use with the Main component.
 */
const FileUploadPdf = props => {
  return <BaseFileInput accept="pdf" alignment={props.alignment || 'left'} backgroundColour={props.backgroundColour || 'white'} defaultFileData={props.defaultFileData}
    defaultFileName={props.defaultFileName} errorMessage={props.errorMessage} fileSizeLimit={props.fileSizeLimit} id={`${props.id}--file-upload-pdf`}
    isDisabled={props.isDisabled || false} isOptional={props.isOptional || false} label={props.label} name={props.name} />;
}
FileUploadPdf.propTypes = {
  /** The alignment of the file uploader component. All elements in this component by default will be left aligned but can be centre aligned if desired. */
  alignment: PropTypes.oneOf([ 'centre', 'left' ]),
  /** The background colour for the file uploader component. The default colour for the component is white. */
  backgroundColour: PropTypes.oneOf([ 'gold', 'green', 'grey', 'navy-and-gold', 'navy-and-white', 'red', 'white' ]),
  /** The default file data set to the file uploader component. This property expects to receive either the imported file data or the path to the file. */
  defaultFileData: PropTypes.oneOf([ PropTypes.object, PropTypes.string ]),
  /** The file name for the default data file. */
  defaultFileName: PropTypes.string,
  /** The error message to be output beneath the base file input component. If an error message is to be output then the base file input container will also be put into an error state. */
  errorMessage: PropTypes.string,
  /** The file size (in KB) which will serve as the maximum permitted file size for upload. The default maximum file size is 20480KB (20MB). */
  fileSizeLimit: PropTypes.number,
  /** The unique identifier for this component. */
  id: PropTypes.string.isRequired,
  /** Switch to set whether the file uploaders radio buttons and selection button are disabled or not. By default all buttons are enabled. */
  isDisabled: PropTypes.bool,
  /** Switch to set whether this component is an optional field in a form or not. By default this component is not labelled as optional. */
  isOptional: PropTypes.bool,
  /** The label text content for the file uploader component. */
  label: PropTypes.string.isRequired,
  /** The name attribute value to be set to the file uploader component */
  name: PropTypes.string,
};
export default FileUploadPdf;
