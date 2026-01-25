/**
 * Developed by Anthony Cox in 2025
 */
import { getBoundingClientRect } from '../data/dom-measurements';

/**
 * Commonly used functionality for use with all UI components
 */
export default class HTMLElementManager {
  #domElement;
  #domElements;
  #maxContainerHeight;

  constructor() {
    this.#domElement = null;
    this.#domElements = null;
    this.#maxContainerHeight = 0;
  }

  /**
   * Executes the JavaScript click functionality on the DOM element currently set to this component
   * @returns {boolean}
   */
  click() {
    if (this.isValidDOMElement()) {
      this.getDOMElement().click();
      return true;
    }
    return false;
  }

  /**
   * Executes the JavaScript focus functionality on the DOM element currently set to this component
   * @returns {boolean}
   */
  focus() {
    if (this.isValidDOMElement()) {
      this.getDOMElement().focus();
      return true;
    }
    return false;
  }

  /**
   * Returns the value set to the "aria-checked" attribute set to this component
   * @returns {boolean}
   */
  getAriaChecked() {
    if (this.isValidDOMElement()) {
      const checked = this.getDOMElement().ariaChecked;
      if (checked === 'true') {
        return true;
      }
    }
    return false;
  }

  /**
   * Returns the value set to the "aria-label" attribute set to this component
   * @returns {string}
   */
  getAriaLabel() {
    if (this.isValidDOMElement()) {
      return this.getDOMElement().ariaLabel;
    }
    return '';
  }

  /**
   * Retrieves the dimensions for the DOM element currently set to this component
   * @returns {{ bottom: number, height: number, left: number, right: number, top: number, width: number }}
   */
  getBoundingClientRect() {
    if (this.isValidDOMElement()) {
      return getBoundingClientRect(this.getDOMElement());
    }
    return {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
    };
  }

  /**
   * Returns the value set to the target "data" attribute set to this component
   * @param {string} targetData 
   * @returns {string}
   */
  getData(targetData) {
    if (this.isValidDOMElement()) {
      if (this.getDOMElement().dataset !== undefined && this.getDOMElement().dataset[`${targetData}`] !== undefined) {
        return this.getDOMElement().dataset[`${targetData}`];
      }
    }
    return '';
  }

  /**
   * Returns the expected boolean value set to the target "data" attribute set to this component
   * @param {string} targetData 
   * @returns {boolean}
   */
  getData_Boolean(targetData) {
    const dataValue = this.getData(targetData);
    if (dataValue !== '' && dataValue === 'true') {
      return true;
    }
    return false;
  }

  /**
   * Returns the expected integer number value set to the target "data" attribute set to this component
   * @param {string} targetData 
   * @returns {number}
   */
  getData_Number_Integer(targetData) {
    const dataValue = this.getData(targetData);
    if (dataValue !== '') {
      return Number.parseInt(dataValue, 10);
    }
    return -1;
  }

  /**
   * Returns the expected string value set to the target "data" attribute set to this component
   * @param {string} targetData 
   * @returns {string}
   */
  getData_String(targetData) {
    return this.getData(targetData);
  }

  /**
   * Returns the DOM element currently set to this component
   * @returns {HTMLElement}
   */
  getDOMElement() {
    return this.#domElement;
  }

  /**
   * Returns the DOM elements (multiple) currently set to this component
   * @returns {Array.<HTMLElement>}
   */
  getDOMElements() {
    return this.#domElements;
  }

  /**
   * Counts the number of DOM elements currently set to this component
   * @returns {number}
   */
  getDOMElements_Count() {
    if (this.isValidDOMElements()) {
      return this.getDOMElements().length;
    }
    return 0;
  }

  /**
   * Retrieves the first DOM element from the list of DOM elements currently set to this component
   * @returns {HTMLElement | null}
   */
  getDOMElements_FirstIndex() {
    if (this.getDOMElements_Count() >= 1) {
      return this.getDOMElements()[0];
    }
    return null;
  }

  /**
   * Retrieves the last DOM element from the list of DOM elements currently set to this component
   * @returns {HTMLElement | null}
   */
  getDOMElements_LastIndex() {
    if (this.getDOMElements_Count() >= 1) {
      return this.getDOMElements()[this.getDOMElements_Count() - 1];
    }
    return null;
  }
  
  /**
   * Retrieves the height of the DOM element currently set to this component
   * @returns {number}
   */
  getHeight() {
    if (this.isValidDOMElement()) {
      return this.getBoundingClientRect().height;
    }
    return 0;
  }

