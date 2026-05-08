/**
 * Developed by Anthony Cox in 2025
 */
import { ClientFunction, Selector, t as controller } from 'testcafe';
import { screen, within } from '@testing-library/testcafe'

/* Data to be used by the controller class */
const customDOMProperties = {
  innerHTML: element => element.innerHTML,
  outerHTML: element => element.outerHTML,
};

/**
 * Determines whether the data provided is of the data type "string" or not
 * @param {any} data 
 * @returns {boolean}
 */
const isString = data => typeof data === 'string';

/**
 * Controller class which abstracts the TestCafe APIs away from the rest of
 * the end to end testing framework
 */
class Controller {
  /**
   * Initialise the controller module
   */
  constructor() {}

  /**
   * Navigates back one page in the browser
   */
  async browserGoBack() {
    const back = ClientFunction(() => {
      window.history.back();
    });
    await back();
  }

  /**
   * Navigates forward one page in the browser
   */
  async browserGoForward() {
    const forward = ClientFunction(() => {
      window.history.forward();
    });
    await forward();
  }

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
   * @param {{ speed: number }} clickOptions
   */
  async click(selectorData, clickOptions = {}) {
    const selectorInstance = await this.waitForDOMSelector(selectorData);
    if (clickOptions.speed === undefined) {
      /* Default to a full speed click action on the selector */
      clickOptions.speed = 1;
    }
    await controller.click(selectorInstance, clickOptions);
  }

  /**
   * Counts the number of Selector instances are in the DOM matching to the target DOM element
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
  async countNumberOfSelectors(selectorData) {
    const allSelectorInstances = await this.waitForDOMSelector(selectorData);
    return allSelectorInstances.count;
  }

  /**
   * Enables debug mode during test script execution
   */
  async debug() {
    await controller.debug();
  }

  /**
   * Verifies if the full data provided contains the specified search data or not
   * @param {Array.<any>|JSON|string} fullData 
   * @param {Array.<any>|JSON|string} searchData
   * @param {string} failureMessage
   */
  async expect_contains(fullData, searchData, failureMessage) {
    await controller.expect(fullData).contains(searchData, failureMessage);
  }

  /**
   * Verifies if the expected data and actual data are strictly equal
   * @param {any} expectedData 
   * @param {any} actualData
   * @param {string} failureMessage
   */
  async expect_equal(expectedData, actualData, failureMessage) {
    await controller.expect(actualData).eql(expectedData, failureMessage);
  }

  /**
   * Verifies if the actual data is set to a false value
   * @param {any} actualData
   * @param {string} failureMessage
   */
  async expect_false(actualData, failureMessage) {
    await controller.expect(actualData).notOk(failureMessage);
  }

  /**
   * Verifies if the actual data is set to a true value
   * @param {any} actualData
   * @param {string} failureMessage
   */
  async expect_true(actualData, failureMessage) {
    await controller.expect(actualData).ok(failureMessage);
  }

  /**
   * Retrieves the title set to the current page rendered in the browser
   * @returns {Promise.<string|undefined>}
   */
  async getBrowserDocumentTitle() {
    const getDocumentTitle = ClientFunction(() => {
      return document.title;
    });
    let documentTitle;
    try {
      documentTitle = await getDocumentTitle();
    } catch {
      documentTitle = undefined;
    }
    return documentTitle;
  }

  /**
   * Determines the href / URL of the currently open web page in the browser
   * @returns {Promise.<string|null>}
   */
  async getBrowserWindowHref() {
    const getWindowHref = ClientFunction(() => {
      return window.location.href;
    });
    let href;
    try {
      href = await getWindowHref();
    } catch {
      href = null;
    }
    return href;
  }

