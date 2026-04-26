/**
 * Developed by Anthony Cox in 2025
 */
import React, { useEffect, useState } from 'react';
import { Dialog } from '../../components';
import { PageTemplateConfig } from '../../components/modules';

export default {
  component: Dialog,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Dialog/Dialog',
};

const contentData_Default = [
  {
    content: 'This is some sample content for the default dialog example.',
    type: 'paragraph',
  },
  {
    content: 'This dialog has a title, content made up of two paragraphs, two buttons and a white background, all rendered on a full page mask.',
    type: 'paragraph',
  },
];
const contentData_Gold = [
  {
    content: 'This is some sample content for the gold themed dialog example.',
    type: 'paragraph',
  },
  {
    content: 'This dialog has a title, content made up of two paragraphs, two buttons and a grey background, all rendered on a full page mask.',
    type: 'paragraph',
  },
];
const contentData_Green = [
  {
    content: 'This is some sample content for the green themed dialog example.',
    type: 'paragraph',
  },
  {
    content: 'This dialog has a title, content made up of two paragraphs, two buttons and a grey background, all rendered on a full page mask.',
    type: 'paragraph',
  },
];
const contentData_Grey = [
  {
    content: 'This is some sample content for the grey themed dialog example.',
    type: 'paragraph',
  },
  {
    content: 'This dialog has a title, content made up of two paragraphs, two buttons and a grey background, all rendered on a full page mask.',
    type: 'paragraph',
  },
];
const contentData_NavyAndGold = [
  {
    content: 'This is some sample content for the navy and gold themed dialog example.',
    type: 'paragraph',
  },
  {
    content: 'This dialog has a title, content made up of two paragraphs, two buttons and a grey background, all rendered on a full page mask.',
    type: 'paragraph',
  },
];
const contentData_NavyAndWhite = [
  {
    content: 'This is some sample content for the navy and white themed dialog example.',
    type: 'paragraph',
  },
  {
    content: 'This dialog has a title, content made up of two paragraphs, two buttons and a grey background, all rendered on a full page mask.',
    type: 'paragraph',
  },
];
const contentData_Red = [
  {
    content: 'This is some sample content for the red themed dialog example.',
    type: 'paragraph',
  },
  {
    content: 'This dialog has a title, content made up of two paragraphs, two buttons and a grey background, all rendered on a full page mask.',
    type: 'paragraph',
  },
];

/**
 * Test component for the Dialog component
 */
const DialogTest = props => {
  const [ isDisplayed, setIsDisplayed ] = useState(false);

  const buttonData = [
    {
      id: 'cancel-dialog',
      onClick: () => {
        alert('You have clicked on the "Cancel" button.');
        setIsDisplayed(false); 
      },
      textContent: 'Cancel',
    },
    {
      id: 'confirm-dialog',
      onClick: () => {
        alert('You have clicked on the "Confirm" button.');
        setIsDisplayed(false); 
      },
      textContent: 'Confirm',
    },
  ];

  useEffect(() => {
    PageTemplateConfig.setupDocumentBodyCss();
  }, []);
  
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
      <button id="show-dialog" onClick={handleOnClick}>Show Dialog (Esc to Exit)</button>
      <Dialog backgroundColour={props.backgroundColour} buttonColour={props.buttonColour} buttonData={buttonData} contentData={props.contentData}
        dialogTitleTextContent={props.dialogTitleTextContent} handleEscapeKeyPress={() => setIsDisplayed(false)} id="dialog-test" isDisplayed={isDisplayed} />
    </React.Fragment>
  );
};

export const Default = {
  args: {},
  render: () => <DialogTest contentData={contentData_Default} dialogTitleTextContent="Default Dialog Example" />,
};

export const GoldThemedDialog = {
  args: {},
  render: () => <DialogTest backgroundColour="grey" buttonColour="gold" contentData={contentData_Gold} dialogTitleTextContent="Gold Themed Dialog Example" />,
};

export const GreenThemedDialog = {
  args: {},
  render: () => <DialogTest backgroundColour="grey" buttonColour="green" contentData={contentData_Green} dialogTitleTextContent="Green Themed Dialog Example" />,
};

export const GreyThemedDialog = {
  args: {},
  render: () => <DialogTest backgroundColour="grey" buttonColour="grey" contentData={contentData_Grey} dialogTitleTextContent="Grey Themed Dialog Example" />,
};

export const NavyAndGoldThemedDialog = {
  args: {},
  render: () => <DialogTest backgroundColour="grey" buttonColour="navy-and-gold" contentData={contentData_NavyAndGold} dialogTitleTextContent="Navy and Gold Themed Dialog Example" />,
};

export const NavyAndWhiteThemedDialog = {
  args: {},
  render: () => <DialogTest backgroundColour="grey" buttonColour="navy-and-white" contentData={contentData_NavyAndWhite} dialogTitleTextContent="Navy and White Themed Dialog Example" />,
};

export const RedThemedDialog = {
  args: {},
  render: () => <DialogTest backgroundColour="grey" buttonColour="red" contentData={contentData_Red} dialogTitleTextContent="Red Themed Dialog Example" />,
};

export const MobilePhoneTest = {
  args: {},
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: () => <DialogTest backgroundColour="grey" buttonColour="navy-and-gold" contentData={contentData_NavyAndGold} dialogTitleTextContent="Navy and Gold Themed Dialog Example" />,
};
