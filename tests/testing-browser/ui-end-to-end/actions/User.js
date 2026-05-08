/**
 * Developed by Anthony Cox in 2025
 */
import { controller } from '../controllers';
import { dom } from '../'

/**
 * Automated user interactions for use in test scripts
 */
class User {
  /**
   * Initialise the user module
   */
  constructor() {}

  /**
   * Clicks on the specified target DOM element. Optionally this action can be performed using custom click options.
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
   * @param {JSON} clickOptions
   */
  async click(selectorData, clickOptions = {}) {
    await controller.click(selectorData, clickOptions);
  }

  /**
   * Types the specified text content into the target DOM element, replacing any existing text
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
   * @param {string} text
   */
  async typeTextClear(selectorData, text) {
    await controller.typeTextReplace(selectorData, text);
  }
}
export default User;
