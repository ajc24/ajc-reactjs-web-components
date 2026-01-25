/**
 * Developed by Anthony Cox in 2025
 */
import EventManager from './EventManager';

/**
 * Common mouse event handling functionality
 */
export default class MouseEventManager extends EventManager {
  
  constructor() {
    super({
      button: -1,
      preventDefault: () => {},
    });
  }

  /**
   * Determines whether an auxiliary click event has occurred.
   * This also refers to mouse wheel and / or the middle button clicks.
   * @returns {boolean}
   */
  isAuxiliaryClickEvent() {
    return this.getEvent().button === 1;
  }

  /**
   * Determines whether a left click event has occurred
   * @returns {boolean}
   */
  isLeftClickEvent() {
    return this.getEvent().button === 0;
  }

  /**
   * Determines whether a right click event has occurred
   * @returns {boolean}
   */
  isRightClickEvent() {
    return this.getEvent().button === 2;
  }
}
