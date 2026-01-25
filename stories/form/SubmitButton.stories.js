/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { SubmitButton } from '../../components';

export default {
  component: SubmitButton,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Form Controls/Submit Button',
};

/**
 * Submit Button component template
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_SubmitButton = args => {
  return <SubmitButton {...args} />;
}

export const Default = {
  args: {
    children: 'Default White',
    id: 'default',
  },
  render: Template_SubmitButton,
};

export const GoldButton = {
  args: {
    backgroundColour: 'gold',
    children: 'Gold',
    id: 'gold',
    onClick: () => { alert('Clicked the gold submit button') },
  },
  render: Template_SubmitButton,
};

export const WithGreenBackground = {
  args: {
    backgroundColour: 'green',
    children: 'Green',
    id: 'green',
    onClick: () => { alert('Clicked the green submit button') },
  },
  render: Template_SubmitButton,
};

export const WithGreyBackground = {
  args: {
    backgroundColour: 'grey',
    children: 'Grey',
    id: 'grey',
    onClick: () => { alert('Clicked the grey submit button') },
  },
  render: Template_SubmitButton,
};

export const WithNavyAndGoldBackground = {
  args: {
    backgroundColour: 'navy-and-gold',
    children: 'Navy and Gold',
    id: 'navy-and-gold',
    onClick: () => { alert('Clicked the navy and gold submit button') },
  },
  render: Template_SubmitButton,
};

export const WithNavyAndWhiteBackground = {
  args: {
    backgroundColour: 'navy-and-white',
    children: 'Navy and White',
    id: 'navy-and-white',
    onClick: () => { alert('Clicked the navy and white submit button') },
  },
  render: Template_SubmitButton,
};

export const WithRedBackground = {
  args: {
    backgroundColour: 'red',
    children: 'Red',
    id: 'red',
    onClick: () => { alert('Clicked the red submit button') },
  },
  render: Template_SubmitButton,
};

export const WithTruncatedText = {
  args: {
    backgroundColour: 'grey',
    children: 'With Truncated Text Content',
    id: 'with-truncated-text',
    onClick: () => { alert('Clicked the submit button with truncated text content') },
  },
  render: Template_SubmitButton,
};

export const Disabled = {
  args: {
    backgroundColour: 'red',
    children: 'Disabled',
    id: 'disabled',
    isDisabled: true,
    onClick: () => { alert('Clicked the disabled submit button (should not appear)') },
  },
  render: Template_SubmitButton,
};

export const WithCentreAlignment = {
  args: {
    alignment: 'centre',
    backgroundColour: 'navy-and-gold',
    children: 'Centre Aligned',
    id: 'with-centre-alignment',
    onClick: () => { alert('Clicked the centrally aligned submit button') },
  },
  render: Template_SubmitButton,
};
