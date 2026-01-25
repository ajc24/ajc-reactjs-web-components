/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { BaseMenuBar } from '../../components';

export default {
  component: BaseMenuBar,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Base Components/Base Menu Bar',
};

/**
 * Base Menu Bar component template to be used in all stories
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_BaseMenuBar = args => {
  return <BaseMenuBar {...args} >
    <div>This component is designed to act as a template component for a menu bar.</div>
  </BaseMenuBar>;
};

export const Default = {
  args: {},
  render: Template_BaseMenuBar,
};

export const WithGoldBackground = {
  args: {
    backgroundColour: 'gold',
    id: 'base-menu-bar-with-gold-background',
  },
  render: Template_BaseMenuBar,
};

export const WithGreenBackground = {
  args: {
    backgroundColour: 'green',
    id: 'base-menu-bar-with-green-background',
  },
  render: Template_BaseMenuBar,
};

export const WithGreyBackground = {
  args: {
    backgroundColour: 'grey',
    id: 'base-menu-bar-with-grey-background',
  },
  render: Template_BaseMenuBar,
};

export const WithNavyBackgroundAndGoldText = {
  args: {
    backgroundColour: 'navy-and-gold',
    id: 'base-menu-bar-with-navy-background-and-gold-text',
  },
  render: Template_BaseMenuBar,
};

export const WithNavyBackgroundAndWhiteText = {
  args: {
    backgroundColour: 'navy-and-white',
    id: 'base-menu-bar-with-navy-background-and-white-text',
  },
  render: Template_BaseMenuBar,
};

export const WithRedBackground = {
  args: {
    backgroundColour: 'red',
    id: 'base-menu-bar-with-red-background',
  },
  render: Template_BaseMenuBar,
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
  render: Template_BaseMenuBar,
};
