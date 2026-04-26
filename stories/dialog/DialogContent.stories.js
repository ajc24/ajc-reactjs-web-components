/**
 * Developed by Anthony Cox in 2026
 */
import React, { useEffect } from 'react';
import { DialogContent } from '../../components';
import { PageTemplateConfig } from '../../components/modules';

export default {
  component: DialogContent,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Dialog/Dialog Content',
};

/**
 * DialogContent component template to be used in all stories
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_DialogContent = args => {
  useEffect(() => {
    PageTemplateConfig.setupDocumentBodyCss();
  }, []);

  return <DialogContent {...args} />;
};

export const Default = {
  args: {
    contentData: [
      {
        content: 'This is the first paragraph of the default dialog content with a white background.',
        type: 'paragraph',
      },
      {
        content: 'You may render as many paragraphs as you wish in the dialogs content area and they will be rendered in the order in which they are specified.',
        type: 'paragraph',
      },
    ],
    id: 'default',
  },
  render: Template_DialogContent,
};

export const WithGreyBackground = {
  args: {
    backgroundColour: 'grey',
    contentData: [
      {
        content: 'This is the first paragraph of the dialog content with a grey background.',
        type: 'paragraph',
      },
      {
        content: 'You may render as many paragraphs as you wish in the dialogs content area and they will be rendered in the order in which they are specified.',
        type: 'paragraph',
      },
    ],
    id: 'with-grey-background',
  },
  render: Template_DialogContent,
};

export const MobilePhoneTest = {
  args: {
    contentData: [
      {
        content: 'This is the first paragraph of the dialog content for the mobile phone test.',
        type: 'paragraph',
      },
      {
        content: 'You may render as many paragraphs as you wish in the dialogs content area and they will be rendered in the order in which they are specified.',
        type: 'paragraph',
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
  render: Template_DialogContent,
};
