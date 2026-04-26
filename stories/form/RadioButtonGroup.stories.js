/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { RadioButtonGroup } from '../../components';

export default {
  component: RadioButtonGroup,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Form Controls/Radio Button Group',
};

const radioButtonsListData_Contact = {
  buttonsList: [
    {
      title: 'Email Address',
      value: 'email-address',
    },
    {
      title: 'Landline',
      value: 'landline',
    },
    {
      title: 'Mobile Phone',
      value: 'mobile-phone',
    },
  ],
  groupName: 'contact',
};

const radioButtonsListData_Cars = {
  buttonsList: [
    {
      title: 'Ferrari',
      value: 'ferrari',
    },
    {
      title: 'McLaren',
      value: 'mclaren',
    },
    {
      title: 'Mercedes',
      value: 'mercedes',
    },
    {
      title: 'Red Bull',
      value: 'red-bull',
    },
  ],
  groupName: 'cars',
};

const radioButtonsListData_Food = {
  buttonsList: [
    {
      title: 'Chips',
      value: 'chips',
    },
    {
      title: 'Burgers',
      value: 'burgers',
    },
    {
      title: 'Pizza',
      value: 'pizza',
    },
    {
      title: 'Crisps',
      value: 'crisps',
    },
    {
      title: 'Pasta',
      value: 'pasta',
    },
  ],
  groupName: 'food',
};

