/**
 * Developed by Anthony Cox in 2026
 */
import React from 'react';
import {
  Button,
  FormSection,
} from '../../components';

export default {
  component: FormSection,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Form Controls/Form Section',
};

/* Single form field story data */
const formFieldsData_NoError = [
  {
    id: 'form-field-1',
    label: 'Checkbox',
    type: 'checkbox',
  },
  {
    id: 'form-field-2',
    label: 'Text Input Field',
    type: 'input',
  },
  {
    id: 'form-field-3',
    label: 'Password Input Field',
    type: 'password',
  },
  {
    id: 'form-field-4',
    label: 'Image File Uploader',
    type: 'file-image',
  },
];
const formFieldsData_WithError = [
  {
    errorMessage: 'This checkbox has a validation error',
    id: 'form-field-1',
    label: 'Checkbox',
    type: 'checkbox',
  },
  {
    errorMessage: 'This text input field has a validation error',
    id: 'form-field-2',
    label: 'Text Input Field',
    type: 'input',
  },
  {
    errorMessage: 'This password input field has a validation error',
    id: 'form-field-3',
    label: 'Password Input Field',
    type: 'password',
  },
  {
    errorMessage: 'This image file uploader has a validation error',
    id: 'form-field-4',
    label: 'Image File Uploader',
    type: 'file-image',
  },
];

/* Multiple form field story data */
const multipleDescriptionData1 = {
  id: 'description-text-1',
  textContent: 'This is the description text for the first form section.',
};
const multipleDescriptionData2 = {
  id: 'description-text-2',
  textContent: 'This is the description text for the second form section.',
};
const multipleDescriptionData3 = {
  id: 'description-text-3',
  textContent: 'This is the description text for the third form section.',
};
const multipleFormFieldsData1 = [
  {
    id: 'form-field-1',
    label: 'Text Input Field 1',
    type: 'input',
  },
];
const multipleFormFieldsData2 = [
  {
    id: 'form-field-2',
    isDisabled: true,
    label: 'Text Input Field 2',
    type: 'input',
  },
];
const multipleFormFieldsData3 = [
  {
    id: 'form-field-3',
    isOptional: true,
    label: 'Text Input Field 3',
    type: 'input',
  },
];
const multipleHeadingData1 = {
  id: 'heading-text-1',
  textContent: 'Form Section Heading 1',
};
const multipleHeadingData2 = {
  id: 'heading-text-2',
  textContent: 'Form Section Heading 2',
};
const multipleHeadingData3 = {
  id: 'heading-text-3',
  textContent: 'Form Section Heading 3',
};

/**
 * Form Manager component template
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_FormSection = args => {
  return <FormSection {...args} />;
}

/**
 * Client Side Verifications Test component template
 * @returns {React.Component}
 */
const ClientSideVerificationsTestComponent = () => {

  /**
   * Handles click events on the "Clear Form" button
   */
  const onClickClearButton = () => {
    document.getElementById('csv-test--clear').click();
  };

  /**
   * Handles click events on the "CSV Test" button
   */
  const onClickCsvButton = () => {
    document.getElementById('csv-test--csv').click();
  };

  /**
   * Takes in the response from the CSV test process and posts the response to the console
   * @param {boolean} response 
   */
  const handleResponseClientSideVerifications = response => {
    console.log(`handleResponseClientSideVerifications() functionality called with response: ${response}`);
  };

  return (
    <React.Fragment>
      <FormSection
        alignment="left"
        backgroundColour="red"
        description={{ id: 'description-text-client-side-verifications', textContent: 'Click the button underneath the form to perform the Client Side Verifications test.' }}
        form={[
          {
            id: 'form-field-1',
            label: 'Optional Checkbox',
            type: 'checkbox',
          },
          {
            id: 'form-field-2',
            isOptional: false,
            label: 'Mandatory Checkbox',
            type: 'checkbox',
          },
          {
            id: 'form-field-3',
            label: 'Email Address Input Field',
            type: 'email',
          },
          {
            id: 'form-field-4',
            isDisabled: true,
            label: 'Disabled Email Address Field',
            type: 'email',
          },
          {
            id: 'form-field-5',
            label: 'Text Input Field 1',
            type: 'input',
          },
          {
            id: 'form-field-6',
            isOptional: true,
            label: 'Text Input Field 2',
            type: 'input',
          },
          {
            id: 'form-field-7',
            label: 'Image File Uploader',
            type: 'file-image',
          },
          {
            id: 'form-field-8',
            label: 'Password Input Field 1',
            type: 'password',
          },
          {
            id: 'form-field-9',
            isDisabled: true,
            label: 'Password Input Field 2',
            type: 'password',
          },
          {
            id: 'form-field-10',
            label: 'Date Input Field 1',
            type: 'date',
          },
          {
            id: 'form-field-11',
            isDisabled: true,
            label: 'Date Input Field 2',
            type: 'date',
          },
          {
            id: 'form-field-12',
            label: 'Dropdown Menu 1',
            optionsList: {
              groupLabel: 'Please Choose a Coat Type',
              itemsList: [
                { title: 'Blenheim', value: 'coat-type-blenheim' },
                { title: 'Ruby', value: 'coat-type-ruby' },
                { title: 'Black and Tan', value: 'coat-type-black-and-tan' },
                { title: 'Tricolour', value: 'coat-type-tricolour' },
              ],
            },
            type: 'dropdown',
          },
        ]}
        heading={{ id: 'heading-text-client-side-verifications', textContent: 'Form Section Test' }}
        id="csv-test"
        onClientSideVerifications={handleResponseClientSideVerifications}
        showBottomBorder={false}
      />
      <Button backgroundColour="red" id="mock-submit" onClick={onClickCsvButton}>CSV Test</Button>
      <Button backgroundColour="red" id="mock-clear" onClick={onClickClearButton}>Clear Form</Button>
    </React.Fragment>
  );
};

