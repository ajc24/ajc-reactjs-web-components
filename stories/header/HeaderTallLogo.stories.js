/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { HeaderTallLogo } from '../../components';
import storybookLogoRectangle from '../images/files/storybook-logo-rectangle.svg';

export default {
  component: HeaderTallLogo,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Header/Tall Header With Logo',
};

/**
 * Header Tall With Logo component template
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_HeaderTallLogo = args => {
  return <HeaderTallLogo {...args} />;
};

export const Default = {
  args: {
    alt: 'Storybook logo rendered in a default tall header.',
    src: storybookLogoRectangle,
  },
  render: Template_HeaderTallLogo,
};

export const WithGreyBackground = {
  args: {
    alt: 'Storybook logo rendered in a tall header with a grey background.',
    backgroundColour: 'grey',
    id: 'with-grey-background',
    src: storybookLogoRectangle,  
  },
  render: Template_HeaderTallLogo,
};

export const MobilePhoneTest = {
  args: {
    alt: 'Storybook logo rendered in a tall header with a grey background and at a mobile screen size.',
    backgroundColour: 'grey',
    id: 'mobile-phone-test',
    src: storybookLogoRectangle,  
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_HeaderTallLogo,
};
