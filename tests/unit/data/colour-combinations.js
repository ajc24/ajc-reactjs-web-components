/**
 * Developed by Anthony Cox in 2025
 */
import { getColourCombination } from '../../../components/data/colour-combinations';

describe('Colour combinations module', () => {

  describe('getColourCombination - default background and font colour combination', () => {
    const testColourCombination = getColourCombination();

    it('verifies that the background colour is set to "white" by default', () => {
      expect(testColourCombination.backgroundColour).toBe('white');
    });

    it('verifies that the font colour is set to "black" by default', () => {
      expect(testColourCombination.fontColour).toBe('black');
    });
  });

  describe('getColourCombination - gold colour specified', () => {
    const testColourCombination = getColourCombination('gold');

    it('verifies that the background colour is set to "gold"', () => {
      expect(testColourCombination.backgroundColour).toBe('gold');
    });

    it('verifies that the font colour is set to "black"', () => {
      expect(testColourCombination.fontColour).toBe('black');
    });
  });

  describe('getColourCombination - green colour specified', () => {
    const testColourCombination = getColourCombination('green');

    it('verifies that the background colour is set to "green"', () => {
      expect(testColourCombination.backgroundColour).toBe('green');
    });

    it('verifies that the font colour is set to "white"', () => {
      expect(testColourCombination.fontColour).toBe('white');
    });
  });

  describe('getColourCombination - grey colour specified', () => {
    const testColourCombination = getColourCombination('grey');

    it('verifies that the background colour is set to "grey"', () => {
      expect(testColourCombination.backgroundColour).toBe('grey');
    });

    it('verifies that the font colour is set to "white"', () => {
      expect(testColourCombination.fontColour).toBe('white');
    });
  });

  describe('getColourCombination - navy and gold colour specified', () => {
    const testColourCombination = getColourCombination('navy-and-gold');

    it('verifies that the background colour is set to "navy"', () => {
      expect(testColourCombination.backgroundColour).toBe('navy');
    });

    it('verifies that the font colour is set to "gold"', () => {
      expect(testColourCombination.fontColour).toBe('gold');
    });
  });

  describe('getColourCombination - navy and white colour specified', () => {
    const testColourCombination = getColourCombination('navy-and-white');

    it('verifies that the background colour is set to "navy"', () => {
      expect(testColourCombination.backgroundColour).toBe('navy');
    });

    it('verifies that the font colour is set to "white"', () => {
      expect(testColourCombination.fontColour).toBe('white');
    });
  });

  describe('getColourCombination - red colour specified', () => {
    const testColourCombination = getColourCombination('red');

    it('verifies that the background colour is set to "red"', () => {
      expect(testColourCombination.backgroundColour).toBe('red');
    });

    it('verifies that the font colour is set to "white"', () => {
      expect(testColourCombination.fontColour).toBe('white');
    });
  });

  describe('getColourCombination - white colour specified', () => {
    const testColourCombination = getColourCombination('white');

    it('verifies that the background colour is set to "white"', () => {
      expect(testColourCombination.backgroundColour).toBe('white');
    });

    it('verifies that the font colour is set to "black"', () => {
      expect(testColourCombination.fontColour).toBe('black');
    });
  });
});
