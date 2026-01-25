/**
 * Developed by Anthony Cox in 2025
 */
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Heading from '../text/Heading.jsx';
import { getColourCombination } from '../data/colour-combinations';
import './css/form-radio-button-group.css';
import '../css/common.css';

/**
 * Radio button group component allowing for a render of group of radio buttons in a form in a web application. Only one of the radio buttons in the group is selectable
 * at any one time .
 * 
 * The radio button group can be enabled or disabled, it can also be rendered in an error state with an error message in the case of a form validation issue. By default the first
 * radio button in the group will be pre-selected but this can be altered by setting a custom value. The radio button groups label can be rendered in a number of different colour
 * themes, matching the same colours used by other components. This component also supports fully customisable onClick functionality which can be executed after clicking to select
 * any of the radio buttons in the group. For convenience, the value property from the selected radio button will be passed to any custom onClick functionality as a parameter.
 * In addition to rendering the radio button group with its label, it can also have a larger heading output above it if required. Finally this component is left aligned
 * by default but can also be centrally aligned if desired.
 *
 * The radio button group component is intended for use with the Main component.
 */
const RadioButtonGroup = props => {

  useEffect(() => {
    if (props.isDisabled !== true) {
      if (props.defaultSelectByValue !== undefined) {
        /* Pre-select the specified radio button */
        clickCustomRadioButton(props.defaultSelectByValue)
      } else {
        /* Default select the first radio button */
        clickFirstFoundRadioButton();
      }
    }
  }, []);

  /**
   * Clicks to select the specified / custom radio button in the radio button group
   * @param {string} targetRadioButtonValue
   */
  const clickCustomRadioButton = targetRadioButtonValue => {
    const customRadioButtonElement = document.querySelector(
      `input[type="radio"][id^="${props.id}--radio-button"][name="${props.radioButtonsList.groupName}"][value="${targetRadioButtonValue}"]`
    );
    if (customRadioButtonElement !== null) {
      customRadioButtonElement.click();
    }
  };
  
  /**
   * Clicks to select the first radio button in the radio button group
   */
  const clickFirstFoundRadioButton = () => {
    const firstRadioButtonElement = document.querySelector(
      `input[type="radio"][id="${props.id}--radio-button-0"][name="${props.radioButtonsList.groupName}"]`
    );
    if (firstRadioButtonElement !== null) {
      firstRadioButtonElement.click();
    }
  };

  /**
   * Retrieves the ID linked to the menu bar items hyperlink element
   * @returns {string}
   */
  const getIdLegendDOMElement = () => {
    return `${props.id}--legend--radio-button-group`;
  }

  /**
   * Handles click events on any of the radio buttons, executing the custom onClick functionality
   * if that functionality has been defined. The value property of the clicked radio button is passed
   * to the custom onClick function.
   * @param {Event} event 
   */
  const handleOnClickRadioButton = event => {
    if (props.isDisabled !== true && props.onClick !== undefined) {
      props.onClick(event.target.getAttribute('value'));
    }
  };

  /* Determine the background colour and font colour for the component - setting white background colour with black font text colour as the default */
  const { backgroundColour, fontColour } = getColourCombination(props.backgroundColour);

  /* Set the styling for the container element */
  const containerCss = 'form-radio-button-group-container background-transparent';
    
  /* Set the styling for the inner container element */
  let innerContainerCss = 'form-radio-button-group-container-inner';
  props.alignment === 'centre'
    ? innerContainerCss += ' form-radio-button-group-container-inner-alignment-centre' : innerContainerCss += ' form-radio-button-group-container-inner-alignment-left';

  /* Set the styling for the content element */
  const contentCss = 'form-radio-button-group-content';

  /* Set the styling for the fieldset element */
  let fieldsetCss = 'form-radio-button-group-fieldset';
  if (props.errorMessage !== undefined && (props.disabled === false || props.disabled === undefined)) {
    /* If an error is set and the component is not disabled - ensure the error styling is set to the fieldset */
    fieldsetCss += ' form-radio-button-group-fieldset-error';
  } else {
    if (props.isDisabled === true) {
      /* If the component is disabled - set the disabled styling on the fieldset component */
      fieldsetCss += ' form-radio-button-group-fieldset-disabled';
    } else {
      /* If the component is enabled - set the enabled styling on the fieldset component */
      fieldsetCss += ' form-radio-button-group-fieldset-enabled';
    }
  }
  /* Set the styling for the legend element */
  const legendCss = `form-radio-button-group-legend background-${backgroundColour} font-default font-${fontColour}`;
  
  /* Set the styling for the radio button container element */
  const buttonContainerCss = 'form-radio-button-group-button-container';

  /* Set the styling for the radio button label elements */
  let buttonLabelCss = 'form-radio-button-group-button-label font-black font-default';
  props.isDisabled === true ? buttonLabelCss += ' form-radio-button-group-button-label-disabled' : buttonLabelCss += '';

  /* Set the styling for the radio button input elements */
  let radioInputCss = 'form-radio-button-group-input';
  props.isDisabled === true ? radioInputCss += ' form-radio-button-group-input-disabled' : radioInputCss += ' form-radio-button-group-input-enabled';

  /* Set the styling for the error container element */
  let errorContainerCss = 'form-radio-button-group-error font-default font-red';
  props.alignment === 'centre'
    ? errorContainerCss += ' form-radio-button-group-container-inner-alignment-centre' : errorContainerCss += ' form-radio-button-group-container-inner-alignment-left';
    
  /* Set the styling for the error span element */
  const errorSpanCss = 'form-radio-button-group-error-span';
    
  return (
    <div className={containerCss}>
      <div className={innerContainerCss}>
        <div className={contentCss}>
          {
            props.headingTextContent !== undefined &&
              <Heading alignment={props.alignment} id={`${props.id}--radio-button-group`}>
                {props.headingTextContent}
              </Heading>
          }
          <fieldset className={fieldsetCss}>
            <legend className={legendCss} id={getIdLegendDOMElement()} title={`${props.label}`}>
              {props.label}
            </legend>
            {
              props.radioButtonsList.buttonsList.map((radioButton, index) => {
                return <div className={buttonContainerCss} key={`${props.id}--radio-button-${index}`}>
                  <input aria-labelledby={`${props.id}--radio-button-${index}-label`} className={radioInputCss} disabled={props.isDisabled || false}
                    id={`${props.id}--radio-button-${index}`} name={`${props.radioButtonsList.groupName}`} onClick={handleOnClickRadioButton} type="radio"
                    value={radioButton.value} />
                  <label className={buttonLabelCss} htmlFor={`${props.id}--radio-button-${index}`} id={`${props.id}--radio-button-${index}-label`}>
                    {radioButton.title}
                  </label>
                </div>;
              })
            }
          </fieldset>
        </div>
      </div>
      {
        props.errorMessage !== undefined && props.errorMessage.length > 0 &&
          <div className={errorContainerCss}>
            <span className={errorSpanCss}>{props.errorMessage}</span>
          </div>
      }
    </div>
  );
}
RadioButtonGroup.propTypes = {
  /** The alignment of the radio button group component. This component will be left aligned by default but can be centre aligned if desired. */
  alignment: PropTypes.oneOf([ 'centre', 'left' ]),
  /** The background colour for the label element of the radio button group component. The default colour for the labels background is white. */
  backgroundColour: PropTypes.oneOf([ 'gold', 'green', 'grey', 'navy-and-gold', 'navy-and-white', 'red', 'white' ]),
  /** The value of the radio button which is to be default selected on rendering this component. By default the first radio button in the group will be pre-selected. */
  defaultSelectByValue: PropTypes.string,
  /** The error message to be output beneath the radio button group component. If an error message is to be output then the radio button group container will also be put into an error state. */
  errorMessage: PropTypes.string,
  /** An optional text heading to be output above the radio button group component. */
  headingTextContent: PropTypes.string,
  /** The unique identifier for this component. */
  id: PropTypes.string.isRequired,
  /** Switch to set whether the component is disabled or not. By default the component is enabled. */
  isDisabled: PropTypes.bool,
  /** The label text content to be linked to the radio button group component. */
  label: PropTypes.string.isRequired,
  /** The custom functionality to be executed when a click event on any of the radio buttons is fired. */
  onClick: PropTypes.func,
  /** The list of radio buttons to be rendered as the radio button group. */
  radioButtonsList: PropTypes.shape({
    buttonsList: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
    groupName: PropTypes.string,
  }),
};
export default RadioButtonGroup;