  /**
   * Retrieves the Selector instance of the specified target DOM element
   * @param {{ source: string, waitForDOMElement: boolean, withData: { timeout: number|undefined } }|Selector} selectorData
   * @returns {Promise.<Selector>}
   */
  async getSelector(selectorData) {
    if (selectorData.source) {
      /* A CSS selector path has been supplied - get the Selector instance of the DOM element */
      const selector = Selector(selectorData.source).addCustomDOMProperties(customDOMProperties).with(selectorData.withData || {});
      const parameterizedSelector = await selector();
      if (parameterizedSelector === null && selectorData.waitForDOMElement) {
        const pageTitle = await this.getBrowserDocumentTitle();
        const currentUrl = await this.getBrowserWindowHref();
        const message = `The DOM element with the specified CSS selector path could not be located.\n`
          + `\nCSS Selector Path: ${selectorData.source}`
          + `\nPage Title       : ${pageTitle}`
          + `\nCurrent URL      : ${currentUrl}\n\n`;
        throw new Error(message);
      }
      if (selectorData.withData && selectorData.withData.timeout && selectorData.waitForDOMElement === false) {
        /* If these parameters are set, this means that a "getElementIfInTheDOM" functionality is being performed */
        return parameterizedSelector;
      }
      return selector;
    }
    /* The selector data in this case is a Selector instance, return the Selector instance as-is */
    return selectorData;
  }

  /**
   * Retrieves the Selector instance of the target DOM element at the specified index position
   * @param {Array.<Selector>|Selector} allSelectorInstances
   * @param {number} indexPosition 
   * @returns {Promise.<Selector|null>}
   */
  async getSelectorAtIndexPosition(allSelectorInstances, index = 0) {
    const numberOfSelectorInstances = await this.countNumberOfSelectors(allSelectorInstances);
    if (numberOfSelectorInstances === 0 || index >= numberOfSelectorInstances) {
      /* If no elements were found or if the requested index is out of bounds of the number of elements found, return null */
      return null;
    }
    /* Return the target selector */
    return allSelectorInstances.nth(index);
  }

  /**
   * Retrieves the Selector instance of the target DOM element matching to the specified role data.
   * @param {{ index: number, label: string, waitForDOMElement: boolean, withData: { timeout: number|undefined } }} selectorData
   * @returns {Promise.<Selector>}
   */
  async getSelectorByLabelText(selectorData) {
    let selector;
    const selectorLabel = new RegExp(selectorData.label, 'i');
    if (typeof selectorData.index === 'number') {
      /* If an index is specified, this means more than one element is expected to be found - use the getAllByLabelText query */
      selector = screen.getAllByLabelText(selectorLabel).addCustomDOMProperties(customDOMProperties).with(selectorData.withData || {});
    } else {
      /* Perform a standard getByLabelText query to find the target element as only one element is expected to be found */
      selector = screen.getByLabelText(selectorLabel).addCustomDOMProperties(customDOMProperties).with(selectorData.withData || {});
    }
    if (selectorData.waitForDOMElement) {
      try {
        /* We are waiting for the DOM element and expecting it to be found - if it does not succeed then fail the test with an appropriate error message */
        await selector();
      } catch {
        const pageTitle = await this.getBrowserDocumentTitle();
        const currentUrl = await this.getBrowserWindowHref();
        const message = `The DOM element with the specified label text data could not be located.\n`
          + `\nLabel Text Data  : ${JSON.stringify(selectorData)}`
          + `\nPage Title       : ${pageTitle}`
          + `\nCurrent URL      : ${currentUrl}\n\n`;
        throw new Error(message);
      }
    } else {
      try {
        /* Attempt to wait for the selector in the DOM - if it does not succeed then we have a null Selector */
        await selector();
      } catch {
        /* The selector could not be found in the DOM - set it to null */
        selector = null;
      }
    }
    if (selector !== null) {
      const targetSelectorIndex = selectorData.index || 0;
      return this.getSelectorAtIndexPosition(selector, targetSelectorIndex);
    }
    return selector;
  }

