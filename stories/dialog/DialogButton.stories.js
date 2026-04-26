/**
 * Developed by Anthony Cox in 2026
 */
import React, { useEffect } from 'react';
import { DialogButton } from '../../components';
import { PageTemplateConfig } from '../../components/modules';

export default {
  component: DialogButton,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Dialog/Dialog Button',
};

const mockButtonData = [
  {
    id: 'cancel',
    onClick: () => alert('Cancel (Secondary) button clicked'),
    textContent: 'Cancel',
  },
  {
    id: 'save-and-exit',
    onClick: () => alert('Save and Exit (Primary) button clicked'),
    textContent: 'Save and Exit',
  },
];

/**
 * DialogButton component template to be used in all stories
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_DialogButton = args => {
  useEffect(() => {
    PageTemplateConfig.setupDocumentBodyCss();
  }, []);

  return <DialogButton {...args} />;
};

export const Default = {
  args: {
    buttonData: mockButtonData,
    id: 'default',
  },
  render: Template_DialogButton,
};

export const WithGoldPrimaryButtonAndGreyBackground = {
  args: {
    backgroundColour: 'grey',
    buttonColour: 'gold',
    buttonData: mockButtonData,
    id: 'with-gold-primary-button-and-grey-background',
  },
  render: Template_DialogButton,
};

export const WithGreenPrimaryButton = {
  args: {
    buttonColour: 'green',
    buttonData: mockButtonData,
    id: 'with-green-primary-button',
    isHidden: false,
  },
  render: Template_DialogButton,
};

export const WithGreyPrimaryButton = {
  args: {
    buttonColour: 'grey',
    buttonData: mockButtonData,
    id: 'with-grey-primary-button',
    isHidden: false,
  },
  render: Template_DialogButton,
};

export const WithNavyAndGoldPrimaryButton = {
  args: {
    buttonColour: 'navy-and-gold',
    buttonData: mockButtonData,
    id: 'with-navy-and-gold-primary-button',
    isHidden: false,
  },
  render: Template_DialogButton,
};

export const WithNavyAndWhitePrimaryButton = {
  args: {
    buttonColour: 'navy-and-white',
    buttonData: mockButtonData,
    id: 'with-navy-and-white-primary-button',
    isHidden: false,
  },
  render: Template_DialogButton,
};

export const WithRedPrimaryButton = {
  args: {
    buttonColour: 'red',
    buttonData: mockButtonData,
    id: 'with-red-primary-button',
    isHidden: false,
  },
  render: Template_DialogButton,
};

export const MobilePhoneTest = {
  args: {
    buttonColour: 'red',
    buttonData: [
       {
        id: 'cancel',
        onClick: () => alert('Cancel button clicked'),
        textContent: 'Cancel',
      },
      {
        id: 'save',
        onClick: () => alert('Save button clicked'),
        textContent: 'Save',
      },
      {
        id: 'submit',
        onClick: () => alert('Submit (Primary) button clicked'),
        textContent: 'Submit',
      },
    ],
    id: 'mobile-phone-test',
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_DialogButton,
};
