/**
 * Developed by Anthony Cox in 2025
 */
import EventManager from '../../../components/modules/EventManager';

describe('Event Manager module', () => {
  
  describe('setEvent and getEvent - setter and getter functionality', () => {
    const testEvent = {
      functionA: () => { return 'A' },
      keyB: 'valueB',
      numberC: 25,
    };
    const testModule = new EventManager();

    beforeAll(() => {
      /* Set the event to the object */
      testModule.setEvent(testEvent);
    });

    it('verifies that the getEvent() functionality returns the expected event', () => {
      expect(testModule.getEvent()).toStrictEqual(testEvent);
    });
  });

  describe('setEvent and getEvent - setter and getter functionality', () => {
    const mockPreventDefault = jest.fn();
    const testData = [];
    const testEvent = {
      preventDefault: mockPreventDefault,
    };
    const testModule = new EventManager();

    beforeAll(() => {
      /* Invoke the functionality being tested - using the default preventDefault functionality for the object */
      testModule.preventDefault();

      /* Verifies that the preventDefault() functionality is not called since the Event is not set to the object */
      testData.push(mockPreventDefault.mock.calls.length);

      /* Set the event to the object */
      testModule.setEvent(testEvent);

      /* Invoke the functionality being tested - this will invoke the preventDefault functionality set to the Event */
      testModule.preventDefault();

      /* Verifies that the preventDefault() functionality is called for the Event set to the object */
      testData.push(mockPreventDefault.mock.calls.length);
    });

    it('verifies that the preventDefault() functionality is not called since the Event is not set to the object', () => {
      expect(testData[0]).toBe(0);
    });

    it('verifies that the preventDefault() functionality is called for the Event set to the object', () => {
      expect(testData[1]).toBe(1);
    });
  });
});
