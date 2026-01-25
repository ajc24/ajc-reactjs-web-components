/**
 * Developed by Anthony Cox in 2026
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FormSection from './FormSection.jsx';
import Paragraph from '../text/Paragraph.jsx';
import Spinner from '../loading/Spinner.jsx';
import SubmitButton from './SubmitButton.jsx';
import '../css/common.css';
import {
  EventManager,
  HTMLElementManager,
  KeyboardEventManager,
} from '../modules';

/* Set the placeholder ID for the submit button component */
const submitButtonIdPlaceholder = '--submit-button--base-button';

/* Set other custom data for this component */
const fullPageMaskWaitTime = 500;
const hiddenButtonDOMClickWaitTime = 250;

/* Create the element and event managers used by this component */
const eventManager = new EventManager();
const htmlElementManager = new HTMLElementManager();
const keyboardEventManager = new KeyboardEventManager();

/**
 * Form Manager component allows for a complete form to be rendered and will automatically handle the full form submission process.
 * 
 * The form manager component will render a message above the form indicating that mandatory fields are present based on the value provided to the **hasMandatoryFields**
 * property. The form itself will be made up of one or more Form Section components which can be customised to render any style of form you wish. The forms submit
 * button will be rendered below the form, the text for which can be custom set to any value you may wish to use by setting the **submitButtonTextContent** property.
 * 
 * On clicking the submit button in the form manager component, all client side verifications are performed automatically for all fields in all form sections.
 * 
 * If the client side verifications process fails for any of the form field validations, error messages are automatically output below the affected field(s) to indicate
 * what the problem was and how to fix it.
 * 
 * If the client side verifications process passes then the form manager component will create a **FormData** instance of all data in the form and will pass that form data
 * on to the server side verifications functionality.
 * 
 * There are two ways to specify your own custom server side verifications functionality, both of which are expected to take in the **FormData** instance as their first
 * parameter:
 * - Setting the **performAsyncServerSideVerifications** property allows you to set asynchronous functionality to be executed.
 * - Setting the **performServerSideVerifications** property expects non-asynchronous functionality to be set for execution.
 * 
 * If the server side verifications functionality fails it is expected to provide a JSON response which includes:
 * - A **response** key of **false**, indicating that the verifications did not succeed.
 * - In the case of failure due to user input, it also expects that any or all error message handling will be provided from the server which can then be plugged into the
 * relevant fields in the form and rendered back to the user.
 * - In the case of failure due to a server error or other non-user oriented issue, only a **response** key of **false** is expected however the **onUnsuccessfulSubmit**
 * property functionality will be invoked in this case if functionality has been specified.
 * 
 * If the server side verifications functionality succeeds then it is only expected to provide a JSON response which includes a **response** key of **true**.
 * - On receiving a true response, this component will by default clear all data entered in the current form. You can disable this behaviour by setting the
 * **clearFormOnSuccessfulSubmit** property to a **false** value.
 * - It will also execute the functionality set to the **onSuccessfulSubmit** property if this functionality has been specified.
 * 
 * The form manager component is left aligned by default but can also be centrally aligned if desired. Setting the alignment means that all of the form sections headings,
 * descriptions (if rendered) and all form items will adhere to that alignment setting.
 *
 * This component is intended for use with the Main component.
 */