export const Default = {
  args: {
    backgroundColour: 'red',
    form: formFieldsData_NoError,
    heading: {
      id: 'default-no-description',
      textContent: 'Form Section Heading',
    },
    id: 'default',
  },
  render: Template_FormSection,
};

export const WithDescription = {
  args: {
    backgroundColour: 'green',
    description: {
      id: 'description-text-with-description',
      textContent: 'This is the description for the form section content.',
    },
    form: formFieldsData_NoError,
    heading: {
      id: 'heading-with-description',
      textContent: 'Form Section Heading',
    },
    id: 'with-description',
  },
  render: Template_FormSection,
};

export const WithNoBottomBorder = {
  args: {
    backgroundColour: 'gold',
    description: {
      id: 'description-text-with-no-bottom-border',
      textContent: 'This is the description for the form section content.',
    },
    form: formFieldsData_NoError,
    heading: {
      id: 'heading-with-no-bottom-border',
      textContent: 'Form Section Heading',
    },
    id: 'with-no-bottom-border',
    showBottomBorder: false,
  },
  render: Template_FormSection,
};

export const WithCentreAlignment = {
  args: {
    alignment: 'centre',
    backgroundColour: 'navy-and-gold',
    description: {
      id: 'description-text-with-centre-alignment',
      textContent: 'This is the description for the form section content.',
    },
    form: formFieldsData_NoError,
    heading: {
      id: 'heading-with-centre-alignment',
      textContent: 'Form Section Heading',
    },
    id: 'with-centre-alignment',
  },
  render: Template_FormSection,
};

export const MultipleFormSections = {
  args: {},
  render: () => {
    return (
      <React.Fragment>
        <FormSection alignment="left" description={multipleDescriptionData1} form={multipleFormFieldsData1} heading={multipleHeadingData1} id="multiple-form-sections-1" />
        <FormSection alignment="left" description={multipleDescriptionData2} form={multipleFormFieldsData2} heading={multipleHeadingData2} id="multiple-form-sections-2" />
        <FormSection alignment="left" description={multipleDescriptionData3} form={multipleFormFieldsData3} heading={multipleHeadingData3} id="multiple-form-sections-3"
          showBottomBorder={false}/>
      </React.Fragment>
    );
  },
};

export const WithErrorMessages = {
  args: {
    backgroundColour: 'navy-and-white',
    description: {
      id: 'description-text-with-error-messages',
      textContent: 'This is the description for the form section content.',
    },
    form: formFieldsData_WithError,
    heading: {
      id: 'heading-with-error-messages',
      textContent: 'Form Section Heading',
    },
    id: 'with-error-messages',
  },
  render: Template_FormSection,
};

export const ClientSideVerificationsTest = {
  args: {},
  render: () => {
    return (
      <ClientSideVerificationsTestComponent />
    );
  },
};

export const MobilePhoneTest = {
  args: {
    backgroundColour: 'red',
    description: {
      id: 'description-text-mobile-phone-test',
      textContent: 'This is the description for the form section content.',
    },
    form: formFieldsData_NoError,
    heading: {
      id: 'heading-mobile-phone-test',
      textContent: 'Form Section Heading',
    },
    id: 'mobile-phone-test',
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_FormSection,
};
