/**
 * Developed by Anthony Cox in 2025
 */
import React, { useState } from 'react';
import { DropdownMenuBarContainer } from '../../components';

export default {
  component: DropdownMenuBarContainer,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Menu Bar/Dropdown Menu Bar Container',
};

const dropdownMenuBarItemsList = [
  {
    href: '#',
    id: 'menu-bar-item-1',
    title: 'Navigate to Item 1',
  },
  {
    href: '#',
    id: 'menu-bar-item-2',
    title: 'Open Item 2',
  },
  {
    href: '#',
    id: 'menu-bar-item-3',
    title: 'Click to go to Item 3',
  },
  {
    href: '#',
    id: 'menu-bar-item-4',
    title: 'Redirect to Item 4',
  },
  {
    href: '#',
    id: 'menu-bar-item-5',
    title: 'Item 5 With Truncated Text Content Since It Is Really Long',
  }
];

/**
 * Dropdown Menu Bar Container component template, rendered outside all / any menu bar components
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_DropdownMenuBarContainer = args => {
  return <DropdownMenuBarContainer {...args} />;
};

const DropdownMenuBarContainerManager = () => {
  const [ isContainerHidden, setIsContainerHidden ] = useState(false);

  /**
   * Custom onClickCloseIcon functionality
   */
  const onClickCloseIcon = () => {
    alert('Custom onClickCloseIcon functionality is executed here.');
    setIsContainerHidden(true);
  };

  /**
   * Custom onClickHyperlink functionality
   */
  const onClickHyperlink = () => {
    alert('Custom onClickHyperlink functionality is executed here.');
    setIsContainerHidden(true);
  };

  /**
   * Custom onKeyDownCloseIcon functionality
   */
  const onKeyDownCloseIcon = () => {
    alert('Custom onKeyDownCloseIcon functionality is executed here.');
    setIsContainerHidden(true);
  };

  /**
   * Custom onKeyDownHyperlink functionality
   */
  const onKeyDownHyperlink = () => {
    alert('Custom onKeyDownHyperlink functionality is executed here.');
    setIsContainerHidden(true);
  };

  return (
    <DropdownMenuBarContainer backgroundColour="red" dropdownMenuBarItemsList={dropdownMenuBarItemsList} id="with-custom-functionality" isHidden={isContainerHidden} left={10}
      onClickCloseIcon={onClickCloseIcon} onClickHyperlink={onClickHyperlink} onKeyDownCloseIcon={onKeyDownCloseIcon} onKeyDownHyperlink={onKeyDownHyperlink} top={10} />
  );
};

export const DefaultWhite = {
  args: {
    dropdownMenuBarItemsList: dropdownMenuBarItemsList,
    id: 'default',
    isHidden: false,
    left: 10,
    top: 10,
  },
  render: Template_DropdownMenuBarContainer,
};

export const WithGoldBackground = {
  args: {
    backgroundColour: 'gold',
    dropdownMenuBarItemsList: dropdownMenuBarItemsList,
    id: 'with-gold-background',
    isHidden: false,
    left: 10,
    top: 10,
  },
  render: Template_DropdownMenuBarContainer,
};

export const WithGreenBackground = {
  args: {
    backgroundColour: 'green',
    dropdownMenuBarItemsList: dropdownMenuBarItemsList,
    id: 'with-green-background',
    isHidden: false,
    left: 10,
    top: 10,
  },
  render: Template_DropdownMenuBarContainer,
};

export const WithGreyBackground = {
  args: {
    backgroundColour: 'grey',
    dropdownMenuBarItemsList: dropdownMenuBarItemsList,
    id: 'with-grey-background',
    isHidden: false,
    left: 10,
    top: 10,
  },
  render: Template_DropdownMenuBarContainer,
};

export const WithNavyAndGoldBackground = {
  args: {
    backgroundColour: 'navy-and-gold',
    dropdownMenuBarItemsList: dropdownMenuBarItemsList,
    id: 'with-navy-and-gold-background',
    isHidden: false,
    left: 10,
    top: 10,
  },
  render: Template_DropdownMenuBarContainer,
};

export const WithNavyAndWhiteBackground = {
  args: {
    backgroundColour: 'navy-and-white',
    dropdownMenuBarItemsList: dropdownMenuBarItemsList,
    id: 'with-navy-and-white-background',
    isHidden: false,
    left: 10,
    top: 10,
  },
  render: Template_DropdownMenuBarContainer,
};

export const WithRedBackground = {
  args: {
    backgroundColour: 'red',
    dropdownMenuBarItemsList: dropdownMenuBarItemsList,
    id: 'with-red-background',
    isHidden: false,
    left: 10,
    top: 10,
  },
  render: Template_DropdownMenuBarContainer,
};

export const WithAutoFocus = {
  args: {
    backgroundColour: 'navy-and-gold',
    dropdownMenuBarItemsList: dropdownMenuBarItemsList,
    enableAutoFocus: true,
    id: 'with-autofocus-enabled',
    isHidden: false,
    left: 10,
    top: 10,
  },
  render: Template_DropdownMenuBarContainer,
};

export const WithCustomClickAndKeyDownFunctionality = {
  render: () => <DropdownMenuBarContainerManager />,
}

export const MobilePhoneTest = {
  args: {
    backgroundColour: 'green',
    dropdownMenuBarItemsList: dropdownMenuBarItemsList,
    id: 'mobile-phone-test',
    isHidden: false,
    left: 16,
    top: 10,
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_DropdownMenuBarContainer,
};
