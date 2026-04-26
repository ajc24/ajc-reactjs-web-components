/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { BaseFileInput } from '../../components';
import sharkPdf from '../images/files/shark.pdf';
import storybookLogoSquare from '../images/files/storybook-logo-square.svg';

export default {
  component: BaseFileInput,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Base Components/Base File Input',
};

/**
 * Base File Input component template
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_BaseFileInput = args => {
  return <BaseFileInput {...args} />;
}

export const DefaultWhite = {
  args: {
    id: 'default',
    label: 'Base File Input (Default White)',
  },
  render: Template_BaseFileInput,
};

export const GoldThemed = {
  args: {
    backgroundColour: 'gold',
    id: 'gold',
    label: 'Base File Input (Gold)',
  },
  render: Template_BaseFileInput,
};

export const GreenThemed = {
  args: {
    backgroundColour: 'green',
    id: 'green',
    label: 'Base File Input (Green)',
  },
  render: Template_BaseFileInput,
};

export const GreyThemed = {
  args: {
    backgroundColour: 'grey',
    id: 'grey',
    label: 'Base File Input (Grey)',
  },
  render: Template_BaseFileInput,
};

export const NavyAndGoldThemed = {
  args: {
    backgroundColour: 'navy-and-gold',
    id: 'navy-and-gold',
    label: 'Base File Input (Navy and Gold)',
  },
  render: Template_BaseFileInput,
};

export const NavyAndWhiteThemed = {
  args: {
    backgroundColour: 'navy-and-white',
    id: 'navy-and-white',
    label: 'Base File Input (Navy and White)',
  },
  render: Template_BaseFileInput,
};

export const RedThemed = {
  args: {
    backgroundColour: 'red',
    id: 'red',
    label: 'Base File Input (Red)',
  },
  render: Template_BaseFileInput,
};

export const WithCentreAlignment = {
  args: {
    alignment: 'centre',
    backgroundColour: 'gold',
    id: 'with-centre-alignment',
    label: 'Base File Input (Centre Alignment)',
    name: 'with-centre-alignment',
  },
  render: Template_BaseFileInput,
};

export const AcceptImages = {
  args: {
    accept: 'images',
    backgroundColour: 'navy-and-gold',
    id: 'accept-image-files',
    label: 'Base File Input (Accepts Images)',
  },
  render: Template_BaseFileInput,
};

export const AsOptionalFormField = {
  args: {
    accept: 'images',
    backgroundColour: 'red',
    id: 'as-optional-form-field',
    isOptional: true,
    label: 'Base File Input',
  },
  render: Template_BaseFileInput,
};

export const AcceptPDF = {
  args: {
    accept: 'pdf',
    backgroundColour: 'green',
    id: 'accept-pdf-files',
    label: 'Base File Input (Accepts PDFs)',
  },
  render: Template_BaseFileInput,
};

export const DisabledState = {
  args: {
    id: 'disabled-file-input',
    isDisabled: true,
    label: 'Base File Input (Disabled)',
    name: 'disabled',
  },
  render: Template_BaseFileInput,
};

export const DisabledFocusTest = {
  args: {},
  render: () => {
    return <React.Fragment>
      <BaseFileInput backgroundColour="red" id="item-1" label="Base File Input 1" name="item-1" />
      <BaseFileInput backgroundColour="green" id="disabled-item-2" isDisabled={true} label="Base File Input 2 (Disabled)" name="item-2-disabled" />
      <BaseFileInput backgroundColour="navy-and-gold" id="item-3" label="Base File Input 3" name="item-3" />
    </React.Fragment>
  },
};

export const WithPreloadedImageData = {
  args: {
    backgroundColour: 'green',
    defaultFileData: storybookLogoSquare,
    defaultFileName: 'preloaded-file.png',
    id: 'with-preloaded-image-data',
    label: 'Base File Input (Preloaded)',
    name: 'with-preloaded-image-data',
  },
  render: Template_BaseFileInput,
};

export const WithPreloadedPdfData = {
  args: {
    accept: 'pdf',
    backgroundColour: 'navy-and-white',
    defaultFileData: sharkPdf,
    defaultFileName: 'preloaded-file.pdf',
    id: 'with-preloaded-pdf-data',
    label: 'Base File Input (Preloaded)',
    name: 'with-preloaded-pdf-data',
  },
  render: Template_BaseFileInput,
};

export const WithCustomErrorMessage = {
  args: {
    backgroundColour: 'green',
    errorMessage: 'This is a custom error message',
    id: 'with-custom-error-message',
    label: 'Base File Input (Error Message)',
    name: 'with-custom-error-message',
  },
  render: Template_BaseFileInput,
};

export const MobilePhoneTest = {
  args: {
    backgroundColour: 'red',
    id: 'mobile-phone-test',
    label: 'Base File Input (Mobile Phone Test)',
    name: 'mobile-phone-test',
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_BaseFileInput,
};

export const WithReallyLongLabelAndErrorMessage = {
  args: {
    backgroundColour: 'navy-and-white',
    errorMessage: 'Please fix the error with the file upload above. This error message will wrap to multiple lines as a test for how this text will appear when the error message spans multiple lines on-screen.',
    id: 'with-really-long-label-and-error-message',
    label: 'Base File Input With A Really Long Label Which Will Wrap To A New Line And Even On To Four Lines',
    name: 'with-really-long-label-text',
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_BaseFileInput,
};
