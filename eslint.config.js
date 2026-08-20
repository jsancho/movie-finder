// https://docs.expo.dev/guides/using-eslint/
const expoConfig = require('eslint-config-expo/flat');
const { defineConfig } = require('eslint/config');
const path = require('node:path');
const tsConfig = require.resolve('./tsconfig.json');

const tsconfigRootDir = path.dirname(tsConfig);

module.exports = defineConfig([
  expoConfig,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir,
      },
    },
    rules: {
      '@typescript-eslint/no-deprecated': 'error',
    },
  },
  {
    ignores: ['dist/*'],
  },
]);
