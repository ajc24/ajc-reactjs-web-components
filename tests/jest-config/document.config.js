/**
 * Developed by Anthony Cox in 2025
 * @jest-environment jsdom
 */

/* Ensure that this environment variable is set for react unit testing */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

/* Ensure that all relevant functionality is present for document interactions */
globalThis.document.createRange = () => ({
  getClientRects: () => [],
  selectNodeContents: () => {},
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
});
globalThis.document.elementFromPoint = () => {};

/* Ensure that all relevant functionality is present for Element interactions */
Element.prototype.scrollIntoView = () => {};

/* Ensure getComputedStyle functionality is present for <select> elements */
const { getComputedStyle } = globalThis.window;
globalThis.window.getComputedStyle = (elt) => getComputedStyle(elt);

/* Work around getContext errors in accessibility tests */
globalThis.window.HTMLCanvasElement.prototype.getContext = () => {};
