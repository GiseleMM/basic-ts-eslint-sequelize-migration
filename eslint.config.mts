import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import prettier from "eslint-config-prettier";

export default defineConfig([
  // 🔥 BLOQUE GLOBAL DE IGNORES
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "config/**",
      "migrations/**",
      "models/**"
    ],
  },

  // Archivos JS/TS que SÍ quieres lint
  {
    files: ["src/**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
  },

  tseslint.configs.recommended,

  {
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],
      "no-undef": "off",
      eqeqeq: ["error", "always"],
      "no-debugger": "error",
      curly: ["error", "all"],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      semi: ["error", "always"],
      indent: ["error", 2],
    },
  },

  prettier,
]);
