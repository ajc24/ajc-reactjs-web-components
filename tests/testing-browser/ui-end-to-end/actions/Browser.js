/**
 * Developed by Anthony Cox in 2025
 */
import { controller } from '../controllers';

/**
 * Automated browser actions for use in test scripts
 */
class Browser {
  /**
   * Initialise the browser module
   */
  constructor() {}

  /**
   * Gets the current URL from the current browser session
   * @returns {Promise.<string|null>}
   */
  async getCurrentUrl() {
    return controller.getBrowserWindowHref();
  }

  /**
   * Retrieves the title of the page currently rendered in the browser window
   * @returns {Promise.<string|undefined>}
   */
  async getDocumentTitle() {
    return controller.getBrowserDocumentTitle();
  }

  /**
   * Navigates back one page in the current browser session
   * @returns {Promise.<undefined>}
   */
  async goBack() {
    return controller.browserGoBack();
  }

  /**
   * Navigates forwards one page in the current browser session
   * @returns {Promise.<undefined>}
   */
  async goForward() {
    return controller.browserGoForward();
  }

  /**
   * Navigates to the specified URL in the current browser session
   * @param {string} targetUrl
   * @returns {Promise.<boolean>}
   */
  async gotoUrl(targetUrl) {
    return controller.navigate(targetUrl);
  }

  /**
   * Maximizes the current browser window
   * @returns {Promise.<boolean>}
   */
  async maximize() {
    return controller.maximizeBrowserWindow();
  }

  /**
   * Refreshes the currently open browser window
   * @returns {Promise.<undefined>}
   */
  async refresh() {
    return controller.refreshBrowserWindow();
  }
}
export default Browser;