const FormManager = props => {
  const [ allCsvResponses, setAllCsvResponses ] = useState(false);
  const [ csvResponse, setCsvResponse ] = useState(false);
  const [ formSections, setFormSections ] = useState([]);
  const [ inert, setInert ] = useState(false);
  const [ init, setInit ] = useState(false);
  const [ isProcessing, setIsProcessing ] = useState(false);
  const [ numberOfCsvResponses, setNumberOfCsvResponses ] = useState(-1);
  const [ verificationsComplete, setVerificationsComplete ] = useState(false);

  useEffect(() => {
    if (init === false) {
      /* First time component initialisation */
      setFormSections(props.formSections);

      /* Ensure form submit events do not happen on "Enter" key presses */
      const formElement = getFormDOMElement();
      formElement.addEventListener('keydown', handleOnKeyDownFormSubmit);
      setInit(true);
    }

    if (numberOfCsvResponses === 0) {
      /* A new request to execute the client side verifications has been made - submit the form */
      dispatchEventFormRequestSubmit();
    }

    if (allCsvResponses === true) {
      /* All responses from client side verifications have been processed - go and handle the response from the CSV process */
      setAllCsvResponses(false);
      handleCsvResponse();
    }

    if (inert === false && verificationsComplete === true) {
      /**
       * These parameters mean that all verifications processes have completed in full
       * Return focus to the submit button element in the DOM
       */
      setVerificationsComplete(false);
      focusOnSubmitButtonDOMElement();
    }
  }, [ allCsvResponses, inert, numberOfCsvResponses, verificationsComplete ]);

  /**
   * Dispatch the submit event on the main form component
   */
  const dispatchEventFormRequestSubmit = () => {
    const formElement = getFormDOMElement();
    htmlElementManager.setDOMElement(formElement);
    htmlElementManager.requestSubmit();
  };

  /**
   * Applies focus to the submit form button component
   */
  const focusOnSubmitButtonDOMElement = () => {
    const submitButtonElement = getSubmitButtonDOMElement();
    htmlElementManager.setDOMElement(submitButtonElement);
    htmlElementManager.focus();
  };

  /**
   * Gets the FormData instance representing all rendered form data
   * @returns {FormData} 
   */
  const getFormData = () => {
    /* Retrieve the DOM elements for the form and submit button elements */
    const formElement = getFormDOMElement();
    const submitButtonElement = getSubmitButtonDOMElement();

    /* Create the form data */
    const formData = new FormData(formElement, submitButtonElement);

    /* Cycle through all expected form data elements and ensure the data is as expected */
    let sectionIndex = 0;
    while (sectionIndex < formSections.length) {
      const formSectionData = formSections[sectionIndex];
      let formIndex = 0;
      while (formIndex < formSectionData.form.length) {
        const currentForm = formSectionData.form[formIndex];
        const currentFormItemName = currentForm.id.replaceAll('-', '_').trim();

        if (currentForm.type === 'checkbox') {
          if (formData.has(currentFormItemName) === false) {
            /* The checkbox has not been given a value in the form - ensure the value is default set to false */
            formData.append(currentFormItemName, false);
          } else if (formData.get(currentFormItemName) === 'on') {
            /* Set the checkbox "on" setting to true to more accurately reflect its selected status */
            formData.set(currentFormItemName, true);
          }
        } else if (currentForm.type === 'email' || currentForm.type === 'input' || currentForm.type === 'password') {
          /* Remove any trailing spaces from the email address data entry */
          const currentValue = formData.get(currentFormItemName);
          formData.set(currentFormItemName, currentValue.trim());
        }
        formIndex += 1;
      }
      sectionIndex += 1;
    }
    return formData;
  };

  /**
   * Retrieves the DOM element for the main form component
   * @returns {HTMLFormElement}
   */
  const getFormDOMElement = () => {
    return document.forms[`${getIdFormDOMElement()}`];
  };

  /**
   * Retrieves the DOM element for the hidden button component which triggers the clear all entries event for the target form section
   * @param {number} index 
   * @returns {HTMLElement}
   */
  const getFormSectionClearHiddenButtonDOMElement = index => {
    return document.querySelector(`button[id="${getIdFormSectionHiddenButtonDOMElement(index)}--clear"]`);
  };

  /**
   * Retrieves the DOM element for the hidden button component which triggers the submission event for the target form section
   * @param {number} index 
   * @returns {HTMLElement}
   */
  const getFormSectionCsvHiddenButtonDOMElement = index => {
    return document.querySelector(`button[id="${getIdFormSectionHiddenButtonDOMElement(index)}--csv"]`);
  };

  /**
   * Generates the ID for the main form component
   * @returns {string}
   */
  const getIdFormDOMElement = () => {
    return `${props.id}--form-manager`;
  };

  /**
   * Generates the ID for the submit form button component
   * @returns {string}
   */
  const getIdSubmitButtonDOMElement = () => {
    return `${props.id}--form-manager`;
  };

  /**
   * Generates the ID for the target form sections hidden button component
   * @param {number} index
   * @returns {string}
   */
  const getIdFormSectionHiddenButtonDOMElement = index => {
    return `form-manager--form-section-${index}`;
  };

  /**
   * Retrieves the DOM element for the submit form button component
   * @returns {HTMLElement}
   */
  const getSubmitButtonDOMElement = () => {
    return document.querySelector(`button[id="${getIdSubmitButtonDOMElement()}${submitButtonIdPlaceholder}"]`);
  };

  /**
   * Handles the final client side verifications response after all local verifications have been carried out.
   * If the client side verifications response is true then server side verifications are then executed.
   */
  const handleCsvResponse = async () => {
    if (csvResponse === true) {
      const formData = getFormData();
      let serverSideResponse = { response: false };
      if (props.performAsyncServerSideVerifications !== undefined) {
        /* Execute the asynchronous server side verifications functionality */
        serverSideResponse = await props.performAsyncServerSideVerifications(formData);
      } else if (props.performServerSideVerifications !== undefined) {
        /* Execute the non-asynchronous server side verifications functionality */
        serverSideResponse = props.performServerSideVerifications(formData);
      }
      /* Handle the server side response */
      handleSsvResponse(serverSideResponse);
    } else {
      /* Client side verifications have returned a false response. Mark this process as completed */
      setVerificationsResponseAsCompleted();
    }
  };

  /**
   * Handles click events on the form managers submit button
   */
  const handleOnClickSubmitButton = () => {
    /* Set the global client side verifications responses to a true value before any checks are carried out */
    setIsProcessing(true);

    /* To avoid the "Please Wait" spinner flashing quickly on-screen, allow a small wait time before processing the form */
    setTimeout(() => {
      setInert(true);
      setCsvResponse(true);
      setNumberOfCsvResponses(0);
    }, fullPageMaskWaitTime);
  };

  /**
   * Handles all responses from client side verifications and uses it to update the global client side verifications response
   * @param {boolean} verificationsResponse 
   */
  const handleOnClientSideVerifications = verificationsResponse => {
    setCsvResponse(csvResponse && verificationsResponse);
    setNumberOfCsvResponses(numberOfCsvResponses + 1);
    if ((numberOfCsvResponses + 1) === formSections.length) {
      /* Once we have received all responses, mark the process as completed */
      setAllCsvResponses(true);
    }
  };

  /**
   * Handles the main form components submission requests
   * @param {Event} event
   */
  const handleOnFormSubmit = event => {
    /* Stop the current event - this will stop the form actions event from being dispatched */
    eventManager.setEvent(event);
    eventManager.preventDefault();

    /**
     * Clicks each of the CSV-oriented hidden button elements in the DOM until all buttons are pressed.
     * This will invoke all CSV functionality for all sections of the form. There is a small wait time
     * between each CSV verification request in order to keep things consistent.
     * @param {number} index 
     */
    const clickHiddenButtonDOMElements = index => {
      const formSectionElement = getFormSectionCsvHiddenButtonDOMElement(index);
      htmlElementManager.setDOMElement(formSectionElement);
      htmlElementManager.click();
      
      if (index + 1 < formSections.length) {
        setTimeout(() => {
          clickHiddenButtonDOMElements(index + 1);
        }, hiddenButtonDOMClickWaitTime);
      }
    };

    /* Set the button index to a zero value and click all of the hidden button DOM elements for CSV */
    let buttonIndex = 0;
    clickHiddenButtonDOMElements(buttonIndex);
  };

  /**
   * Handles keyboard events within the form. Specifically ensures that pressing the "Enter" key does not submit the form.
   * The only "Enter" key press which does allow the form to be submitted is an "Enter" key press on the submit button.
   * @param {Event} event
   */
  const handleOnKeyDownFormSubmit = event => {
    keyboardEventManager.setEvent(event);
    if (keyboardEventManager.isEnterKeyEvent() && keyboardEventManager.getEventTargetId() !== `${getIdSubmitButtonDOMElement()}${submitButtonIdPlaceholder}`) {
      /* A keyboard event on a form element other than the submit button has been dispatched. Prevent the form from submitting. */
      event.preventDefault();
    }
  };

  /**
   * Handles the server side verifications response after all server side verifications have been carried out.
   * @param {JSON} serverSideResponse
   */
  const handleSsvResponse = serverSideResponse => {
    if (serverSideResponse.response === true) {
      /**
       * Process the successful server side response.
       * This will indicate to the user that everything was OK with their entries and will clear the form of all data.
       */

      /* Mark this process as completed */
      setVerificationsResponseAsCompleted();

      /* Clear all of the form section entries if desired */
      if (props.clearFormOnSuccessfulSubmit !== false) {
        let formSectionIndex = 0;
        while (formSectionIndex < formSections.length) {
          /* Click the hidden button to activate the clear all entries functionality for the current form section */
          const clearButtonElement = getFormSectionClearHiddenButtonDOMElement(formSectionIndex);
          htmlElementManager.setDOMElement(clearButtonElement);
          htmlElementManager.click();
          formSectionIndex += 1;
        }
      }

      if (props.onSuccessfulSubmit !== undefined) {
        /* Execute the onSuccessfulSubmit functionality if it has been declared */
        props.onSuccessfulSubmit();
      }
    } else {
      const listOfResponseKeys = Object.keys(serverSideResponse);
      const newFormSections = [].concat(formSections);
      if (listOfResponseKeys.length === 1) {
        /**
         * Process the false server side response.
         * Other errors such as server errors: this will expect only a response value and no other data and will then try to execute the onUnsuccessfulSubmit functionality.
         */
        if (props.onUnsuccessfulSubmit !== undefined) {
          props.onUnsuccessfulSubmit();
        }
      } else {
        /**
         * Process the false server side response.
         * User validation error: this will expect some / all fields to have error messages and will post them underneath the relevant fields.
         */
        for (const key of listOfResponseKeys) {
          if (serverSideResponse[`${key}`].errorMessage !== undefined) {
            /* Convert the form element name back to its id */
            const formElementId = key.replaceAll('_', '-').trim();
            let formSectionIndex = 0;
            let foundFormElement = false;
            while (formSectionIndex < newFormSections.length && foundFormElement === false) {
              /* Get the current form section */
              const currentFormSection = newFormSections[formSectionIndex];
              let formIndex = 0;
              while (formIndex < currentFormSection.form.length && foundFormElement === false) {
                /* Get the current form item for this section */
                const currentFormItem = currentFormSection.form[formIndex];
                if (currentFormItem.id === formElementId) {
                  /* Found the matching form item for this section - set the error message to it */
                  newFormSections[formSectionIndex].form[formIndex].errorMessage = serverSideResponse[`${key}`].errorMessage;
                  foundFormElement = true;
                };
                formIndex += 1;
              }
              formSectionIndex += 1;
            }
          }
        }
      }
      /* After processing the error messages set to the server side response - set this as the new form data */
      setFormSections(newFormSections);

      /* Mark this process as completed */
      setVerificationsResponseAsCompleted();
    }
  };

  /**
   * Sets state to mark the current response handling as completed.
   * This response handling includes marking responses from client side verifications and server side verifications as fully completed.
   */
  const setVerificationsResponseAsCompleted = () => {
    setNumberOfCsvResponses(-1);
    setVerificationsComplete(true);
    setInert(false);
    setIsProcessing(false);
  };

  /* Set the CSS styling for the mandatory field asterisk indicator */
  const asteriskCss = 'font-default font-red';

  return (
    <React.Fragment>
      <form id={getIdFormDOMElement()} inert={inert} onSubmit={handleOnFormSubmit}>
        {
          props.hasMandatoryFields !== false &&
            <Paragraph alignment={props.alignment} id="mandatory-field-indicator">
              <span className={asteriskCss}>*&nbsp;</span> indicates a mandatory field.
            </Paragraph>
        }
        {
          formSections.map((formSection, index) => {
            return <FormSection alignment={props.alignment} description={formSection.description} form={formSection.form} heading={formSection.heading}
              id={getIdFormSectionHiddenButtonDOMElement(index)} key={getIdFormSectionHiddenButtonDOMElement(index)} onClientSideVerifications={handleOnClientSideVerifications}
              showBottomBorder={index === formSections.length - 1 ? false : true} />
          })
        }
        <SubmitButton alignment={props.alignment} backgroundColour={props.backgroundColour} id={getIdSubmitButtonDOMElement()} onClick={handleOnClickSubmitButton}>
          {props.submitButtonTextContent || 'Submit'}
        </SubmitButton>
      </form>
      <Spinner colour={props.backgroundColour || 'white'} enableEscapeKey={false} id={getIdFormDOMElement()} isDisplayed={isProcessing}>
        {props.spinnerTextContent || 'Loading...'}
      </Spinner>
    </React.Fragment>
  );
};
FormManager.propTypes = {
  /** The alignment of the form component. By default all form content will be left aligned but can be centre aligned if desired. */
  alignment: PropTypes.oneOf([ 'centre', 'left' ]),
  /** The background colour for the submit button. The default colour for the background is white. */
  backgroundColour: PropTypes.oneOf([ 'gold', 'green', 'grey', 'navy-and-gold', 'navy-and-white', 'red', 'white' ]),
  /** Switch to enable the clearing of all form entries after a successful form submit has occurred. By default this option is enabled but you can custom disable it. */
  clearFormOnSuccessfulSubmit: PropTypes.bool,
  /** The list of data which represents all of the form sections to be rendered. */
  formSections: PropTypes.arrayOf([
    PropTypes.shape({
      description: PropTypes.shape({
        id: PropTypes.string,
        textContent: PropTypes.string,
      }),
      form: PropTypes.arrayOf([
        PropTypes.shape({
          defaultSelection: PropTypes.bool,
          defaultValue: PropTypes.string,
          errorMessage: PropTypes.string,
          id: PropTypes.string.isRequired,
          isDisabled: PropTypes.bool,
          isOptional: PropTypes.bool,
          label: PropTypes.string.isRequired,
          type: PropTypes.oneOf([ 'checkbox', 'email', 'input', 'password' ]).isRequired,
        }),
      ]).isRequired,
      heading: PropTypes.shape({
        id: PropTypes.string.isRequired,
        textContent: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ]).isRequired,
  /** Switch to enable the mandatory field indicator text content which will appear above the form when enabled. By default this is enabled. */
  hasMandatoryFields: PropTypes.bool,
  /** The unique identifier for the form component. */
  id: PropTypes.string.isRequired,
  /**
   * Custom functionality to be executed on successful submission of the form. This functionality is optional but if declared will be executed after
   * the full server side verification process has completed and returned a true response with no error messages. This functionality is useful for if
   * you wish to render a message dialog (for example) to indicate form submission success or redirect the user to a success page or account page in
   * case of successful login etc.
   */
  onSuccessfulSubmit: PropTypes.func,
  /**
   * Custom functionality to be executed on unsuccessful submission of the form that is not related to user input / incorrect entries in the form. This functionality is
   * useful for if you wish to render a message dialog (for example) to indicate a more serious failure, such as a server related issue, back to the user after they have
   * submitted their details.
   */
  onUnsuccessfulSubmit: PropTypes.func,
  /**
   * Custom functionality to perform server side verifications only if the client side verifications are successful.
   * This functionality is expected to be async and to return a Promise.<JSON> with a response key and boolean value pair included plus all error message handling for the form components.
   * This functionality if declared, is prioritised over the non-async server side verifications functionality.
   * The FormData instance of all form data rendered in the form manager component will be passed to this functionality as a parameter.
   */
  performAsyncServerSideVerifications: PropTypes.func,
  /**
   * Custom functionality to perform server side verifications only if the client side verifications are successful.
   * This is a non-async function is expected to return a JSON return value with a response key and boolean value pair included plus all error message handling for the form components.
   * If both the async and non-async server side verifications functionality are declared, this non-async version will not be executed.
   * The FormData instance of all form data rendered in the form manager component will be passed to this functionality as a parameter.
   */
  performServerSideVerifications: PropTypes.func,
  /** Custom text content to be rendered with the loading spinner component. A generic loading message is displayed if this property is not set. */
  spinnerTextContent: PropTypes.string,
  /** The text content to be assigned to the submit button. By default the button will simply read "Submit" but this is fully customisable */
  submitButtonTextContent: PropTypes.string,
};
export default FormManager;
