/**
 * Developed by Anthony Cox in 2025
 */
import React, { useState } from 'react';
import { DropdownMenuBarItem, MenuBar } from '../../components';

export default {
  component: DropdownMenuBarItem,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Menu Bar/Dropdown Menu Bar Item',
};

const dropdownMenuBarItemData = {
  dropdownMenuBarItemsList: [
    {
      href: '#',
      id: 'dropdown-menu-bar-item-1',
      title: 'Dropdown Menu Bar Item 1',
    },
    {
      href: '#',
      id: 'dropdown-menu-bar-item-2',
      title: 'Dropdown Menu Bar Item 2',
    },
    {
      href: '#',
      id: 'dropdown-menu-bar-item-3',
      title: 'Dropdown Menu Bar Item 3',
    },
    {
      href: '#',
      id: 'dropdown-menu-bar-item-4',
      title: 'Dropdown Menu Bar Item 4',
    },
    {
      href: '#',
      id: 'dropdown-menu-bar-item-5',
      title: 'Dropdown Menu Bar Item 5',
    },
  ],
  id: 'menu-bar-item',
  title: 'Menu Bar Item',
};

const dropdownMenuBarItemData_TruncatedText = {
  dropdownMenuBarItemsList: [
    {
      href: '#',
      id: 'dropdown-menu-bar-item-truncated-text-1',
      title: 'Dropdown Menu Bar Item 1',
    },
    {
      href: '#',
      id: 'dropdown-menu-bar-item-truncated-text-2',
      title: 'Dropdown Menu Bar Item 2',
    },
  ],
  id: 'menu-bar-item-truncated-text',
  title: 'With Truncated Text Content',
};

const dropdownMenuBarItemData_MobilePhoneTest = [
  {
    dropdownMenuBarItemsList: [
      {
        href: '#',
        id: 'mobile-phone-test--dropdown-hyperlink-1-1',
        title: 'Dropdown Hyperlink 1.1',
      },
      {
        href: '#',
        id: 'mobile-phone-test--dropdown-hyperlink-1-2',
        title: 'Dropdown Hyperlink 1.2',
      },
      {
        href: '#',
        id: 'mobile-phone-test--dropdown-hyperlink-1-3',
        title: 'Dropdown Hyperlink 1.3',
      },
    ],
    id: 'mobile-phone-test-dropdown-1',
    title: 'Dropdown Item 1',
  },
  {
    dropdownMenuBarItemsList: [
      {
        href: '#',
        id: 'mobile-phone-test--dropdown-hyperlink-2-1',
        title: 'Dropdown Hyperlink 2.1',
      },
      {
        href: '#',
        id: 'mobile-phone-test--dropdown-hyperlink-2-2',
        title: 'Dropdown Hyperlink 2.2',
      },
    ],
    id: 'mobile-phone-test-dropdown-2',
    title: 'Dropdown Item 2',
  },
  {
    dropdownMenuBarItemsList: [
      {
        href: '#',
        id: 'mobile-phone-test--dropdown-hyperlink-3-1',
        title: 'Dropdown Hyperlink 3.1',
      },
      {
        href: '#',
        id: 'mobile-phone-test--dropdown-hyperlink-3-2',
        title: 'Dropdown Hyperlink 3.2',
      },
      {
        href: '#',
        id: 'mobile-phone-test--dropdown-hyperlink-3-3',
        title: 'Dropdown Hyperlink 3.3',
      },
    ],
    id: 'mobile-phone-test-dropdown-3',
    title: 'Dropdown Item 3',
  },
  {
    href: '#',
    id: 'mobile-phone-test--menu-bar-item-1',
    title: 'Menu Item 1',
  },
  {
    href: '#',
    id: 'mobile-phone-test--menu-bar-item-2',
    title: 'Menu Item 2',
  },
  {
    dropdownMenuBarItemsList: [
      {
        href: '#',
        id: 'mobile-phone-test--dropdown-hyperlink-4-1',
        title: 'Dropdown Hyperlink 4.1',
      },
      {
        href: '#',
        id: 'mobile-phone-test--dropdown-hyperlink-4-2',
        title: 'Dropdown Hyperlink 4.2',
      },
    ],
    id: 'mobile-phone-test-dropdown-4',
    title: 'Dropdown Item 4',
  },
];

