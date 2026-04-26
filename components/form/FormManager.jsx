/**
 * Developed by Anthony Cox in 2026
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '../dialog/Dialog.jsx';
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
import {
  formFieldsHiddenButtonDOMClickWaitTime,
  fullPageMaskWaitTime, 
} from './data';

/* Set the placeholder ID for the submit button component */
const submitButtonIdPlaceholder = '--submit-button--base-button';

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
 * - In the case of failure due to a server error or other non-user oriented issue, only a **response** key of **false** is expected.
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
  const [ csvResponse, setCsvResponse ] = useState(false);
  const [ formSections, setFormSections ] = useState([]);
  const [ inert, setInert ] = useState(false);
  const [ init, setInit ] = useState(false);
  const [ showInvalidFormEntriesDialog, setShowInvalidFormEntriesDialog ] = useState(false);
  const [ showLoadingSpinner, setShowLoadingSpinner ] = useState(false);
  const [ showServerErrorDialog, setShowServerErrorDialog ] = useState(false);
  const [ showSuccessfulFormSubmissionDialog, setShowSuccessfulFormSubmissionDialog ] = useState(false);
  const [ numberOfCsvResponses, setNumberOfCsvResponses ] = useState(-1);
  const [ ssvResponse, setSsvResponse ] = useState({ response: false });
  const [ verificationsStage, setVerificationsStage ] = useState(-1);

  useEffect(() => {
    if (init === false) {
      /* First time component initialisation */
      setFormSections(props.formSections);

      /* Ensure form submit events do not happen on "Enter" key presses */
      const formElement = getFormDOMElement();
      formElement.addEventListener('keydown', handleOnKeyDownFormSubmit);
      setInit(true);
    }
    const verificationsProcessFunctions = [
      stage0_ShowLoadingSpinner_DisableForm_ResetCsvSsvState,
      stage1_PerformClientSideVerifications,
      stage2_HandleClientSideVerificationsResponse,
      stage3_PerformServerSideVerifications,
      stage4_HandleServerSideVerificationsResponse,
      stage5_HideLoadingSpinner_ReEnableForm_ShowSuccessOrFailureDialog,
    ];
    if (verificationsStage >= 0) {
      /* Perform the functionality at the relevant processing stage */
      verificationsProcessFunctions[verificationsStage]();
    }
  }, [ verificationsStage ]);

  /**
   * Applies focus to the submit form button component
   */
  const focusOnSubmitButtonDOMElement = () => {
    setTimeout(() => {
      /* Add a small wait time to this instruction to give all other DOM updates a chance to finish (ie. such as hiding the full page mask) */
      const submitButtonElement = getSubmitButtonDOMElement();
      htmlElementManager.setDOMElement(submitButtonElement);
      htmlElementManager.focus();
    }, 50);
  };

  /**
   * Gets the FormData instance representing all rendered form data from all form sections
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
        } else if (currentForm.type === 'dropdown') {
          /* The dropdown value is all that is provided to the form data - ensure the text content of the selected dropdown option is also set */
          const currentValue = formData.get(currentFormItemName);
          const optionElement = getOptionDOMElement(currentValue);
          htmlElementManager.setDOMElement(optionElement);
          formData.set(`${currentFormItemName}_text_content`, htmlElementManager.getTextContent());
        } else if (currentForm.type === 'email' || currentForm.type === 'input' || currentForm.type === 'password') {
          /* Remove any trailing spaces from the text data entry */
          const currentValue = formData.get(currentFormItemName);
          formData.set(currentFormItemName, currentValue.trim());
        } else if (currentForm.type === 'file-image') {
          console.log('Handle Additional File Image Uploader Data (ie. potential for edited file');
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
   * Retrieves the DOM element for the option component identified by its value
   * @param {string} optionValue 
   * @returns {HTMLOptionElement}
   */
  const getOptionDOMElement = optionValue => {
    return document.querySelector(`option[value="${optionValue}"]`);
  };

  /**
   * Retrieves the DOM element for the submit form button component
   * @returns {HTMLElement}
   */
  const getSubmitButtonDOMElement = () => {
    return document.querySelector(`button[id="${getIdSubmitButtonDOMElement()}${submitButtonIdPlaceholder}"]`);
  };

  /**
   * Handles escape key press events on the invalid form entries dialog.
   * Closes the dialog if the escape key is pressed.
   */
  const handleEscapeKeyPress_InvalidFormEntriesDialog = () => {
    handleOnClickConfirm_InvalidFormEntriesDialog();
  };

  /**
   * Handles escape key press events on the server error dialog.
   * Closes the dialog if the escape key is pressed.
   */
  const handleEscapeKeyPress_ServerErrorDialog = () => {
    handleOnClickConfirm_ServerErrorDialog();
  };

  /**
   * Handles escape key press events on the successful form submission dialog.
   * Closes the dialog if the escape key is pressed.
   */
  const handleEscapeKeyPress_SuccessfulFormSubmissionDialog = () => {
    handleOnClickConfirm_SuccessfulFormSubmissionDialog();
  };

  /**
   * Handles click events on the confirm button of the invalid form entries dialog.
   * Closes the dialog when the button is clicked.
   */
  const handleOnClickConfirm_InvalidFormEntriesDialog = () => {
    setShowInvalidFormEntriesDialog(false);
    
    /* Restore focus back to the submit button */
    focusOnSubmitButtonDOMElement();
  };

  /**
   * Handles click events on the confirm button of the server error dialog.
   * Closes the dialog when the button is clicked.
   */
  const handleOnClickConfirm_ServerErrorDialog = () => {
    setShowServerErrorDialog(false);
    
    /* Restore focus back to the submit button */
    focusOnSubmitButtonDOMElement();
  };

  /**
   * Handles click events on the confirm button of the successful form submission dialog.
   * Closes the dialog when the button is clicked.
   */
  const handleOnClickConfirm_SuccessfulFormSubmissionDialog = () => {
    setShowSuccessfulFormSubmissionDialog(false);

    if (props.onSuccessfulSubmit !== undefined) {
      /* Execute the onSuccessfulSubmit functionality only if it has been declared */
      props.onSuccessfulSubmit();
    }
    /* Restore focus back to the submit button */
    focusOnSubmitButtonDOMElement();
  };

  /**
   * Handles click events on the form managers submit button
   */
  const handleOnClickSubmitButton = () => {
    /* Start the verifications process for the form on clicking to submit the form */
    setVerificationsStage(0);
  };

  /**
   * Handles all responses from client side verifications and uses it to update the global client side verifications response
   * @param {boolean} verificationsResponse 
   */
  const handleOnClientSideVerifications = verificationsResponse => {
    setCsvResponse(csvResponse && verificationsResponse);
    setNumberOfCsvResponses(numberOfCsvResponses + 1);
    if ((numberOfCsvResponses + 1) === formSections.length) {
      /* Once we have received all responses, set the verifications process to move on to the next stage */
      setVerificationsStage(verificationsStage + 1);
    }
  };

  /**
   * Disables automatic form submit events which will cause the browser to refresh after successful form submits
   * @param {Event} event 
   */
  const handleOnFormSubmit = event => {
    eventManager.setEvent(event);
    eventManager.preventDefault();
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
   * Verifications process stage 0.
   * 
   * Preliminary / configuration stage for the verifications process for the form.
   */
  const stage0_ShowLoadingSpinner_DisableForm_ResetCsvSsvState = () => {
    /* Enable the loading spinner */
    setShowLoadingSpinner(true);

    /* To avoid the "Please Wait" spinner flashing quickly on-screen, allow a small wait time before processing the form */
    setTimeout(() => {
      /* Disable the form */
      setInert(true);

      /* Reset the CSV response and number of responses */
      setCsvResponse(true);
      setNumberOfCsvResponses(0);

      /* Reset the SSV response */
      setSsvResponse({ response: false });
      
      /* Set the verifications process to go to the next stage */
      setVerificationsStage(verificationsStage + 1);
    }, fullPageMaskWaitTime);
  };

  /**
   * Verifications process stage 1.
   * 
   * Start the client side verifications process for all form sections.
   * The next stage of the verifications process will not be triggered until all responses from the client side
   * verifications process have been received.
   */
  const stage1_PerformClientSideVerifications = () => {
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
          /* Recursively click through all hidden button DOM elements until all form sections have been processed */
          clickHiddenButtonDOMElements(index + 1);
        }, formFieldsHiddenButtonDOMClickWaitTime);
      }
    };

    /** 
     * Initial set the button index to a zero value and click through all of the hidden button DOM
     * elements to dispatch all of the Client Side Verifications processes for all form section elements
     */
    let buttonIndex = 0;
    clickHiddenButtonDOMElements(buttonIndex);
  };

  /**
   * Verifications process stage 2.
   * 
   * Handles the final client side verifications response after all local verifications have been carried out.
   * If the client side verifications response is true then the processing will move to the next stage. If not
   * then the processing will move to a later stage and clean up.
   */
  const stage2_HandleClientSideVerificationsResponse = () => {
    if (csvResponse === true) {
      /* Move to the server side verifications stage of the process */
      setVerificationsStage(verificationsStage + 1);
    } else {
      /* Client side verifications have returned a false response. Move to a later stage of the verifications process and clean up */
      setVerificationsStage(5);
    }
  };

  /**
   * Verifications process stage 3.
   * 
   * Performs the server side verifications either asynchronously or non-asynchronously based on the functionality which has been declared
   * for the form. Moves on to the next stage of the verifications process once the server side verifications are completed.
   */
  const stage3_PerformServerSideVerifications = async () => {
    const formData = getFormData();
    let serverSideResponse = { response: false };
    if (props.performAsyncServerSideVerifications !== undefined) {
      /* Execute the asynchronous server side verifications functionality */
      serverSideResponse = await props.performAsyncServerSideVerifications(formData);
    } else if (props.performServerSideVerifications !== undefined) {
      /* Execute the non-asynchronous server side verifications functionality */
      serverSideResponse = props.performServerSideVerifications(formData);
    }
    /* Set the server side response in state and move on to the next stage of the verifications process */
    setSsvResponse(serverSideResponse);
    setVerificationsStage(verificationsStage + 1);
  };

  /**
   * Verifications process stage 4.
   * 
   * Handles the server side verifications response after all server side verifications have been carried out.
   * @returns {boolean}
   */
  const stage4_HandleServerSideVerificationsResponse = () => {
    if (ssvResponse.response === true) {
      /* A true response has been returned from the server side verifications process - move to the next stage */
      setVerificationsStage(verificationsStage + 1);
      return true;
    }
    /* A false response has been returned - handle the false response */
    const listOfResponseKeys = Object.keys(ssvResponse);
    const newFormSections = [].concat(formSections);
    if (listOfResponseKeys.length === 1) {
      /* A server side error has been detected - move on to the next stage */
      setVerificationsStage(verificationsStage + 1);
      return false;
    }
    /* The form has been rejected due to invalid form field entries - set these to the error messages in state */
    for (const key of listOfResponseKeys) {
      if (ssvResponse[`${key}`].errorMessage !== undefined) {
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
              newFormSections[formSectionIndex].form[formIndex].errorMessage = ssvResponse[`${key}`].errorMessage;
              foundFormElement = true;
            };
            formIndex += 1;
          }
          formSectionIndex += 1;
        }
      }
    }
    /* After processing the error messages set to the server side response - set this as the new form data and move to the next stage */
    setFormSections(newFormSections);
    setVerificationsStage(verificationsStage + 1);
    return false;
  };

  /**
   * Verifications process stage 5.
   * 
   * Final stage of the verifications process. Cleans up and resets all state and performs any / all follow
   * on actions for if the form submission has succeeded or failed.
   */
  const stage5_HideLoadingSpinner_ReEnableForm_ShowSuccessOrFailureDialog = () => {
    setVerificationsStage(-1);
    setNumberOfCsvResponses(-1);
    setInert(false);
    setShowLoadingSpinner(false);

    if (csvResponse === false || (ssvResponse.response === false && Object.keys(ssvResponse).length > 1)) {
      if (props.invalidFormEntriesDialogData !== undefined) {
        /* Show invalid form entries dialog */
        setShowInvalidFormEntriesDialog(true);
      }
      /* Restore focus back to the submit button on ending the verifications process */
      focusOnSubmitButtonDOMElement();
    } else if (ssvResponse.response === false && Object.keys(ssvResponse).length === 1) {
      if (props.serverErrorDialogData !== undefined) {
        /* Show server error dialog */
        setShowServerErrorDialog(true);
      }
      /* Restore focus back to the submit button on ending the verifications process */
      focusOnSubmitButtonDOMElement();
    } else if (ssvResponse.response === true) {
      /**
       * The form has been successfully submitted.
       * - Clear the form if desired.
       * - Show the success dialog if desired. If it is shown then the onSuccessfulSubmit functionality will be executed
       *   after the user clicks the button to close the dialog (this is handled by the dialogs confirm button handler function).
       * - If the success dialog is not required, execute the onSuccessfulSubmit functionality if it has been declared.
       */
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
      if (props.successfulFormSubmissionDialogData !== undefined) {
        /* Show the successful form submission dialog only if it has been declared */
        setShowSuccessfulFormSubmissionDialog(true);
      } else if (props.onSuccessfulSubmit !== undefined) {
        /* Execute the onSuccessfulSubmit functionality only if it has been declared */
        props.onSuccessfulSubmit();
      }
      /* Restore focus back to the submit button on ending the verifications process */
      focusOnSubmitButtonDOMElement();
    }
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
            return <FormSection alignment={props.alignment} backgroundColour={props.backgroundColour} description={formSection.description} form={formSection.form} heading={formSection.heading}
              id={getIdFormSectionHiddenButtonDOMElement(index)} key={getIdFormSectionHiddenButtonDOMElement(index)} onClientSideVerifications={handleOnClientSideVerifications}
              showBottomBorder={index === formSections.length - 1 ? false : true} />
          })
        }
        <SubmitButton alignment={props.alignment} backgroundColour={props.backgroundColour} id={getIdSubmitButtonDOMElement()} onClick={handleOnClickSubmitButton}>
          {props.submitButtonTextContent || 'Submit'}
        </SubmitButton>
      </form>
      <Spinner colour={props.backgroundColour || 'white'} enableEscapeKey={false} id={getIdFormDOMElement()} isDisplayed={showLoadingSpinner}>
        {props.spinnerTextContent || 'Loading...'}
      </Spinner>
      {
        props.invalidFormEntriesDialogData !== undefined &&
          /* Invalid form entries dialog (optionally rendered) */
          <Dialog backgroundColour={props.invalidFormEntriesDialogData.backgroundColour} buttonColour={props.backgroundColour}
            buttonData={[{ id: 'invalid-form-entries-ok', onClick: handleOnClickConfirm_InvalidFormEntriesDialog, textContent: 'OK' }]} contentData={props.invalidFormEntriesDialogData.contentData}
            dialogTitleTextContent={props.invalidFormEntriesDialogData.dialogTitleTextContent} handleEscapeKeyPress={handleOnClickConfirm_InvalidFormEntriesDialog}
            id={`${getIdFormDOMElement()}--invalid-form-entries`} isDisplayed={showInvalidFormEntriesDialog} />
      }
      {
        props.successfulFormSubmissionDialogData !== undefined &&
          /* Successful form submission dialog (optionally rendered) */
          <Dialog backgroundColour={props.successfulFormSubmissionDialogData.backgroundColour} buttonColour={props.backgroundColour}
            buttonData={[{ id: 'successful-form-submission-ok', onClick: handleOnClickConfirm_SuccessfulFormSubmissionDialog, textContent: 'OK' }]} contentData={props.successfulFormSubmissionDialogData.contentData}
            dialogTitleTextContent={props.successfulFormSubmissionDialogData.dialogTitleTextContent} handleEscapeKeyPress={handleOnClickConfirm_SuccessfulFormSubmissionDialog}
            id={`${getIdFormDOMElement()}--successful-form-submission`} isDisplayed={showSuccessfulFormSubmissionDialog} />
      }
      {
        props.serverErrorDialogData !== undefined &&
          /* Server error dialog (optionally rendered) */
          <Dialog backgroundColour={props.serverErrorDialogData.backgroundColour} buttonColour={props.backgroundColour}
            buttonData={[{ id: 'server-error-ok', onClick: handleOnClickConfirm_ServerErrorDialog, textContent: 'OK' }]} contentData={props.serverErrorDialogData.contentData}
            dialogTitleTextContent={props.serverErrorDialogData.dialogTitleTextContent} handleEscapeKeyPress={handleEscapeKeyPress_ServerErrorDialog}
            id={`${getIdFormDOMElement()}--server-error`} isDisplayed={showServerErrorDialog} />
      }
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
          defaultFileData: PropTypes.oneOf([ PropTypes.object, PropTypes.string ]),
          defaultFileName: PropTypes.string,
          defaultSelection: PropTypes.bool,
          defaultValue: PropTypes.string,
          errorMessage: PropTypes.string,
          fileSizeLimit: PropTypes.number,
          id: PropTypes.string.isRequired,
          isDisabled: PropTypes.bool,
          isOptional: PropTypes.bool,
          label: PropTypes.string.isRequired,
          optionsList: PropTypes.shape({
            groupLabel: PropTypes.string,
            itemsList: PropTypes.arrayOf(
              PropTypes.shape({
                title: PropTypes.string,
                value: PropTypes.string,
              }),
            ),
          }),
          type: PropTypes.oneOf([ 'checkbox', 'date', 'dropdown', 'email', 'file-image', 'input', 'password' ]).isRequired,
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
  /** The data to be rendered in the dialog for if a user has submitted invalid form entries. This dialog is optionally rendered and will only be rendered if this data is provided. */
  invalidFormEntriesDialogData: PropTypes.shape({
    backgroundColour: PropTypes.oneOf([ 'white', 'grey' ]),
    contentData: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string,
        type: PropTypes.oneOf([ 'paragraph' ]),
      })
    ),
    dialogTitleTextContent: PropTypes.string,
  }),
  /**
   * Custom functionality to be executed on successful submission of the form. This functionality is optional but if declared will be executed after
   * the full server side verification process has completed and returned a true response with no error messages. This functionality is useful for if
   * you wish to redirect the user to a success page or account page in case of successful login etc.
   */
  onSuccessfulSubmit: PropTypes.func,
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
  /** The data to be rendered in the dialog for if the form submission process has hit a server related error. This dialog is optionally rendered and will only be rendered if this data is provided. */
  serverErrorDialogData: PropTypes.shape({
    backgroundColour: PropTypes.oneOf([ 'white', 'grey' ]),
    contentData: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string,
        type: PropTypes.oneOf([ 'paragraph' ]),
      })
    ),
    dialogTitleTextContent: PropTypes.string,
  }),
  /** Custom text content to be rendered with the loading spinner component. A generic loading message is displayed if this property is not set. */
  spinnerTextContent: PropTypes.string,
  /** The text content to be assigned to the submit button. By default the button will simply read "Submit" but this is fully customisable */
  submitButtonTextContent: PropTypes.string,
  /** The data to be rendered in the dialog for if a user has successfully submitted the form. This dialog is optionally rendered and will only be rendered if this data is provided. */
  successfulFormSubmissionDialogData: PropTypes.shape({
    backgroundColour: PropTypes.oneOf([ 'white', 'grey' ]),
    contentData: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string,
        type: PropTypes.oneOf([ 'paragraph' ]),
      })
    ),
    dialogTitleTextContent: PropTypes.string,
  }),
};
export default FormManager;
