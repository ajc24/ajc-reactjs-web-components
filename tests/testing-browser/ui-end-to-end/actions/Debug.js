/**
 * Developed by Anthony Cox in 2025
 */
import { controller } from '../controllers';

/**
 * Automated browser debugging actions for use in test scripts
 */
class Debug {
  /**
   * Initialise the debug module
   */
  constructor() {}

  /**
   * Activates debug mode during the current test script execution
   * @returns {Promise.<undefined>}
   */
  async activate() {
    return controller.debug();
  }

  /**
   * Pauses the currently executing test script for the specified time of milliseconds
   * @param {number} waitTime
   * @returns {Promise.<undefined>}
   */
  async wait(waitTime) {
    return controller.wait(waitTime);
  }
}
export default Debug;
