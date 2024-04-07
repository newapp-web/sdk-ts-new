module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
    amd: true,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    requireConfigFile: false,
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },

  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'eslint-config-prettier',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    quotes: [2, 'single'],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
      },
    ],
    'no-unused-vars': 'off',
  },
  globals: {
    globalThis: 'readonly',
    vscode: 'readonly',
  },
  ignorePatterns: ['!.*', 'dist', 'node_modules', 'lib'],
};
