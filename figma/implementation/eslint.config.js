import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['dist'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2022,
      parserOptions: {
        // This ensures the parser knows where your project root is
        tsconfigRootDir: import.meta.dirname,
        project: ["./tsconfig.app.json", "./tsconfig.node.json"],
      },
      globals: globals.browser,
    },
  },
  ...storybook.configs["flat/recommended"],
)
