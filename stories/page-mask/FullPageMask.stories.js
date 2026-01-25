/**
 * Developed by Anthony Cox in 2025
 */
import React, { useState } from 'react';
import { FullPageMask } from '../../components';

export default {
  component: FullPageMask,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Page Masks/Full Page Mask',
};

/**
 * Test component for the Full Page Mask component
 */
const FullPageMaskTest = () => {
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
      <button id="show-spinner" onClick={handleOnClick}>Show Full Page Mask (Esc to Exit)</button>
      <FullPageMask enableEscapeKey={true} handleEscapeKeyPress={() => setIsDisplayed(false)} id="opacity-test" isDisplayed={isDisplayed} />
    </React.Fragment>
  );
}

export const Default = {
  args: {},
  render: () => <FullPageMaskTest />,
};
