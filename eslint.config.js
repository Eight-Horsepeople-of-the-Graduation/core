// const typescriptEslintRecommended = require('@typescript-eslint/eslint-plugin/dist/configs/recommended');
// const prettierRecommended = require('eslint-plugin-prettier').configs.recommended;
const tsParser = require('@typescript-eslint/parser');

module.exports = [
  {
    files: ["**/*.ts"], // Specify the files to lint
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
      sourceType: 'module', // Allows for the use of imports
      globals: {
        node: true,
        es6: true,
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      'prettier': require('eslint-plugin-prettier'),
    },
    rules: {
      // ...typescriptEslintRecommended.rules, // Spread the recommended rules from typescript-eslint
      // ...prettierRecommended.rules, // Spread the recommended rules from prettier
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': 'off', // Disables the rule for unused variables
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
    ignores: ['node_modules/', 'build/'], // Ensure these are not blocking your TypeScript files
  },
];
