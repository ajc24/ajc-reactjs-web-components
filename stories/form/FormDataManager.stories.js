/**
 * Developed by Anthony Cox in 2026
 */
import React, { useEffect, useState } from 'react';
import {
  FormDataManager,
} from '../../components';

export default {
  component: FormDataManager,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Form Controls/Form Data Manager',
};

/**
 * Renders a template form data manager component to test its ability to load and receive form data
 * @returns {React.Component}
 */
const Template_FormDataManager = () => {
	const [ loadFormData, setLoadFormData ] = useState(false);

	/**
	 * Handles receiving the form data response from the form data manager component
	 * @param {string} formData 
	 */
	const handleGetFormData = formData => {
		setLoadFormData(false);
		console.log('The following response has been received from the load form data functionality:');
		console.log(formData);
	};

	/**
	 * Handles click events on the button in this component
	 */
	const handleOnClickButton = () => {
		setLoadFormData(true);
	};

	/**
	 * Performs the load form data process and returns the value from that
	 * @returns {string}
	 */
	const performLoadFormDataTest = () => {
		return 'This is the response from the performLoadFormDataTest functionality';
	};

	return (
		<React.Fragment>
			<button onClick={handleOnClickButton}>Click to Load Form Data</button>
			<FormDataManager backgroundColour="red" getLoadFormData={handleGetFormData} id="test-load-form-data" performLoadFormData={performLoadFormDataTest} startLoadFormData={loadFormData} />
		</React.Fragment>
	);
};

export const Default = {
  args: {},
  render: Template_FormDataManager,
};
