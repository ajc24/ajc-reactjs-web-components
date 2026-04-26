/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { Dropdown } from '../../components';

export default {
  component: Dropdown,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Form Controls/Dropdown',
};

const optionsListCoatType = {
  groupLabel: 'Please Choose a Coat Type',
  itemsList: [
    { title: 'Blenheim', value: 'title-blenheim' },
    { title: 'Ruby', value: 'title-ruby' },
    { title: 'Black and Tan', value: 'title-black-and-tan' },
    { title: 'Tricolour', value: 'title-tricolour' },
  ],
};

const optionsListTitle = {
  groupLabel: 'Please Choose a Title',
  itemsList: [
    { title: 'Mr.', value: 'title-mr' },
    { title: 'Mrs.', value: 'title-mrs' },
    { title: 'Ms.', value: 'title-ms' },
  ],
};

const optionsListWeekday = {
  groupLabel: 'Please Choose a Week Day',
  itemsList: [
    { title: 'Monday', value: 'title-monday' },
    { title: 'Tuesday', value: 'title-tuesday' },
    { title: 'Wednesday', value: 'title-wednesday' },
    { title: 'Thursday', value: 'title-thursday' },
    { title: 'Friday', value: 'title-friday' },
  ],
};

/**
 * Dropdown component template
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_Dropdown = args => {
  return <Dropdown {...args} />;
}

export const Default = {
  args: {
    id: 'default',
    label: 'Title',
    name: 'default',
    optionsList: optionsListTitle,
  },
  render: Template_Dropdown,
};

export const WithCentreAlignment = {
  args: {
    alignment: 'centre',
    id: 'with-centre-alignment',
    label: 'Coat Type',
    name: 'with-centre-alignment',
    optionsList: optionsListCoatType,
  },
  render: Template_Dropdown,
};

export const DisabledStateUsingProps = {
  args: {
    id: 'disabled-dropdown-1',
    isDisabled: true,
    label: 'Weekday',
    name: 'disabled-dropdown-1',
    optionsList: optionsListWeekday,
  },
  render: Template_Dropdown,
};

export const DisabledStateUsingEmptyItemsList = {
  args: {
    id: 'disabled-dropdown-2',
    isDisabled: false,
    label: 'Dropdown (Disabled)',
    name: 'disabled-dropdown-2',
    optionsList: {
      groupLabel: 'No Items List Declared',
      itemsList: [],
    },
  },
  render: Template_Dropdown,
};

export const DisabledFocusTest = {
  args: {},
  render: () => {
    return <React.Fragment>
      <Dropdown id="focus-test-1" label="Focus Test 1" name="focus-test-1" optionsList={optionsListWeekday} />
      <Dropdown id="focus-test-2" isDisabled={true} label="Focus Test 2 (Disabled)" name="focus-test-2" optionsList={optionsListTitle} />
      <Dropdown id="focus-test-3" label="Focus Test 3" name="focus-test-3" optionsList={optionsListCoatType} />
    </React.Fragment>
  },
};

export const ErrorState = {
  args: {
    errorMessage: 'This is a sample error message.',
    id: 'dropdown-with-error',
    label: 'Dropdown (With Error 1)',
    name: 'with-error-message',
    optionsList: optionsListWeekday,
  },
  render: Template_Dropdown,
};

export const ErrorStateCentreAligned = {
  args: {
    alignment: 'centre',
    errorMessage: 'This is a sample error message.',
    id: 'dropdown-with-error-centre-aligned',
    label: 'Dropdown (With Error 2)',
    name: 'with-error-message-centre-aligned',
    optionsList: optionsListTitle,
  },
  render: Template_Dropdown,
};

export const WithPreselectedOption = {
  args: {
    id: 'dropdown-with-preselected-option',
    label: 'Dropdown (With Preselected Option)',
    name: 'with-preselected-option',
    optionsList: optionsListWeekday,
    defaultValue: 'title-wednesday',
  },
  render: Template_Dropdown,
};

export const OptionalDropdown = {
  args: {
    id: 'dropdown-optional',
    label: 'Coat Type',
    name: 'dropdown-optional',
    optionsList: optionsListCoatType,
    isOptional: true,
  },
  render: Template_Dropdown,
};

export const OnChangeEventTest = {
  args: {
    id: 'dropdown-on-change-test',
    label: 'Weekdays',
    name: 'dropdown-on-change-test',
    onChange: value => { alert(`Value of the Dropdown Selection: ${value}`); },
    optionsList: optionsListWeekday,
  },
  render: Template_Dropdown,
};

export const MobilePhoneTest = {
  args: {
    id: 'mobile-phone-test',
    label: 'Weekday',
    name: 'mobile-phone-test',
    optionsList: optionsListWeekday,
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_Dropdown,
};

export const WithReallyLongLabelAndErrorMessage = {
  args: {
    errorMessage: 'Please fix the error with the dropdown above. This error message will wrap to multiple lines as a test for how this text will appear when the error message spans multiple lines on-screen.',
    id: 'with-really-long-label-and-error-message',
    label: 'Dropdown With A Really Long Label Which Will Wrap To A New Line And Even On To Three Lines',
    name: 'with-really-long-label-text',
    optionsList: optionsListCoatType,
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_Dropdown,
};
