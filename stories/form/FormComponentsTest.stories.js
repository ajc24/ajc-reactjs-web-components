/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import {
  Button,
  Checkbox,
  Dropdown,
  PasswordInput,
  SubmitButton,
  TextInput,
} from '../../components';

export default {
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  tags: ['!autodocs'],
  title: 'Form Controls/Form Components Test',
};

const dropdownData = {
  a: {
    groupLabel: 'Please choose a coat type',
    itemsList: [
      { title: 'Blenheim', value: 'title-blenheim' },
      { title: 'Ruby', value: 'title-ruby' },
      { title: 'Black and Tan', value: 'title-black-and-tan' },
      { title: 'Tricolour', value: 'title-tricolour' },
    ],
  },
  b: {
    groupLabel: 'Please choose a title',
    itemsList: [
      { title: 'Mr.', value: 'title-mr' },
      { title: 'Mrs.', value: 'title-mrs' },
      { title: 'Ms.', value: 'title-ms' },
    ],
  },
  c: {
    groupLabel: 'Please choose a day',
    itemsList: [
      { title: 'Monday', value: 'title-monday' },
      { title: 'Tuesday', value: 'title-tuesday' },
      { title: 'Wednesday', value: 'title-wednesday' },
      { title: 'Thursday', value: 'title-thursday' },
      { title: 'Friday', value: 'title-friday' },
      { title: 'Saturday', value: 'title-saturday' },
      { title: 'Sunday', value: 'title-sunday' },
    ],
  },
  d: {
    groupLabel: 'Please choose a month',
    itemsList: [
      { title: 'January', value: 'january' },
      { title: 'Febrary', value: 'february' },
      { title: 'March', value: 'march' },
      { title: 'April', value: 'april' },
      { title: 'May', value: 'may' },
      { title: 'June', value: 'june' },
      { title: 'July', value: 'july' },
      { title: 'August', value: 'august' },
      { title: 'September', value: 'september' },
      { title: 'October', value: 'october' },
      { title: 'November', value: 'november' },
      { title: 'December', value: 'december' },
    ],
  },
  e: {
    groupLabel: 'Please choose a number',
    itemsList: [
      { title: '0', value: 'zero' },
      { title: '1', value: 'one' },
      { title: '2', value: 'two' },
      { title: '3', value: 'three' },
      { title: '4', value: 'four' },
      { title: '5', value: 'five' },
      { title: '6', value: 'six' },
      { title: '7', value: 'seven' },
      { title: '8', value: 'eight' },
      { title: '9', value: 'nine' },
    ],
  },
  f: {
    groupLabel: 'Please choose a colour',
    itemsList: [
      { title: 'White', value: 'white' },
      { title: 'Black', value: 'black' },
      { title: 'Red', value: 'red' },
      { title: 'Green', value: 'green' },
      { title: 'Blue', value: 'blue' },
    ],
  },
  g: {
    groupLabel: 'Please choose a weather type',
    itemsList: [
      { title: 'Dry', value: 'dry' },
      { title: 'Damp', value: 'damp' },
      { title: 'Light Rain', value: 'light-rain' },
      { title: 'Heavy Rain', value: 'heavy-rain' },
      { title: 'Monsoon', value: 'monsoon' },
    ],
  },
  h: {
    groupLabel: 'Please choose a house type',
    itemsList: [
      { title: 'Bungalow', value: 'bungalow' },
      { title: 'Two Storey', value: 'two-storey' },
      { title: 'Three Storey', value: 'three-storey' },
      { title: 'Mansion', value: 'mansion' },
    ],
  },
};

export const LeftAligned = {
  args: {},
  render: () => {
    return (
      <React.Fragment>
        <TextInput alignment="left" id="text-input-1" label="Text Entry 1" />
        <TextInput alignment="left" id="text-input-2" label="Text Entry 2" />
        <Dropdown alignment="left" id="dropdown-1" label="Dropdown 1" optionsList={dropdownData.a} />
        <Button alignment="left" backgroundColour="red" id="button-1" onClick={() => { alert('Clicked button 1') }}>Button 1</Button>
        <PasswordInput alignment="left" id="password-1" label="Password Entry" />
        <PasswordInput alignment="left" id="password-confirm" label="Confirm Password Entry" />
        <Dropdown alignment="left" id="dropdown-2" label="Dropdown 2" optionsList={dropdownData.b} />
        <Button alignment="left" backgroundColour="red" id="button-2" onClick={() => { alert('Clicked button 2') }}>Button 2</Button>
        <Checkbox alignment="left" id="checkbox-1" label="Checkbox Item 1" />
        <Checkbox alignment="left" id="checkbox-2" label="Checkbox Item 2" />
        <SubmitButton alignment="left" backgroundColour="red" id="submit-1" onClick={() => { alert('Clicked the submit button') }}>
          Submit
        </SubmitButton>
      </React.Fragment>
    );
  },
};

