/**
 * Developed by Anthony Cox in 2025
 */
import { storybookCssClassList } from '../data/storybook';

/* Commonly used CSS classes */
const bodyDefaultCss = 'body-default';

/**
 * Functionality designed to work with the page template components (headers, menu bars, body content, footers)
 */
export default class PageTemplateConfig {
  /**
   * Setup and configure the current web page to ensure the default CSS styling is set to it.
   * This also handles the styling of pages which are deployed on Storybook
   */
  static setupDocumentBodyCss() {
    /* If we are rendering on Storybook, remove the Storybook classes which will affect the width of the component */
    for (let index = 0; index < storybookCssClassList.length; index += 1) {
      if (document.body.classList.contains(storybookCssClassList[index]) === true) {
        document.body.classList.remove(storybookCssClassList[index]);
      }
    }
    /* Ensure that the <body> element stretches to 100% of the width of the screen, that the X axis scrollbar is hidden and Y axis scrollbar is always displayed */
    if (document.body.classList.contains(bodyDefaultCss) === false) {
      document.body.classList.add(bodyDefaultCss);
      document.activeElement.blur();
    }
  }
}
