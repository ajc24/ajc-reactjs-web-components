/**
 * Developed by Anthony Cox in 2025
 */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../form/Button.jsx';
import ImagePreview from '../images/ImagePreview.jsx';
import Paragraph from '../text/Paragraph.jsx';
import './css/base-file-input.css';
import '../css/common.css';
import { handleOptionalFormFieldTextContent } from '../data/form-functions.js';

/* Data for which file types are accepted by the file input element */
const acceptListData = {
  images: {
    extensions: '.png, .jpeg, .jpg',
    types: 'image/png, image/jpeg, image/jpg',
  },
  pdf: {
    extensions: '.pdf',
    types: 'application/pdf',
  },
};
const defaultMaximumFileSize = (20 * 1024);

/**
 * The base file input component allows a user to select a file from their local machine with the intention of uploading the file to the server. This component supports two
 * file types for upload: image files and PDF files.
 * 
 * The base file input component can be enabled or disabled, it can also be rendered in an error state with an error message in the case of a form validation issue. This
 * component can be rendered in a number of different colour themes, matching the same colours used by other components. The accepted size of the file to be uploaded is fully
 * customisable and is set to a default of 20MB. Finally this component is left aligned by default but can also be centrally aligned if desired.
 *
 * The base file input component is intended for use with the Main component.
 */
