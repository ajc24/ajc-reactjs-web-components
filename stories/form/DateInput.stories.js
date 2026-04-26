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
    name: 'with-centre-alignment',
  },
  render: Template_DateInput,
};

export const DisabledState = {
  args: {
    id: 'disabled-date-input',
    isDisabled: true,
    label: 'Date Input (Disabled)',
    name: 'disabled-date-input',
  },
  render: Template_DateInput,
};

export const ErrorState = {
  args: {
    errorMessage: 'This is a sample error message.',
    id: 'date-input-with-error',
    label: 'Date Input (With Error)',
    name: 'date-input-with-error',
  },
  render: Template_DateInput,
};

export const OptionalDateField = {
  args: {
    id: 'date-input-optional',
    isOptional: true,
    label: 'Date Input (Optional)',
    name: 'date-input-optional',
  },
  render: Template_DateInput,
};

export const WithCustomDate = {
  args: {
    defaultValue: '2002-12-25',
    id: 'date-input-with-custom-date',
    label: 'Date Input (With Custom Date)',
    name: 'date-input-with-custom-date',
  },
  render: Template_DateInput,
};

export const MobilePhoneTest = {
  args: {
    id: 'mobile-phone-test',
    label: 'Date Input (Mobile Phone Test)',
    name: 'mobile-phone-test',
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_DateInput,
};
