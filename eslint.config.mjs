import { fixupConfigRules } from "@eslint/compat"
import next from "@next/eslint-plugin-next"
import react from "eslint-plugin-react"
import reactRefresh from "eslint-plugin-react-refresh"
import html from "eslint-plugin-html"
import prettier from "eslint-plugin-prettier"
import globals from "globals"
import tsParser from "@typescript-eslint/parser"
import path from "node:path"
import { fileURLToPath } from "node:url"
import js from "@eslint/js"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: ["**/dist", "**/.eslintrc.cjs", "node_modules", "build", "public", ".vercel", ".next", "out", "coverage", "next-env.d.ts"],
  },
  ...fixupConfigRules(compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended", "prettier")),
  {
    plugins: {
      "@next/next": next,
      react,
      "react-refresh": reactRefresh,
      html,
      prettier,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
    },

    rules: {
      ...next.configs.recommended.rules,
      ...next.configs["core-web-vitals"].rules,
      "react-refresh/only-export-components": [
        "off",
        {
          allowConstantExport: true,
        },
      ],
      "no-empty-pattern": "warn",
      "react/jsx-curly-brace-presence": ["error", { props: "always" }],
      "prettier/prettier": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  {
    // Playwright fixtures legitimately use empty destructuring patterns
    // (e.g. `async ({}, use) => {}`) to access `use` without depending on any fixture.
    files: ["e2e/**/*.ts"],
    rules: {
      "no-empty-pattern": "off",
    },
  },
  {
    // CommonJS config files (e.g. postcss.config.cjs) run in Node and use `module.exports`.
    files: ["**/*.cjs", "next.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      sourceType: "commonjs",
    },
  },
]
