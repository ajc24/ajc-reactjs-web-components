/**
 * Developed by Anthony Cox in 2025
 */

/**
 * Handles the label text content output and whether the form field should be
 * labelled as optional or not
 * @param {string} label 
 * @param {boolean} isOptionalFormField 
 * @returns {string}
 */
const handleOptionalFormFieldTextContent = (label, isOptionalFormField = false) => {
  let labelTextContent = `${label}`;
  if (isOptionalFormField === true) {
    labelTextContent += ' (Optional)';
  }
  labelTextContent += ':';

  return labelTextContent;
};

export {
  handleOptionalFormFieldTextContent,
};
