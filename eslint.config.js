import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginRouter from "@tanstack/eslint-plugin-router";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, React: true, JSX: true },
    },
  },
  ...pluginRouter.configs["flat/recommended"],
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: { pluginReact },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
