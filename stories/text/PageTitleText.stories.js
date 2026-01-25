/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { PageTitleText } from '../../components';

export default {
  component: PageTitleText,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Text/Page Title Text',
};

/**
 * Page Title Text component template
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_PageTitleText = args => {
  return <PageTitleText {...args} />;
}

export const Default = {
  args: {
    children: 'Default Page Title Text',
    id: 'default',
  },
  render: Template_PageTitleText,
};

export const CentreAligned = {
  args: {
    alignment: 'centre',
    children: 'Centre Aligned Page Title Text',
    id: 'centre-aligned',
  },
  render: Template_PageTitleText,
};

export const UnderlinedTitleText = {
  args: {
    alignment: 'left',
    children: 'Underlined Page Title Text',
    id: 'underlined',
    underline: true,
  },
  render: Template_PageTitleText,
};

export const WithCursiveStyle = {
  args: {
    alignment: 'centre',
    children: 'Page Title Text In Cursive Font',
    fontStyle: 'cursive',
    id: 'cursive-font',
    underline: false,
  },
  render: Template_PageTitleText,
};

export const MobilePhoneTest = {
  args: {
    alignment: 'centre',
    children: 'Page Title Text Rendered At A Mobile Screen Size (360x800)',
    id: 'mobile-phone-test',
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_PageTitleText,
};
