/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { FileUploadPdf } from '../../components';

export default {
  component: FileUploadPdf,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Form Controls/File Upload Pdf',
};

/**
 * File Upload Pdf component template
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_FileUploadPdf = args => {
  return <FileUploadPdf {...args} />;
}

export const DefaultWhite = {
  args: {
    id: 'default',
    label: 'File Upload PDF (Default White)',
  },
  render: Template_FileUploadPdf,
};

export const GoldThemed = {
  args: {
    backgroundColour: 'gold',
    id: 'gold',
    label: 'File Upload PDF (Gold)',
  },
  render: Template_FileUploadPdf,
};

export const GreenThemed = {
  args: {
    backgroundColour: 'green',
    id: 'green',
    label: 'File Upload PDF (Green)',
  },
  render: Template_FileUploadPdf,
};

export const GreyThemed = {
  args: {
    backgroundColour: 'grey',
    id: 'grey',
    label: 'File Upload PDF (Grey)',
  },
  render: Template_FileUploadPdf,
};

export const NavyAndGoldThemed = {
  args: {
    backgroundColour: 'navy-and-gold',
    id: 'navy-and-gold',
    label: 'File Upload PDF (Navy and Gold)',
  },
  render: Template_FileUploadPdf,
};

export const NavyAndWhiteThemed = {
  args: {
    backgroundColour: 'navy-and-white',
    id: 'navy-and-white',
    label: 'File Upload PDF (Navy and White)',
  },
  render: Template_FileUploadPdf,
};

export const RedThemed = {
  args: {
    backgroundColour: 'red',
    id: 'red',
    label: 'File Upload PDF (Red)',
  },
  render: Template_FileUploadPdf,
};

export const WithCentreAlignment = {
  args: {
    alignment: 'centre',
    backgroundColour: 'gold',
    id: 'with-centre-alignment',
    label: 'File Upload PDF (Centre Alignment)',
    name: 'with-centre-alignment',
  },
  render: Template_FileUploadPdf,
};

export const AsOptionalFormField = {
  args: {
    backgroundColour: 'navy-and-gold',
    id: 'as-optional-form-field',
    isOptionalFormField: true,
    label: 'File Upload PDF',
    name: 'as-optional-form-field',
  },
  render: Template_FileUploadPdf,
};

export const DisabledState = {
  args: {
    id: 'disabled-file-upload-pdf',
    isDisabled: true,
    label: 'File Upload PDF (Disabled)',
    name: 'disabled',
  },
  render: Template_FileUploadPdf,
};

export const ErrorState = {
  args: {
    backgroundColour: 'gold',
    errorMessage: 'This is a sample error message.',
    id: 'file-upload-pdf-with-error',
    label: 'File Upload PDF (With Error)',
    name: 'with-error-message',
  },
  render: Template_FileUploadPdf,
};

export const ErrorStateCentreAligned = {
  args: {
    alignment: 'centre',
    backgroundColour: 'red',
    errorMessage: 'This is a sample error message.',
    id: 'file-upload-pdf-with-error-centre-aligned',
    label: 'File Upload PDF (With Error)',
    name: 'with-error-message-centre-aligned',
  },
  render: Template_FileUploadPdf,
};

export const MobilePhoneTest = {
  args: {
    backgroundColour: 'red',
    id: 'mobile-phone-test',
    label: 'File Upload PDF (Mobile Phone Test)',
    name: 'mobile-phone-test',
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_FileUploadPdf,
};
