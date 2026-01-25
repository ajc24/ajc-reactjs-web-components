/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { Main } from '../../components';

export default {
  component: Main,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Main Components/Main',
};

/**
 * Main component template to be used in all stories
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_Main = args => {
  return <Main {...args} >
    <p>This component is designed to act as the main component for rendering all of your web page content.</p>
    <p>You may add any content you wish to this component.</p>
  </Main>;
};

export const Default = {
  args: {
    title: 'Main component story (Default)',
  },
  render: Template_Main,
};

export const WithGreyBackground = {
  args: {
    backgroundColour: 'grey',
    title: 'Main component story (Grey)',
  },
  render: Template_Main,
};

export const MobilePhoneTest = {
  args: {
    backgroundColour: 'grey',
    id: 'mobile-phone-test',
    title: 'Main component story (Mobile)',
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_Main,
};
