/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { Checkbox } from '../../components';

export default {
  component: Checkbox,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Form Controls/Checkbox',
};

/**
 * Checkbox component template
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_Checkbox = args => {
  return <Checkbox {...args} />;
}

export const Default = {
  args: {
    id: 'default',
    label: 'Checkbox (Default)',
  },
  render: Template_Checkbox,
};

export const MandatoryCheckbox = {
  args: {
    id: 'mandatory',
    isOptional: false,
    label: 'Checkbox (Mandatory)',
  },
  render: Template_Checkbox,
};

export const WithDefaultSelection = {
  args: {
    defaultSelection: true,
    id: 'with-default-selection',
    isOptional: true,
    label: 'Checkbox (Pre-Selected)',
  },
  render: Template_Checkbox,
};

export const WithCentreAlignment = {
  args: {
    alignment: 'centre',
    id: 'with-centre-alignment',
    label: 'Checkbox (Centre Alignment)',
    name: 'with-centre-alignment',
  },
  render: Template_Checkbox,
};

export const DisabledState = {
  args: {
    id: 'disabled-checkbox',
    isDisabled: true,
    label: 'Checkbox (Disabled)',
    name: 'disabled',
  },
  render: Template_Checkbox,
};

export const DisabledFocusTest = {
  args: {},
  render: () => {
    return <React.Fragment>
      <Checkbox id="checkbox-1" label="Checkbox 1" name="checkbox-1" />
      <Checkbox id="disabled-checkbox-2" isDisabled={true} label="Disabled Checkbox 2" name="disabled-checkbox-2" />
      <Checkbox id="checkbox-3" label="Checkbox 3" name="checkbox-3" />
    </React.Fragment>
  },
};

export const ErrorState = {
  args: {
    errorMessage: 'This is a sample error message.',
    id: 'checkbox-with-error',
    label: 'Checkbox (With Error)',
    name: 'with-error-message',
  },
  render: Template_Checkbox,
};

export const ErrorStateCentreAligned = {
  args: {
    alignment: 'centre',
    errorMessage: 'This is a sample error message.',
    id: 'checkbox-with-error-centre-aligned',
    label: 'Checkbox (With Error)',
    name: 'with-error-message-centre-aligned',
  },
  render: Template_Checkbox,
};

export const InErrorStateTest = {
  args: {},
  render: () => {
    return <React.Fragment>
      <Checkbox errorMessage="This checkbox has an error." id="checkbox-1" label="Checkbox 1" />
      <Checkbox errorMessage="There is also an error with this checkbox." id="checkbox-2" label="Checkbox 2" />
      <Checkbox errorMessage="Please fix the error with the checkbox above." id="checkbox-3" label="Checkbox 3" />
    </React.Fragment>
  },
};

export const WithCustomOnClick = {
  args: {
    id: 'with-custom-on-click',
    label: 'Checkbox (Custom onClick)',
    onClick: () => { alert('Custom onClick function called'); },
  },
  render: Template_Checkbox,
};

export const MobilePhoneTest = {
  args: {
    id: 'mobile-phone-test',
    label: 'Checkbox (Mobile Phone Test)',
    name: 'mobile-phone-test',
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_Checkbox,
};

export const WithReallyLongLabelAndErrorMessage = {
  args: {
    errorMessage: 'Please fix the error with the checkbox above. This error message will wrap to multiple lines as a test for how this text will appear when the error message spans multiple lines on-screen.',
    id: 'with-really-long-label-and-error-message',
    label: 'Checkbox With A Really Long Label Which Will Wrap To A New Line And Even On To Three Lines',
    name: 'with-truncated-text',
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_Checkbox,
};
