/**
 * Developed by Anthony Cox in 2025
 */

const mockDefaultEvent = {
  preventDefault: () => {},
};

/**
 * Common event handling functionality
 */
export default class EventManager {
  #event;

  constructor(defaultEvent = mockDefaultEvent) {
    this.#event = defaultEvent;
  }

  /**
   * Retrieves the Event currently set to this module
   * @returns {Event}
   */
  getEvent() {
    return this.#event;
  }

  /**
   * Retrieves the target element which dispatched the current event
   * @returns {HTMLElement}
   */
  getEventTarget() {
    return this.#event.target;
  }

  /**
   * Retrieves the ID set to the target element which dispatched the current event
   * @returns {string}
   */
  getEventTargetId() {
    return `${this.getEventTarget().id}`;
  }

  /**
   * Retrieves the value set to the target element which dispatched the current event
   * @returns {string}
   */
  getEventTargetValue() {
    return `${this.getEventTarget().value}`;
  }

  /**
   * Prevents the default behaviour for the current event from occurring
   */
  preventDefault() {
    this.getEvent().preventDefault();
  }

  /**
   * Sets the Event linked to this module
   * @param {Event} newEvent 
   */
  setEvent(newEvent) {
    this.#event = newEvent;
  }
}
