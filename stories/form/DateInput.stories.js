/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { DateInput } from '../../components';

export default {
  component: DateInput,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Form Controls/Date Input',
};

/**
 * Date Input component template
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_DateInput = args => {
  return <DateInput {...args} />;
}

export const Default = {
  args: {
    id: 'default',
    label: 'Date Input (Default)',
  },
  render: Template_DateInput,
};

export const WithCentreAlignment = {
  args: {
    alignment: 'centre',
    id: 'with-centre-alignment',
    label: 'Date Input (Centre Alignment)',
  },
  render: Template_DateInput,
};

export const DisabledState = {
  args: {
    id: 'disabled-date-input',
    isDisabled: true,
    label: 'Date Input (Disabled)',
  },
  render: Template_DateInput,
};

export const ErrorState = {
  args: {
    errorMessage: 'This is a sample error message.',
    id: 'date-input-with-error',
    label: 'Date Input (With Error)',
  },
  render: Template_DateInput,
};

export const MobilePhoneTest = {
  args: {
    id: 'mobile-phone-test',
    label: 'Date Input (Mobile Phone Test)',
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_DateInput,
};