  /**
   * Retrieves the Selector instance of the target DOM element matching to the specified role data.
   * @param {{ index: number, name: string, role: string, waitForDOMElement: boolean, withData: { timeout: number|undefined } }} selectorData
   * @returns {Promise.<Selector>}
   */
  async getSelectorByRole(selectorData) {
    let selector;
    const selectorName = new RegExp(selectorData.name, 'i');
    if (typeof selectorData.index === 'number') {
      /* If an index is specified, this means more than one element is expected to be found - use the getAllByRole query */
      selector = screen.getAllByRole(selectorData.role, { name: selectorName }).addCustomDOMProperties(customDOMProperties).with(selectorData.withData || {});
    } else {
      /* Perform a standard getByRole query to find the target element as only one element is expected to be found */
      selector = screen.getByRole(selectorData.role, { name: selectorName }).addCustomDOMProperties(customDOMProperties).with(selectorData.withData || {});
    }
    if (selectorData.waitForDOMElement) {
      try {
        /* We are waiting for the DOM element and expecting it to be found - if it does not succeed then fail the test with an appropriate error message */
        await selector();
      } catch {
        const pageTitle = await this.getBrowserDocumentTitle();
        const currentUrl = await this.getBrowserWindowHref();
        const message = `The DOM element with the specified role data could not be located.\n`
          + `\nSelector Data    : ${JSON.stringify(selectorData)}`
          + `\nPage Title       : ${pageTitle}`
          + `\nCurrent URL      : ${currentUrl}\n\n`;
        throw new Error(message);
      }
    } else {
      try {
        /* Attempt to wait for the selector in the DOM - if it does not succeed then we have a null Selector */
        await selector();
      } catch {
        /* The selector could not be found in the DOM - set it to null */
        selector = null;
      }
    }
    if (selector !== null) {
      const targetSelectorIndex = selectorData.index || 0;
      return this.getSelectorAtIndexPosition(selector, targetSelectorIndex);
    }
    return selector;
  }

  /**
   * Retrieves the checked (selected / de-selected) status of the target DOM element
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
  async getSelectorChecked(selectorData) {
    const selectorInstance = await this.waitForDOMSelector(selectorData);
    let selectorChecked;
    try {
      selectorChecked = await selectorInstance.checked;
    } catch {
      selectorChecked = false;
    }
    return selectorChecked;
  }

  /**
   * Determines if the specified target DOM element exists in the DOM or not
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
  async getSelectorExists(selectorData) {
    const selectorInstance = await this.waitForDOMSelector(selectorData);
    let selectorExists;
    try {
      selectorExists = selectorInstance.exists;
    } catch {
      selectorExists = false;
    }
    return selectorExists;
  }

  /**
   * Retrieves the text content from the target DOM element
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
  async getSelectorTextContent(selectorData) {
    const selectorInstance = await this.waitForDOMSelector(selectorData);
    const selectorTextContent = await selectorInstance.textContent;
    return selectorTextContent.trim();
  }

  /**
   * Retrieves the value of the target DOM element or returns null
   * if there is no value set to that element
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
  async getSelectorValue(selectorData) {
    const selectorInstance = await this.waitForDOMSelector(selectorData);
    let selectorValue;
    try {
      selectorValue = await selectorInstance.value;
    } catch {
      selectorValue = null;
    }
    return selectorValue;
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
   * @param {number} selectorTimeout 
   * @returns {Promise.<Selector|null>}
   */
  async getSelectorWithTimeout(selectorData, selectorTimeout = 30000) {
    selectorData.withData = { timeout: selectorTimeout };
    return this.waitForDOMSelector(selectorData);
  }

  /**
   * Retrieves the Selector instance of the target DOM element which is expected to be rendered within the source Selector instance.
   * @param {Selector} sourceSelector
   * @param {{ index: number, name: string, role: string, waitForDOMElement: boolean, withData: { timeout: number|undefined } }} childSelectorData
   * @returns {Promise.<Selector>}
   */
  async getSelectorWithinByRole(sourceSelector, childSelectorData) {
    let withinSelectorInstance;
    const childSelectorName = new RegExp(childSelectorData.name, 'i');
    if (typeof childSelectorData.index === 'number') {
      /* If an index is specified, this means more than one element is expected to be found - use the getAllByRole query */
      withinSelectorInstance = within(sourceSelector).getAllByRole(childSelectorData.role, { name: childSelectorName }).addCustomDOMProperties(customDOMProperties).with(childSelectorData.withData || {});
    } else {
      /* Perform a standard getByRole query to find the target element as only one element is expected to be found */
      withinSelectorInstance = within(sourceSelector).getByRole(childSelectorData.role, { name: childSelectorName }).addCustomDOMProperties(customDOMProperties).with(childSelectorData.withData || {});
    }
    if (childSelectorData.waitForDOMElement) {
      try {
        /* We are waiting for the DOM element and expecting it to be found - if it does not succeed then fail the test with an appropriate error message */
        await withinSelectorInstance();
      } catch {
        const pageTitle = await this.getBrowserDocumentTitle();
        const currentUrl = await this.getBrowserWindowHref();
        const message = `The target child element within the source parent element and with the specified role data could not be located.\n`
          + `\nRole Data        : ${JSON.stringify(childSelectorData)}`
          + `\nPage Title       : ${pageTitle}`
          + `\nCurrent URL      : ${currentUrl}\n\n`;
        throw new Error(message);
      }
    } else {
      try {
        /* Attempt to wait for the selector in the DOM - if it does not succeed then we have a null Selector */
        await withinSelectorInstance();
      } catch {
        /* The selector could not be found in the DOM - set it to null */
        withinSelectorInstance = null;
      }
    }
    if (withinSelectorInstance !== null) {
      const targetSelectorIndex = childSelectorData.index || 0;
      return this.getSelectorAtIndexPosition(withinSelectorInstance, targetSelectorIndex);
    }
    return withinSelectorInstance;
  }

