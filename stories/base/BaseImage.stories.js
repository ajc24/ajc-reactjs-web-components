/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { BaseImage } from '../../components';
import storybookLogoSquare from '../images/files/storybook-logo-square.svg';

export default {
  component: BaseImage,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Base Components/Base Image',
};

/**
 * Base Image component template
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_BaseImage = args => {
	return <BaseImage {...args} />;
};

export const Default = {
  args: {
    src: storybookLogoSquare,
  },
  render: Template_BaseImage,
};

export const AtACustomSize = {
  args: {
    alt: 'A picture of the Storybook logo.',
    height: 350,
    id: 'custom-image-1',
    src: storybookLogoSquare,
    width: 350,
  },
  render: Template_BaseImage,
};

export const WithCustomOnClick = {
  args: {
    height: 250,
    id: 'image-with-custom-click-event',
    onClick: () => { alert('Clicked on the image.') },
    src: storybookLogoSquare,
    width: 250,
  },
  render: Template_BaseImage,
};

export const WithAutoHeight = {
  args: {
    alt: 'A picture of the Storybook logo.',
    height: 'auto',
    id: 'custom-image-2',
    src: storybookLogoSquare,
    width: 200,
  },
  render: Template_BaseImage,
};
