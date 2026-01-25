/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { BaseHeaderTall } from '../../components';

export default {
  component: BaseHeaderTall,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Base Components/Base Header Tall',
};

/**
 * Base Header component template to be used in all stories
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_BaseHeaderTall = args => {
  return <BaseHeaderTall {...args} >
    <p>This component is designed to act as a template component for a tall header.</p>
    <p>All other tall header components will be developed from this template.</p>
  </BaseHeaderTall>;
};

export const Default = {
  args: {},
  render: Template_BaseHeaderTall,
};

export const WithGreyBackground = {
  args: {
    backgroundColour: 'grey',
    id: 'base-header-tall-with-grey-background',
  },
  render: Template_BaseHeaderTall,
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
  render: Template_BaseHeaderTall,
};
