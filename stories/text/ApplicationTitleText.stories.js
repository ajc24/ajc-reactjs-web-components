/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { ApplicationTitleText } from '../../components';

export default {
  component: ApplicationTitleText,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Text/Application Title Text',
};

/**
 * Application Title Text component template, rendered outside all / any header components
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_ApplicationTitleText_Standalone = args => {
  return <ApplicationTitleText {...args} />;
}

export const Default = {
  args: {
    children: 'Application Title Text',
    id: 'default',
  },
  render: Template_ApplicationTitleText_Standalone,
};

export const CentreAlignedWithWhiteText = {
  args: {
    alignment: 'centre',
    children: 'Application Title Text',
    id: 'alignment-centre--white-text',
    textColour: 'white',
  },
  render: Template_ApplicationTitleText_Standalone,
};

export const TextWrappingTest = {
  args: {
    alignment: 'left',
    children: 'Extra Long Application Title Text Which Is Really Long, Long Enough To Wrap To A New Line',
    id: 'text-wrapping-test',
    textColour: 'black',
  },
  render: Template_ApplicationTitleText_Standalone,
};

export const TextWrappingAndTruncationTest = {
  args: {
    alignment: 'left',
    children: 'Extra Long Application Title Text Which Is Really Long, Long Enough To Wrap To A New Line. Not Only That But It Will Also Be Truncated Due To The Added Length Of The Sentences.',
    id: 'text-wrapping-and-truncation-test',
    textColour: 'black',
  },
  render: Template_ApplicationTitleText_Standalone,
};

export const MobilePhoneTest = {
  args: {
    children: 'Application Title Text At Mobile Size',
    id: 'mobile-phone-test',
    textColour: 'black',
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_ApplicationTitleText_Standalone,
};
