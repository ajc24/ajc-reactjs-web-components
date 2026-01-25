/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { DecorativeImage } from '../../components';
import storybookLogoSquare from './files/storybook-logo-square.svg';

export default {
  component: DecorativeImage,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Images/Decorative Image',
};

/**
 * Decorative Image component template
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_DecorativeImage = args => {
	return <DecorativeImage {...args} />;
};

export const Default = {
  args: {
    id: 'default',
    src: storybookLogoSquare,
  },
  render: Template_DecorativeImage,
};

export const AtCustomSize = {
  args: {
    height: 250,
    id: 'custom-size',
    src: storybookLogoSquare,
    width: 250,
  },
  render: Template_DecorativeImage,
};