const BaseFileInput = props => {
  const [ acceptList, setAcceptList ] = useState(acceptListData.images.extensions);
  const [ fileAttached, setFileAttached ] = useState(false);
  const [ fileError, setFileError ] = useState(undefined);
  const [ fileName, setFileName ] = useState(undefined);
  const [ inputFileValueData, setInputFileValueData ] = useState(undefined);
  const [ maximumFileSize, setMaximumFileSize ] = useState(defaultMaximumFileSize);

  useEffect(() => {
    if (props.accept !== undefined) {
      /* Set the accept property for this component since the developer has specified that the type of file to be supported by the file input element */
      if (props.accept === 'images' || props.accept === 'pdf') {
        setAcceptList(acceptListData[`${props.accept}`].extensions);
      }
    }
    
    if (props.fileSizeLimit !== undefined && props.fileSizeLimit !== maximumFileSize) {
      /* Set a custom defined maximum file size property for this component */
      setMaximumFileSize(props.fileSizeLimit);
    } else {
      /* Set the default maximum file size property */
      setMaximumFileSize(defaultMaximumFileSize);
    }
  }, [ props.accept, props.fileSizeLimit ]);

  /**
   * Clears the input file element of any attached files
   */
  const clearFileInputElementValue = () => {
    /* Clear the value set to the file input element */
    const inputFileElement = getInputFileDOMElement();
    inputFileElement.value = '';
  };

  /**
   * Retrieves the ID for the input file element
   * @returns {string}
   */
  const getIdFileInputElement = () => {
    return `${props.id}--input--file-input`;
  };

  /**
   * Retrieves the ID for the input file label element
   * @returns {string}
   */
  const getIdFileInputLabelElement = () => {
    return `${props.id}--label--file-input`;
  };

  /**
   * Retrieves the input file element from the DOM
   * @returns {HTMLElement}
   */
  const getInputFileDOMElement = () => {
    return document.querySelector(`input[id="${getIdFileInputElement()}"]`);
  };

  /**
   * Handles changes to the input file element. Manages whether a file in the
   * supported type has been set to the input file element or not.
   * 
   * In cases where invalid file types have been selected, the input file element
   * will be cleared of all values
   */
  const handleOnChangeInputFileElement = () => {
    const inputFileElement = getInputFileDOMElement();

    if (inputFileElement.files.length === 1) {
      /* Get the name and extension of the current file from the input file element */
      const uploadFileData = inputFileElement.files[0];
      const uploadFileName = uploadFileData.name;
      const uploadFileSize = Number.parseInt(uploadFileData.size / 1024, 10);
      const uploadFileType = uploadFileData.type;

      /* Determine which "accept" setting is currently being used */
      let acceptTypes = acceptListData.images.types;
      if (acceptList === acceptListData.pdf.extensions) {
        acceptTypes = acceptListData.pdf.types;
      }

      /* Determine whether a valid file type has been set to the input file element */
      let invalidFileOutput = 'The file you have selected is invalid.';
      let isValid = true;
      if (acceptTypes.indexOf(uploadFileType) === -1) {
        isValid = false;
        invalidFileOutput += ` This file format is not supported. This file has an extension of .${uploadFileType.substring(uploadFileType.lastIndexOf('/') + 1)}.`;
        invalidFileOutput += ` The only supported file types are ${acceptList}.`;
      }
      if (uploadFileSize > maximumFileSize) {
        isValid = false;
        invalidFileOutput += ' The size of this file is too large.';
        invalidFileOutput += ` The maximum permitted file size is ${maximumFileSize} KB and this files size is ${uploadFileSize} KB.`;
      }
      if (isValid === true) {
        /* Set all parameters to support a valid file upload */
        setFileAttached(true);
        setFileError(undefined);
        setFileName(uploadFileName);
        setInputFileValueData(uploadFileData);
      } else {
        /* Set all parameters to support an invalid file upload */
        setFileAttached(false);
        setFileError(invalidFileOutput);
        setFileName(undefined);
        setInputFileValueData(undefined);
        clearFileInputElementValue();
      }
    }
  };

  /**
   * Handles click events on the label for the Base File Input component
   * @param {Event} event 
   */
  const handleOnClickLabel = event => {
    /* Disable click events on the label which will otherwise trigger the file upload OS dialog to open regardless of component state */
    event.preventDefault();
  };

  /**
   * Handles click events on the "Remove File" button
   * @param {Event} event 
   */
  const handleOnClickRemoveFileButton = () => {
    if (props.isDisabled !== true) {
      clearFileInputElementValue();
      setFileAttached(false);
      setFileError(undefined);
      setFileName(undefined);
      setInputFileValueData(undefined);
    }
  };

  /**
   * Handles click events on the "Select File" button
   * @param {Event} event 
   */
  const handleOnClickSelectFileButton = () => {
    if (props.isDisabled !== true) {
      const inputFileElement = getInputFileDOMElement();
      inputFileElement.click();
    }
  };

  /* Set the styling for the container element */
  const containerCss = 'file-input-container component-container-width background-transparent';
  
  /* Set the styling for any commonly used inner container elements */
  let commonInnerContainerCss = 'file-input-inner-container';
  props.alignment === 'centre' ? commonInnerContainerCss += ' file-input-alignment-centre' : commonInnerContainerCss += ' file-input-alignment-left';

  /* Set the styling for the label element */
  const labelCss = 'component-label font-label font-black';

  /* Set the styling for the file input element */
  const fileInputCss = 'hidden';

  /* Set the styling for the error container element */
  let errorMessageContainerCss = 'file-input-error-container font-default font-red';
  props.alignment === 'centre' ? errorMessageContainerCss += ' file-input-alignment-centre' : errorMessageContainerCss += ' file-input-alignment-left';
  
  /* Set the error message to be displayed */
  const errorMessageOutput = fileError !== undefined ? fileError : props.errorMessage;

  /* Set the information text for the input file component */
  let paragraphText = '';
  if (fileAttached === true) {
    paragraphText = `Your selected file is ready: ${fileName}`;
  } else {
    if (acceptList === acceptListData.pdf.extensions) {
      paragraphText = 'Click the button below to select a file in .pdf format.';
    } else {
      paragraphText = 'Click the button below to select an image file in .png, .jpeg or .jpg formats.';
    }
  }
  
  return (
    <div className={containerCss}>
      <div className={commonInnerContainerCss}>
        <label className={labelCss} htmlFor={getIdFileInputElement()} id={getIdFileInputLabelElement()} onClick={handleOnClickLabel} tabIndex="-1">
          {handleOptionalFormFieldTextContent(props.label, props.isOptionalFormField)}
        </label>
      </div>
      <ImagePreview alignment={props.alignment} backgroundColour={props.backgroundColour} filePreviewType={props.accept !== undefined ? props.accept : 'images'}
        id={`${props.id}--base-file-input`} inputFileValue={inputFileValueData} isDisabled={props.isDisabled}
        isInvalidFile={(fileError !== undefined || props.errorMessage !== undefined)} />
      <input accept={acceptList} aria-hidden="true" aria-labelledby={getIdFileInputLabelElement()} className={fileInputCss} id={getIdFileInputElement()}
        onChange={handleOnChangeInputFileElement} name={props.name} tabIndex="-1" type="file" />
      <Paragraph alignment={props.alignment} id={`${props.id}--information--file-input`}>
        {paragraphText}
      </Paragraph>
      {
        fileAttached === true &&
          <Button alignment={props.alignment} backgroundColour={props.backgroundColour} id={`${props.id}--remove-file`} isDisabled={props.isDisabled}
            onClick={handleOnClickRemoveFileButton}>
              Remove File
          </Button>
      }
      {
        fileAttached === false &&
          <Button alignment={props.alignment} backgroundColour={props.backgroundColour} id={`${props.id}--select-file`} isDisabled={props.isDisabled}
            onClick={handleOnClickSelectFileButton}>
              Select File
          </Button>
      }
      {
        (props.errorMessage !== undefined || fileError !== undefined) &&
          <div className={errorMessageContainerCss}>
            <span id={`${props.id}--file-input-error-message`}>
              {errorMessageOutput}
            </span>
          </div>
      }
    </div>
  );
}
BaseFileInput.propTypes = {
  /** The file types to be accepted by the file input component. By default a file input that accepts images is rendered. */
  accept: PropTypes.oneOf([ 'images', 'pdf' ]),
  /** The alignment of the file input component. The file input and its label by default will be left aligned but can be centre aligned if desired. */
  alignment: PropTypes.oneOf([ 'centre', 'left' ]),
  /** The background colour for the base file input component. The default colour for the component is white. */
  backgroundColour: PropTypes.oneOf([ 'gold', 'green', 'grey', 'navy-and-gold', 'navy-and-white', 'red', 'white' ]),
  /** The error message to be output beneath the base file input component. If an error message is to be output then the base file input container will also be put into an error state. */
  errorMessage: PropTypes.string,
  /** The file size (in KB) which will serve as the maximum permitted file size for upload. The default maximum file size is 20480KB (20MB). */
  fileSizeLimit: PropTypes.number,
  /** The unique identifier for this component. */
  id: PropTypes.string.isRequired,
  /** Switch to set whether the base file inputs radio buttons and selection button are disabled or not. By default all buttons are enabled. */
  isDisabled: PropTypes.bool,
  /** Switch to set whether this component is an optional field in a form or not. By default this component is not labelled as optional */
  isOptionalFormField: PropTypes.bool,
  /** The label text content to be linked to the file input component. */
  label: PropTypes.string.isRequired,
  /** The name attribute value to be set to the file input component */
  name: PropTypes.string,
};
export default BaseFileInput;
