/**
 * Developed by Anthony Cox in 2025
 */
import Browser from './actions/Browser';
import Debug from './actions/Debug';
import DOM from './actions/DOM';
import PageObject from './page-objects/modules/PageObject';
import User from './actions/User';
import Verify from './verifications/Verify';
import { getBaseUrl } from './utils/E2EUtils';

/* Actions modules */
const browser = new Browser();
const debug = new Debug();
const dom = new DOM();
const user = new User();

/* Verifications modules */
const verify = new Verify();

export {
  /* Actions modules */
  browser,
  debug,
  dom,
  user,

  /* Page Objects modules */
  PageObject,

  /* Utilities functions */
  getBaseUrl,

  /* Verifications modules */
  verify,
};
