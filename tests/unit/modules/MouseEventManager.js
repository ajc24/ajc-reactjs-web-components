/**
 * Developed by Anthony Cox in 2025
 */
import { MouseEventManager } from '../../../components/modules';

describe('Mouse Event Manager module', () => {
  
  describe('Default mouse event behaviour', () => {
    const testModule = new MouseEventManager();
    testModule.preventDefault();

    it('verifies that the isAuxiliaryClickEvent() functionality returns a negative result', () => {
      expect(testModule.isAuxiliaryClickEvent()).toBeFalsy();
    });

    it('verifies that the isLeftClickEvent() functionality returns a negative result', () => {
      expect(testModule.isLeftClickEvent()).toBeFalsy();
    });

    it('verifies that the isRightClickEvent() functionality returns a negative result', () => {
      expect(testModule.isRightClickEvent()).toBeFalsy();
    });
  });

  describe('Left click mouse event behaviour', () => {
    const testModule = new MouseEventManager();
    testModule.setEvent({
      button: 0,
      preventDefault: () => {},
    });

    it('verifies that the isAuxiliaryClickEvent() functionality returns a negative result', () => {
      expect(testModule.isAuxiliaryClickEvent()).toBeFalsy();
    });

    it('verifies that the isLeftClickEvent() functionality returns a positive result', () => {
      expect(testModule.isLeftClickEvent()).toBeTruthy();
    });

    it('verifies that the isRightClickEvent() functionality returns a negative result', () => {
      expect(testModule.isRightClickEvent()).toBeFalsy();
    });
  });

  describe('Auxiliary (middle button) click mouse event behaviour', () => {
    const testModule = new MouseEventManager();
    testModule.setEvent({
      button: 1,
      preventDefault: () => {},
    });

    it('verifies that the isAuxiliaryClickEvent() functionality returns a positive result', () => {
      expect(testModule.isAuxiliaryClickEvent()).toBeTruthy();
    });

    it('verifies that the isLeftClickEvent() functionality returns a negative result', () => {
      expect(testModule.isLeftClickEvent()).toBeFalsy();
    });

    it('verifies that the isRightClickEvent() functionality returns a negative result', () => {
      expect(testModule.isRightClickEvent()).toBeFalsy();
    });
  });

  describe('Right click mouse event behaviour', () => {
    const testModule = new MouseEventManager();
    testModule.setEvent({
      button: 2,
      preventDefault: () => {},
    });

    it('verifies that the isAuxiliaryClickEvent() functionality returns a negative result', () => {
      expect(testModule.isAuxiliaryClickEvent()).toBeFalsy();
    });

    it('verifies that the isLeftClickEvent() functionality returns a negative result', () => {
      expect(testModule.isLeftClickEvent()).toBeFalsy();
    });

    it('verifies that the isRightClickEvent() functionality returns a positive result', () => {
      expect(testModule.isRightClickEvent()).toBeTruthy();
    });
  });
});
