/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { BaseFormInput } from '../../components';

export default {
  component: BaseFormInput,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Base Components/Base Form Input',
};

/**
 * Base Form Input component template
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_BaseFormInput = args => {
  return <BaseFormInput {...args} />;
}

export const Default = {
  args: {
    label: 'Text Input (Default)',
  },
  render: Template_BaseFormInput,
};

export const TextInputWithCentreAlignment = {
  args: {
    alignment: 'centre',
    id: 'with-centre-alignment',
    label: 'Text Input (Centre Alignment)',
    name: 'with-centre-alignment',
    type: 'text',
  },
  render: Template_BaseFormInput,
};

export const OptionalPasswordInput = {
  args: {
    id: 'optional-password-input',
    isOptional: true,
    label: 'Password Input',
    name: 'optional-password-input-field',
    type: 'password',
  },
  render: Template_BaseFormInput,
};

export const PasswordInputWithLeftAlignment = {
  args: {
    alignment: 'left',
    id: 'password-input-with-left-alignment',
    label: 'Password Input (Left Alignment)',
    name: 'password-input-with-left-alignment',
    type: 'password',
  },
  render: Template_BaseFormInput,
};

export const DateInputWithLeftAlignment = {
  args: {
    alignment: 'left',
    id: 'date-input-with-left-alignment',
    label: 'Date Input (Left Alignment)',
    name: 'date-input-with-left-alignment',
    type: 'date',
  },
  render: Template_BaseFormInput,
};

export const DisabledTextInput = {
  args: {
    id: 'disabled-text-input',
    isDisabled: true,
    label: 'Text Input (Disabled)',
    name: 'disabled',
  },
  render: Template_BaseFormInput,
};

export const DisabledDateInput = {
  args: {
    id: 'disabled-date-input',
    isDisabled: true,
    label: 'Date Input (Disabled)',
    name: 'disabled-date',
    type: 'date',
  },
  render: Template_BaseFormInput,
};

export const DisabledFocusTest = {
  args: {},
  render: () => {
    return <React.Fragment>
      <BaseFormInput id="text-input-1" label="Text Input 1" name="text-input-1" />
      <BaseFormInput id="disabled-text-input-2" isDisabled={true} label="Disabled Text Input 2" name="disabled-text-input-2" />
      <BaseFormInput id="password-input-3" label="Password Input 3" name="password-input-3" type="password" />
      <BaseFormInput id="password-input-4" isDisabled={true} label="Disabled Password Input 4" name="password-input-4" type="password" />
      <BaseFormInput id="date-input-5" label="Date Input 5" name="date-input-5" type="date" />
      <BaseFormInput id="date-input-6" isDisabled={true} label="Disabled Date Input 6" name="date-input-6" type="date" />
    </React.Fragment>
  },
};

export const InErrorState = {
  args: {
    errorMessage: 'This is a sample error message.',
    id: 'text-input-with-error',
    isError: true,
    label: 'Text Input (With Error)',
    name: 'with-error-message',
  },
  render: Template_BaseFormInput,
};

export const InErrorStateTest = {
  args: {},
  render: () => {
    return <React.Fragment>
      <BaseFormInput errorMessage="This entry has an error." id="error-text-input-1" isError={true} label="Text Input Error 1" />
      <BaseFormInput errorMessage="There is also an error with this field." id="error-text-input-2" isError={true} label="Text Input Error 2" />
      <BaseFormInput errorMessage="Please fix the error with the field above." id="error-text-input-3" isError={true} label="Text Input Error 3" />
    </React.Fragment>
  },
}

export const CentreAlignedErrorState = {
  args: {
    alignment: 'centre',
    errorMessage: 'This is a sample error message.',
    id: 'text-input-with-error-centre-aligned',
    isError: true,
    label: 'Text Input (Centre Aligned With Error)',
    name: 'with-error-centre-aligned',
  },
  render: Template_BaseFormInput,
};

export const MobilePhoneTest = {
  args: {
    id: 'mobile-phone-test',
    label: 'Text Input (Mobile Phone Test)',
    name: 'mobile-phone-test',
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_BaseFormInput,
};

export const WithReallyLongLabelAndErrorMessage = {
  args: {
    errorMessage: 'Please fix the error with the text input above. This error message will wrap to multiple lines as a test for how this text will appear when the error message spans multiple lines on-screen.',
    id: 'with-really-long-label-and-error-message',
    isError: true,
    label: 'Text Input With A Really Long Label Which Will Wrap To A New Line And Even On To Three Lines',
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_BaseFormInput,
};

