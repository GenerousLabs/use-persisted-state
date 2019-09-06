const path = require('path')

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    node: true,
    es6: true,
    browser: true,
    jest: true,
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
  extends: [
    'eslint:recommended',
    'jest-enzyme',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
    'prettier',
  ],
  rules: {
    'indent': [0, 0],
    'semi': [2, 'never'],
    '@typescript-eslint/indent': [0],
    '@typescript-eslint/camelcase': [0],
    '@typescript-eslint/explicit-function-return-type': [0],
    'prettier/prettier': 'error',
    'arrow-parens': [2, 'as-needed', { requireForBlockBody: false }],
    'no-use-before-define': [1],
    'camelcase': [0],
    'quote-props': [2, 'consistent-as-needed'],
    'no-restricted-globals': [0],
    'no-restricted-properties': [0],
    'no-confusing-arrow': [0],
    'implicit-arrow-linebreak': [0],
    'no-underscore-dangle': [0],
    'comma-dangle': [2, 'always-multiline'],
    'max-len': [2, 120, { ignoreComments: true, ignoreUrls: true }],
    'react/jsx-filename-extension': [0],
    'react/prefer-stateless-function': [0],
    'react/require-default-props': [0],
    'react/no-array-index-key': [0],
    'jsx-a11y/no-static-element-interactions': [0],
    'jsx-a11y/no-marquee': [0],
    'jsx-a11y/href-no-hash': [0],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/style-prop-object': [0],
    'react/forbid-prop-types': [1],
    'react/destructuring-assignment': [0],
    'react/no-access-state-in-setstate': [0],
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-max-props-per-line': [2, { maximum: 1, when: 'multiline' }],
    'react/jsx-one-expression-per-line': [0],
    'react/jsx-props-no-spreading': [0],
    'react/jsx-wrap-multilines': [
      2,
      {
        assignment: false,
        arrow: false,
        return: false,
        declaration: false,
      },
    ],
    'react/jsx-tag-spacing': [
      2,
      {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
      },
    ],
  },
}
