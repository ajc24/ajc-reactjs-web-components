/**
 * Developed by Anthony Cox in 2024
 */
import { act, cleanup, render } from '@testing-library/react';
import axe from 'axe-core';

/**
 * Test Development module which features a number of functions designed
 * to make unit testing, snapshot testing and accessibility testing much easier
 */
export default class TestDev {
  /**
   * Generates a HTML snapshot as a string for the specified React component
   * @param {React.Component} ReactComponent
   * @returns {string}
   */
  static createSnapshot(ReactComponent) {
    const { container, unmount } = render(ReactComponent);
    const htmlSnapshot = container.innerHTML;
    unmount();
    cleanup();
    return htmlSnapshot;
  }

  /**
   * Generates a HTML snapshot as a string for the specified React component.
   * Handles all timer mocks for any / all setTimeout() functionality used by the component.
   * @param {React.Component} ReactComponent 
   * @returns {string}
   */
  static createSnapshot_UseFakeTimers(ReactComponent) {
    /* Enable fake timers to allow the setTimeout() functionality to be fired correctly */
    jest.useFakeTimers();

    /* Render the component */
    const { container, unmount } = render(ReactComponent);

    act(() => {
      /* Execute all of the timers */
      jest.runAllTimers();
    });
    /* Restore real timers now that all timers used by the component have been executed */
    jest.useRealTimers();

    /* Create the snapshot */
    const htmlSnapshot = container.innerHTML;
    unmount();
    cleanup();
    return htmlSnapshot;
  }

  /**
   * Returns the maximum timeout in milliseconds for accessibility test suites
   * @returns {number}
   */
  static getAxeTestTimeout() {
    return 60000;
  }

  /**
   * Gets the HTML DOM which contains the React component for accessibility testing.
   * Once completed the full HTML content for the current document is returned, intended
   * for use with an accessibility framework.
   * @param {string} htmlTitle 
   * @returns {string}
   */
  static getComponentInHTMLTemplate(htmlTitle = 'Mounted HTML Template') {
    const htmlElement = document.getElementsByTagName('html')[0];
    htmlElement.setAttribute('lang', 'en');
    if (document.getElementsByTagName('title').length === 0) {
      /* Create a title element with the relevant title */
      const titleElement = document.createElement('title');
      titleElement.textContent = htmlTitle;
      /* Append the title element to the head element */
      const headElement = document.getElementsByTagName('head')[0];
      headElement.appendChild(titleElement);
    } else {
      /* Set the title text content to the existing element */
      const titleElement = document.getElementsByTagName('title')[0];
      titleElement.textContent = htmlTitle;
    }
    return document.getElementsByTagName('html')[0].outerHTML;
  }

  /**
   * Renders a React component in the DOM. Handles all timer mocks for any / all
   * setTimeout() functionality used by the component.
   * @param {React.Component} ReactComponent 
   * @returns {function}
   */
  static render_UseFakeTimers(ReactComponent) {
    /* Enable fake timers to allow the setTimeout() functionality to be fired correctly */
    jest.useFakeTimers();

    /* Render the component */
    const { unmount } = render(ReactComponent);

    act(() => {
      /* Execute all of the timers */
      jest.runAllTimers();
    });
    /* Restore real timers now that all timers used by the component have been executed */
    jest.useRealTimers();

    return unmount;
  }

  /**
   * Performs accessibility verifications on the specified HTML specified as a string
   * @param {string} componentHtml 
   * @param {string} levelOneHeadingText 
   * @returns {Promise.<boolean>}
   */
  static async runAxeCore(componentHtml, levelOneHeadingText = undefined) {
    /* Ensure the component html is set to the document html */
    document.querySelector('html').innerHTML = componentHtml.substring(componentHtml.indexOf('<head'), componentHtml.indexOf('</html>'));
    /* Ensure the lang attribute is set to the html element otherwise this can cause false negatives */
    document.querySelector('html').setAttribute('lang', 'en');
    if (levelOneHeadingText !== undefined && typeof levelOneHeadingText === 'string' && levelOneHeadingText !== '') {
      /* Create a level one heading element */
      const levelOneHeadingElement = document.createElement('h1');
      levelOneHeadingElement.textContent = levelOneHeadingText;
      /* Append the level one heading element to the <main> or <div role="main"> elements */
      let mainElement = document.body.querySelector('div[role="main"]');
      if (mainElement === null) {
        mainElement = document.body.querySelector('main');
      }
      if (mainElement !== null) {
        /* Only attempt the append the level one heading if a main element exists in the DOM */
        mainElement.appendChild(levelOneHeadingElement);
      }
    }
    /* Execute the accessibility tests */
    const results = await axe.run();
    let response = true;
    if (results.violations.length > 0) {
      response = false;
      let violationsConsoleLog = '';
      violationsConsoleLog += '\nACCESSIBILITY CHECKS FAILED';
      violationsConsoleLog += '\n---------------------------'
      violationsConsoleLog += '\nThe following HTML DOM contained accessibility violations:';
      violationsConsoleLog += `\n${document.getElementsByTagName('html')[0].outerHTML}`;
      violationsConsoleLog += '\n\nThe following violations were found:';
      violationsConsoleLog += '\n------------------------------------';
      results.violations.map((failure, index) => {
        violationsConsoleLog += `\nViolation ${index + 1} of ${results.violations.length}`;
        violationsConsoleLog += `\nFailure category: ${failure.impact}`;
        violationsConsoleLog += `\nDescription     : ${failure.description}`;
        violationsConsoleLog += `\nHelp            : ${failure.help}`;
        violationsConsoleLog += `\nHelp URL        : ${failure.helpUrl}`;
        violationsConsoleLog += `\nHTML snippet    : ${failure.nodes[0].html}`;
        violationsConsoleLog += `\nTarget element  : ${failure.nodes[0].target}`;
        violationsConsoleLog += '\n';
      });
      console.error(violationsConsoleLog);
    }
    /* Return the response */
    return Promise.resolve(response);
  }
}
