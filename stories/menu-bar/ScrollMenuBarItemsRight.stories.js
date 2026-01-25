/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import { ScrollMenuBarItemsRight } from '../../components';

export default {
  component: ScrollMenuBarItemsRight,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Menu Bar/Scroll Menu Bar Items Right',
};

/**
 * Scroll Menu Bar Items component template, rendered outside all / any menu bar components
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_ScrollMenuBarItemsRight = args => {
  return <ScrollMenuBarItemsRight {...args} />;
}

/**
 * Scroll Menu Bar Items component designed to test component visibility toggle
 */
class Template_ScrollMenuBarItemsRight_VisibilityToggle extends React.Component {
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
        <ScrollMenuBarItemsRight backgroundColour="grey" id="visibility-toggle" isHidden={this.state.isHidden} 
          onClick={() => { alert('Clicked Scroll Menu Bar Items Component (Toggle Visibility)'); }} />
        <br />
        <button id="visibility-toggle" onClick={this.onClickToggleIsHidden}>Toggle Visibility</button>
      </React.Fragment>
    );
  }
}

/**
 * Scroll Menu Bar Items Left component template to be used to test the visibility toggle
 * @param {*} args 
 * @returns {React.Component}
 */
const Template_ScrollMenuBarItemsRight_VisibilityToggle_Story = args => {
  return <Template_ScrollMenuBarItemsRight_VisibilityToggle {...args} />;
}

export const DefaultWhite = {
  args: {
    id: 'default',
    isHidden: false,
    onClick: () => { alert('Clicked Scroll Menu Bar Items Component (Default White)'); }
  },
  render: Template_ScrollMenuBarItemsRight,
};

export const WithGoldBackground = {
  args: {
    backgroundColour: 'gold',
    id: 'with-gold-background',
    isHidden: false,
    onClick: () => { alert('Clicked Scroll Menu Bar Items Component (Gold)'); }
  },
  render: Template_ScrollMenuBarItemsRight,
};

export const WithGreenBackground = {
  args: {
    backgroundColour: 'green',
    id: 'with-green-background',
    isHidden: false,
    onClick: () => { alert('Clicked Scroll Menu Bar Items Component (Green)'); }
  },
  render: Template_ScrollMenuBarItemsRight,
};

export const WithGreyBackground = {
  args: {
    backgroundColour: 'grey',
    id: 'with-grey-background',
    isHidden: false,
    onClick: () => { alert('Clicked Scroll Menu Bar Items Component (Grey)'); }
  },
  render: Template_ScrollMenuBarItemsRight,
};

export const WithNavyAndGoldBackground = {
  args: {
    backgroundColour: 'navy-and-gold',
    id: 'with-navy-and-gold-background',
    isHidden: false,
    onClick: () => { alert('Clicked Scroll Menu Bar Items Component (Navy and Gold)'); }
  },
  render: Template_ScrollMenuBarItemsRight,
};

export const WithNavyAndWhiteBackground = {
  args: {
    backgroundColour: 'navy-and-white',
    id: 'with-navy-and-white-background',
    isHidden: false,
    onClick: () => { alert('Clicked Scroll Menu Bar Items Component (Navy and White)'); }
  },
  render: Template_ScrollMenuBarItemsRight,
};

export const WithRedBackground = {
  args: {
    backgroundColour: 'red',
    id: 'with-red-background',
    isHidden: false,
    onClick: () => { alert('Clicked Scroll Menu Bar Items Component (Red)'); }
  },
  render: Template_ScrollMenuBarItemsRight,
};

export const VisibilityToggleTest = {
  args: {},
  render: Template_ScrollMenuBarItemsRight_VisibilityToggle_Story,
};
