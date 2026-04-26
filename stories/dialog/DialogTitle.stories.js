/**
 * Developed by Anthony Cox in 2026
 */
import React, { useEffect } from 'react';
import { DialogTitle } from '../../components';
import { PageTemplateConfig } from '../../components/modules';

export default {
  component: DialogTitle,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Dialog/Dialog Title',
};

/**
 * DialogTitle component template to be used in all stories
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_DialogTitle = args => {
  useEffect(() => {
    PageTemplateConfig.setupDocumentBodyCss();
  }, []);

  return <DialogTitle {...args} />;
};

export const Default = {
  args: {
    children: 'Default Dialog Title',
    id: 'default',
  },
  render: Template_DialogTitle,
};

export const WithGreyBackground = {
  args: {
    backgroundColour: 'grey',
    children: 'Dialog Title (With Grey Background)',
    id: 'with-grey-background',
  },
  render: Template_DialogTitle,
};

export const MobilePhoneTest = {
  args: {
    children: 'Dialog Title (Mobile Phone Test)',
    id: 'mobile-phone-test',
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_DialogTitle,
};
