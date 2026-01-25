/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import {
  TabsList,
  TextInput,
} from '../../components';

export default {
  component: TabsList,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Buttons/Tabs List',
};

/**
 * Tabs List component template
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_TabsList = args => {
  return <TabsList {...args} />;
};

/**
 * Tabs List component template for focus testing
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_TabsList_FocusTest = args => {
  return (
    <React.Fragment>
      <TextInput id="external-content-1" label="External Content 1" />
      <TabsList {...args} />
      <TextInput id="external-content-2" label="External Content 2" />
    </React.Fragment>
  );
}

export const OneTab = {
  args: {
    buttonsList: [
      'Button 1',
    ],
    contentList: [
      <p>Panel for Button 1</p>,
    ],
    id: 'one-tab',
  },
  render: Template_TabsList,
};

export const TwoTabs = {
  args: {
    buttonsList: [
      'Button 2',
      'Button 3',
    ],
    contentList: [
      <p>Panel for Button 2</p>,
      <p>Panel for Button 3</p>,
    ],
    id: 'two-tabs',
  },
  render: Template_TabsList,
};

export const ThreeTabs = {
  args: {
    buttonsList: [
      'Button 4',
      'Button 5',
      'Button 6',
    ],
    contentList: [
      <p>Panel for Button 4</p>,
      <p>Panel for Button 5</p>,
      <p>Panel for Button 6</p>,
    ],
    id: 'three-tabs',
  },
  render: Template_TabsList,
};

export const MoreThanThreeTabs = {
  args: {
    buttonsList: [
      'Button 7',
      'Button 8',
      'Button 9',
      'Button 10',
    ],
    contentList: [
      <p>Panel for Button 7</p>,
      <p>Panel for Button 8</p>,
      <p>Panel for Button 9</p>,
      <p>Panel for Button 10</p>,
    ],
    id: 'more-than-three-tabs',
  },
  render: Template_TabsList,
};

export const FocusTest = {
  args: {
    buttonsList: [
      'Button 11',
      'Button 12',
      'Button 13',
    ],
    contentList: [
      <TextInput id="panel-11-content" label="Panel 11 Content" />,
      <p>Panel for Button 12</p>,
      <TextInput id="panel-13-content" label="Panel 13 Content" />,
    ],
    id: 'focus-test',
  },
  render: Template_TabsList_FocusTest,
};

export const TruncatedTextTest = {
  args: {
    buttonsList: [
      'Button 14 Text',
      'Button 15 Truncated Text',
      'Button 16',
    ],
    contentList: [
      <p>Panel for Button 14</p>,
      <p>Panel for Button 15</p>,
      <p>Panel for Button 16</p>,
    ],
    id: 'truncated-text-test',
  },
  render: Template_TabsList,
};

export const MobilePhoneTest = {
  args: {
    buttonsList: [
      'Button 14',
      'Button 15',
      'Button 16',
    ],
    contentList: [
      <TextInput id="panel-14-content" label="Panel 14 Content" />,
      <TextInput id="panel-15-content" label="Panel 15 Content" />,
      <TextInput id="panel-16-content" label="Panel 16 Content" />,
    ],
    id: 'mobile-phone-test',
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_TabsList,
};
