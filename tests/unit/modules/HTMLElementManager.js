/**
 * Developed by Anthony Cox in 2025
 */
import { HTMLElementManager } from '../../../components/modules';

describe('HTML Element Manager module', () => {

  /* Create the mock data to be set to the mock DOM element */
  const mockAriaLabel = 'This is a mock aria label.';
  const mockBottom = 575;
  const mockHeight = 570;
  const mockId = 'mock-html-element-id';
  const mockLeft = 5;
  const mockRight = 1005;
  const mockTextContent = 'Mock Element Text Content';
  const mockTop = 5;
  const mockWidth = 1000;

  const validBoundingClientRect = {
    bottom: mockBottom,
    height: mockHeight,
    left: mockLeft,
    right: mockRight,
    top: mockTop,
    width: mockWidth,
  };

  /* Create the mock DOM elements for use in the tests */
  const testButtonElement = document.createElement('button');
  testButtonElement.setAttribute('aria-label', mockAriaLabel);
  testButtonElement.setAttribute('id', mockId);

  const testInputElement = document.createElement('input');

  /* Create the instances of the HTML manager module to be used in tests */
  const noElementsManager = new HTMLElementManager();

  const domElementManager = new HTMLElementManager();
  domElementManager.setDOMElement(testButtonElement);
  domElementManager.setDOMElements([]);

  const domElementsManager = new HTMLElementManager();
  domElementsManager.setDOMElements([ testButtonElement, testInputElement ]);

  describe('click(): null DOM element set', () => {

    it('verifies that the response from the click functionality indicates that no action has been carried out', () => {
      expect(noElementsManager.click()).toBeFalsy();
    });
  });

  describe('click(): valid DOM element set', () => {
    let clickSpy;
    const testResults = [];

    beforeAll(() => {
      /* Set the DOM element to the module under test */
      clickSpy = jest.spyOn(testButtonElement, 'click');
      
      /* Verifies that the response from the click functionality indicates that an action has been carried out */
      testResults.push(domElementManager.click());

      /* Verifies that the DOM elements click functionality is executed */
      testResults.push(clickSpy.mock.calls.length);
    });

    afterAll(() => {
      clickSpy.mockRestore();
    });
    
    it('verifies that the response from the click functionality indicates that an action has been carried out', () => {
      expect(testResults[0]).toBeTruthy();
    });

    it('verifies that the DOM elements click functionality is executed', () => {
      expect(testResults[1]).toBe(1);
    });
  });

  describe('focus(): null DOM element set', () => {
    
    it('verifies that the response from the focus functionality indicates that no action has been carried out', () => {
      expect(noElementsManager.focus()).toBeFalsy();
    });
  });

  describe('focus(): valid DOM element set', () => {
    let focusSpy;
    const testResults = [];

    beforeAll(() => {
      /* Set the DOM element to the module under test */
      focusSpy = jest.spyOn(testButtonElement, 'focus');
      
      /* Verifies that the response from the focus functionality indicates that an action has been carried out */
      testResults.push(domElementManager.focus());

      /* Verifies that the DOM elements focus functionality is executed */
      testResults.push(focusSpy.mock.calls.length);
    });

    afterAll(() => {
      focusSpy.mockRestore();
    });

    it('verifies that the response from the focus functionality indicates that an action has been carried out', () => {
      expect(testResults[0]).toBeTruthy();
    });

    it('verifies that the DOM elements focus functionality is executed', () => {
      expect(testResults[1]).toBe(1);
    });
  });

  describe('getAriaLabel(): null DOM element set', () => {
    
    it('verifies that the getAriaLabel functionality returns an empty string', () => {
      expect(noElementsManager.getAriaLabel()).toBe('');
    });
  });

  describe('getAriaLabel(): valid DOM element set', () => {
    
    it('verifies that the getAriaLabel functionality returns the expected "aria-label" attribute value', () => {
      expect(domElementManager.getAriaLabel()).toBe(mockAriaLabel);
    });
  });

  describe('getBoundingClientRect(): null DOM element set', () => {
    const nullDOMElementResponse = {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
    };

    it('verifies that the correct dimensions are returned for a null DOM element', () => {
      expect(noElementsManager.getBoundingClientRect()).toStrictEqual(nullDOMElementResponse);
    });
  });

  describe('getBoundingClientRect(): valid DOM element set', () => {
    let boundingClientRectSpy;

    beforeAll(() => {
      boundingClientRectSpy = jest.spyOn(testButtonElement, 'getBoundingClientRect')
        .mockImplementation(() => { return validBoundingClientRect });
    });

    afterAll(() => {
      boundingClientRectSpy.mockRestore();
    });
    
    it('verifies that the correct dimensions are returned for a valid DOM element', () => {
      expect(domElementManager.getBoundingClientRect()).toStrictEqual(validBoundingClientRect);
    });
  });

  describe('getData(): null DOM element set', () => {
    
    it('verifies that the getData functionality returns an empty string', () => {
      expect(noElementsManager.getData()).toBe('');
    });
  });

  describe('getData(): valid DOM element set, undefined dataset', () => {
    
    it('verifies that the getData functionality returns an empty string', () => {
      expect(domElementManager.getData()).toBe('');
    });
  });

  describe('getData(): valid DOM element set, undefined dataset target', () => {

    beforeAll(() => {
      testButtonElement.setAttribute('data-test', 'value-set');
    });

    afterAll(() => {
      testButtonElement.removeAttribute('data-test');
    });
    
    it('verifies that the getData functionality returns an empty string', () => {
      expect(domElementManager.getData('test1')).toBe('');
    });
  });

  describe('getData(): valid DOM element set, valid dataset target', () => {
    const dataAttributeValue = 'value-set';

    beforeAll(() => {
      testButtonElement.setAttribute('data-test', dataAttributeValue);
    });

    afterAll(() => {
      testButtonElement.removeAttribute('data-test');
    });
    
    it('verifies that the getData functionality returns an empty string', () => {
      expect(domElementManager.getData('test')).toBe(dataAttributeValue);
    });
  });

  describe('getData_Boolean(): null DOM element set', () => {
    
    it('verifies that the getData_Boolean functionality returns a false response', () => {
      expect(noElementsManager.getData_Boolean()).toBeFalsy();
    });
  });

  describe('getData_Boolean(): valid DOM element set, valid dataset target with empty string value set', () => {
    const dataAttributeValue = '';

    beforeAll(() => {
      testButtonElement.setAttribute('data-test', dataAttributeValue);
    });

    afterAll(() => {
      testButtonElement.removeAttribute('data-test');
    });
    
    it('verifies that the getData_Boolean functionality returns a false response', () => {
      expect(domElementManager.getData_Boolean('test')).toBeFalsy();
    });
  });

  describe('getData_Boolean(): valid DOM element set, valid dataset target with "false" string value set', () => {
    const dataAttributeValue = 'false';

    beforeAll(() => {
      testButtonElement.setAttribute('data-test', dataAttributeValue);
    });

    afterAll(() => {
      testButtonElement.removeAttribute('data-test');
    });
    
    it('verifies that the getData_Boolean functionality returns a false response', () => {
      expect(domElementManager.getData_Boolean('test')).toBeFalsy();
    });
  });

  describe('getData_Boolean(): valid DOM element set, valid dataset target with "true" string value set', () => {
    const dataAttributeValue = 'true';

    beforeAll(() => {
      testButtonElement.setAttribute('data-test', dataAttributeValue);
    });

    afterAll(() => {
      testButtonElement.removeAttribute('data-test');
    });
    
    it('verifies that the getData_Boolean functionality returns a true response', () => {
      expect(domElementManager.getData_Boolean('test')).toBeTruthy();
    });
  });

  describe('getData_Number_Integer(): null DOM element set', () => {
    
    it('verifies that the getData_Number_Integer functionality returns a negative integer response', () => {
      expect(noElementsManager.getData_Number_Integer()).toBe(-1);
    });
  });

  describe('getData_Number_Integer(): valid DOM element set, valid dataset target with empty string value set', () => {
    const dataAttributeValue = '';

    beforeAll(() => {
      testButtonElement.setAttribute('data-test', dataAttributeValue);
    });

    afterAll(() => {
      testButtonElement.removeAttribute('data-test');
    });
    
    it('verifies that the getData_Number_Integer functionality returns a negative integer response', () => {
      expect(domElementManager.getData_Number_Integer('test')).toBe(-1);
    });
  });

  describe('getData_Number_Integer(): valid DOM element set, valid dataset target with valid value set', () => {

    beforeAll(() => {
      testButtonElement.setAttribute('data-test', '15');
    });

    afterAll(() => {
      testButtonElement.removeAttribute('data-test');
    });
    
    it('verifies that the getData_Number_Integer functionality returns a positive integer response', () => {
      expect(domElementManager.getData_Number_Integer('test')).toBe(15);
    });
  });

  describe('getData_String(): valid DOM element set, valid dataset target', () => {
    const dataAttributeValue = 'test return value';

    beforeAll(() => {
      testButtonElement.setAttribute('data-test', dataAttributeValue);
    });

    afterAll(() => {
      testButtonElement.removeAttribute('data-test');
    });
    
    it('verifies that the getData_String functionality returns the expected attribute value', () => {
      expect(domElementManager.getData_String('test')).toBe(dataAttributeValue);
    });
  });

  describe('getDOMElements_Count(): null DOM elements set', () => {

    it('verifies that the getDOMElements_Count functionality returns the expected count value', () => {
      expect(noElementsManager.getDOMElements_Count()).toBe(0);
    });
  });

  describe('getDOMElements_Count(): valid DOM elements set', () => {

    it('verifies that the getDOMElements_Count functionality returns the expected count value', () => {
      expect(domElementsManager.getDOMElements_Count()).toBe(2);
    });
  });

  describe('getDOMElements_FirstIndex(): null DOM elements set', () => {

    it('verifies that the getDOMElements_FirstIndex functionality returns a null response', () => {
      expect(noElementsManager.getDOMElements_FirstIndex()).toBeNull();
    });
  });

  describe('getDOMElements_FirstIndex(): valid DOM elements set', () => {

    it('verifies that the getDOMElements_FirstIndex functionality returns the expected HTMLElement instance', () => {
      expect(domElementsManager.getDOMElements_FirstIndex()).toStrictEqual(testButtonElement);
    });
  });

  describe('getDOMElements_LastIndex(): null DOM elements set', () => {

    it('verifies that the getDOMElements_LastIndex functionality returns a null response', () => {
      expect(noElementsManager.getDOMElements_LastIndex()).toBeNull();
    });
  });

  describe('getDOMElements_LastIndex(): valid DOM elements set', () => {

    it('verifies that the getDOMElements_LastIndex functionality returns the expected HTMLElement instance', () => {
      expect(domElementsManager.getDOMElements_LastIndex()).toStrictEqual(testInputElement);
    });
  });

  describe('getHeight(): null DOM element set', () => {

    it('verifies that the getHeight functionality returns a height value of zero', () => {
      expect(noElementsManager.getHeight()).toBe(0);
    });
  });

  describe('getHeight(): valid DOM element set', () => {
    let boundingClientRectSpy;

    beforeAll(() => {
      boundingClientRectSpy = jest.spyOn(testButtonElement, 'getBoundingClientRect')
        .mockImplementation(() => { return validBoundingClientRect });
    });

    afterAll(() => {
      boundingClientRectSpy.mockRestore();
    });

    it('verifies that the getHeight functionality returns the expected height value', () => {
      expect(domElementManager.getHeight()).toBe(mockHeight);
    });
  });

  describe('getId(): null DOM element set', () => {

    it('verifies that the getId functionality returns an empty string', () => {
      expect(noElementsManager.getId()).toBe('');
    });
  });

  describe('getId(): valid DOM element set', () => {

    it('verifies that the getId functionality returns the expected element id', () => {
      expect(domElementManager.getId()).toBe(mockId);
    });
  });

  describe('getRight(): null DOM element set', () => {

    it('verifies that the getRight functionality returns a right value of zero', () => {
      expect(noElementsManager.getRight()).toBe(0);
    });
  });

  describe('getRight(): valid DOM element set', () => {
    let boundingClientRectSpy;

    beforeAll(() => {
      boundingClientRectSpy = jest.spyOn(testButtonElement, 'getBoundingClientRect')
        .mockImplementation(() => { return validBoundingClientRect });
    });

    afterAll(() => {
      boundingClientRectSpy.mockRestore();
    });

    it('verifies that the getRight functionality returns the expected right value', () => {
      expect(domElementManager.getRight()).toBe(mockRight);
    });
  });

  describe('getTextContent(): null DOM element set', () => {

    it('verifies that the getTextContent functionality returns an empty string', () => {
      expect(noElementsManager.getTextContent()).toBe('');
    });
  });

  describe('getTextContent(): valid DOM element set', () => {

    beforeAll(() => {
      testButtonElement.textContent = mockTextContent;
    });

    afterAll(() => {
      testButtonElement.textContent = '';
    });

    it('verifies that the getTextContent functionality returns the expected element text content', () => {
      expect(domElementManager.getTextContent()).toBe(mockTextContent);
    });
  });

  describe('getVisibility(): null DOM element set', () => {

    it('verifies that the getVisibility functionality returns a negative response (not visible)', () => {
      expect(noElementsManager.getVisibility()).toBeFalsy();
    });
  });

  describe('getVisibility(): valid DOM element set, visibility set to "hidden"', () => {

    beforeAll(() => {
      testButtonElement.style.visibility = 'hidden';
    });

    afterAll(() => {
      testButtonElement.style.visibility = undefined;
    });

    it('verifies that the getVisibility functionality returns a negative response (not visible)', () => {
      expect(domElementManager.getVisibility()).toBeFalsy();
    });
  });

  describe('getVisibility(): valid DOM element set, visibility set to "visible"', () => {

    beforeAll(() => {
      testButtonElement.style.visibility = 'visible';
    });

    afterAll(() => {
      testButtonElement.style.visibility = undefined;
    });

    it('verifies that the getVisibility functionality returns a positive response (visible)', () => {
      expect(domElementManager.getVisibility()).toBeTruthy();
    });
  });

  describe('setFontSize(): null DOM element set', () => {

    it('verifies that the setFontSize functionality returns a negative response', () => {
      expect(noElementsManager.setFontSize(16)).toBeFalsy();
    });
  });

  describe('setFontSize(): valid DOM element set', () => {
    const testResults = [];

    beforeAll(() => {
      /* Verifies that the setFontSize functionality returns a positive response */
      testResults.push(domElementManager.setFontSize(16));

      /* Verifies that the font size is correctly applied to the HTML element */
      testResults.push(testButtonElement.style.fontSize);
    });

    afterAll(() => {
      testButtonElement.style.fontSize = undefined;
    });

    it('verifies that the setFontSize functionality returns a positive response', () => {
      expect(testResults[0]).toBeTruthy();
    });

    it('verifies that the font size is correctly applied to the HTML element', () => {
      expect(testResults[1]).toBe('16em');
    });
  });

  describe('setLeft(): null DOM element set', () => {

    it('verifies that the setLeft functionality returns a negative response', () => {
      expect(noElementsManager.setLeft(25)).toBeFalsy();
    });
  });

  describe('setLeft(): valid DOM element set', () => {
    const testResults = [];

    beforeAll(() => {
      /* Verifies that the setLeft functionality returns a positive response */
      testResults.push(domElementManager.setLeft(25));

      /* Verifies that the left position is correctly applied to the HTML element */
      testResults.push(testButtonElement.style.left);
    });

    afterAll(() => {
      testButtonElement.style.left = undefined;
    });

    it('verifies that the setLeft functionality returns a positive response', () => {
      expect(testResults[0]).toBeTruthy();
    });

    it('verifies that the left position is correctly applied to the HTML element', () => {
      expect(testResults[1]).toBe('25px');
    });
  });







  








  // describe('setDOMElement and getDOMElement - setter and getter functionality', () => {
  //   let testElement;
  //   const testElementId = 'test-dom-element';

  //   beforeAll(() => {
  //     /* Create the DOM element to be set to the module */
  //     testElement = document.createElement('div');
  //     testElement.setAttribute('id', testElementId);

  //     /* Set the DOM element to the object */
  //     htmlElementManager.setDOMElement(testElement);
  //   });

  //   it('verifies that the getDOMElement() functionality returns the expected DOM element', () => {
  //     expect(htmlElementManager.getDOMElement().getAttribute('id')).toBe(testElementId);
  //   });
  // });

  // describe('setMaxContainerHeight and getMaxContainerHeight - setter and getter functionality using invalid data', () => {
  //   const defaultMaxContainerHeight = 0;
  //   const testData = [];
  //   const htmlElementManager = new HTMLElementManager();

  //   beforeAll(() => {
  //     /* Set an invalid data type as the max container height - string value */
  //     htmlElementManager.setMaxContainerHeight('invalid data type');

  //     /* Verifies that using a string value does not alter the max container height */
  //     testData.push(htmlElementManager.getMaxContainerHeight());

  //     /* Set an invalid data type as the max container height - boolean value */
  //     htmlElementManager.setMaxContainerHeight(false);

  //     /* Verifies that using a boolean value does not alter the max container height */
  //     testData.push(htmlElementManager.getMaxContainerHeight());

  //     /* Set an invalid data type as the max container height - JSON value */
  //     htmlElementManager.setMaxContainerHeight({ key: 'value '});

  //     /* Verifies that using a JSON value does not alter the max container height */
  //     testData.push(htmlElementManager.getMaxContainerHeight());
  //   });

  //   it('verifies that using a string value does not alter the max container height', () => {
  //     expect(testData[0]).toBe(defaultMaxContainerHeight);
  //   });

  //   it('verifies that using a boolean value does not alter the max container height', () => {
  //     expect(testData[1]).toBe(defaultMaxContainerHeight);
  //   });

  //   it('verifies that using a JSON value does not alter the max container height', () => {
  //     expect(testData[2]).toBe(defaultMaxContainerHeight);
  //   });
  // });

  // describe('setMaxContainerHeight and getMaxContainerHeight - setter and getter functionality using valid data', () => {
  //   const testMaxContainerHeight = 255;
  //   const htmlElementManager = new HTMLElementManager();

  //   beforeAll(() => {
  //     /* Set a valid data type as the max container height */
  //     htmlElementManager.setMaxContainerHeight(testMaxContainerHeight);
  //   });

  //   it('verifies that using a number value correctly sets the max container height', () => {
  //     expect(htmlElementManager.getMaxContainerHeight()).toBe(testMaxContainerHeight);
  //   });
  // });

  // describe('truncateElementTextContentByContainerHeight - performs text truncation on valid DOM element', () => {
  //   const testMaxContainerHeight = 255;
  //   const boundingClientRect_Matching = {
  //     bottom: 0,
  //     height: testMaxContainerHeight,
  //     left: 0,
  //     right: 0,
  //     top: 0,
  //     width: 0,
  //   };
  //   const boundingClientRect_TooHigh = {
  //     bottom: 0,
  //     height: testMaxContainerHeight + 1,
  //     left: 0,
  //     right: 0,
  //     top: 0,
  //     width: 0,
  //   };
  //   const expectedTruncatedTextContent = 'Test...';
  //   let mockGetBoundingClientRect;
  //   let testElement;
  //   const testElementTextContent = 'Test12345';
  //   const htmlElementManager = new HTMLElementManager();

  //   beforeAll(() => {
  //     /* Set a max container height to the component manager */
  //     htmlElementManager.setMaxContainerHeight(testMaxContainerHeight);

  //     /* Create the DOM element to be set to the module */
  //     testElement = document.createElement('div');
  //     testElement.textContent = testElementTextContent;

  //     /* Set the DOM element to the component manager */
  //     htmlElementManager.setDOMElement(testElement);
      
  //     /* Set up the mock functions for this test */
  //     mockGetBoundingClientRect = jest.spyOn(testElement, 'getBoundingClientRect')
  //       .mockImplementationOnce(() => { return boundingClientRect_TooHigh })
  //       .mockImplementationOnce(() => { return boundingClientRect_TooHigh })
  //       .mockImplementationOnce(() => { return boundingClientRect_TooHigh })
  //       .mockImplementationOnce(() => { return boundingClientRect_TooHigh })
  //       .mockImplementationOnce(() => { return boundingClientRect_TooHigh })
  //       .mockImplementationOnce(() => { return boundingClientRect_Matching });

  //     /* Set the DOM element to the object */
  //     htmlElementManager.truncateElementTextContentByContainerHeight();
  //   });

  //   afterAll(() => {
  //     mockGetBoundingClientRect.mockRestore();
  //   });

  //   it('verifies that the truncateElementTextContentByContainerHeight() functionality has truncated the DOM elements text correctly', () => {
  //     expect(htmlElementManager.getDOMElement().textContent).toBe(expectedTruncatedTextContent);
  //   });
  // });

  // describe('truncateElementTextContentByContainerHeight - does not perform text truncation when max container height is not set', () => {
  //   let mockGetBoundingClientRect;
  //   let testElement;
  //   const testElementTextContent = 'Test12345';
  //   const htmlElementManager = new HTMLElementManager();

  //   beforeAll(() => {
  //     /* Create the DOM element to be set to the module */
  //     testElement = document.createElement('div');
  //     testElement.textContent = testElementTextContent;

  //     /* Set the DOM element to the component manager */
  //     htmlElementManager.setDOMElement(testElement);
      
  //     /* Set up the mock functions for this test */
  //     mockGetBoundingClientRect = jest.spyOn(testElement, 'getBoundingClientRect');

  //     /* Set the DOM element to the object */
  //     htmlElementManager.truncateElementTextContentByContainerHeight();
  //   });

  //   afterAll(() => {
  //     mockGetBoundingClientRect.mockRestore();
  //   });

  //   it('verifies that no calls to the getBoundingClientRect() functionality were made', () => {
  //     expect(mockGetBoundingClientRect.mock.calls).toHaveLength(0);
  //   });

  //   it('verifies that no text truncation has been performed on the DOM element', () => {
  //     expect(htmlElementManager.getDOMElement().textContent).toBe(testElementTextContent);
  //   });
  // });
});