  /**
   * Retrieves the ID set to the DOM element currently set to this component
   * @returns {string}
   */
  getId() {
    if (this.isValidDOMElement()) {
      return this.getDOMElement().id;
    }
    return '';
  }

  /**
   * Retrieves the value of the max container height supported by this component
   * @returns {number}
   */
  getMaxContainerHeight() {
    return this.#maxContainerHeight;
  }

  /**
   * Retrieves the right position of the DOM element currently set to this component
   * @returns {number}
   */
  getRight() {
    if (this.isValidDOMElement()) {
      return this.getBoundingClientRect().right;
    }
    return 0;
  }

  /**
   * Retrieves the text content output in the DOM element currently set to this component
   * @returns {string}
   */
  getTextContent() {
    if (this.isValidDOMElement()) {
      return this.getDOMElement().textContent;
    }
    return '';
  }

  /**
   * Retrieves the value set to the DOM element currently set to this component
   * @returns {string}
   */
  getValue() {
    if (this.isValidDOMElement()) {
      return this.getDOMElement().value;
    }
    return '';
  }

  /**
   * Gets the visibility value from the DOM element and determines whether it is set to 'visible' or not
   * @returns {boolean}
   */
  getVisibility() {
    if (this.isValidDOMElement()) {
      return this.getDOMElement().style.visibility === 'visible';
    }
    return false;
  }

  /**
   * Checks if a valid DOM element has been set to this component.
   * An invalid element is one that will return a null value.
   * @returns {boolean}
   */
  isValidDOMElement() {
    return this.getDOMElement() !== null;
  }

  /**
   * Checks if valid DOM elements have been set to this component.
   * Invalid elements will return a null value.
   * @returns {boolean}
   */
  isValidDOMElements() {
    return this.getDOMElements() !== null;
  }

  /**
   * Triggers a submit event on the target form component
   * @returns {boolean}
   */
  requestSubmit() {
    if (this.isValidDOMElement()) {
      this.getDOMElement().requestSubmit();
      return true;
    }
    return false;
  }

  /**
   * Sets the checked property of the current DOM element set to this component
   * @param {boolean} checked
   * @returns {boolean}
   */
  setChecked(checked) {
    if (this.isValidDOMElement()) {
      this.getDOMElement().checked = checked;
      return true;
    }
    return false;
  }

  /**
   * Sets the DOM element linked to this component
   * @param {HTMLElement} newDOMElement 
   */
  setDOMElement(newDOMElement) {
    this.#domElement = newDOMElement;
  }

  /**
   * Sets the DOM elements linked to this component
   * @param {Array.<HTMLElement>} newDOMElements 
   */
  setDOMElements(newDOMElements) {
    this.#domElements = newDOMElements;
  }

  /**
   * Sets the font size (in em) of the current DOM element set to this component
   * @param {number} fontSize
   * @returns {boolean}
   */
  setFontSize(fontSize) {
    if (this.isValidDOMElement()) {
      this.getDOMElement().style.fontSize = `${fontSize}em`;
      return true;
    }
    return false;
  }

  /**
   * Sets the height of the current DOM element set to this component
   * @param {number} height 
   */
  setHeight(height) {
    if (this.isValidDOMElement()) {
      this.getDOMElement().style.height = `${height}px`;
      return true;
    }
    return false;
  }

  /**
   * Sets the left position of the current DOM element set to this component
   * @param {number} left 
   */
  setLeft(left) {
    if (this.isValidDOMElement()) {
      this.getDOMElement().style.left = `${left}px`;
      return true;
    }
    return false;
  }

  /**
   * Sets the max container height expected for this component
   * @param {number} newMaxContainerHeight
   * @returns {boolean}
   */
  setMaxContainerHeight(newMaxContainerHeight) {
    if (typeof newMaxContainerHeight === 'number') {
      /* Only set a new max container height if a number value is provided */
      this.#maxContainerHeight = newMaxContainerHeight;
      return true;
    }
    return false;
  }

  /**
   * Sets the minimum width of the current DOM element set to this component
   * @param {number} minWidth
   * @returns {boolean}
   */
  setMinWidth(minWidth) {
    if (this.isValidDOMElement()) {
      this.getDOMElement().style.minWidth = `${minWidth}px`;
      return true;
    }
    return false;
  }

  /**
   * Sets the opacity of the current DOM element set to this component
   * @param {number} opacity 
   * @returns {boolean}
   */
  setOpacity(opacity) {
    if (this.isValidDOMElement()) {
      this.getDOMElement().style.opacity = opacity;
      return true;
    }
    return false;
  }

  /**
   * Sets the opacity to a value that marks the DOM element as hidden
   * @returns {boolean}
   */
  setOpacity_Hidden() {
    return this.setOpacity(0);
  }

