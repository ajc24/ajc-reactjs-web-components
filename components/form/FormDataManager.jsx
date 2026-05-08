/**
 * Developed by Anthony Cox in 2026
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../loading/Spinner.jsx';
import { fullPageMaskWaitTime } from './data';

/**
 * Form Data Manager component allows for the seamless loading of form data and integration of that data within a form.
 * 
 * There are two methods with which to load your forms data:
 * - Setting the **performAsyncLoadFormData** property allows you to set asynchronous functionality to load the forms data.
 * - Setting the **performLoadFormData** property expects non-asynchronous functionality to load the forms data.
 * 
 * When the forms data has been loaded, the response from the loading process is passed to the getLoadFormData functionality.
 * 
 * This component is intended for use with both the Main and FormManager components.
 */
const FormDataManager = props => {
  const [ isLoadingData, setIsLoadingData ] = useState(false);
  const [ processCompleted, setProcessCompleted ] = useState(false);

  useEffect(() => {
    if (props.startLoadFormData) {
      /* Set the loading process as started */
      setProcessCompleted(false);
      setIsLoadingData(true);
    }
    if (isLoadingData && processCompleted === false) {
      /* Now that we have started loading data, start the loading process */
      startLoadingProcess();
    }
    if (processCompleted) {
      /* On completion of the loading process, reset the loading state */
      setProcessCompleted(false);
      setIsLoadingData(false);
    }
  }, [ isLoadingData, processCompleted, props.startLoadFormData ]);

  /**
   * Handles the loading of the form data and pushes the response from that process to the
   * specified custom functionality
   */
  const handleLoadFormData = async () => {
    let response;
    if (props.performAsyncLoadFormData !== undefined) {
      /* Execute the asynchronous load form data functionality */
      response = await props.performAsyncLoadFormData();
    } else if (props.performLoadFormData !== undefined) {
      /* Execute the non-asynchronous load form data functionality */
      response = props.performLoadFormData();
    }
    /* Pass the response from the load data functionality to the specified functionality */
    if (props.getLoadFormData) {
      props.getLoadFormData(response);
    }
    /* Mark the loading process as completed */
    setProcessCompleted(true);
  };

  /**
   * Starts the loading form data process
   */
  const startLoadingProcess = () => {
    setTimeout(async () => {
      await handleLoadFormData();
    }, fullPageMaskWaitTime.long);
  };

  return (
    <React.Fragment>
      <Spinner colour={props.backgroundColour || 'white'} id={`${props.id}--pre-form-data-manager`} isDisplayed={isLoadingData}>
        {props.spinnerTextContent || 'Loading...'}
      </Spinner>
    </React.Fragment>
  );
};
FormDataManager.propTypes = {
  /** The background colour for the loading spinner rendered while the form data is loaded. The default colour for the spinner is white. */
  backgroundColour: PropTypes.oneOf([ 'gold', 'green', 'grey', 'navy-and-gold', 'navy-and-white', 'red', 'white' ]),
  /** Custom functionality which will receive the loaded form data after the loading process is completed. */
  getLoadFormData: PropTypes.func.isRequired,
  /** The unique identifier for the form data management component. */
  id: PropTypes.string.isRequired,
  /**
   * Custom functionality to load the form data using an asynchronous call.
   * This functionality is expected to be async and to return all form data in a Promise<JSON> of key and value pairs.
   * This functionality if declared, is prioritised over the non-async load form data functionality.
   */
  performAsyncLoadFormData: PropTypes.func,
  /**
   * Custom functionality to load the form data using a non-asynchronous call.
   * This functionality is expected to be non-async and to return all form data in a Promise<JSON> of key and value pairs.
   * If both the async and non-async load form data functionality are declared, this non-async version will not be executed.
   */
  performLoadFormData: PropTypes.func,
  /** Custom text content to be rendered with the loading spinner component. A generic loading message is displayed if this property is not set. */
  spinnerTextContent: PropTypes.string,
  /** Boolean switch to start the form data loading process. This is expected to be handled fully by your component, setting to true to start loading and reverting to false when done. */
  startLoadFormData: PropTypes.bool.isRequired,
};
export default FormDataManager;
