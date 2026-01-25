/**
 * Developed by Anthony Cox in 2025
 */
import { storybookCssClassList } from '../../../components/data/storybook';

describe('Storybook module', () => {

  describe('storybookCssClassList - storybook oriented CSS styling data', () => {
    
    it('verifies that CSS style values are set to the Storybook class list', () => {
      expect(storybookCssClassList.length >= 1).toBeTruthy();
    });

    it('verifies that all CSS style values set to the Storybook class list are "string" values', () => {
      expect(storybookCssClassList).toEqual(expect.arrayOf(expect.any(String)));
    });
  });
});
