/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { MenuBar } from '../../components';

export default {
  component: MenuBar,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Menu Bar/Menu Bar',
};

const menuBarItemsList = [
  {
    href: '#',
    id: 'menu-bar-item-1',
    title: 'Item 1',
  },
  {
    href: '#',
    id: 'menu-bar-item-2',
    title: 'Item 2',
  },
  {
    href: '#',
    id: 'menu-bar-item-3',
    title: 'Item 3',
  },
  {
    href: '#',
    id: 'menu-bar-item-4',
    title: 'Item 4',
  },
  {
    href: '#',
    id: 'menu-bar-item-5',
    title: 'Item 5',
  },
  {
    href: '#',
    id: 'menu-bar-item-6',
    title: 'Item 6',
  },
  {
    href: '#',
    id: 'menu-bar-item-7',
    title: 'Item 7',
  },
  {
    href: '#',
    id: 'menu-bar-item-8',
    title: 'Item 8',
  },
  {
    href: '#',
    id: 'menu-bar-item-9',
    title: 'Item 9',
  },
  {
    href: '#',
    id: 'menu-bar-item-10',
    title: 'Item 10',
  },
  {
    href: '#',
    id: 'menu-bar-item-11',
    title: 'Item 11',
  },
  {
    href: '#',
    id: 'menu-bar-item-12',
    title: 'Item 12',
  },
  {
    href: '#',
    id: 'menu-bar-item-13',
    title: 'Item 13',
  },
  {
    href: '#',
    id: 'menu-bar-item-14',
    title: 'Item 14',
  },
  {
    href: '#',
    id: 'menu-bar-item-15',
    title: 'Item 15',
  },
  {
    href: '#',
    id: 'menu-bar-item-16',
    title: 'Item 16',
  },
  {
    href: '#',
    id: 'menu-bar-item-17',
    title: 'Item 17',
  },
  {
    href: '#',
    id: 'menu-bar-item-18',
    title: 'Item 18',
  },
  {
    href: '#',
    id: 'menu-bar-item-19',
    title: 'Item 19',
  },
  {
    href: '#',
    id: 'menu-bar-item-20',
    title: 'Item 20',
  }
];

/**
 * Menu Bar component template, rendered outside all / any menu bar components
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_MenuBar = args => {
  return <MenuBar {...args} />;
}

export const DefaultWhite = {
  args: {
    id: 'default',
    menuBarItemsList: menuBarItemsList,
  },
  render: Template_MenuBar,
};

export const WithGoldBackground = {
  args: {
    backgroundColour: 'gold',
    id: 'with-gold-background',
    menuBarItemsList: menuBarItemsList,
  },
  render: Template_MenuBar,
};

export const WithGreenBackground = {
  args: {
    backgroundColour: 'green',
    id: 'with-green-background',
    menuBarItemsList: menuBarItemsList,
  },
  render: Template_MenuBar,
};

export const WithGreyBackground = {
  args: {
    backgroundColour: 'grey',
    id: 'with-grey-background',
    menuBarItemsList: menuBarItemsList,
  },
  render: Template_MenuBar,
};

export const WithNavyAndGoldBackground = {
  args: {
    backgroundColour: 'navy-and-gold',
    id: 'with-navy-and-gold-background',
    menuBarItemsList: menuBarItemsList,
  },
  render: Template_MenuBar,
};

export const WithNavyAndWhiteBackground = {
  args: {
    backgroundColour: 'navy-and-white',
    id: 'with-navy-and-white-background',
    menuBarItemsList: menuBarItemsList,
  },
  render: Template_MenuBar,
};

export const WithRedBackground = {
  args: {
    backgroundColour: 'red',
    id: 'with-red-background',
    menuBarItemsList: menuBarItemsList,
  },
  render: Template_MenuBar,
};

export const MobilePhoneTest = {
  args: {
    backgroundColour: 'navy-and-white',
    id: 'mobile-phone-test',
    menuBarItemsList: menuBarItemsList,
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_MenuBar,
};