  /**
   * Maximizes the currently open browser window
   * @returns {Promise.<boolean>}
   */
  async maximizeBrowserWindow() {
    let isWindowMaximized;
    try {
      /* First attempt to maximize the browser window */
      await controller.maximizeWindow();
      isWindowMaximized = true;
    } catch {
      /* First attempt to maximize the browser window failed */
      isWindowMaximized = false;
    }

    /* If for any reason the browser does not maximize the first time, attempt to do so again */
    if (isWindowMaximized === false) {
      await this.refreshBrowserWindow();
      await controller.maximizeWindow();
      isWindowMaximized = true;
    }
    return isWindowMaximized;
  }

  /**
   * Navigates to the specified target URL in the browser
   * @param {string} targetUrl
   * @returns {Promise.<boolean>}
   */
  async navigate(targetUrl) {
    const currentUrl = await this.getBrowserWindowHref();
    let performedNavigation = false;
    if (currentUrl !== targetUrl) {
      /* Only navigate to the target URL if the current page in the browser is not there already */
      await controller.navigateTo(targetUrl);
      performedNavigation = true;
    }
    return performedNavigation;
  }

  /**
   * Refreshes the currently open page in the browser
   */
  async refreshBrowserWindow() {
    const refresh = ClientFunction(() => {
      window.location.reload(true);
    });
    await refresh();
  }

  /**
   * Types text into the specified target selector and appends the text content
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
  async typeText(selectorData, text, typeOptions = {}) {
    const selectorInstance = await this.waitForDOMSelector(selectorData);
    await controller.typeText(selectorInstance, text, typeOptions);
  }

  /**
   * Types text into the specified target selector and replaces all existing text content
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
  async typeTextReplace(selectorData, text) {
    const selectorInstance = await this.waitForDOMSelector(selectorData);
    await this.typeText(selectorInstance, text, { replace: true });
  }

  /**
   * Pauses the currently executing test script for the specified time of milliseconds
   * @param {number} waitTime
   */
  async wait(waitTime = 5000) {
    await controller.wait(waitTime);
  }

  /**
   * Waits for the target DOM element / Selector to be present within the source Selector instance and in the DOM
   * @param {Selector} sourceSelector
   * @param {{
   *  index: number,
   *  name: string,
   *  role: string,
   *  waitForDOMElement: boolean,
   *  withData: { timeout: number|undefined } }
   *  |Selector
   * } childSelectorData
   * @returns {Promise.<Selector|null>}
   */
  async waitForDOMSelector_Within(sourceSelector, childSelectorData) {
    if (childSelectorData.role) {
      return this.getSelectorWithinByRole(sourceSelector, childSelectorData);
    }
    return null;
  }

  /**
   * Waits for the target DOM element / Selector to be present in the DOM
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
   * @returns {Promise.<Selector|null>}
   */
  async waitForDOMSelector(selectorData) {
    if (selectorData.role) {
      /* The Selector is to be found using the getByRole query */
      return this.getSelectorByRole(selectorData);
    } else if (selectorData.label) {
      /* The Selector is to be found using the getByLabelText query */
      return this.getSelectorByLabelText(selectorData);
    } else if (selectorData.source) {
      /* The Selector is to be found using a CSS selector path */
      return this.getSelector(selectorData);
    }
    /* If we reach this point in the functionality, the Selector is presumed to already be a Selector instance */
    return selectorData;
  }
}
export default Controller;
