/**
 * Developed by Anthony Cox in 2026
 * 
 * Revisions (February 2026):
 * - Added verifications for email addresses, passwords and generic text inputs to check to the presence of illegal special characters.
 * - Improve verifications around optional form fields so that while some checks are not mandatory on optional fields, others are still performed.
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  DateInput,
  Dropdown,
  FileUploadImage,
  Heading,
  Paragraph,
  PasswordInput,
  TextInput,
} from '../';
import {
  DateManager,
  EventManager,
  HTMLElementManager,
} from '../modules';
import './css/form-section.css';
import '../css/common.css';

/* Set the form IDs data used for locating form elements in the DOM */
const formIds = {
  checkbox: '--checkbox',
  date: '--date-input',
  dropdown: '--dropdown-menu',
  email: '--text-input',
  ['file-image']: '--file-upload-image--file-input',
  input: '--text-input',
  password: '--password-input',
};

/* Set up the event and component managers for this component */
const eventManager = new EventManager();
const htmlElementManager = new HTMLElementManager();

/* Set the invalid characters lists for the various form fields */
const genericUserTextInputInvalidCharsList = [
  "(", ")", "/", "\\", "'", "\"", ",", "`", ";", "&", "<", ">", "!", "#", "$", "%", "^", "*", "+", "=", "{", "}", "[", "]", ":" , "?", "|", "~"
];
const userCredentialsInvalidCharsList = [
  "(", ")", "/", "\\", "'", "\"", ",", "`", ";", "&", "<", ">", "!", "#", "$", "%", "^", "*", "+", "=", "{", "}", "[", "]", ":" , "?", "|", "~"
];

/**
 * Form Section component allows for forms rendered in web pages to be divided up into separate categories of information.
 * 
 * A form section will always have a heading and form content. It can optionally have a description to support the heading. You may render as many form items as you wish
 * to inside a form section. The form section component also comes with the functionality to both perform client side verifications and clear data from all form fields
 * rendered within its scope.
 * 
 * There are two hidden buttons in the DOM structure for this component:
 * - Each buttons ID starts with the id property value that you will specify when rendering this component.
 * - Interacting with and clicking on the hidden button with an ID ending with the "--csv" value will perform the client side verifications for the current form section.
 * - Interacting with and clicking on the hidden button with an ID ending with the "--clear" value will reset all of the form entries back to their default values.
 * 
 * This handling for the hidden buttons can be custom developed if required but is handled automatically by the Form Manager component, which is the intended method
 * by which to use this form section component.
 * 
 * The form section component is left aligned by default but can also be centrally aligned if desired. Setting the alignment means that the form sections heading,
 * description (if rendered) and all form items will adhere to that alignment setting.
 *
 * This component is intended for use with both the Main component and more specifically the Form Manager component.
 */
