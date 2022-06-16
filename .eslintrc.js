module.exports = {
  env: {
    jest: true,
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'airbnb-typescript', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react'],
  rules: {
    /* Next.js does not require us to import React in all components */
    'react/react-in-jsx-scope': 'off',
    /* Allow JSX in files with .jsx, .js, .tsx OR .ts */
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    /* Allow prop spreading */
    'react/jsx-props-no-spreading': 'off',
    /* Ignore linebreak type */
    'linebreak-style': 0,
    /* Allow default params to be anywhere in func args list - mainly for reducers */
    'default-param-last': 'off',
    '@typescript-eslint/default-param-last': 'off',
    /* Not required as we are not using Prop Types with TypeScript */
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
  },
  globals: {
    /* Next.js assumes React is global */
    React: 'writable',
  },
  overrides: [
    /* Only uses Testing Library lint rules in test files */
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
};
