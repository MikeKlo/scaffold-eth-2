import nextPlugin from 'eslint-config-next/core-web-vitals.js';
import prettierConfig from 'eslint-config-prettier';

export default [
  ...nextPlugin,
  prettierConfig,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'react/no-unescaped-entities': 'off',
      'no-unused-vars': 'off',
    },
    ignores: ['.next/**', 'node_modules/**', 'out/**'],
  },
];