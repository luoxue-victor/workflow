// jest.config.js
module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx'
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer'
  ],
  modulePaths: [
    '<rootDir>/packages/react'
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules'
  },
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  collectCoverage: false,
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  },
  setupFilesAfterEnv: ['./jest.setup.js']
}
