/**
 * Developed by Anthony Cox in 2025
 */
import React, { useState } from 'react';
import { Spinner } from '../../components';

export default {
  component: Spinner,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Loading Components/Spinner',
};

/**
 * Test component for the Spinner component
 */
const SpinnerTest = props => {
  const [ isDisplayed, setIsDisplayed ] = useState(false);
  
  /**
   * Handles click events on the button
   * @param {Event} event 
   */
  const handleOnClick = event => {
    event.preventDefault();
    setIsDisplayed(true);
  };

  return (
    <React.Fragment>
      <button id="show-spinner" onClick={handleOnClick}>Show Loading Spinner (Esc to Exit)</button>
      <Spinner colour={props.colour} enableEscapeKey={true} handleEscapeKeyPress={() => setIsDisplayed(false)} id="opacity-test" isDisplayed={isDisplayed}>
        {props.children}
      </Spinner>
    </React.Fragment>
  );
};

export const Default = {
  args: {},
  render: () => <SpinnerTest />,
};

export const InGoldColour = {
  args: {},
  render: () => <SpinnerTest colour="gold" />,
};

export const InGreenColour = {
  args: {},
  render: () => <SpinnerTest colour="green" />,
};

export const InGreyColour = {
  args: {},
  render: () => <SpinnerTest colour="grey" />,
};

export const InNavyAndGoldColour = {
  args: {},
  render: () => <SpinnerTest colour="navy-and-gold" />,
};

export const InNavyAndWhiteColour = {
  args: {},
  render: () => <SpinnerTest colour="navy-and-white" />,
};

export const InRedColour = {
  args: {},
  render: () => <SpinnerTest colour="red" />,
};

export const WithCustomText = {
  args: {},
  render: () => <SpinnerTest>Custom Spinner Text</SpinnerTest>,
};

export const MobilePhoneTest = {
  args: {},
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: () => <SpinnerTest colour="navy-and-gold" />,
};
