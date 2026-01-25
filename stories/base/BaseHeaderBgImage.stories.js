/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { BaseHeaderBgImage } from '../../components';
import smallHeaderBgImage from '../images/files/small-header-bg-image.png';

export default {
  component: BaseHeaderBgImage,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Base Components/Base Header With Bg Image',
};

/**
 * Base Header with Bg Image component template to be used in all stories
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_BaseHeaderBgImage = args => {
  return <BaseHeaderBgImage {...args} >
    <p>This component is designed to act as a template component for a header with background image.</p>
    <p>All internal content of the header component will appear on top of the background image.</p>
  </BaseHeaderBgImage>;
};

export const Default = {
  args: {
    backgroundImageSrc: smallHeaderBgImage,
  },
  render: Template_BaseHeaderBgImage,
}

export const MobilePhoneTest = {
  args: {
    backgroundImageSrc: smallHeaderBgImage,
    id: 'mobile-phone-test',
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_BaseHeaderBgImage,
}
