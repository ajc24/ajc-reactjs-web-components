/**
 * Developed by Anthony Cox in 2025
 */
import { PageTemplateConfig } from '../../../components/modules';
import { storybookCssClassList } from '../../../components/data/storybook';

describe('Page Template Configuration module', () => {
  /* CSS classes used for test verifications */
  const bodyDefaultCss = 'body-default';

  describe('PageTemplateConfig.setupDocumentBodyCss - non-Storybook deployment, document body not at 100% width', () => {
    let documentActiveElementBlurSpy;

    beforeAll(() => {
      /* Set up the spy for the active elements blur functionality */
      documentActiveElementBlurSpy = jest
        .spyOn(global.document.activeElement, 'blur')
        .mockImplementation(() => {});

      /* Execute the function being tested */
      PageTemplateConfig.setupDocumentBodyCss();
    });

    afterAll(() => {
      /* Restore the original document body */
      document.body.classList.remove(bodyDefaultCss);

      /* Restore all mock spy functionality */
      documentActiveElementBlurSpy.mockRestore();
    });

    it('verifies that the "sb-main-padded" class is not assigned to the document body', () => {
      expect(document.body.classList.contains(storybookCssClassList[0])).toBeFalsy();
    });

		it('verifies that the "sb-show-main" class is not assigned to the document body', () => {
      expect(document.body.classList.contains(storybookCssClassList[1])).toBeFalsy();
    });

    it('verifies that the "body-default" class is assigned to the document body', () => {
      expect(document.body.classList.contains(bodyDefaultCss)).toBeTruthy();
    });

    it('verifies that the blur functionality for the currently active DOM element is called as expected', () => {
      expect(documentActiveElementBlurSpy.mock.calls).toHaveLength(1);
    });
  });

  describe('PageTemplateConfig.setupDocumentBodyCss - Storybook deployment, document body already set to 100% width', () => {
    let documentActiveElementBlurSpy;

    beforeAll(() => {
      /* Set up the spy for the active elements blur functionality */
      documentActiveElementBlurSpy = jest
        .spyOn(global.document.activeElement, 'blur')
        .mockImplementation(() => {});
      
      /* Set up the document body for the test */
      document.body.classList.add(storybookCssClassList[0]);
      document.body.classList.add(storybookCssClassList[1]);
      document.body.classList.add(bodyDefaultCss);

      /* Execute the function being tested */
      PageTemplateConfig.setupDocumentBodyCss();
    });

    afterAll(() => {
      /* Restore the original document body */
      document.body.classList.remove(bodyDefaultCss);

      /* Restore all mock spy functionality */
      documentActiveElementBlurSpy.mockRestore();
    });

    it('verifies that the "sb-main-padded" class is not assigned to the document body', () => {
      expect(document.body.classList.contains(storybookCssClassList[0])).toBeFalsy();
    });

    it('verifies that the "sb-show-main" class is not assigned to the document body', () => {
			expect(document.body.classList.contains(storybookCssClassList[1])).toBeFalsy();
		});

    it('verifies that the "body-default" class is assigned to the document body', () => {
      expect(document.body.classList.contains(bodyDefaultCss)).toBeTruthy();
    });

    it('verifies that the blur functionality for the currently active DOM element is not called', () => {
      expect(documentActiveElementBlurSpy.mock.calls).toHaveLength(0);
    });
  });
});