/**
 * Dropdown Menu Bar Item component template, rendered outside all / any menu bar components
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_DropdownMenuBarItem = args => {
  return <DropdownMenuBarItem {...args} />;
}

/**
 * Dropdown Menu Bar Item component designed to test component visibility toggle
 */
const Template_DropdownMenuBarItem_VisibilityToggle = props => {
  const [ isHidden, setIsHidden ] = useState(true);

  const onClickToggleIsHidden = () => {
    setIsHidden(!isHidden);
  };

  return (
    <React.Fragment>
      <DropdownMenuBarItem backgroundColour="grey" dropdownMenuBarItemData={dropdownMenuBarItemData} id="visibility-toggle" isHidden={isHidden}>
        Toggle Test
      </DropdownMenuBarItem>
      <br />
      <button id="visibility-toggle" onClick={onClickToggleIsHidden}>Toggle Visibility</button>
    </React.Fragment>
  );
}

/**
 * Dropdown Menu Bar Item component template to be used to test the visibility toggle
 * @param {*} args 
 * @returns {React.Component}
 */
const Template_DropdownMenuBarItem_VisibilityToggle_Story = args => {
  return <Template_DropdownMenuBarItem_VisibilityToggle {...args} />;
}

export const DefaultWhite = {
  args: {
    children: 'Default White',
    dropdownMenuBarItemData: dropdownMenuBarItemData,
    id: 'default-white',
    isHidden: false,
  },
  render: Template_DropdownMenuBarItem,
};

export const WithGoldBackground = {
  args: {
    backgroundColour: 'gold',
    dropdownMenuBarItemData: dropdownMenuBarItemData,
    id: 'with-gold-background',
    isHidden: false,
  },
  render: Template_DropdownMenuBarItem,
};

export const WithGreenBackground = {
  args: {
    backgroundColour: 'green',
    dropdownMenuBarItemData: dropdownMenuBarItemData,
    id: 'with-green-background',
    isHidden: false,
  },
  render: Template_DropdownMenuBarItem,
};

export const WithGreyBackground = {
  args: {
    backgroundColour: 'grey',
    dropdownMenuBarItemData: dropdownMenuBarItemData,
    id: 'with-grey-background',
    isHidden: false,
  },
  render: Template_DropdownMenuBarItem,
};

export const WithNavyAndGoldBackground = {
  args: {
    backgroundColour: 'navy-and-gold',
    dropdownMenuBarItemData: dropdownMenuBarItemData,
    id: 'with-navy-and-gold-background',
    isHidden: false,
  },
  render: Template_DropdownMenuBarItem,
};

export const WithNavyAndWhiteBackground = {
  args: {
    backgroundColour: 'navy-and-white',
    dropdownMenuBarItemData: dropdownMenuBarItemData,
    id: 'with-navy-and-white-background',
    isHidden: false,
  },
  render: Template_DropdownMenuBarItem,
};

export const WithRedBackground = {
  args: {
    backgroundColour: 'red',
    dropdownMenuBarItemData: dropdownMenuBarItemData,
    id: 'with-red-background',
    isHidden: false,
  },
  render: Template_DropdownMenuBarItem,
};

export const WithRightSideSpacing = {
  args: {
    addRightSideSpacing: true,
    backgroundColour: 'navy-and-white',
    dropdownMenuBarItemData: dropdownMenuBarItemData,
    id: 'with-right-side-spacing',
    isHidden: false,
  },
  render: Template_DropdownMenuBarItem,
}

export const WithTruncatedText = {
  args: {
    backgroundColour: 'red',
    dropdownMenuBarItemData: dropdownMenuBarItemData_TruncatedText,
    id: 'with-truncated-text',
    isHidden: false,
  },
  render: Template_DropdownMenuBarItem,
};

export const VisibilityToggleTest = {
  args: {},
  render: Template_DropdownMenuBarItem_VisibilityToggle_Story,
};

export const MenuBarTest = {
  args: {},
  render: () => { return <MenuBar backgroundColour="red" id="menu-bar-test" menuBarItemsList={[ dropdownMenuBarItemData, dropdownMenuBarItemData_TruncatedText ]} /> }
}

export const MobilePhoneTest = {
  args: {},
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: () => { return <MenuBar backgroundColour="red" id="mobile-phone-test" menuBarItemsList={dropdownMenuBarItemData_MobilePhoneTest} /> }
}
