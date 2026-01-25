/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { MenuBarItem } from '../../components';

export default {
  component: MenuBarItem,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Menu Bar/Menu Bar Item',
};

/**
 * Menu Bar Item component template, rendered outside all / any menu bar components
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_MenuBarItem = args => {
  return <MenuBarItem {...args} />;
}

/**
 * Menu Bar Item component designed to test component visibility toggle
 */
class Template_MenuBarItem_VisibilityToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
    };
    this.onClickToggleIsHidden = this.onClickToggleIsHidden.bind(this);
  }

  onClickToggleIsHidden() {
    this.setState({ isHidden: !this.state.isHidden });
  }

  render() {
    return (
      <React.Fragment>
        <MenuBarItem backgroundColour="gold" href="#" id="visibility-toggle" isHidden={this.state.isHidden}>
          Toggle Test
        </MenuBarItem>
        <br />
        <button id="visibility-toggle" onClick={this.onClickToggleIsHidden}>Toggle Visibility</button>
      </React.Fragment>
    );
  }
}

/**
 * Menu Bar Item component template to be used to test the visibility toggle
 * @param {*} args 
 * @returns {React.Component}
 */
const Template_MenuBarItem_VisibilityToggle_Story = args => {
  return <Template_MenuBarItem_VisibilityToggle {...args} />;
}

export const Default = {
  args: {
    children: 'Default White',
    href: '#',
    id: 'default',
    isHidden: false,
  },
  render: Template_MenuBarItem,
};

export const WithGoldBackground = {
  args: {
    backgroundColour: 'gold',
    children: 'Gold',
    href: '#',
    id: 'with-gold-background',
    isHidden: false,
  },
  render: Template_MenuBarItem,
};

export const WithGreenBackground = {
  args: {
    backgroundColour: 'green',
    children: 'Green',
    href: '#',
    id: 'with-green-background',
    isHidden: false,
  },
  render: Template_MenuBarItem,
};

export const WithGreyBackground = {
  args: {
    backgroundColour: 'grey',
    children: 'Grey',
    href: '#',
    id: 'with-grey-background',
    isHidden: false,
  },
  render: Template_MenuBarItem,
};

export const WithNavyAndGoldBackground = {
  args: {
    backgroundColour: 'navy-and-gold',
    children: 'Navy and Gold',
    href: '#',
    id: 'with-navy-and-gold-background',
    isHidden: false,
  },
  render: Template_MenuBarItem,
};

export const WithNavyAndWhiteBackground = {
  args: {
    backgroundColour: 'navy-and-white',
    children: 'Navy and White',
    href: '#',
    id: 'with-navy-and-white-background',
    isHidden: false,
  },
  render: Template_MenuBarItem,
};

export const WithRedBackground = {
  args: {
    backgroundColour: 'red',
    children: 'Red',
    href: '#',
    id: 'with-red-background',
    isHidden: false,
  },
  render: Template_MenuBarItem,
};

export const WithRightSideSpacing = {
  args: {
    addRightSideSpacing: true,
    backgroundColour: 'green',
    children: 'Spacing Right',
    href: '#',
    id: 'with-right-side-spacing',
    isHidden: false,
  },
  render: Template_MenuBarItem,
}

export const WithTruncatedText = {
  args: {
    backgroundColour: 'navy-and-gold',
    children: 'With Truncated Text Content',
    href: '#',
    id: 'with-truncated-text',
    isHidden: false,
  },
  render: Template_MenuBarItem,
};

export const VisibilityToggleTest = {
  args: {},
  render: Template_MenuBarItem_VisibilityToggle_Story,
};
