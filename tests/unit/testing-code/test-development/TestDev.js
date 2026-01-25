/**
 * Developed by Anthony Cox in 2024
 */
import React, { useEffect, useState } from 'react';
import { render } from '@testing-library/react';
import { TestDev } from '../../../testing-code';

describe('Test Development Helper Class', () => {
  /* Set the expected html templates */
  const expectedCustomHtmlTemplate =
    '<html lang="en"><head><title>Test Title</title></head><body><div><div><p>Hello World</p></div></div></body></html>';
  const expectedDefaultHtmlTemplate =
    '<html lang="en"><head><title>Mounted HTML Template</title></head><body><div><div><p>Hello World</p></div></div></body></html>';
  
    /* Set the React component for use with the test */
  const SimpleComponent = () => {
    return <div><p>Hello World</p></div>;
  };
  
  /* Set the data to be returned by the snapshot test */
  const simpleComponentAsAHTMLString = '<div><p>Hello World</p></div>';

  /* Create a more complex React component for use with the test */
  const ComplexComponent = () => {
    const [ updated, setUpdated ] = useState(false);

    useEffect(() => {
      setTimeout(() => {
        setUpdated(true);
      }, 5000);
    }, []);

    return (
      <div data-updated={`${updated}`}>
        <p>Hello World</p>
      </div>
    );
  };

  /* Set the data to be returned by the snapshot test */
  const complexComponentAsAHTMLString = '<div data-updated="true"><p>Hello World</p></div>';
  
  describe('createSnapshot() method behaviour', () => {
    let htmlSnapshot;

    beforeAll(() => {
      htmlSnapshot = TestDev.createSnapshot(<SimpleComponent />);
    });

    it('verifies that a string value is generated from the React component as expected', () => {
      expect(typeof htmlSnapshot).toBe('string');
    });

    it('verifies that the string value generated from the React component matches the expected string value', () => {
      expect(htmlSnapshot).toStrictEqual(simpleComponentAsAHTMLString);
    });
  });

  describe('createSnapshot_UseFakeTimers() method behaviour', () => {
    let htmlSnapshot;

    beforeAll(() => {
      htmlSnapshot = TestDev.createSnapshot_UseFakeTimers(<ComplexComponent />);
    });

    it('verifies that a string value is generated from the React component as expected', () => {
      expect(typeof htmlSnapshot).toBe('string');
    });

    it('verifies that the string value generated from the React component matches the expected string value', () => {
      expect(htmlSnapshot).toStrictEqual(complexComponentAsAHTMLString);
    });
  });

  describe('getAxeTestTimeout() method behaviour', () => {
    let timeout;

    beforeAll(() => {
      timeout = TestDev.getAxeTestTimeout();
    });

    it('verifies that the timeout value is that of a number', () => {
      expect(typeof timeout).toBe('number');
    });

    it('verifies that the timeout value is a positive number', () => {
      expect(timeout).toBeGreaterThan(0);
    });
  });

  describe('getComponentInHTMLTemplate() method behaviour - Default document title, no pre-existing title element', () => {
    let domHtml;

    beforeAll(() => {
      /* Render the component, get the html dom content and unmount the component again */
      const { unmount } = render(<SimpleComponent />);
      domHtml = TestDev.getComponentInHTMLTemplate();
      unmount();
    });

    it('verifies that the html document has been generated correctly', () => {
      expect(domHtml).toBe(expectedDefaultHtmlTemplate);
    });
  });

  describe('getComponentInHTMLTemplate() method behaviour - Custom document title, pre-existing title element', () => {
    let domHtml;
    let titleElement;

    beforeAll(() => {
      /* Add a custom title element for use with the test */
      if (document.getElementsByTagName('title').length === 0) {
        titleElement = document.createElement('title');
        document.getElementsByTagName('head')[0].appendChild(titleElement);
      } else {
        titleElement = document.getElementsByTagName('title')[0];
      }
      /* Render the component, get the html dom content and unmount the component again */
      const { unmount } = render(<SimpleComponent />);
      domHtml = TestDev.getComponentInHTMLTemplate('Test Title');
      unmount();
    });

    afterAll(() => {
      document.getElementsByTagName('head')[0].removeChild(titleElement);
    });

    it('verifies that the html document has been generated correctly', () => {
      expect(domHtml).toBe(expectedCustomHtmlTemplate);
    });
  });

  describe('render_UseFakeTimers() method behaviour', () => {
    const testData = [];
    let unmount;

    beforeAll(() => {
      unmount = TestDev.render_UseFakeTimers(<ComplexComponent />);

      /* Verifies that the updated version of the component (after all timers are run) is rendered correctly */
      testData.push(document.querySelector('div[data-updated="true"]'));

      /* Verifies that the unmount functionality is generated correctly */
      testData.push(typeof unmount);

      /* Execute the unmount functionality */
      unmount();

      /* Verifies that the component is no longer rendered after invoking the unmount() functionality */
      testData.push(document.querySelector('div[data-updated="true"]'));
    });

    afterAll(() => {
      document.body.innerHTML = '';
    });

    it('verifies that the updated version of the component (after all timers are run) is rendered correctly', () => {
      expect(testData[0]).not.toBeNull();
    });

    it('verifies that the unmount functionality is generated correctly', () => {
      expect(testData[1]).toBe('function');
    });

    it('verifies that the component is no longer rendered after invoking the unmount() functionality', () => {
      expect(testData[2]).toBeNull();
    });
  });

  describe('runAxeCore() method behaviour - Passing component using div role main, no level one heading included, full HTML template', () => {
    let divRoot;
    let results;
    const testTimeout = TestDev.getAxeTestTimeout();

    /* Create the passing component required for the test */
    const PassingComponentUsingDivRoleMain = () => {
      return (
        <div role="main">
          <p>Hello World</p>
        </div>
      );
    };

    beforeAll(async () => {
      /* Create a root div element for the components to be injected to */
      divRoot = document.createElement('div');
      divRoot.setAttribute('id', 'root');

      /* Mount the component and perform accessibility testing on that component */
      const { unmount } = render(<PassingComponentUsingDivRoleMain />, {
        container: document.body.appendChild(divRoot),
      });
      const componentHtml = TestDev.getComponentInHTMLTemplate('Passing Component');
      results = await TestDev.runAxeCore(componentHtml, 'Mock Level One Heading');
      unmount();
    }, testTimeout);

    afterAll(() => {
      /* Clean up the root div element when each test finished */
      const rootDiv = document.querySelector('div[id="root"]');
      if (rootDiv !== null) {
        rootDiv.parentNode.removeChild(rootDiv);
      }
    });

    it('verifies that the component passes the accessibility test', () => {
      expect(results).toBeTruthy();
    });
  });

  describe('runAxeCore() method behaviour - Passing component using main, includes level one heading, not using a HTML template', () => {
    let divRoot;
    let results;
    const testTimeout = TestDev.getAxeTestTimeout();

    /* Create the passing component required for the test */
    const PassingComponentUsingMain = () => {
      return (
        <main>
          <h1>Mock Level One Heading</h1>
          <p>Hello World</p>
        </main>
      );
    };

    beforeAll(async () => {
      /* Create a root div element for the components to be injected to */
      divRoot = document.createElement('div');
      divRoot.setAttribute('id', 'root');

      /* Mount the component and perform accessibility testing on that component */
      const { unmount } = render(<PassingComponentUsingMain />, {
        container: document.body.appendChild(divRoot),
      });
      const componentHtml = TestDev.getComponentInHTMLTemplate('Passing Component');
      results = await TestDev.runAxeCore(componentHtml);
      unmount();
    }, testTimeout);

    afterAll(() => {
      /* Clean up the root div element when each test finished */
      const rootDiv = document.querySelector('div[id="root"]');
      if (rootDiv !== null) {
        rootDiv.parentNode.removeChild(rootDiv);
      }
    });

    it('verifies that the component passes the accessibility test', () => {
      expect(results).toBeTruthy();
    });
  });

  describe('runAxeCore() method behaviour - Failing component not using main, no level one heading included, full HTML template', () => {
    let consoleErrorSpy;
    let divRoot;
    let results;
    const testTimeout = TestDev.getAxeTestTimeout();

    /* Create the failing component required for the test */
    const FailingComponentNotUsingMain = () => {
      return (
        <div>
          <p>Hello World</p>
        </div>
      );
    };

    beforeAll(async () => {
      consoleErrorSpy = jest.spyOn(globalThis.console, 'error').mockImplementation(() => {});

      /* Create a root div element for the components to be injected to */
      divRoot = document.createElement('div');
      divRoot.setAttribute('id', 'root');

      /* Mount the component and perform accessibility testing on that component */
      const { unmount } = render(<FailingComponentNotUsingMain />, {
        container: document.body.appendChild(divRoot),
      });
      const componentHtml = TestDev.getComponentInHTMLTemplate('Failimg Component');
      results = await TestDev.runAxeCore(componentHtml, 'Mock Level One Heading');
      unmount();
    }, testTimeout);

    afterAll(() => {
      consoleErrorSpy.mockRestore();

      /* Clean up the root div element when each test finished */
      const rootDiv = document.querySelector('div[id="root"]');
      if (rootDiv !== null) {
        rootDiv.parentNode.removeChild(rootDiv);
      }
    });

    it('verifies that the component fails the accessibility test', () => {
      expect(results).toBeFalsy();
    });
  });

  describe('runAxeCore() method behaviour - Failing component using main, no level one heading included, not using a HTML template', () => {
    let consoleErrorSpy;
    let divRoot;
    let results;
    const testTimeout = TestDev.getAxeTestTimeout();

    /* Create the failing component required for the test */
    const FailingComponentUsingDivRoleMain = () => {
      return (
        <div role="main">
          <label htmlFor="firstname">First name:</label>
          <input type="text" name="lastname" id="lastname" />
        </div>
      );
    };

    beforeAll(async () => {
      consoleErrorSpy = jest.spyOn(globalThis.console, 'error').mockImplementation(() => {});

      /* Create a root div element for the components to be injected to */
      divRoot = document.createElement('div');
      divRoot.setAttribute('id', 'root');

      /* Mount the component and perform accessibility testing on that component */1
      const { unmount } = render(<FailingComponentUsingDivRoleMain />, {
        container: document.body.appendChild(divRoot),
      });
      const componentHtml = TestDev.getComponentInHTMLTemplate('Failing Component');
      results = await TestDev.runAxeCore(componentHtml, 'Mock Level One Heading');
      unmount();
    }, testTimeout);

    afterAll(() => {
      consoleErrorSpy.mockRestore();

      /* Clean up the root div element when each test finished */
      const rootDiv = document.querySelector('div[id="root"]');
      if (rootDiv !== null) {
        rootDiv.parentNode.removeChild(rootDiv);
      }
    });

    it('verifies that the component fails the accessibility test', () => {
      expect(results).toBeFalsy();
    });
  });
});
