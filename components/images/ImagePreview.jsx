/**
 * Developed by Anthony Cox in 2025
 */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DecorativeImage from './DecorativeImage.jsx';
import './css/image-preview.css';

const loadingTimeout = 500;

/**
 * Image preview component allowing for the render of a file preview pane which supports uploads of PDF or image files.
 * 
 * The image preview component will render in a number of different states which fully support a user attempting to upload a file to a server: it has a default "no file" state,
 * an invalid file state, a loading file preview state and finally a successful file preview state. In the case of image file uploads, the successful file preview state will
 * render a preview of the actual image file in the image preview panel. For PDF files, a successful file preview state means that a success message is output to the user
 * instead of an image preview.
 * 
 * This component can be enabled or disabled. It can be rendered in a number of different colour themes, matching the same colours used by other components. The image preview
 * component is left aligned by default but can also be centrally aligned if desired.
 *
 * The image preview component can be used with the Main component as with all other components in this design system. It is also integrated for use within the
 * Base File Input component.
 */
const ImagePreview = props => {
  const [ isLoadingFileData, setIsLoadingFileData ] = useState(false);
  const [ previewData, setPreviewData ] = useState(undefined);

  useEffect(() => {
    /* Set whether this component is in a no file state, is loading a file or has rendered a file */
    if (props.isInvalidFile !== true) {
      if (isLoadingFileData === false && props.inputFileValue !== undefined && previewData === undefined) {
        /* An input file value has been set - set this component to its loading state */
        setIsLoadingFileData(true);
        if (props.filePreviewType === 'pdf') {
          /* Set the completed state for a PDF file upload */
          loadPdfData();
        } else {
          /* Load the image data */
          loadImageData();
        }
      }
    }

    /* If the input file value property is reset to undefined (ie. image upload is reset to empty / default) then we need to make sure that any preview data is also cleared */
    if (previewData !== undefined && props.inputFileValue === undefined) {
      setPreviewData(undefined);
    }
  }, [ isLoadingFileData, props.inputFileValue ]);
  
  /**
   * Loads the image data from the specified image upload
   */
  const loadImageData = () => {
    const fileReader = new FileReader();
    fileReader.onload = event => {
      /* Set the preview data to suit and switch off loading state */
      setPreviewData(event.target.result);
      setIsLoadingFileData(false);
    }
    setTimeout(() => {
      if (typeof props.inputFileValue === 'string') {
        /* If an image is provided directly via an import it will be loaded as string data - set the preview data to suit and switch off loading state */
        setPreviewData(props.inputFileValue);
        setIsLoadingFileData(false);
      } else {
        /* For images that have been uploaded via an input file element - read the data from the file (triggers the onload functionality above) */
        fileReader.readAsDataURL(props.inputFileValue);
      }
    }, loadingTimeout);
  };

  /**
   * Loads the PDF file data from the specified file upload
   */
  const loadPdfData = () => {
    setTimeout(() => {
      /* Set the preview data to suit and switch off loading state */
      setPreviewData(props.inputFileValue);
      setIsLoadingFileData(false);
    }, loadingTimeout);
  };

  /* Set the styling for the container element */
  const containerCss = 'image-preview-container';

  /* Set the styling for the inner container element */
  let innerContainerCss = 'image-preview-container-inner';
  props.alignment === 'centre'
    ? innerContainerCss += ' image-preview-container-inner-alignment-centre' : innerContainerCss += ' image-preview-container-inner-alignment-left';

  /* Set the styling for the preview pane element */
  let previewPaneCss = 'image-preview-pane';
  if (previewData === undefined) {
    previewPaneCss += ' image-preview-pane-no-image-data';
  } else {
    if (props.filePreviewType === undefined || props.filePreviewType === 'images') {
      /* Change the styling of the preview pane to suit that of an image upload */
      previewPaneCss += ' image-preview-pane-with-image-data';
    } else {
      /* Do not change the styling of the preview pane since this file upload is not an image */
      previewPaneCss += ' image-preview-pane-no-image-data';
    }
  }

  /* Set the styling for the image previews informational panel */
  const previewPaneInfoCss = 'image-preview-pane-information';

  /* Build the re-usable components which render the icons and supporting text for various states */
  const previewPaneIconCss = 'image-preview-pane-icon background-transparent font-black';
  const previewPaneSupportingTextCss = 'image-preview-pane-supporting-text font-black font-default';

  const Icon = props => {
    return (
      <span id={`${props.id}--icon--image-preview`} className={previewPaneIconCss}>
        {props.children}
      </span>
    );
  };
  const SupportingText = props => {
    return (
      <span id={`${props.id}--supporting-text--image-preview`} className={previewPaneSupportingTextCss}>
        {props.children}
      </span>
    );
  };

  /* Determine the icon and supporting text components to be rendered for various states (if required for the current component state) */
  let icon;
  let supportingText;

  if (props.isInvalidFile === true) {
    /* Invalid file state */
    icon = <Icon>&#10060;</Icon>;
    supportingText = <SupportingText>This file cannot be previewed</SupportingText>;
  } else if (isLoadingFileData === false && props.inputFileValue === undefined && previewData === undefined) {
    /* No file preview state */
    icon = <Icon>&#10067;</Icon>;
    supportingText = <SupportingText>Please select a file to preview</SupportingText>;
  } else if (isLoadingFileData === true && props.inputFileValue !== undefined && previewData === undefined) {
    /* Loading file state */
    icon = <Icon>&#46;&#46;&#46;</Icon>;
    supportingText = <SupportingText>Loading file data. Please wait</SupportingText>;
  } else if (isLoadingFileData === false && props.inputFileValue !== undefined && previewData !== undefined && (props.filePreviewType === undefined || props.filePreviewType === 'images')) {
    /* Image preview ready for display - image file */
    icon = <DecorativeImage height="auto" id={`${props.id}--image-preview`} src={previewData} width="328" />;
    supportingText = null;
  } else if (isLoadingFileData === false && props.inputFileValue !== undefined && previewData !== undefined && props.filePreviewType === 'pdf') {
    /* Image preview ready for display - PDF file */
    icon = <Icon>&#9989;</Icon>;
    supportingText = <SupportingText>This document is loaded</SupportingText>;
  }

  return (
    <div className={containerCss}>
      <div className={innerContainerCss}>
        <div id={`${props.id}--preview-pane--image-preview`} className={previewPaneCss}>
          <div className={previewPaneInfoCss}>
            {icon}
            {supportingText}
          </div>
        </div>
      </div>
    </div>
  );
};
ImagePreview.propTypes = {
  /** The alignment of the image preview component. The image previewer by default will be left aligned but can be centre aligned if desired. */
  alignment: PropTypes.oneOf([ 'centre', 'left' ]),
  /** The background colour for the components rendered within the image preview component. The default colour for the components is white. */
  backgroundColour: PropTypes.oneOf([ 'gold', 'green', 'grey', 'navy-and-gold', 'navy-and-white', 'red', 'white' ]),
  /** The file type to be handled by the image preview component. By default an image previewer that handles images is rendered. */
  filePreviewType: PropTypes.oneOf([ 'images', 'pdf' ]),
  /** The unique identifier for this component. */
  id: PropTypes.string.isRequired,
  /** The value property set to the input file DOM element. This property expects to receive the file intended for upload by an end user. */
  inputFileValue: PropTypes.oneOf([ PropTypes.object, PropTypes.string ]),
  /** Switch to set whether the component is disabled or not. By default the component is enabled. */
  isDisabled: PropTypes.bool,
  /** Switch to set whether the image preview should highlight that an invalid file type has been provided to the image preview component. By default the component does not show this state. */
  isInvalidFile: PropTypes.bool,
};
export default ImagePreview;
