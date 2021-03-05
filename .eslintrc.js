module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-new': 0,
    'no-underscore-dangle': 0,
    'class-methods-use-this': 0,
    'max-classes-per-file': 0,
  },
};
