// .eslintrc.cjs

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {},
  overrides: [
    {
      files: ['**/*.{test,spec}.{cj,mj,j,t}s'],
      env: { jest: true },
      extends: ['plugin:mocha/recommended'],
    },
  ],
};
