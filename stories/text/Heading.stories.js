/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { Heading, Paragraph } from '../../components';

export default {
  component: Heading,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Text/Heading',
};

/**
 * Heading component template
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_Heading = args => {
  return <Heading {...args} />;
}

export const Default = {
  args: {
    children: 'Default Heading',
  },
  render: Template_Heading,
};

export const WithCentreAlignmentAndId = {
  args: {
    alignment: 'centre',
    children: 'Heading Centre Aligned',
    id: 'with-centre-alignment',
  },
  render: Template_Heading,
};

export const HeadingWithParagraphTest = {
  args: {},
  render: () => <React.Fragment><Heading>Heading Example</Heading><Paragraph>First paragraph.</Paragraph></React.Fragment>,
};

export const MobilePhoneTest = {
  args: {
    children: 'Mobile Phone Test Heading Which Wraps To A New Line',
    id: 'mobile-phone-test',
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_Heading,
};
