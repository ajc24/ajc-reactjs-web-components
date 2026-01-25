/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { PasswordInput } from '../../components';

export default {
  component: PasswordInput,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Form Controls/Password Input',
};

/**
 * Password Input component template
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_PasswordInput = args => {
  return <PasswordInput {...args} />;
}

export const Default = {
  args: {
    id: 'default',
    label: 'Password (Default)',
  },
  render: Template_PasswordInput,
};

export const WithCentreAlignment = {
  args: {
    alignment: 'centre',
    id: 'with-centre-alignment',
    label: 'Password (Centre Alignment)',
  },
  render: Template_PasswordInput,
};

export const DisabledState = {
  args: {
    id: 'disabled-password-input',
    isDisabled: true,
    label: 'Password (Disabled)',
  },
  render: Template_PasswordInput,
};

export const ErrorState = {
  args: {
    errorMessage: 'This is a sample error message.',
    id: 'password-input-with-error',
    label: 'Password (With Error)',
  },
  render: Template_PasswordInput,
};

export const MobilePhoneTest = {
  args: {
    id: 'mobile-phone-test',
    label: 'Password (Mobile Phone Test)',
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_PasswordInput,
};
