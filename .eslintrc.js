module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true
  },
  settings: {
    ecmascript: 6,
    jsx: true
  },
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      experimentalDecorators: true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['react'],
  extends: ['airbnb'],
  rules: {
    'react/jsx-filename-extension': 0,
    'arrow-parens': ['error', 'as-needed'],
    'jsx-a11y/anchor-is-valid': [
      'error',
      { components: ['Link'], specialLink: ['to'] }
    ],
    'comma-dangle': ['error', 'never'],
    'object-curly-newline': 0,
    'function-paren-newline': 0,
    'react/no-unescaped-entities': 0
  }
};
