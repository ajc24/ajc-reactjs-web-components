/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { Button } from '../../components';

export default {
  component: Button,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Form Controls/Button',
};

/**
 * Button component template
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_Button = args => {
  return <Button {...args} />;
}

export const Default = {
  args: {
    children: 'Default White',
    id: 'default',
  },
  render: Template_Button,
};

export const GoldButton = {
  args: {
    backgroundColour: 'gold',
    children: 'Gold',
    id: 'gold',
    onClick: () => { alert('Clicked the gold button') },
  },
  render: Template_Button,
};

export const WithGreenBackground = {
  args: {
    backgroundColour: 'green',
    children: 'Green',
    id: 'green',
    onClick: () => { alert('Clicked the green button') },
  },
  render: Template_Button,
};

export const WithGreyBackground = {
  args: {
    backgroundColour: 'grey',
    children: 'Grey',
    id: 'grey',
    onClick: () => { alert('Clicked the grey button') },
  },
  render: Template_Button,
};

export const WithNavyAndGoldBackground = {
  args: {
    backgroundColour: 'navy-and-gold',
    children: 'Navy and Gold',
    id: 'navy-and-gold',
    onClick: () => { alert('Clicked the navy and gold button') },
  },
  render: Template_Button,
};

export const WithNavyAndWhiteBackground = {
  args: {
    backgroundColour: 'navy-and-white',
    children: 'Navy and White',
    id: 'navy-and-white',
    onClick: () => { alert('Clicked the navy and white button') },
  },
  render: Template_Button,
};

export const WithRedBackground = {
  args: {
    backgroundColour: 'red',
    children: 'Red',
    id: 'red',
    onClick: () => { alert('Clicked the red button') },
  },
  render: Template_Button,
};

export const WithTruncatedText = {
  args: {
    backgroundColour: 'grey',
    children: 'With Truncated Text Content',
    id: 'with-truncated-text',
    onClick: () => { alert('Clicked the button with truncated text content') },
  },
  render: Template_Button,
};

export const Disabled = {
  args: {
    backgroundColour: 'red',
    children: 'Disabled',
    id: 'disabled',
    isDisabled: true,
    onClick: () => { alert('Clicked the disabled button (should not appear)') },
  },
  render: Template_Button,
};

export const WithCentreAlignment = {
  args: {
    alignment: 'centre',
    backgroundColour: 'navy-and-gold',
    children: 'Centre Aligned',
    id: 'with-centre-alignment',
    onClick: () => { alert('Clicked the centrally aligned button') },
  },
  render: Template_Button,
};
