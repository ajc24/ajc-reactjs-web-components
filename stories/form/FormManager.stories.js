/**
 * Developed by Anthony Cox in 2026
 */
import React from 'react';
import {
  FormManager,
} from '../../components';

export default {
  component: FormManager,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Form Controls/Form Manager',
};

/**
 * Outputs the form data received from the form submission to the browser console logs.
 * This is intended for testing purposes to confirm that the form data is being correctly
 * passed to the server side verifications functionality.
 * @param {FormData} formData 
 */
const consoleLogFormData = formData => {
  /* Set up the alert for the form JSON data and also plug the error messages data into the response data */
  let formDataString = 'Server Side Verifications\n';
  formDataString += 'Form Data Received\n';
  formDataString += '--------------------------\n';
  for (const pair of formData.entries()) {
    formDataString += `${pair[0]} => ${pair[1]}\n`;
  }
  formDataString += '--------------------------';
  console.log(formDataString);
};

/**
 * Server side verifications functionality which is set to return a negative response with error messages for all form fields.
 * @param {FormData} formData 
 * @returns {{ email_address: { errorMessage: string }, password: { errorMessage: string}, remember_me: { errorMessage: string }, response: boolean }}
 */
const serverSideNonAsyncFalse = formData => {
  /* Set up the error response data for this test */
  const responseData = {
    response: false,
  };
  /* Plug the error messages data into the response data */
  for (const pair of formData.entries()) {
    responseData[`${pair[0]}`] = {
      errorMessage: 'This is a server side verification error message.',
    };
  }
  consoleLogFormData(formData);
  return responseData;
};

/**
 * Server side verifications functionality which is set to return a negative response with no error messages.
 * @param {FormData} formData 
 * @returns {{ response: boolean }}
 */
const serverSideNonAsyncFalseNoErrorMessages = formData => {
  /* Set up the error response data for this test */
  const responseData = {
    response: false,
  };
  consoleLogFormData(formData);
  return responseData;
};

/**
 * Server side verifications functionality which is set to return a negative response with error messages for all form fields.
 * @param {FormData} formData 
 * @returns {{ response: boolean }}
 */
const serverSideNonAsyncTrue = formData => {
  /* Set up the error response data for this test */
  const responseData = {
    response: true,
  };
  consoleLogFormData(formData);
  return responseData;
};

