export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { 
      useESM: true,
      tsconfig: 'tsconfig.json' // move ts-jest config here
    }],
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: [
    'src/libs/**/*.{ts,tsx}',
    '!src/libs/**/__mocks__/**',
    '!src/libs/**/*.d.ts',
    '!src/libs/**/*.stories.{ts,tsx}'
  ],
  watchPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "\\.(png|jpg|jpeg|gif|svg)$": "identity-obj-proxy",
    "^.+\\.svg$": "jest-transformer-svg",
    '^@app/(.*)$': '<rootDir>/src/libs/$1',
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
};