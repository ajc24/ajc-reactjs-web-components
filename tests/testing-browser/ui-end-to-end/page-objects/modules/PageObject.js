/**
 * Developed by Anthony Cox in 2025
 */
import {
  browser,
  debug,
  dom,
  getBaseUrl,
} from '../../';

/**
 * Page object module
 */
class PageObject {
  /**
   * Initialise the page object module
   * @param {string} route
   */
  constructor(route) {
    route !== undefined ? this.url = `${getBaseUrl()}${route}` : this.url = undefined;
  }

  /**
   * Returns the URL assigned to the current page object
   * @returns {string|undefined}
   */
  getUrl() {
    return this.url;
  }

  /**
   * Navigates to the URL set to this page object
   * @returns {Promise.<boolean>}
   */
  async goto() {
    return browser.gotoUrl(this.getUrl());
  }

  /**
   * Abstract / template for common wait for form data to enter error state (invalid form data verifications)
   * @param {{ waitDOM: Array.<Selector|string>, waitTime: number|undefined }} waitData
   * @returns {Promise.<undefined>}
   */
  async waitForFormErrorState_Abstract(waitData) {
    /* Re-use the same functionality from the abstract / template wait for page load function */
    return this.waitForPageLoad_Abstract(waitData);
  }

  /**
   * Abstract / template for common wait for page load functionality
   * @param {{ waitDOM: Array.<Selector|string>, waitTime: number|undefined }} waitData
   */
  async waitForPageLoad_Abstract(waitData) {
    if (waitData.waitTime !== undefined) {
      /* Wait for the specified time before continuing */
      await debug.wait(waitData.waitTime);
    }
    let index = 0;
    while (index < waitData.waitDOM.length) {
      /* Wait for the presence of each individual DOM element */
      await dom.waitForDOMElement(waitData.waitDOM[index]);
      index += 1;
    }
  }
}
export default PageObject;
