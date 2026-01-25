/**
 * Developed by Anthony Cox in 2025
 */
import { 
  divide_Integer,
  getBoundingClientRect,
  getWindowPageYOffset_Integer,
  multiply_Integer,
  parseFloat_1DecimalPlace,
  parseInt_Default,
} from '../../../components/data/dom-measurements';

describe('DOM measurements module', () => {

  describe('divide_Integer - using two integer numbers with an integer result', () => {
    const result = divide_Integer(4, 2);

    it('verifies that the resulting integer is the correct value', () => {
      expect(result).toBe(2);
    });
  });

  describe('divide_Integer - using two integer numbers with a decimal result', () => {
    const result = divide_Integer(5, 2);

    it('verifies that the resulting integer is the correct value', () => {
      expect(result).toBe(2);
    });
  });

  describe('getBoundingClientRect - full set of integer results', () => {
    const expectedResult = {
      bottom: 125,
      height: 100,
      left: 25,
      right: 125,
      top: 25,
      width: 100,
    };
    const result = getBoundingClientRect({
      getBoundingClientRect: () => {
        return {
          bottom: 125.5,
          height: 100.5,
          left: 25,
          right: 125.5,
          top: 25,
          width: 100.5,
        };
      },
    });

    it('verifies that the resulting dimensions from the component are parsed correctly', () => {
      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe('getWindowPageYOffset_Integer - returns the correct result', () => {
    globalThis.window.pageYOffset = 155;
    const result = getWindowPageYOffset_Integer();

    it('verifies that the resulting window page Y offset value is correct', () => {
      expect(result).toBe(155);
    });
  });

  describe('multiply_Integer - using two integer numbers with an integer result', () => {
    const result = multiply_Integer(4, 2);

    it('verifies that the resulting integer is the correct value', () => {
      expect(result).toBe(8);
    });
  });

  describe('parseFloat_1DecimalPlace - using a float number with a float result set to 1 decimal place', () => {
    const result = parseFloat_1DecimalPlace(33.33333);

    it('verifies that the resulting float is the correct value', () => {
      expect(result).toBe(33.3);
    });
  });

  describe('parseInt_Default - using a float number with an integer result', () => {
    const result = parseInt_Default(4.75);

    it('verifies that the resulting integer is the correct value', () => {
      expect(result).toBe(4);
    });
  });
});
