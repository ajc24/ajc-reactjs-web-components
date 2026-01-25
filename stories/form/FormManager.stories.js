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
 * Server side verifications functionality which is set to return a negative response with error messages for all form fields.
 * @param {FormData} formData 
 * @returns {{ email_address: { errorMessage: string }, password: { errorMessage: string}, remember_me: { errorMessage: string }, response: boolean }}
 */
const serverSideNonAsyncFalse = formData => {
  /* Set up the error response data for this test */
  const responseData = {
    response: false,
  };

  /* Set up the alert for the form JSON data and also plug the error messages data into the response data */
  let formDataString = 'Server Side Verifications\n';
  formDataString += 'Form Data Received\n';
  formDataString += '--------------------------\n';
  for (const pair of formData.entries()) {
    formDataString += `${pair[0]} => ${pair[1]}\n`;
    responseData[`${pair[0]}`] = {
      errorMessage: 'This is a server side verification error message.',
    };
  }
  formDataString += '--------------------------';
  console.log(formDataString);
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

  /* Set up the alert for the form JSON data */
  let formDataString = 'Server Side Verifications\n';
  formDataString += 'Form Data Received\n';
  formDataString += '--------------------------\n';
  for (const pair of formData.entries()) {
    formDataString += `${pair[0]} => ${pair[1]}\n`;
  }
  formDataString += '--------------------------';
  console.log(formDataString);
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

  /* Set up the alert for the form JSON data */
  let formDataString = 'Server Side Verifications\n';
  formDataString += 'Form Data Received\n';
  formDataString += '--------------------------\n';
  for (const pair of formData.entries()) {
    formDataString += `${pair[0]} => ${pair[1]}\n`;
  }
  formDataString += '--------------------------';
  console.log(formDataString);
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
          + ' to all of the form fields.',
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
  performServerSideVerifications: serverSideNonAsyncFalse,
  spinnerTextContent: 'Signing you in...',
  submitButtonTextContent: 'Login',
};

const nameEntryFormExampleServerSideTrueData = {
  backgroundColour: 'red',
  formSections: [
    {
      description: {
        id: 'name-entry-description',
        textContent: 'Please enter your first and last name. This form submission has no back end but will test client side verifications and server side verifications coming'
          + ' from a server side function that is not asynchronous. The server side response is expected to be true and will also invoke the onSuccessfulSubmit functionality.'
          + ' You will see all form data plus the onSuccessfulSubmit message output to the browser console.',
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
  onSuccessfulSubmit: () => {
    const message = 'onSuccessfulSubmit functionality has been called.\n\n'
      + 'In here you would notify the user as to the success of the submit form operation or maybe redirect them to a different page to confirm the same.';
    console.log(message);
  },
  performServerSideVerifications: serverSideNonAsyncTrue,
  spinnerTextContent: 'Authorizing...',
  submitButtonTextContent: 'Submit',
};

const checkboxSelectionFormExampleServerSideFalseData = {
  backgroundColour: 'gold',
  formSections: [
    {
      description: {
        id: 'checkbox-selection-description',
        textContent: 'Please agree to all specified terms and conditions. This form submission has no back end but will test client side verifications and server side verifications coming'
          + ' from a server side function that is not asynchronous. The server side response is expected to be false and will report a server error as the reason for submission failure.'
          + ' You will see all form data plus the onUnsuccessfulSubmit message output to the browser console.',
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
          label: 'I do not wish to be contacted by any third parties in relation to these agreements.',
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
  onUnsuccessfulSubmit: () => {
    const message = 'onUnsuccessfulSubmit functionality has been called.\n\n'
      + 'In here you would notify the user as to the nature of the server failure which has prevented their data from being submitted.';
    console.log(message);
  },
  performServerSideVerifications: serverSideNonAsyncFalseNoErrorMessages,
  spinnerTextContent: 'Checking consent...',
  submitButtonTextContent: 'Agree and Continue',
};

const multipleFormSectionExampleServerSideTrueData = {
  backgroundColour: 'green',
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
  onSuccessfulSubmit: () => {
    alert('Congratulations! You have successfully submitted this form');
  },
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
  onSuccessfulSubmit: () => {
    alert('Congratulations! You have successfully submitted this form');
  },
  performServerSideVerifications: () => { return { response: true } },
  spinnerTextContent: 'Verifying your data...',
  submitButtonTextContent: 'Submit',
};

const nameEntryFormExampleServerSideTrueNoFormClearData = {
  backgroundColour: 'red',
  clearFormOnSuccessfulSubmit: false,
  formSections: [
    {
      description: {
        id: 'no-clear-form-name-entry-description',
        textContent: 'Please enter your first and last name.',
      },
      form: [
        {
          id: 'no-clear-form-first-name',
          label: 'First Name',
          type: 'input',
        },
        {
          id: 'no-clear-form-last-name',
          label: 'Last Name',
          type: 'input',
        },
      ],
      heading: {
        id: 'no-clear-form-name-entry-heading',
        textContent: 'Name Details',
      },
    },
  ],
  id: 'no-clear-form-name-entry',
  onSuccessfulSubmit: () => {
    alert('Congratulations! You have successfully submitted this form. Note that the form entries will not be cleared.')
  },
  performServerSideVerifications: serverSideNonAsyncTrue,
  spinnerTextContent: 'Authorizing...',
  submitButtonTextContent: 'Submit',
};

export const LoginFormServerSideFalseResponseTest = {
  args: loginFormExampleServerSideFalseData,
  render: Template_FormManager,
};

export const NameEntryFormServerSideTrueResponseTest = {
  args: nameEntryFormExampleServerSideTrueData,
  render: Template_FormManager,
};

export const TermsAndConditionsFormServerSideFalseResponseTest = {
  args: checkboxSelectionFormExampleServerSideFalseData,
  render: Template_FormManager,
};

export const MultipleFormSectionsServerSideTrueResponseTest = {
  args: multipleFormSectionExampleServerSideTrueData,
  render: Template_FormManager,
};

export const PrepopulatedFormSectionsServerSideTrueResponseTest = {
  args: prepopulatedFormSectionExampleServerSideTrueData,
  render: Template_FormManager,
};

export const NameEntryFormServerSideTrueResponseWithNoFormClearTest = {
  args: nameEntryFormExampleServerSideTrueNoFormClearData,
  render: Template_FormManager,
};
