/**
 * Developed by Anthony Cox in 2025
 */
import { 
  handleOptionalFormFieldTextContent,
} from '../../../components/data/form-functions';

describe('Form functions module', () => {

  describe('handleOptionalFormFieldTextContent - label that is not linked to an optional form field', () => {
    const result = handleOptionalFormFieldTextContent('Test Label');

    it('verifies that the non-optional label is set correctly', () => {
      expect(result).toBe('Test Label:');
    });
  });

  describe('handleOptionalFormFieldTextContent - label that is declared as being linked to an optional form field', () => {
    const result = handleOptionalFormFieldTextContent('Test Label', true);

    it('verifies that the optional label is set correctly', () => {
      expect(result).toBe('Test Label (Optional):');
    });
  });
});