const FormSection = props => {
  const [ finishedValidations, setFinishedValidations ] = useState(false);
  const [ formData, setFormData ] = useState([]);
  const [ formStatus, setFormStatus ] = useState(false);
  const [ init, setInit ] = useState(false);

  useEffect(() => {
    if (init === false) {
      /* First time component initialisation */
      setFormData(props.form);
      setInit(true);
    }
    if (finishedValidations === true && props.onClientSideVerifications !== undefined) {
      /* Post the form status response to the onClientSideVerifications functionality */
      props.onClientSideVerifications(formStatus);
      setFinishedValidations(false);
    }
  }, [ finishedValidations ]);

  /**
   * Retrieves the target DOM element identified by the specified ID
   * @param {string} id
   * @returns {HTMLElement}
   */
  const getFormSectionElementById = id => {
    return document.getElementById(id);
  };

  /**
   * Performs the functionality to clear all entries from this form section
   */
  const handleClearFormEntries = event => {
    eventManager.setEvent(event);
    eventManager.preventDefault();

    let index = 0;
    while (index < formData.length) {
      /* Set the current item from the form data */
      const currentFormItem = formData[index];
      const formIdsValue = formIds[`${currentFormItem.type}`];
      const componentId = `${currentFormItem.id}${formIdsValue}`;
      const formDOMElement = getFormSectionElementById(componentId);
      htmlElementManager.setDOMElement(formDOMElement);

      if (currentFormItem.type === 'checkbox') {
        /* Reset the checked status of the checkbox item - click the checkbox again to de-select it only if it is already checked */
        if (htmlElementManager.getAriaChecked() === true) {
          htmlElementManager.click();
        }
      } else if (currentFormItem.type === 'email' || currentFormItem.type === 'input' || currentFormItem.type === 'password') {
        /* Reset the value of the input field */
        htmlElementManager.setValue('');
      } else if (currentFormItem.type === 'date') {
        /* Reset the value of the date to todays date */
        const todaysDate = DateManager.getTodaysDate();
        htmlElementManager.setValue(`${todaysDate.year}-${todaysDate.month}-${todaysDate.day}`);
      } else if (currentFormItem.type === 'dropdown') {
        /* Reset the dropdown menu selection to the first value in the options list */
        htmlElementManager.setOptionSelectedByValue(formDOMElement.options[0].value);
      } else if (currentFormItem.type === 'file-image') {
        /* Click on the hidden button which will reset the file input component back to its default state */
        const componentHiddenButtonId = `${componentId}--clear`;
        const hiddenButtonDOMElement = getFormSectionElementById(componentHiddenButtonId);
        htmlElementManager.setDOMElement(hiddenButtonDOMElement);
        htmlElementManager.click();
      }
      index += 1;
    }
  };

  /**
   * Performs all client side verifications for all form fields and returns the response
   */
  const handleClientSideVerifications = event => {
    eventManager.setEvent(event);
    eventManager.preventDefault();

    const newFormData = [];
    let index = 0;
    let newFormStatus = false;
    while (index < formData.length) {
      let componentStatus = true;

      /* Set the initial form status if this is the first form element being processed */
      if (index === 0) {
        newFormStatus = true;
      }
      /* Set the current item from the form data */
      const currentFormItem = formData[index];
      const isDisabled = currentFormItem.isDisabled === true ? true : false;

      /* For most fields they are assumed mandatory (false) however checkboxes are by default assumed optional (true) */
      let isOptional = currentFormItem.type === 'checkbox' ? true : false;
      if (currentFormItem.isOptional !== undefined) {
        isOptional = currentFormItem.isOptional;
      }

      if (isDisabled === false) {
        /**
         * All enabled form items will be validated to some extent.
         * More thorough checks are used for mandatory fields compared to optional fields.
         */
        const formIdsValue = formIds[`${currentFormItem.type}`];
        const componentId = `${currentFormItem.id}${formIdsValue}`;
        const formDOMElement = getFormSectionElementById(componentId);
        htmlElementManager.setDOMElement(formDOMElement);

        if (currentFormItem.type === 'checkbox') {
          /* Validate checkbox item */
          const checkboxInputChecked = htmlElementManager.getAriaChecked();

          if (checkboxInputChecked === false && isOptional === false) {
            currentFormItem.errorMessage = 'Please check this box to proceed.';
            newFormStatus = false;
            componentStatus = false;
          }
        } else if (currentFormItem.type === 'date') {
          /* Validate date input entry */
          const dateInputValue = htmlElementManager.getValue();

          if (dateInputValue.length === 0 && isOptional === false) {
            currentFormItem.errorMessage = 'Please enter a valid date in the format DD-MM-YYYY.';
            newFormStatus = false;
            componentStatus = false;
          }
        } else if (currentFormItem.type === 'dropdown') {
          /* Validate dropdown entry */
          const dropdownValue = htmlElementManager.getValue();

          if (dropdownValue.length === 0 && isOptional === false) {
            currentFormItem.errorMessage = 'Please select an option from the list.';
            newFormStatus = false;
            componentStatus = false;
          }
        } else if (currentFormItem.type === 'email') {
          /* Validate email address input entry */
          const emailInputValue = htmlElementManager.getValue();

          if (emailInputValue.length === 0 && isOptional === false) {
            currentFormItem.errorMessage = 'Please provide a valid email address.';
            newFormStatus = false;
            componentStatus = false;
          } else {
            if (isInvalidCharacterInUserCredentials(emailInputValue) === true) {
              /* The check for invalid characters for this email address entry has failed its validation */
              currentFormItem.errorMessage = 'This field contains characters that are not allowed. Please remove them.';
              newFormStatus = false;
              componentStatus = false;
            } else {
              /* Check if the email address is using the correct syntax */
              const lastIndexOfAt = emailInputValue.lastIndexOf('@');
              const lastIndexOfDot = emailInputValue.lastIndexOf('.');
              if ((lastIndexOfAt === -1 || lastIndexOfDot === -1) || lastIndexOfAt > lastIndexOfDot) {
                currentFormItem.errorMessage = 'Please provide a valid email address, e.g. name@host.com.';
                newFormStatus = false;
                componentStatus = false;
              }
            }
          }
        } else if (currentFormItem.type === 'file-image') {
          /* Validate image file upload */
          const errorMessageRenderIdValue = `${formIdsValue}--error-message`;
          const errorMessageId = `${currentFormItem.id}${errorMessageRenderIdValue}`;
          const errorMessageDOMElement = getFormSectionElementById(errorMessageId);
          htmlElementManager.setDOMElement(errorMessageDOMElement);

          if (htmlElementManager.isValidDOMElement() === true) {
            /* A pre-existing error message is in the image file uploader component - mark the form validation as failed */
            newFormStatus = false;
            componentStatus = false;
          } else {
            /* No pre-existing error message - double check if an image file has been uploaded or not */
            const imagePreviewIdValue = `${currentFormItem.id}--file-upload-image--image-preview--decorative-image`;
            const imagePreviewDOMElement = getFormSectionElementById(imagePreviewIdValue);
            htmlElementManager.setDOMElement(imagePreviewDOMElement);

            if (htmlElementManager.isValidDOMElement() === false && isOptional === false) {
              /* No image file preview is currently rendered - trigger the relevant functionality to produce an error message in the file upload component */
              htmlElementManager.setDOMElement(formDOMElement);
              htmlElementManager.dispatchEvent_Change();
              newFormStatus = false;
              componentStatus = false;
            }
          }
        } else if (currentFormItem.type === 'input') {
          /* Validate text input entry */
          const textInputValue = htmlElementManager.getValue();

          if (textInputValue.length === 0 && isOptional === false) {
            currentFormItem.errorMessage = 'Please provide some text.';
            newFormStatus = false;
            componentStatus = false;
          } else if (isInvalidCharacterInGenericTextInput(textInputValue) === true) {
            /* The check for invalid characters for this user text input entry has failed its validation */
            currentFormItem.errorMessage = 'This field contains characters that are not allowed. Please remove them.';
            newFormStatus = false;
            componentStatus = false;
          }
        } else if (currentFormItem.type === 'password') {
          /* Validate password input entry */
          const passwordInputValue = htmlElementManager.getValue();

          if (passwordInputValue.length === 0 && isOptional === false) {
            currentFormItem.errorMessage = 'Please provide a valid password.';
            newFormStatus = false;
            componentStatus = false;
          } else if (isInvalidCharacterInUserCredentials(passwordInputValue) === true) {
            /* The check for invalid characters for this password entry has failed its validation */
            currentFormItem.errorMessage = 'This field contains characters that are not allowed. Please remove them.';
            newFormStatus = false;
            componentStatus = false;
          }
        }
      }
      if (componentStatus === true && (currentFormItem.errorMessage !== undefined || currentFormItem.errorMessage !== '')) {
        /* Given this component is valid - clear any previous error messages that are linked to the form field */
        currentFormItem.errorMessage = undefined;
      }
      newFormData.push(currentFormItem);
      index += 1;
    }
    /* After validations are complete, set the new form data and the form status state */
    setFormData(newFormData);
    setFormStatus(newFormStatus);
    setFinishedValidations(true);
  };

  /**
   * Checks the generic text input form entry for the presence of invalid characters
   * @param {string} userEntry 
   * @returns {boolean}
   */
  const isInvalidCharacterInGenericTextInput = userEntry => {
    return isInvalidCharacterInUserFormEntry(genericUserTextInputInvalidCharsList, userEntry);
  };

  /**
   * Checks the specified user entry for the presence of invalid characters
   * @param {Array.<string>} listOfInvalidChars
   * @param {string} userEntry 
   * @returns {boolean}
   */
  const isInvalidCharacterInUserFormEntry = (listOfInvalidChars = [], userEntry = '') => {
    let index = 0;
    let foundInvalidSpecialCharacter = false;
    while (index < listOfInvalidChars.length && foundInvalidSpecialCharacter === false) {
      if (userEntry.includes(listOfInvalidChars[index])) {
        /* An invalid special character has been found */
        foundInvalidSpecialCharacter = true;
      }
      index += 1;
    }
    return foundInvalidSpecialCharacter;
  };

  /**
   * Checks the specified user credentials string for the presence of invalid characters
   * @param {string} userEntry 
   * @returns {boolean}
   */
  const isInvalidCharacterInUserCredentials = userEntry => {
    return isInvalidCharacterInUserFormEntry(userCredentialsInvalidCharsList, userEntry);
  };

  /* Set the CSS styling for the heading and description panel */
  let headingAndDescriptionCss = 'form-section-heading-and-description component-container-width';
  props.description === undefined ? headingAndDescriptionCss += ' form-section-description-none' : headingAndDescriptionCss += ''.trim();

  /* Set the CSS styling for the form rendering panel */
  let formRenderPanelCss = 'form-section-form-container component-container-width';
  props.showBottomBorder === false ? formRenderPanelCss += ''.trim() : formRenderPanelCss += ' form-section-form-container-bottom-border';

  /* Set the CSS styling for the hidden button which triggers the client side validations for this form section */
  const buttonHiddenCss = 'hidden';

  /* Set the global alignment for all form section data */
  const globalAlignment = props.alignment || 'left';

  return (
    <React.Fragment>
      <div className={headingAndDescriptionCss}>
        <Heading alignment={globalAlignment} id={props.heading.id}>
          {props.heading.textContent}
        </Heading>
        {
          props.description !== undefined &&
            <Paragraph alignment={globalAlignment} id={props.description.id}>
              {props.description.textContent}
            </Paragraph>
        }
      </div>
      <div className={formRenderPanelCss}>
        {
          formData.map((formField, index) => {
            const formFieldId = formField.id;
            const formFieldName = formFieldId.replaceAll('-', '_');
            if (formField.type === 'checkbox') {
              return (
                <Checkbox alignment={globalAlignment} defaultSelection={formField.defaultSelection} errorMessage={formField.errorMessage} id={formFieldId}
                  isDisabled={formField.isDisabled} isOptional={formField.isOptional} key={`${formFieldId}-${index}`} label={formField.label} name={formFieldName}
                  onClick={formField.onClick} />
              )
            } else if (formField.type === 'email' || formField.type === 'input') {
              return (
                <TextInput alignment={globalAlignment} defaultValue={formField.defaultValue} errorMessage={formField.errorMessage} id={formFieldId}
                  isDisabled={formField.isDisabled} isOptional={formField.isOptional} key={`${formFieldId}-${index}`} label={formField.label} name={formFieldName} />
              )
            } else if (formField.type === 'date') {
              return (
                <DateInput alignment={globalAlignment} defaultValue={formField.defaultValue} errorMessage={formField.errorMessage} id={formFieldId} isDisabled={formField.isDisabled}
                  isOptional={formField.isOptional} key={`${formFieldId}-${index}`} label={formField.label} name={formFieldName} />
              )
            } else if (formField.type === 'dropdown') {
              return (
                <Dropdown alignment={globalAlignment} defaultValue={formField.defaultValue} errorMessage={formField.errorMessage} id={formFieldId} isDisabled={formField.isDisabled}
                  isOptional={formField.isOptional} key={`${formFieldId}-${index}`} label={formField.label} name={formFieldName} optionsList={formField.optionsList} />
              )
            } else if (formField.type === 'file-image') {
              return (
                <FileUploadImage alignment={globalAlignment} backgroundColour={props.backgroundColour || 'white'} defaultImageData={formField.defaultFileData}
                  defaultImageFileName={formField.defaultFileName} errorMessage={formField.errorMessage} fileSizeLimit={formField.fileSizeLimit} id={formFieldId}
                  isDisabled={formField.isDisabled} isOptional={formField.isOptional} key={`${formFieldId}-${index}`} label={formField.label} name={formFieldName} />
              )
            } else if (formField.type === 'password') {
              return (
                <PasswordInput alignment={globalAlignment} defaultValue={formField.defaultValue} errorMessage={formField.errorMessage} id={formFieldId}
                  isDisabled={formField.isDisabled} isOptional={formField.isOptional} key={`${formFieldId}-${index}`} label={formField.label} name={formFieldName} />
              )
            }
          })
        }
      </div>
      <button aria-hidden="true" id={`${props.id}--csv`} className={buttonHiddenCss} onClick={handleClientSideVerifications} tabIndex={-1}>Perform Client Side Verifications</button>
      <button aria-hidden="true" id={`${props.id}--clear`} className={buttonHiddenCss} onClick={handleClearFormEntries} tabIndex={-1}>Clear Form Entries</button>
    </React.Fragment>
  );
};
FormSection.propTypes = {
  /** The alignment of the form section component. By default all form content will be left aligned but can be centre aligned if desired. */
  alignment: PropTypes.oneOf([ 'centre', 'left' ]),
  /** The background colour for the elements in the form section component. The default colour for the all components is white. */
  backgroundColour: PropTypes.oneOf([ 'gold', 'green', 'grey', 'navy-and-gold', 'navy-and-white', 'red', 'white' ]),
  /** An optional description for the form section component. This description will be rendered below the heading and above the form itself. */
  description: PropTypes.shape({
    id: PropTypes.string,
    textContent: PropTypes.string,
  }),
  /** The list of form components to be rendered in this form section. */
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
  /** The heading text content for the form section component. The heading text content will always precede the form itself. */
  heading: PropTypes.shape({
    id: PropTypes.string.isRequired,
    textContent: PropTypes.string.isRequired,
  }).isRequired,
  /**
   * The unique identifier for the non-visible / hidden buttons. The first button when clicked will trigger the client side verification process for this form section component.
   * The second button when clicked will clear any entries from this form section component.
   */
  id: PropTypes.string.isRequired,
  /** Custom functionality to be executed after the client side verifications have been completed. This custom functionality will receive the response from the client side verifications. */
  onClientSideVerifications: PropTypes.func,
  /** Switch to render a dotted border underneath the form section. By default all form sections will render this bottom border. */
  showBottomBorder: PropTypes.bool,
};
export default FormSection;
