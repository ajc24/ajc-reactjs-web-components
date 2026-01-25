/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { FunctionalImage } from '../../components';
import storybookLogoSquare from './files/storybook-logo-square.svg';

export default {
  component: FunctionalImage,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Images/Functional Image',
};

/**
 * Functional Image component template to be used in all stories
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_FunctionalImage = args => {
	return <FunctionalImage {...args} />;
};

export const Default = {
  args: {
    alt: 'A picture of the Storybook logo.',
    id: 'default',
    onClick: () => { alert('You have successfully clicked the default image.')},
    src: storybookLogoSquare,
  },
  render: Template_FunctionalImage,
};

export const AtCustomSize = {
  args: {
    alt: 'A custom size picture of the Storybook logo.',
    height: 250,
    id: 'custom-size',
    onClick: () => { alert('You have successfully clicked the custom size image.')},
    src: storybookLogoSquare,
    width: 250,
  },
  render: Template_FunctionalImage,
};
