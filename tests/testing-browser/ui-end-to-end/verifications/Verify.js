/**
 * Developed by Anthony Cox in 2025
 */
import { controller } from '../controllers';

/**
 * Verifications module for end to end testing
 */
class Verify {
  /**
   * Initialise the verification component
   */
  constructor() {}

  /**
   * Verifies if the full data provided contains the specified search data or not
   * @param {Array.<any>|JSON|string} fullData 
   * @param {Array.<any>|JSON|string} searchData
   * @param {string} failureMessage
   * @returns {Promise.<undefined>}
   */
  async contains(fullData, searchData, failureMessage) {
    return controller.expect_contains(fullData, searchData, failureMessage);
  }

  /**
   * Verifies if the expected data and actual data are strictly equal
   * @param {any} expectedData 
   * @param {any} actualData
   * @param {string} failureMessage
   * @returns {Promise.<undefined>}
   */
  async equal(expectedData, actualData, failureMessage) {
    return controller.expect_equal(expectedData, actualData, failureMessage);
  }

  /**
   * Verifies if the actual data is set to a false value
   * @param {boolean} actualData 
   * @param {string} failureMessage
   * @returns {Promise.<undefined>}
   */
  async false(actualData, failureMessage) {
    return controller.expect_false(actualData, failureMessage);
  }

  /**
   * Verifies if the actual data is set to a true value
   * @param {boolean} actualData 
   * @param {string} failureMessage
   * @returns {Promise.<undefined>}
   */
  async true(actualData, failureMessage) {
    return controller.expect_true(actualData, failureMessage);
  }
}
export default Verify;
