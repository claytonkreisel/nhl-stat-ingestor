export default {
  clearMocks: true,
  collectCoverage: true,
  coverageReporters: ['text'],
  // globalSetup: undefined,
  // globalTeardown: undefined,
  // globals: {},
  resetMocks: true,
  // setupFiles: [],
  testMatch: ['**/tests/**/?(*.)+(spec|test).ts'],
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
};