  /**
   * Sets the opacity to a value that marks the DOM element as visible
   * @returns {boolean}
   */
  setOpacity_Visible() {
    return this.setOpacity(1);
  }

  /**
   * Sets the left side padding of the current DOM element set to this component
   * @param {number} paddingLeft
   * @returns {boolean}
   */
  setPaddingLeft(paddingLeft) {
    if (this.isValidDOMElement()) {
      this.getDOMElement().style.paddingLeft = `${paddingLeft}px`;
      return true;
    }
    return false;
  }

  /**
   * Sets the text alignment to a value that marks the DOM element as being center aligned
   * @returns {boolean}
   */
  setTextAlign_Center() {
    if (this.isValidDOMElement()) {
      this.getDOMElement().style.textAlign = 'center';
      return true;
    }
    return false;
  }

  /**
   * Sets the text content of the current DOM element set to this component
   * @param {string} newTextContent
   * @returns {boolean}
   */
  setTextContent(newTextContent) {
    if (this.isValidDOMElement()) {
      this.getDOMElement().textContent = newTextContent;
      return true;
    }
    return false;
  }

  /**
   * Sets the top position of the current DOM element set to this component
   * @param {number} top
   * @returns {boolean}
   */
  setTop(top) {
    if (this.isValidDOMElement()) {
      this.getDOMElement().style.top = `${top}px`;
      return true;
    }
    return false;
  }

  /**
   * Sets the value for the DOM element currently set to this component
   * @param {string} value
   */
  setValue(value) {
    if (this.isValidDOMElement()) {
      this.getDOMElement().value = value;
    }
  }

  /**
   * Sets the visibility to a value that marks the DOM element as hidden
   * @returns {boolean}
   */
  setVisibility_Hidden() {
    if (this.isValidDOMElement()) {
      this.getDOMElement().style.visibility = 'hidden';
      return true;
    }
    return false;
  }

  /**
   * Sets the visibility to a value that marks the DOM element as visible
   * @returns {boolean}
   */
  setVisibility_Visible() {
    if (this.isValidDOMElement()) {
      this.getDOMElement().style.visibility = 'visible';
      return true;
    }
    return false;
  }

  /**
   * Sets the white space to a value that marks the DOM element as allowing the use of word wrap
   * @returns {boolean}
   */
  setWhiteSpace_Normal() {
    if (this.isValidDOMElement()) {
      this.getDOMElement().style.whiteSpace = 'normal';
      return true;
    }
    return false;
  }

  /**
   * Sets the white space to a value that marks the DOM element as not using word wrap
   * @returns {boolean}
   */
  setWhiteSpace_NoWrap() {
    if (this.isValidDOMElement()) {
      this.getDOMElement().style.whiteSpace = 'nowrap';
      return true;
    }
    return false;
  }

  /**
   * Sets the width of the current DOM element set to this component
   * @param {number} width
   * @returns {boolean}
   */
  setWidth(width) {
    if (this.isValidDOMElement()) {
      this.getDOMElement().style.width = `${width}px`;
      return true;
    }
    return false;
  }

  /**
   * Truncates the components text content based on the container elements height. The height of the text content
   * should not push outside the boundaries of the container element, if it does then it should be shortened / truncated
   * until the text comfortably fits within the height of the container.
   */
  truncateElementTextContentByContainerHeight = () => {
    /* Retrieve the target DOM element and max supported container height value */
    const currentDOMElement = this.getDOMElement();
    const currentMaxContainerHeight = this.getMaxContainerHeight();

    /* Only proceed if both a target DOM element and max supported container height value have been set */
    if (currentDOMElement !== null && currentMaxContainerHeight > 0) {
      let elementDimensions = this.getBoundingClientRect();
      let elementHeight = elementDimensions.height;
      let elementTextContent = currentDOMElement.textContent;
      while (elementTextContent.length > 0 && elementHeight > currentMaxContainerHeight) {
        /* Remove the last character in the string and add three dots to the string end to suggest truncation has occurred */
        elementTextContent = `${elementTextContent.substring(0, elementTextContent.length - 1).trim()}...`;

        /* Set the new text content string and determine the new height of the element */
        currentDOMElement.textContent = elementTextContent;
        elementDimensions = this.getBoundingClientRect();
        elementHeight = elementDimensions.height;
        if (elementHeight > currentMaxContainerHeight) {
          /* Remove the obsolete three dots at the end of the string for the next iteration of the loop */
          elementTextContent = elementTextContent.substring(0, elementTextContent.length - 3).trim();
        }
      }
    }
  }
}
