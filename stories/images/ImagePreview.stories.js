/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { ImagePreview } from '../../components';
import sharkPdf from './files/shark.pdf';
import storybookLogoSquare from './files/storybook-logo-square.svg';

export default {
  component: ImagePreview,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Images/Image Preview',
};

/**
 * Image Preview component template
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_ImagePreview = args => {
	return <ImagePreview {...args} />;
};

export const DefaultInNoImageState = {
  args: {
    id: 'default-no-image',
  },
  render: Template_ImagePreview,
};

export const ImagePreviewCentreAlignmentInNoImageState = {
  args: {
    alignment: 'centre',
    backgroundColour: 'gold',
    filePreviewType: 'images',
    id: 'image-preview-centre-alignment-no-image',
  },
  render: Template_ImagePreview,
};

export const ImagePreviewInInvalidState = {
  args: {
    backgroundColour: 'green',
    filePreviewType: 'images',
    id: 'image-preview-invalid',
    isInvalidFile: true,
  },
  render: Template_ImagePreview,
};

export const ImagePreviewWithValidFile = {
  args: {
    backgroundColour: 'green',
    filePreviewType: 'images',
    id: 'image-preview-invalid',
    imageData: storybookLogoSquare,
    isInvalidFile: false,
  },
  render: Template_ImagePreview,
};

export const PdfPreviewInNoFileState = {
  args: {
    filePreviewType: 'pdf',
    id: 'pdf-preview-no-file',
  },
  render: Template_ImagePreview,
};

export const PdfPreviewInInvalidState = {
  args: {
    filePreviewType: 'pdf',
    id: 'pdf-preview-invalid',
    isInvalidFile: true,
  },
  render: Template_ImagePreview,
};

export const PdfPreviewWithValidFile = {
  args: {
    filePreviewType: 'pdf',
    id: 'pdf-preview-invalid',
    imageData: sharkPdf,
    isInvalidFile: false,
  },
  render: Template_ImagePreview,
};

export const MobilePhoneTestImagePreview = {
  args: {
    backgroundColour: 'navy-and-gold',
    filePreviewType: 'images',
    id: 'image-preview-mobile-phone-test',
    imageData: storybookLogoSquare,
    isInvalidFile: false,
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_ImagePreview,
};

export const MobilePhoneTestPdfPreview = {
  args: {
    filePreviewType: 'pdf',
    id: 'pdf-preview-mobile-phone-test',
    imageData: sharkPdf,
    isInvalidFile: false,
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_ImagePreview,
};
