/**
 * Developed by Anthony Cox in 2026
 */
import { HorizontalRule } from '../../components';

export default {
  component: HorizontalRule,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Spacing/Horizontal Rule',
};

/**
 * Horizontal Rule component template
 * @returns {React.Component}
 */
const Template_HorizontalRule = () => {
  return <HorizontalRule />;
}

export const Default = {
  render: Template_HorizontalRule,
};