/**
 * Radio Button Group component template
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_RadioButtonGroup = args => {
  return <RadioButtonGroup {...args} />;
}

export const DefaultWhite = {
  args: {
    id: 'default',
    label: 'Please select a radio button:',
    radioButtonsList: radioButtonsListData_Contact,
  },
  render: Template_RadioButtonGroup,
};

export const WithGoldLabel = {
  args: {
    backgroundColour: 'gold',
    id: 'gold',
    label: 'Please select a radio button:',
    radioButtonsList: radioButtonsListData_Contact,
  },
  render: Template_RadioButtonGroup,
};

export const WithGreenLabel = {
  args: {
    backgroundColour: 'green',
    id: 'green',
    label: 'Please select a radio button:',
    radioButtonsList: radioButtonsListData_Contact,
  },
  render: Template_RadioButtonGroup,
};

export const WithGreyLabel = {
  args: {
    backgroundColour: 'grey',
    id: 'grey',
    label: 'Please select a radio button:',
    radioButtonsList: radioButtonsListData_Contact,
  },
  render: Template_RadioButtonGroup,
};

export const WithNavyAndGoldLabel = {
  args: {
    backgroundColour: 'navy-and-gold',
    id: 'navy-and-gold',
    label: 'Please select a radio button:',
    radioButtonsList: radioButtonsListData_Contact,
  },
  render: Template_RadioButtonGroup,
};

export const WithNavyAndWhiteLabel = {
  args: {
    backgroundColour: 'navy-and-white',
    id: 'navy-and-white',
    label: 'Please select a radio button:',
    radioButtonsList: radioButtonsListData_Contact,
  },
  render: Template_RadioButtonGroup,
};

export const WithRedLabel = {
  args: {
    backgroundColour: 'red',
    id: 'red',
    label: 'Please select a radio button:',
    radioButtonsList: radioButtonsListData_Contact,
  },
  render: Template_RadioButtonGroup,
};

export const WithCentreAlignment = {
  args: {
    alignment: 'centre',
    id: 'with-centre-alignment',
    label: 'Please select a radio button:',
    radioButtonsList: radioButtonsListData_Contact,
  },
  render: Template_RadioButtonGroup,
};

export const WithCustomButtonSelection = {
  args: {
    defaultSelectByValue: 'mobile-phone',
    id: 'with-custom-button-selection',
    label: 'Please select a radio button:',
    radioButtonsList: radioButtonsListData_Contact,
  },
  render: Template_RadioButtonGroup,
};

export const WithCustomOnClick = {
  args: {
    backgroundColour: 'navy-and-gold',
    id: 'navy-and-gold',
    label: 'Please select a radio button:',
    onClick: value => { alert(`Custom onClick function called from radio button with value: ${value}`); },
    radioButtonsList: radioButtonsListData_Contact,
  },
  render: Template_RadioButtonGroup,
};

export const DisabledState = {
  args: {
    id: 'disabled-radio-button-group',
    isDisabled: true,
    label: 'Please select a radio button:',
    radioButtonsList: radioButtonsListData_Contact,
  },
  render: Template_RadioButtonGroup,
};

export const DisabledFocusTest = {
  args: {},
  render: () => {
    return <React.Fragment>
      <RadioButtonGroup defaultSelectByValue="landline" id="radio-button-group-1" label="Please select a form of contact:" radioButtonsList={radioButtonsListData_Contact} />
      <RadioButtonGroup id="disabled-radio-button-group-2" isDisabled={true} label="Please select a car (disabled):" radioButtonsList={radioButtonsListData_Cars} />
      <RadioButtonGroup defaultSelectByValue="crisps" id="radio-button-group-3" label="Please select the food you would like:" radioButtonsList={radioButtonsListData_Food} />
    </React.Fragment>
  },
};

export const WithHeadingTextContent = {
  args: {
    headingTextContent: 'Radio Button Group',
    id: 'with-heading-text-content',
    label: 'Please select a radio button:',
    radioButtonsList: radioButtonsListData_Contact,
  },
  render: Template_RadioButtonGroup,
};

export const WithHeadingAndCentreAlignment = {
  args: {
    alignment: 'centre',
    headingTextContent: 'Radio Button Group',
    id: 'with-heading-and-centre-alignment',
    label: 'Please select a radio button:',
    radioButtonsList: radioButtonsListData_Contact,
  },
  render: Template_RadioButtonGroup,
};

export const ErrorState = {
  args: {
    backgroundColour: 'navy-and-white',
    errorMessage: 'This is a sample error message.',
    id: 'radio-button-group-with-error',
    label: 'Please select a radio button:',
    radioButtonsList: radioButtonsListData_Contact,
  },
  render: Template_RadioButtonGroup,
};

export const ErrorStateCentreAligned = {
  args: {
    alignment: 'centre',
    backgroundColour: 'navy-and-gold',
    errorMessage: 'This is a sample error message.',
    id: 'radio-button-group-with-error-and-centre-alignment',
    label: 'Please select a radio button:',
    radioButtonsList: radioButtonsListData_Contact,
  },
  render: Template_RadioButtonGroup,
};

export const InErrorStateTest = {
  args: {},
  render: () => {
    return <React.Fragment>
      <RadioButtonGroup errorMessage="This is a sample error message." id="radio-button-group-1" label="Please select a form of contact:" radioButtonsList={radioButtonsListData_Contact} />
      <RadioButtonGroup errorMessage="This is a sample error message." id="disabled-radio-button-group-2" isDisabled={true} label="Please select a car (disabled):" radioButtonsList={radioButtonsListData_Cars} />
      <RadioButtonGroup errorMessage="This is a sample error message." id="radio-button-group-3" label="Please select the food you would like:" radioButtonsList={radioButtonsListData_Food} />
    </React.Fragment>
  },
};

export const MobilePhoneTest = {
  args: {
    id: 'mobile-phone-test',
    label: 'Please select a radio button:',
    radioButtonsList: radioButtonsListData_Contact,
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_RadioButtonGroup,
};

export const WithReallyLongLabelAndErrorMessage = {
  args: {
    backgroundColour: 'red',
    errorMessage: 'Please fix the error with the radio button group above. This error message will wrap to multiple lines as a test for how this text will appear when the error message spans multiple lines on-screen.',
    headingTextContent: 'Radio Button Group With A Really Long Heading Text Which Will Expand On To Multiple Lines',
    id: 'with-really-long-label-and-error-message',
    label: 'Radio Button Group With A Really Long Label Which Will Wrap To A New Line And Even On To Three Lines:',
    radioButtonsList: {
      buttonsList: [
        {
          title: 'This is the first really long label which will expand to multiple lines in the UI',
          value: 'long-label-1',
        },
        {
          title: 'This is the second really long label which will expand to multiple lines in the UI',
          value: 'long-label-2',
        },
        {
          title: 'This is the third really long label which will expand to multiple lines in the UI',
          value: 'long-label-3',
        },
      ],
      groupName: 'stupidly-long-labels',
    },
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_RadioButtonGroup,
};
