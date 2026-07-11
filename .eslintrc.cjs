module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'script'
  },
  rules: {
    // Add custom rule adjustments if needed
    'no-console': 'off'   // allow console in tests/examples
  }
};