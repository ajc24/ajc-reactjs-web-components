/**
 * Developed by Anthony Cox in 2025
 */
import EventManager from './EventManager';

/**
 * Common keyboard event handling functionality
 */
export default class KeyboardEventManager extends EventManager {
  
  constructor() {
    super({
      key: 'undefined',
      preventDefault: () => {},
      shiftKey: false,
    });
  }

  /**
   * Determines whether the current keyboard event has been fired from an "Escape" key press.
   * @returns {boolean}
   */
  isEscapeKeyEvent() {
    return this.getEvent().key === 'Escape';
  }

  /**
   * Determines whether the current keyboard event has been fired from an "Enter" key press.
   * @returns {boolean}
   */
  isEnterKeyEvent() {
    return this.getEvent().key === 'Enter';
  }

  /**
   * Determines whether the "Shift" key has been pressed as part of the current keyboard event.
   * @returns {boolean}
   */
  isShiftKeyPressed() {
    return this.getEvent().shiftKey;
  }

  /**
   * Determines whether the current keyboard event has been fired from a "Space" key press.
   * @returns {boolean}
   */
  isSpaceKeyEvent() {
    return this.getEvent().key === ' ';
  }

  /**
   * Determines whether the current keyboard event has been fired from a "Tab" key press.
   * @returns {boolean}
   */
  isTabKeyEvent() {
    return this.getEvent().key === 'Tab';
  }
}
