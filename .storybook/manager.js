/**
 * Developed by Anthony Cox in 2024
 */
import { addons } from 'storybook/manager-api';
import ajcTheme from './ajc-theme';

addons.setConfig({
  theme: ajcTheme,
});
