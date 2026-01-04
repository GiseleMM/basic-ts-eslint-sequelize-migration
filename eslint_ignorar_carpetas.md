
 **cómo y dónde se aplican los `ignores` de Eslint config**.

---

## ❌ Por qué puede que NO se están ignorando esas carpetas 

En **Flat Config**, esto:

```ts
{
  ignores: ["config/**", "migrations/**", "models/**"],
  files: ["**/*.{js,ts}"],
}
```

❌ **NO ignora globalmente**
👉 Solo ignora **dentro de ese bloque**, y **después** otro config puede volver a activarlos.

Además:

* `tseslint.configs.recommended` **NO hereda tus ignores**
* VS Code ESLint **sí analiza archivos fuera de `src`** por defecto

Por eso ves errores en:

```
config/
migrations/
models/
```

---

## ✅ SOLUCIÓN CORRECTA (RECOMENDADA)

### 👉 Crear un bloque SOLO de ignores, al principio

```ts
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
```

🔹 **Este bloque sí ignora de verdad**
🔹 Es el patrón oficial de ESLint Flat Config

---

## ✅ SOLUCIÓN ALTERNATIVA (simple)

Si **solo quieres lintar `src/`**, haz esto:

```ts
files: ["src/**/*.{js,ts}"],
```

Y **no necesitas ignores** para `config`, `migrations`, `models`.

---

## 🧠 Importante: VS Code y ESLint

VS Code:

* Ignora `.eslintignore` ❌ (deprecated)
* Usa **Flat Config completo**
* Analiza archivos abiertos aunque estén fuera de `src`

Por eso esta solución es necesaria.

---

## ❌ Lo que NO funciona bien en Flat Config

| Método                              | Estado      |
| ----------------------------------- | ----------- |
| `.eslintignore`                     | ⚠️ obsoleto |
| `ignores` mezclado con `files`      | ❌ parcial   |
| Confiar en que estén fuera de `src` | ❌           |

---

## 📌 Resumen rápido

✔️ En Flat Config → **ignores globales en un bloque solo**
✔️ Limita `files` a `src/**`
✔️ `tseslint.configs.recommended` no hereda ignores
✔️ VS Code analiza todo el workspace
