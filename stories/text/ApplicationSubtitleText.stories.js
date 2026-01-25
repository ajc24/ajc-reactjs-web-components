/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { ApplicationSubtitleText } from '../../components';

export default {
  component: ApplicationSubtitleText,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Text/Application Subtitle Text',
};

/**
 * Application Subtitle Text component template, rendered outside all / any header components
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_ApplicationSubtitleText_Standalone = args => {
  return <ApplicationSubtitleText {...args} />;
}

/**
 * Application Subtitle Text component template, rendered outside all / any header components
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_ApplicationSubtitleText_GreyBackground_Standalone = args => {
  return <div style={{ backgroundColor: 'grey' }}>
    <ApplicationSubtitleText {...args} />
  </div>;
}

export const Default = {
  args: {
    children: 'Application Subtitle Text',
    id: 'default',
  },
  render: Template_ApplicationSubtitleText_Standalone,
};

export const CentreAlignedWithWhiteText = {
  args: {
    alignment: 'centre',
    children: 'Application Subtitle Text',
    id: 'centre-alignment-white-text',
    textColour: 'white',
  },
  render: Template_ApplicationSubtitleText_GreyBackground_Standalone
};

export const HiddenTest = {
  args: {
    children: 'Subtitle Text Which Will Exceed The Boundaries Of The Screen. When This Happens The Text Will Be Automatically Hidden.',
    id: 'hidden-subtitle-text-test',
  },
  render: Template_ApplicationSubtitleText_Standalone,
};

export const MobilePhoneTest = {
  args: {
    children: 'Subtitle Text At Mobile Size',
    id: 'mobile-phone-test',
    textColour: 'black',
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_ApplicationSubtitleText_Standalone,
};
