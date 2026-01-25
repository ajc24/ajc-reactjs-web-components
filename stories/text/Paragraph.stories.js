/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { Paragraph } from '../../components';

export default {
  component: Paragraph,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Text/Paragraph',
};

/**
 * Paragraph component template
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_Paragraph = args => {
  return <Paragraph {...args} />;
}

export const Default = {
  args: {
    children: 'This is the paragraph text content. By default this text is left aligned.',
  },
  render: Template_Paragraph,
};

export const WithCentreAlignmentAndId = {
  args: {
    alignment: 'centre',
    children: 'This is the paragraph text content. The text in this paragraph is centre aligned.',
    id: 'with-centre-alignment',
  },
  render: Template_Paragraph,
};

export const TwoParagraphsTest = {
  args: {},
  render: () => <React.Fragment><Paragraph>First paragraph.</Paragraph><Paragraph>Second paragraph.</Paragraph></React.Fragment>,
};

export const MobilePhoneTest = {
  args: {
    children: 'This text is rendered an a mobile phone screen size and will wrap to a new line. This will test that the spacing between wrapped lines of text is working correctly.',
    id: 'mobile-phone-test',
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_Paragraph,
};
