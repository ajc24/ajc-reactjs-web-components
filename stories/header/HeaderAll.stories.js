/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { HeaderAll } from '../../components';
import smallHeaderBgImage from '../images/files/small-header-bg-image.png';
import storybookLogoSquare from '../images/files/storybook-logo-square.svg';

export default {
  component: HeaderAll,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Header/Header All',
};

/**
 * Header All with Bg Image component template to be used in all stories
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_HeaderAll = args => {
  return <HeaderAll {...args} />;
};

export const Default = {
  args: {
    backgroundImageSrc: smallHeaderBgImage,
    id: 'default',
    logoImageSrc: storybookLogoSquare,
    subtitleTextContent: 'Application Subtitle Text',
    titleTextContent: 'Application Title Text',
  },
  render: Template_HeaderAll,
}

export const MobilePhoneTest = {
  args: {
    backgroundImageSrc: smallHeaderBgImage,
    id: 'mobile-phone-test',
    logoImageSrc: storybookLogoSquare,
    subtitleTextContent: 'Subtitle Text',
    titleTextContent: 'Title Text',
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_HeaderAll,
}

export const MobilePhoneHiddenSubtitleTest = {
  args: {
    backgroundImageSrc: smallHeaderBgImage,
    id: 'mobile-phone-hidden-subtitle-test',
    logoImageSrc: storybookLogoSquare,
    subtitleTextContent: 'App Subtitle Text',
    titleTextContent: 'Application Title Text',
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_HeaderAll,
}
