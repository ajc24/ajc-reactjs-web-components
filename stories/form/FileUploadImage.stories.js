/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { FileUploadImage } from '../../components';

export default {
  component: FileUploadImage,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Form Controls/File Upload Image',
};

/**
 * File Upload Image component template
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_FileUploadImage = args => {
  return <FileUploadImage {...args} />;
}

export const DefaultWhite = {
  args: {
    id: 'default',
    label: 'File Upload Image (Default White)',
  },
  render: Template_FileUploadImage,
};

export const GoldThemed = {
  args: {
    backgroundColour: 'gold',
    id: 'gold',
    label: 'File Upload Image (Gold)',
  },
  render: Template_FileUploadImage,
};

export const GreenThemed = {
  args: {
    backgroundColour: 'green',
    id: 'green',
    label: 'File Upload Image (Green)',
  },
  render: Template_FileUploadImage,
};

export const GreyThemed = {
  args: {
    backgroundColour: 'grey',
    id: 'grey',
    label: 'File Upload Image (Grey)',
  },
  render: Template_FileUploadImage,
};

export const NavyAndGoldThemed = {
  args: {
    backgroundColour: 'navy-and-gold',
    id: 'navy-and-gold',
    label: 'File Upload Image (Navy and Gold)',
  },
  render: Template_FileUploadImage,
};

export const NavyAndWhiteThemed = {
  args: {
    backgroundColour: 'navy-and-white',
    id: 'navy-and-white',
    label: 'File Upload Image (Navy and White)',
  },
  render: Template_FileUploadImage,
};

export const RedThemed = {
  args: {
    backgroundColour: 'red',
    id: 'red',
    label: 'File Upload Image (Red)',
  },
  render: Template_FileUploadImage,
};

export const WithCentreAlignment = {
  args: {
    alignment: 'centre',
    backgroundColour: 'gold',
    id: 'with-centre-alignment',
    label: 'File Upload Image (Centre Alignment)',
    name: 'with-centre-alignment',
  },
  render: Template_FileUploadImage,
};

export const AsOptionalFormField = {
  args: {
    backgroundColour: 'navy-and-gold',
    id: 'as-optional-form-field',
    isOptionalFormField: true,
    label: 'File Upload Image',
    name: 'as-optional-form-field',
  },
  render: Template_FileUploadImage,
};

export const DisabledState = {
  args: {
    id: 'disabled-file-upload-image',
    isDisabled: true,
    label: 'File Upload Image (Disabled)',
    name: 'disabled',
  },
  render: Template_FileUploadImage,
};

export const ErrorState = {
  args: {
    backgroundColour: 'gold',
    errorMessage: 'This is a sample error message.',
    id: 'file-upload-image-with-error',
    label: 'File Upload Image (With Error)',
    name: 'with-error-message',
  },
  render: Template_FileUploadImage,
};

export const ErrorStateCentreAligned = {
  args: {
    alignment: 'centre',
    backgroundColour: 'red',
    errorMessage: 'This is a sample error message.',
    id: 'file-upload-image-with-error-centre-aligned',
    label: 'File Upload Image (With Error)',
    name: 'with-error-message-centre-aligned',
  },
  render: Template_FileUploadImage,
};

export const MobilePhoneTest = {
  args: {
    backgroundColour: 'red',
    id: 'mobile-phone-test',
    label: 'File Upload Image (Mobile Phone Test)',
    name: 'mobile-phone-test',
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_FileUploadImage,
};
