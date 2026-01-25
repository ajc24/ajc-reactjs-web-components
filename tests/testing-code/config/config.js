/**
 * Developed by Anthony Cox in 2024
 */

/**
 * Configures the most common settings for jest
 * @param {string} rootDirectory
 * @returns {JSON}
 */
const configureCommonJestSettings = rootDirectory => {
  return {
    moduleNameMapper: {
      '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tests/jest-config/mocks/imageMock.js',
      '\\.(css|less)$': '<rootDir>/tests/jest-config/mocks/cssMock.js'
    },
    rootDir: rootDirectory || '../../',
    setupFilesAfterEnv: [],
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
      url: 'http://localhost/',
    },
    transformIgnorePatterns: [
      '<rootDir>/node_modules/*.js',
    ],
    verbose: true
  }
}

/**
 * Sets the configuration for jest unit tests
 * @param {string} rootDirectory
 * @returns {JSON}
 */
const configureUnitTests = rootDirectory => {
  const jestConfig = configureCommonJestSettings(rootDirectory);
  
  /* Set the coverage directory for the project */
  jestConfig.coverageDirectory = '<rootDir>/tests/unit/coverage';
  /* Set the ignored folder(s) for the coverage process - ignore the node_modules and jest_config folders by default */
  jestConfig.coveragePathIgnorePatterns = [];
  jestConfig.coveragePathIgnorePatterns.push('<rootDir>/node_modules');
  jestConfig.coveragePathIgnorePatterns.push('<rootDir>/tests/jest-config');
  jestConfig.coveragePathIgnorePatterns.push('<rootDir>/tests/unit/coverage');
  /* Set the path to the tests to be executed as part of the unit test suite */
  jestConfig.testMatch = [];
  jestConfig.testMatch.push('<rootDir>/tests/unit/**/*.js');
  /* Set the path to the tests to be ignored as part of the unit test suite */
  jestConfig.testPathIgnorePatterns = [];
  jestConfig.testPathIgnorePatterns.push('<rootDir>/tests/unit/coverage');

  return jestConfig;
}

/**
 * Sets the configuration for jest snapshot tests
 * @param {string} rootDirectory
 * @returns {JSON}
 */
const configureSnapshotTests = rootDirectory => {
  const jestConfig = configureCommonJestSettings(rootDirectory);

  /* Set the path to the tests to be executed as part of the snapshots test suite */
  jestConfig.testMatch = [];
  jestConfig.testMatch.push('<rootDir>/tests/snapshots/**/*.js');

  return jestConfig;
}

/**
 * Sets the configuration for jest accessibility tests
 * @param {string} rootDirectory
 * @returns {JSON}
 */
const configureAccessibilityTests = rootDirectory => {
  const jestConfig = configureSnapshotTests(rootDirectory);
  
  /* Ensure that all tests are run sequentially as opposed to in parallel */
  jestConfig.maxConcurrency = 1;

  /* Set the path to the document configuration required for jest-axe tests */
  jestConfig.setupFilesAfterEnv.push('<rootDir>/tests/jest-config/document.config.js');

  /* Set the path to the tests to be executed as part of the snapshots test suite */
  jestConfig.testMatch = [];
  jestConfig.testMatch.push('<rootDir>/tests/accessibility/**/*.js');

  return jestConfig;
}

export {
  configureAccessibilityTests,
  configureSnapshotTests,
  configureUnitTests
};
