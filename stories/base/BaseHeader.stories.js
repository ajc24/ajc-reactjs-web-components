/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { BaseHeader } from '../../components';

export default {
  component: BaseHeader,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Base Components/Base Header',
};

/**
 * Base Header component template to be used in all stories
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_BaseHeader = args => {
  return <BaseHeader {...args} >
    <p>This component is designed to act as a template component for a header.</p>
    <p>All other header components will be developed from this template.</p>
  </BaseHeader>;
};

export const Default = {
  args: {},
  render: Template_BaseHeader,
};

export const WithGreyBackground = {
  args: {
    backgroundColour: 'grey',
    id: 'base-header-with-grey-background',
  },
  render: Template_BaseHeader,
};

export const MobilePhoneTest = {
  args: {
    backgroundColour: 'grey',
    id: 'mobile-phone-test',
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_BaseHeader,
};
