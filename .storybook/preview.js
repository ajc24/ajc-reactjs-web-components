/**
 * Developed by Anthony Cox in 2025
 */
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';

/**
 * @type { import('@storybook/react').Preview }
 */
const preview = {
  parameters: {
    viewport: {
      options: {
        ...INITIAL_VIEWPORTS,
        ...MINIMAL_VIEWPORTS,
      },
    },
  },
  tags: ['autodocs'],
};
export default preview;
