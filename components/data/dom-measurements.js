/**
 * Developed by Anthony Cox in 2025
 */

/**
 * Divides two numbers and parses the answer to an integer value
 * @param {number} number1 
 * @param {number} number2 
 * @returns {number}
 */
const divide_Integer = (number1, number2) => {
  return parseInt_Default(number1 / number2);
};

/**
 * Retrieves the dimensions for the specified DOM element and parses all
 * dimension values to an integer
 * @param {HTMLElement} domElement 
 * @returns {{ bottom: number, height: number, left: number, right: number, top: number, width: number }}
 */
const getBoundingClientRect = domElement => {
  const dimensions = domElement.getBoundingClientRect();
  return {
    bottom: parseInt_Default(dimensions.bottom),
    height: parseInt_Default(dimensions.height),
    left: parseInt_Default(dimensions.left),
    right: parseInt_Default(dimensions.right),
    top: parseInt_Default(dimensions.top),
    width: parseInt_Default(dimensions.width),
  };
};

/**
 * Returns the pageYOffset value set to the current window. This value can be used
 * to determine how far the user has scrolled up or down in the current window.
 * @returns {number}
 */
const getWindowPageYOffset_Integer = () => {
  return parseInt_Default(globalThis.window.pageYOffset);
};

/**
 * Multiplies two numbers and parses the answer to an integer value
 * @param {number} number1 
 * @param {number} number2 
 * @returns {number}
 */
const multiply_Integer = (number1, number2) => {
  return parseInt_Default(number1 * number2);
};

/**
 * Parses the current floating point number to one decimal place
 * @param {number} number 
 * @returns {number}
 */
const parseFloat_1DecimalPlace = number => {
  return Number.parseFloat(number.toFixed(1));
};

/**
 * Parses the specified number to an integer using the default / common radix
 * @param {number} number 
 * @returns {number}
 */
const parseInt_Default = number => {
  return Number.parseInt(number, 10);
};

export {
  divide_Integer,
  getBoundingClientRect,
  getWindowPageYOffset_Integer,
  multiply_Integer,
  parseFloat_1DecimalPlace,
  parseInt_Default,
};
