/** @type {import('jest').Config} */
const config = {
 // testEnvironments: 'allure-jest/node',
  setupFiles: ['dotenv/config'],
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  reporters: ['default'],
  moduleFileExtensions: ['js', 'json', 'mts', 'cts'],

  
  
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
   
    
  },
  testMatch: ['**/specs/http1.spec.*'],
  globals: {
    testTimeout: 70000,
  },
  
  verbose: true,
}
module.exports = config
