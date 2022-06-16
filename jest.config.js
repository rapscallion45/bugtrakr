module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
  moduleNameMapper: {
    /* Handle CSS imports (with CSS modules) */
    '^.+\\.module\\.(css|less|sass|scss)$': 'identity-obj-proxy',

    /* Handle CSS imports (without CSS modules) */
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    /* Handle image imports */
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': `<rootDir>/__mocks__/fileMock.js`,

    /* Handle module aliases */
    '^@/components/(.*)$': '<rootDir>/components/$1',
  },
  transform: {
    /* Use babel-jest to transpile tests with the next/babel preset */
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
  setupFiles: ['<rootDir>/enzyme.config.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts', '<rootDir>/__mocks__/browserMocks.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  coveragePathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/coverage/',
    '<rootDir>/.eslintrc.js',
    '<rootDir>/jest.config.js',
    '<rootDir>/next.config.js',
  ],
  globals: {
    WP_REST_API_URL: 'https://cms.fplfrog.brightseed.io/wp-json',
    POST_API_URL: 'https://cms.fplfrog.brightseed.io/wp-json',
    API_URL: 'https://fpl-frog.herokuapp.com/api',
    TWITTER_HANDLE: 'fplfrog',
    GOOGLE_ADSENSE_PUBLISHER_ID: 'xxxxxxxxxxxxxx',
    GOOGLE_ADSENSE_TEST: true,
  },
};
