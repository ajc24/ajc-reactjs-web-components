/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { Footer } from '../../components';

export default {
  component: Footer,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Footer/Footer',
};

/**
 * Footer component template to be used in all stories
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_Footer = args => {
  return <Footer {...args} />;
};

export const Default = {
  args: {
    children: 'This is a default footer component',
    id: 'default',
  },
  render: Template_Footer,
};

export const WithGoldBackground = {
  args: {
    backgroundColour: 'gold',
    children: 'This is a footer component with a gold background',
    id: 'with-gold-background',
  },
  render: Template_Footer,
};

export const WithGreenBackground = {
  args: {
    backgroundColour: 'green',
    children: 'This is a footer component with a green background',
    id: 'with-green-background',
  },
  render: Template_Footer,
};

export const WithGreyBackground = {
  args: {
    backgroundColour: 'grey',
    children: 'This is a footer component with a grey background',
    id: 'with-grey-background',
  },
  render: Template_Footer,
};

export const WithNavyBackgroundAndGoldText = {
  args: {
    backgroundColour: 'navy-and-gold',
    children: 'This is a footer component with a navy background and gold text',
    id: 'with-navy-background-and-gold-text',
  },
  render: Template_Footer,
};

export const WithNavyBackgroundAndWhiteText = {
  args: {
    backgroundColour: 'navy-and-white',
    children: 'This is a footer component with a navy background and white text',
    id: 'with-navy-background-and-white-text',
  },
  render: Template_Footer,
};

export const WithRedBackground = {
  args: {
    backgroundColour: 'red',
    children: 'This is a footer component with a red background',
    id: 'with-red-background',
  },
  render: Template_Footer,
};

export const MobilePhoneTest = {
  args: {
    backgroundColour: 'gold',
    children: 'This is a footer component rendered at a mobile screen size',
    id: 'mobile-phone-test',
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_Footer,
};

export const WithBoldFont = {
  args: {
    backgroundColour: 'navy-and-gold',
    children: 'This is a footer component where the text is rendered in bold',
    id: 'with-bold-font',
    isBoldFont: true,
  },
  render: Template_Footer,
};
