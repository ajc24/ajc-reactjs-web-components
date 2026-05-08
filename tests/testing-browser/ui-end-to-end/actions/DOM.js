/**
 * Developed by Anthony Cox in 2025
 */
import { controller } from '../controllers';

/**
 * Automated browser DOM interactions for use in test scripts
 */
class DOM {
  /**
   * Initialise the dom module
   */
  constructor() {}

  /**
   * Counts the number of matching DOM elements to the specified target DOM element
   * @param {{
   *  index: number,
   *  label: string,
   *  name: string,
   *  role: string,
   *  source: string,
   *  waitForDOMElement: boolean,
   *  withData: { timeout: number|undefined } }
   *  |Selector
   * } selectorData 
   * @returns {Promise.<number>}
   */
  async countNumberOfDOMElements(selectorData) {
    return controller.countNumberOfSelectors(selectorData);
  }

  /**
   * Retrieves the Selector instance identified by the specified target DOM element
   * and at the specified index position
   * @param {{
   *  index: number,
   *  label: string,
   *  name: string,
   *  role: string,
   *  source: string,
   *  waitForDOMElement: boolean,
   *  withData: { timeout: number|undefined } }
   *  |Selector
   * } selectorData
   * @param {number} indexPosition 
   * @returns {Promise.<Selector>}
   */
  async getElementAtIndexPosition(selectorData, indexPosition) {
    return controller.getSelectorAtIndexPosition(selectorData, indexPosition);
  }

  /**
   * Attempts to get the Selector instance of the target DOM element if it exists in the DOM. If the
   * element is not found within the timeout specified, a null value will be returned instead.
   * @param {{
   *  index: number,
   *  label: string,
   *  name: string,
   *  role: string,
   *  source: string,
   *  waitForDOMElement: boolean,
   *  withData: { timeout: number|undefined } }
   *  |Selector
   * } selectorData
   * @param {number} elementTimeout 
   * @returns {Promise.<Selector|null>}
   */
  async getElementIfInTheDOM(selectorData, elementTimeout = 1000) {
    selectorData.waitForDOMElement = false;
    return controller.getSelectorWithTimeout(selectorData, elementTimeout);
  }

  /**
   * Retrieves the text content from the specified DOM element
   * @param {{
   *  index: number,
   *  label: string,
   *  name: string,
   *  role: string,
   *  source: string,
   *  waitForDOMElement: boolean,
   *  withData: { timeout: number|undefined } }
   *  |Selector
   * } selectorData
   * @returns {Promise.<string>}
   */
  async getElementTextContent(selectorData) {
    return controller.getSelectorTextContent(selectorData);
  }

  /**
   * Retrieves the value set to the specified DOM element
   * @param {{
   *  index: number,
   *  label: string,
   *  name: string,
   *  role: string,
   *  source: string,
   *  waitForDOMElement: boolean,
   *  withData: { timeout: number|undefined } }
   *  |Selector
   * } selectorData
   * @returns {Promise.<string|null>}
   */
  async getElementValue(selectorData) {
    return controller.getSelectorValue(selectorData);
  }

  /**
   * Determines whether the specified checkbox element is marked
   * as selected (true) or de-selected (false)
   * @param {{
   *  index: number,
   *  label: string,
   *  name: string,
   *  role: string,
   *  source: string,
   *  waitForDOMElement: boolean,
   *  withData: { timeout: number|undefined } }
   *  |Selector
   * } selectorData
   * @returns {Promise.<boolean>}
   */
  async isCheckboxSelected(selectorData) {
    return controller.getSelectorChecked(selectorData);
  }

  /**
   * Determines whether the specified DOM element is in the DOM or not
   * @param {{
   *  index: number,
   *  label: string,
   *  name: string,
   *  role: string,
   *  source: string,
   *  waitForDOMElement: boolean,
   *  withData: { timeout: number|undefined } }
   *  |Selector
   * } selectorData
   * @returns {Promise.<boolean>}
   */
  async isElementInTheDOM(selectorData) {
    const domElement = await this.getElementIfInTheDOM(selectorData);
    return domElement !== null;
  }

  /**
   * Waits for the specified DOM element to be present in the DOM and returns the
   * found Selector instance of that DOM element
   * @param {{
   *  index: number,
   *  label: string,
   *  name: string,
   *  role: string,
   *  source: string,
   *  waitForDOMElement: boolean,
   *  withData: { timeout: number|undefined } }
   *  |Selector
   * } selectorData
   * @returns {Promise.<Selector>}
   */
  async waitForDOMElement(selectorData) {
    return controller.waitForDOMSelector(selectorData);
  }

  /**
   * Waits for the specified DOM element, expected to be located within the parent element, to be present in the DOM
   * and returns the found Selector instance of that DOM element
   * @param {{
   *  index: number,
   *  label: string,
   *  name: string,
   *  role: string,
   *  source: string,
   *  waitForDOMElement: boolean,
   *  withData: { timeout: number|undefined } }
   *  |Selector
   * } parentSelectorData
   * @param {{ index: number, label: string, name: string, role: string, waitForDOMElement: boolean, withData: { timeout: number|undefined } }|Selector} childSelectorData 
   * @returns {Promise.<Selector|null>}
   */
  async waitForDOMElement_Within(parentSelectorData, childSelectorData) {
    const parentSelector = await this.waitForDOMElement(parentSelectorData);
    return controller.waitForDOMSelector_Within(parentSelector, childSelectorData);
  }
}
export default DOM;
