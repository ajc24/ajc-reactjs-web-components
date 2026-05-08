/**
 * Developed by Anthony Cox in 2025
 */
require('dotenv').config({ quiet: true });

/* Data used by the utility functions */
const local = 'local';
const network = 'network';

/**
 * Determines the base URL to be used for this test environment
 * @returns {string}
 */
const getBaseUrl = () => {
  const environment = getTestEnvironment();
  if (environment === network) {
    return process.env.URL_NETWORK;
  }
  return process.env.URL_LOCAL;
};

/**
 * Determines the setting for the current test environment, whether it's a local run or a network run
 * @returns {'network'|'local'}
 */
const getTestEnvironment = () => {
  if (process.env.ENV === network) {
    return network;
  }
  return local;
}

export {
  getBaseUrl,
};
