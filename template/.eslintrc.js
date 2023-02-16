module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
    amd: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },

  extends: ['eslint:recommended', 'plugin:vue/essential', 'plugin:prettier/recommended', 'eslint-config-prettier'],
  plugins: ['html'],
  rules: {
    quotes: [2, 'single'],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        parser: 'flow',
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
