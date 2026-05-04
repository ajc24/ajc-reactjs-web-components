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
 * Full Page Mask component template
 * @returns {React.Component}
 */
const Template_FullPageMask = args => {
  return <FullPageMask {...args} />;
}

/**
 * Test component for the Full Page Mask component in its default state
 */
const FullPageMaskTest_Default = () => {
  const [ isDisplayed, setIsDisplayed ] = useState(false);

  /**
   * Handles click events on the "Show Full Page Mask" button
   * @param {Event} event 
   */
  const handleOnClick_Show = event => {
    event.preventDefault();
    setIsDisplayed(true);
  };

  /**
   * Handles click events on the "Hide Full Page Mask" button
   * @param {Event} event 
   */
  const handleOnClick_Hide = event => {
    event.preventDefault();
    setIsDisplayed(false);
  };

  return (
    <React.Fragment>
      <button id="show-full-page-mask" onClick={handleOnClick_Show} tabIndex="0">Show Full Page Mask</button>
      <FullPageMask id="default" isDisplayed={isDisplayed}>
        <button id="hide-full-page-mask-1" onClick={handleOnClick_Hide} style={{ marginBottom: '8px' }} tabIndex="0">Hide Full Page Mask</button>
        <button id="hide-full-page-mask-2" onClick={handleOnClick_Hide} style={{ marginBottom: '8px' }} tabIndex="0">Also Hide The Mask</button>
        <button id="hide-full-page-mask-3" onClick={() => { alert('This button does not perform any action.') }} style={{ marginBottom: '8px' }} tabIndex="-1">This Button Cannot Be Tabbed To</button>
        <button id="hide-full-page-mask-4" onClick={handleOnClick_Hide} tabIndex="0">Another Hide The Mask Button</button>
      </FullPageMask>
    </React.Fragment>
  );
};

export const Default = {
  args: {},
  render: () => <FullPageMaskTest_Default />,
};
