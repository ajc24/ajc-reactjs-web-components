/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { BaseFooter } from '../../components';

export default {
  component: BaseFooter,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Base Components/Base Footer',
};

/**
 * Base Footer component template to be used in all stories
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_BaseFooter = args => {
  return <BaseFooter {...args} >
    <div>This component is designed to act as a template component for a footer.</div>
  </BaseFooter>;
};

export const Default = {
  args: {},
  render: Template_BaseFooter,
};

export const WithGoldBackground = {
  args: {
    backgroundColour: 'gold',
    id: 'base-footer-with-gold-background',
  },
  render: Template_BaseFooter,
};

export const WithGreenBackground = {
  args: {
    backgroundColour: 'green',
    id: 'base-footer-with-green-background',
  },
  render: Template_BaseFooter,
};

export const WithGreyBackground = {
  args: {
    backgroundColour: 'grey',
    id: 'base-footer-with-grey-background',
  },
  render: Template_BaseFooter,
};

export const WithNavyBackgroundAndGoldText = {
  args: {
    backgroundColour: 'navy-and-gold',
    id: 'base-footer-with-navy-background-and-gold-text',
  },
  render: Template_BaseFooter,
};

export const WithNavyBackgroundAndWhiteText = {
  args: {
    backgroundColour: 'navy-and-white',
    id: 'base-footer-with-navy-background-and-white-text',
  },
  render: Template_BaseFooter,
};

export const WithRedBackground = {
  args: {
    backgroundColour: 'red',
    id: 'base-footer-with-red-background',
  },
  render: Template_BaseFooter,
};

export const MobilePhoneTest = {
  args: {
    backgroundColour: 'gold',
    id: 'mobile-phone-test',
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_BaseFooter,
};
