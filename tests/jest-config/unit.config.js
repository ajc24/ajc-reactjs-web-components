/**
 * Developed by Anthony Cox in 2025
 */
const { configureUnitTests } = require('../testing-code');

const jestConfig = configureUnitTests();
jestConfig.coveragePathIgnorePatterns.push('<rootDir>/components/modules/index.js');
jestConfig.coveragePathIgnorePatterns.push('<rootDir>/components/index.js');
jestConfig.coveragePathIgnorePatterns.push('<rootDir>/tests/testing-code/index.js');
jestConfig.setupFilesAfterEnv.push('<rootDir>/tests/jest-config/document.config.js');

module.exports = jestConfig;