export const CentreAligned = {
  args: {},
  render: () => {
    return (
      <React.Fragment>
        <TextInput alignment="centre" id="text-input-centre-1" label="Text Entry 1" />
        <TextInput alignment="centre" id="text-input-centre-2" label="Text Entry 2" />
        <Dropdown alignment="centre" id="dropdown-centre-1" label="Dropdown 1" optionsList={dropdownData.c} />
        <Button alignment="centre" backgroundColour="navy-and-gold" id="button-centre-1" onClick={() => { alert('Clicked button 1') }}>Button 1</Button>
        <PasswordInput alignment="centre" id="password-centre-1" label="Password Entry" />
        <PasswordInput alignment="centre" id="password-centre-confirm" label="Confirm Password Entry" />
        <Dropdown alignment="centre" id="dropdown-centre-2" label="Dropdown 2" optionsList={dropdownData.d} />
        <Button alignment="centre" backgroundColour="navy-and-gold" id="button-centre-2" onClick={() => { alert('Clicked button 2') }}>Button 2</Button>
        <Checkbox alignment="centre" id="checkbox-centre-1" label="Checkbox Item 1" />
        <Checkbox alignment="centre" id="checkbox-centre-2" label="Checkbox Item 2" />
        <SubmitButton alignment="centre" backgroundColour="navy-and-gold" id="submit-centre-1" onClick={() => { alert('Clicked the submit button') }}>
          Submit
        </SubmitButton>
      </React.Fragment>
    );
  },
};

export const AllInErrorState = {
  args: {},
  render: () => {
    return (
      <React.Fragment>
        <TextInput alignment="left" errorMessage="Please fix the issue with the text entry in this field." id="text-input-all-1" label="Text Entry 1" />
        <TextInput alignment="left" errorMessage="You have not entered a value into this mandatory field." id="text-input-all-2" label="Text Entry 2" />
        <Dropdown alignment="left" errorMessage="You have not selected a value from this dropdown menu." id="dropdown-all-1" label="Dropdown 1" optionsList={dropdownData.e} />
        <Button alignment="left" backgroundColour="green" id="button-all-1" onClick={() => { alert('Clicked button 1') }}>Button 1</Button>
        <PasswordInput alignment="left" errorMessage="The password entry field requires a value to be set." id="password-all-1" label="Password Entry" />
        <PasswordInput alignment="left" errorMessage="The confirmed password entry does not match the password entry." id="password-confirm-all" label="Confirm Password Entry" />
        <Dropdown alignment="left" errorMessage="You have not selected a value from this dropdown menu." id="dropdown-all-2" label="Dropdown 2" optionsList={dropdownData.f} />
        <Button alignment="left" backgroundColour="green" id="button-all-2" onClick={() => { alert('Clicked button 2') }}>Button 2</Button>
        <Checkbox alignment="left" errorMessage="There is an error with your selection in checkbox item 1." id="checkbox-all-1" label="Checkbox Item 1" />
        <Checkbox alignment="left" errorMessage="There is an error with your selection in checkbox item 2." id="checkbox-all-2" label="Checkbox Item 2" />
        <SubmitButton alignment="left" backgroundColour="green" id="submit-all-1" onClick={() => { alert('Clicked the submit button') }}>
          Submit
        </SubmitButton>
      </React.Fragment>
    );
  },
};

export const AllInErrorStateAndCentreAligned = {
  args: {},
  render: () => {
    return (
      <React.Fragment>
        <TextInput alignment="centre" errorMessage="Please fix the issue with the text entry in this field." id="text-input-centre-all-1" label="Text Entry 1" />
        <TextInput alignment="centre" errorMessage="You have not entered a value into this mandatory field." id="text-input-centre-all-2" label="Text Entry 2" />
        <Dropdown alignment="centre" errorMessage="You have not selected a value from this dropdown menu." id="dropdown-centre-all-1" label="Dropdown 1"
          optionsList={dropdownData.g} />
        <Button alignment="centre" backgroundColour="grey" id="button-centre-all-1" onClick={() => { alert('Clicked button 1') }}>Button 1</Button>
        <PasswordInput alignment="centre" errorMessage="The password entry field requires a value to be set." id="password-centre-all-1" label="Password Entry" />
        <PasswordInput alignment="centre" errorMessage="The confirmed password entry does not match the password entry." id="password-confirm-centre-all"
          label="Confirm Password Entry" />
        <Dropdown alignment="centre" errorMessage="You have not selected a value from this dropdown menu." id="dropdown-centre-all-2" label="Dropdown 2"
          optionsList={dropdownData.h} />
        <Button alignment="centre" backgroundColour="grey" id="button-centre-all-2" onClick={() => { alert('Clicked button 2') }}>Button 2</Button>
        <Checkbox alignment="centre" errorMessage="There is an error with your selection in checkbox item 1." id="checkbox-centre-all-1" label="Checkbox Item 1" />
        <Checkbox alignment="centre" errorMessage="There is an error with your selection in checkbox item 2." id="checkbox-centre-all-2" label="Checkbox Item 2" />
        <SubmitButton alignment="centre" backgroundColour="grey" id="submit-centre-all-1" onClick={() => { alert('Clicked the submit button') }}>
          Submit
        </SubmitButton>
      </React.Fragment>
    );
  },
};
