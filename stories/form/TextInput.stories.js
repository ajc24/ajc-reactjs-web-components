/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { TextInput } from '../../components';

export default {
  component: TextInput,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Form Controls/Text Input',
};

/**
 * Text Input component template
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_TextInput = args => {
  return <TextInput {...args} />;
}

export const Default = {
  args: {
    id: 'default',
    label: 'Text Input (Default)',
  },
  render: Template_TextInput,
};

export const WithCentreAlignment = {
  args: {
    alignment: 'centre',
    id: 'with-centre-alignment',
    label: 'Text Input (Centre Alignment)',
  },
  render: Template_TextInput,
};

export const OptionalInput = {
  args: {
    id: 'optional-text-input',
    isOptional: true,
    label: 'Text Input',
  },
  render: Template_TextInput,
};

export const DisabledState = {
  args: {
    id: 'disabled-text-input',
    isDisabled: true,
    label: 'Text Input (Disabled)',
  },
  render: Template_TextInput,
};

export const WithDefaultValue = {
  args: {
    defaultValue: 'Default text input value',
    id: 'text-input-with-default-value',
    label: 'Text Input',
  },
  render: Template_TextInput,
};

export const ErrorState = {
  args: {
    errorMessage: 'This is a sample error message.',
    id: 'text-input-with-error',
    label: 'Text Input (With Error)',
  },
  render: Template_TextInput,
};

export const MobilePhoneTest = {
  args: {
    id: 'mobile-phone-test',
    label: 'Text Input (Mobile Phone Test)',
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_TextInput,
};
