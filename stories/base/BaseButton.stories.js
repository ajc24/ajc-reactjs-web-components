/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { BaseButton } from '../../components';

export default {
  component: BaseButton,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Base Components/Base Button',
};

/**
 * Base Button component template
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_BaseButton = args => {
  return <BaseButton {...args} />;
}

export const Default = {
  args: {
    children: 'Default White',
    id: 'default',
  },
  render: Template_BaseButton,
};

export const GoldButton = {
  args: {
    backgroundColour: 'gold',
    children: 'Gold',
    id: 'gold',
    onClick: () => { alert('Clicked the type="button" with gold background colour') },
    type: 'button',
  },
  render: Template_BaseButton,
};

export const WithGreenBackground = {
  args: {
    backgroundColour: 'green',
    children: 'Green',
    id: 'green',
    onClick: () => { alert('Clicked the type="button" with green background colour') },
    type: 'button',
  },
  render: Template_BaseButton,
};

export const WithGreyBackground = {
  args: {
    backgroundColour: 'grey',
    children: 'Grey',
    id: 'grey',
    onClick: () => { alert('Clicked the type="button" with grey background colour') },
    type: 'button',
  },
  render: Template_BaseButton,
};

export const WithNavyAndGoldBackground = {
  args: {
    backgroundColour: 'navy-and-gold',
    children: 'Navy and Gold',
    id: 'navy-and-gold',
    onClick: () => { alert('Clicked the type="button" with navy and gold background colour') },
    type: 'button',
  },
  render: Template_BaseButton,
};

export const WithNavyAndWhiteBackground = {
  args: {
    backgroundColour: 'navy-and-white',
    children: 'Navy and White',
    id: 'navy-and-white',
    onClick: () => { alert('Clicked the type="button" with navy and white background colour') },
    type: 'button',
  },
  render: Template_BaseButton,
};

export const WithRedBackground = {
  args: {
    backgroundColour: 'red',
    children: 'Red',
    id: 'red',
    onClick: () => { alert('Clicked the type="button" with red background colour') },
    type: 'button',
  },
  render: Template_BaseButton,
};

export const WithRightSideSpacing = {
  args: {
    addRightSideSpacing: true,
    backgroundColour: 'green',
    children: 'Spacing Right',
    id: 'with-right-side-spacing',
    onClick: () => { alert('Clicked the button with right side spacing applied') },
  },
  render: Template_BaseButton,
}

export const SubmitButtonType = {
  args: {
    backgroundColour: 'navy-and-white',
    children: 'Submit',
    id: 'submit-button-type',
    onClick: () => { alert('Clicked the type="submit" button') },
    type: 'submit',
  },
  render: Template_BaseButton,
};

export const WithTruncatedText = {
  args: {
    backgroundColour: 'red',
    children: 'With Truncated Text Content',
    id: 'with-truncated-text',
    onClick: () => { alert('Clicked the button with truncated text content') },
  },
  render: Template_BaseButton,
};

export const Disabled = {
  args: {
    backgroundColour: 'navy-and-white',
    children: 'Disabled',
    id: 'disabled',
    isDisabled: true,
    onClick: () => { alert('Clicked the disabled button (should not appear)') },
  },
  render: Template_BaseButton,
};

export const DisabledFocusTest = {
  args: {},
  render: () => {
    return <React.Fragment>
      <BaseButton backgroundColour="gold" id="button-1" onClick={() => { alert('Clicked Button 1') }}>
        Button 1
      </BaseButton>
      <BaseButton backgroundColour="grey" id="disabled-button-2" isDisabled={true} onClick={() => { alert('Clicked Disabled Button 2 (should not appear)') }}>
        Disabled Button 2
      </BaseButton>
      <BaseButton backgroundColour="navy-and-white" id="button-3" onClick={() => { alert('Clicked Submit Button 3') }} type="submit">
        Submit Button 3
      </BaseButton>
    </React.Fragment>
  },
};

export const MobilePhoneTest = {
  args: {
    backgroundColour: 'green',
    children: 'Mobile Phone Test',
    id: 'mobile-phone-test',
    onClick: () => { alert('Clicked the mobile phone test button') },
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_BaseButton,
};