/**
 * Form Manager component template
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_FormManager = args => {
  return <FormManager {...args} />;
}

const loginFormExampleServerSideFalseData = {
  backgroundColour: 'navy-and-gold',
  formSections: [
    {
      description: {
        id: 'login-description',
        textContent: 'Please enter your login credentials. This form submission has no back end but will test client side verifications and server side verifications coming'
          + ' from a server side function that is not asynchronous. The server side response is expected to be false regardless of user input and will post error messages'
          + ' to all of the form fields. The data entered into the form fields will also be posted to the browser console logs if the client side verifications have successfully passed.',
      },
      form: [
        {
          id: 'email-address',
          label: 'Email Address',
          type: 'email',
        },
        {
          id: 'password',
          label: 'Password',
          type: 'password',
        },
        {
          id: 'remember-me',
          isOptional: true,
          label: 'Remember me',
          type: 'checkbox',
        },
      ],
      heading: {
        id: 'login-heading',
        textContent: 'Login',
      },
    },
  ],
  id: 'login',
  invalidFormEntriesDialogData: {
    backgroundColour: 'grey',
    contentData: [
      {
        content: 'There was a problem with your login credentials. Please see the form error messages for more details.',
        type: 'paragraph',
      },
      {
        content: 'This dialog will appear for both invalid client side verifications being detected and for invalid server side verifications being detected.',
        type: 'paragraph',
      },
    ],
    dialogTitleTextContent: 'Invalid Login Credentials',
  },
  performServerSideVerifications: serverSideNonAsyncFalse,
  spinnerTextContent: 'Signing you in...',
  submitButtonTextContent: 'Login',
};

const nameEntryFormExampleServerSideTrueData = {
  backgroundColour: 'red',
  clearFormOnSuccessfulSubmit: false,
  formSections: [
    {
      description: {
        id: 'name-entry-description',
        textContent: 'Please enter your first and last name. This form submission has no back end but will test client side verifications and server side verifications coming'
          + ' from a server side function that is not asynchronous. The server side response is expected to be true. A success dialog will be shown and the onSuccessfulSubmit functionality'
          + ' will also be invoked. If the process reaches the server side process, you will see all form data output to the browser console. The form will also not be cleared after'
          + ' successful form submission.',
      },
      form: [
        {
          id: 'first-name',
          label: 'First Name',
          type: 'input',
        },
        {
          id: 'last-name',
          label: 'Last Name',
          type: 'input',
        },
      ],
      heading: {
        id: 'name-entry-heading',
        textContent: 'Name Details',
      },
    },
  ],
  id: 'name-entry',
  invalidFormEntriesDialogData: {
    backgroundColour: 'white',
    contentData: [
      {
        content: 'There was a problem with your name entry details. Please see the highlighted fields for more information.',
        type: 'paragraph',
      },
    ],
    dialogTitleTextContent: 'Invalid Name Entry Details',
  },
  onSuccessfulSubmit: () => {
    alert('onSuccessfulSubmit() functionality would be executed here.');
  },
  performServerSideVerifications: serverSideNonAsyncTrue,
  spinnerTextContent: 'Authorizing...',
  submitButtonTextContent: 'Submit',
  successfulFormSubmissionDialogData: {
    backgroundColour: 'white',
    contentData: [
      {
        content: 'Your name entry details have been successfully submitted.',
        type: 'paragraph',
      },
      {
        content: 'Your form entry details have already been posted to the browser console. After you click to confirm this dialog, you will see the onSuccessfulSubmit functionality executed.',
        type: 'paragraph',
      },
    ],
    dialogTitleTextContent: 'Successful Name Entry Submission',
  },
};

const checkboxSelectionFormExampleServerSideFalseData = {
  backgroundColour: 'gold',
  formSections: [
    {
      description: {
        id: 'checkbox-selection-description',
        textContent: 'Please agree to all specified terms and conditions. This form submission has no back end but will test client side verifications and server side verifications coming'
          + ' from a server side function that is not asynchronous. The server side response is expected to be false and will report a server error as the reason for submission failure.'
          + ' You will see all form data output to the browser console.',
      },
      form: [
        {
          id: 'terms-1',
          isOptional: false,
          label: 'I agree with whatever this checkbox is asking me to agree to.',
          type: 'checkbox',
        },
        {
          id: 'terms-2',
          isOptional: false,
          label: 'I will adhere to the rules and regulations specified somewhere else.',
          type: 'checkbox',
        },
        {
          id: 'terms-3',
          isOptional: false,
          label: 'I want to sign my life away by agreeing to this statement.',
          type: 'checkbox',
        },
      ],
      heading: {
        id: 'checkbox-selection-heading',
        textContent: 'Terms and Conditions',
      },
    },
  ],
  id: 'terms-and-conditions',
  invalidFormEntriesDialogData: {
    backgroundColour: 'grey',
    contentData: [
      {
        content: 'You must agree to all specified terms and conditions before proceeding.',
        type: 'paragraph',
      },
    ],
    dialogTitleTextContent: 'Invalid Terms and Conditions Selection',
  },
  performServerSideVerifications: serverSideNonAsyncFalseNoErrorMessages,
  serverErrorDialogData: {
    backgroundColour: 'grey',
    contentData: [
      {
        content: 'This dialog is being shown because the server side verifications functionality returned a false response without any error messages.',
        type: 'paragraph',
      },
      {
        content: 'This is intended to simulate a scenario where there is an issue with the server side process that is not related to the form data submitted by the user.',
        type: 'paragraph',
      },
    ],
    dialogTitleTextContent: 'Server Error',
  },
  spinnerTextContent: 'Checking consent...',
  submitButtonTextContent: 'Agree and Continue',
};

const multipleFormSectionExampleServerSideTrueData = {
  backgroundColour: 'green',
  clearFormOnSuccessfulSubmit: true,
  formSections: [
    {
      description: {
        id: 'multiple-login-description',
        textContent: 'Please enter your login credentials.',
      },
      form: [
        {
          id: 'multiple-email-address',
          label: 'Email Address',
          type: 'email',
        },
        {
          id: 'multiple-password',
          label: 'Password',
          type: 'password',
        },
        {
          id: 'multiple-remember-me',
          isOptional: true,
          label: 'Remember me',
          type: 'checkbox',
        },
      ],
      heading: {
        id: 'multiple-login-heading',
        textContent: 'Login',
      },
    },
    {
      description: {
        id: 'multiple-name-entry-description',
        textContent: 'Please enter your first and last name.',
      },
      form: [
        {
          id: 'multiple-first-name',
          label: 'First Name',
          type: 'input',
        },
        {
          id: 'multiple-last-name',
          label: 'Last Name',
          type: 'input',
        },
      ],
      heading: {
        id: 'multiple-name-entry-heading',
        textContent: 'Name Details',
      },
    },
    {
      description: {
        id: 'multiple-checkbox-selection-description',
        textContent: 'Please agree to all specified terms and conditions.',
      },
      form: [
        {
          id: 'multiple-terms-1',
          isOptional: false,
          label: 'I agree with whatever this checkbox is asking me to agree to.',
          type: 'checkbox',
        },
        {
          id: 'multiple-terms-2',
          isOptional: false,
          label: 'I will adhere to the rules and regulations specified somewhere else.',
          type: 'checkbox',
        },
        {
          id: 'multiple-terms-3',
          isOptional: false,
          label: 'I do not wish to be contacted by any third parties in relation to these agreements.',
          type: 'checkbox',
        },
      ],
      heading: {
        id: 'multiple-checkbox-selection-heading',
        textContent: 'Terms and Conditions',
      },
    },
  ],
  id: 'multiple-form-sections',
  performServerSideVerifications: () => { return { response: true } },
  spinnerTextContent: 'Verifying your data...',
  submitButtonTextContent: 'Submit',
};

const prepopulatedFormSectionExampleServerSideTrueData = {
  backgroundColour: 'navy-and-white',
  formSections: [
    {
      description: {
        id: 'prepopulated-login-description',
        textContent: 'Please enter your login credentials.',
      },
      form: [
        {
          defaultValue: 'abc@test.com',
          id: 'prepopulated-email-address',
          label: 'Email Address',
          type: 'email',
        },
        {
          id: 'prepopulated-password',
          label: 'Password',
          type: 'password',
        },
        {
          defaultSelection: true,
          id: 'prepopulated-remember-me',
          isOptional: true,
          label: 'Remember me',
          type: 'checkbox',
        },
      ],
      heading: {
        id: 'prepopulated-login-heading',
        textContent: 'Login',
      },
    },
    {
      description: {
        id: 'prepopulated-name-entry-description',
        textContent: 'Please enter your first and last name.',
      },
      form: [
        {
          defaultValue: 'Michael',
          id: 'prepopulated-first-name',
          label: 'First Name',
          type: 'input',
        },
        {
          defaultValue: 'Myers',
          id: 'prepopulated-last-name',
          label: 'Last Name',
          type: 'input',
        },
      ],
      heading: {
        id: 'prepopulated-name-entry-heading',
        textContent: 'Name Details',
      },
    },
    {
      description: {
        id: 'prepopulated-checkbox-selection-description',
        textContent: 'Please agree to all specified terms and conditions.',
      },
      form: [
        {
          defaultSelection: true,
          id: 'prepopulated-terms-1',
          isOptional: false,
          label: 'I agree with whatever this checkbox is asking me to agree to.',
          type: 'checkbox',
        },
        {
          defaultSelection: true,
          id: 'prepopulated-terms-2',
          isOptional: false,
          label: 'I will adhere to the rules and regulations specified somewhere else.',
          type: 'checkbox',
        },
        {
          defaultSelection: true,
          id: 'prepopulated-terms-3',
          isOptional: false,
          label: 'I do not wish to be contacted by any third parties in relation to these agreements.',
          type: 'checkbox',
        },
      ],
      heading: {
        id: 'prepopulated-checkbox-selection-heading',
        textContent: 'Terms and Conditions',
      },
    },
  ],
  id: 'prepopulated-form-sections',
  invalidFormEntriesDialogData: {
    backgroundColour: 'grey',
    contentData: [
      {
        content: 'You must fill out all mandatory form fields before submitting this form.',
        type: 'paragraph',
      },
    ],
    dialogTitleTextContent: 'Invalid Form Data',
  },
  performServerSideVerifications: () => { return { response: true } },
  spinnerTextContent: 'Verifying your data...',
  submitButtonTextContent: 'Submit',
  successfulFormSubmissionDialogData: {
    backgroundColour: 'grey',
    contentData: [
      {
        content: 'All form details have been successfully submitted.',
        type: 'paragraph',
      },
    ],
    dialogTitleTextContent: 'Successful Form Submission',
  },
};

const fileImageUploadExampleServerSideTrue = {
  backgroundColour: 'gold',
  formSections: [
    {
      description: {
        id: 'file-image-upload-entry-description',
        textContent: 'Please select an image to be uploaded.',
      },
      form: [
        {
          id: 'file-image-upload',
          label: 'Upload an Image',
          type: 'file-image',
        },
      ],
      heading: {
        id: 'file-image-upload-entry-heading',
        textContent: 'Image Selection',
      },
    },
  ],
  id: 'file-image-upload-entry',
  invalidFormEntriesDialogData: {
    backgroundColour: 'grey',
    contentData: [
      {
        content: 'You must select a valid image to upload before submitting the form.',
        type: 'paragraph',
      },
    ],
    dialogTitleTextContent: 'Invalid Image Upload',
  },
  performServerSideVerifications: serverSideNonAsyncTrue,
  spinnerTextContent: 'Uploading...',
  submitButtonTextContent: 'Submit Image',
  successfulFormSubmissionDialogData: {
    backgroundColour: 'grey',
    contentData: [
      {
        content: 'The image has been successfully uploaded.',
        type: 'paragraph',
      },
    ],
    dialogTitleTextContent: 'Successful Image Upload',
  },
};

const dateAndDropdownExampleServerSideTrue = {
  backgroundColour: 'red',
  formSections: [
    {
      description: {
        id: 'date-and-dropdown-entry-description',
        textContent: 'Please select a coat type and a date.',
      },
      form: [
        {
          id: 'form-field-date',
          label: 'Date Registered',
          type: 'date',
        },
        {
          id: 'form-field-dropdown',
          label: 'Coat Type',
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
      ],
      heading: {
        id: 'date-and-dropdown-entry-heading',
        textContent: 'Date and Dropdown',
      },
    },
  ],
  id: 'date-and-dropdown-entry',
  invalidFormEntriesDialogData: {
    backgroundColour: 'grey',
    contentData: [
      {
        content: 'You must select a valid date and coat type before submitting the form.',
        type: 'paragraph',
      },
    ],
    dialogTitleTextContent: 'Invalid Form Data',
  },
  performServerSideVerifications: serverSideNonAsyncTrue,
  spinnerTextContent: 'Verifying...',
  submitButtonTextContent: 'Submit Details',
  successfulFormSubmissionDialogData: {
    backgroundColour: 'grey',
    contentData: [
      {
        content: 'The form has been successfully submitted.',
        type: 'paragraph',
      },
    ],
    dialogTitleTextContent: 'Successful Form Submission',
  },
};

export const LoginFormFalseResponseTest = {
  args: loginFormExampleServerSideFalseData,
  render: Template_FormManager,
};

export const NameEntryFormTrueResponseTest = {
  args: nameEntryFormExampleServerSideTrueData,
  render: Template_FormManager,
};

export const TermsAndConditionsFormFalseResponseTest = {
  args: checkboxSelectionFormExampleServerSideFalseData,
  render: Template_FormManager,
};

export const MultipleFormSectionsTestNoDialogsClearFormOnSuccessfulSubmit = {
  args: multipleFormSectionExampleServerSideTrueData,
  render: Template_FormManager,
};

export const PrepopulatedFormSectionsTest = {
  args: prepopulatedFormSectionExampleServerSideTrueData,
  render: Template_FormManager,
};

export const FileImageUploadFormServerSideTrueResponse = {
  args: fileImageUploadExampleServerSideTrue,
  render: Template_FormManager,
};

export const DateAndDropdownFormServerSideTrueResponse = {
  args: dateAndDropdownExampleServerSideTrue,
  render: Template_FormManager,
};
