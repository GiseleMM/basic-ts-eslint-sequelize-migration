
# 📘 Guía correcta: Node + TypeScript + ESLint + Sequelize + Migraciones

## 1️⃣ Inicializar proyecto

```bash
npm init -y
```

---

## 2️⃣ Instalar TypeScript y tipos base

```bash
npm install --save-dev typescript @types/node
```

---

## 3️⃣ Inicializar TypeScript

```bash
npx tsc --init
```

### Configuración recomendada (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "Node",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "skipLibCheck": true
  }
}
```

---

## 4️⃣ Instalar ESLint (Flat Config)

```bash
npm install --save-dev eslint @eslint/js typescript-eslint globals
```

---

## 5️⃣ Crear `eslint.config.js`

```ts
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import prettier from "eslint-config-prettier";

export default defineConfig([
  // 🔥 Ignorar carpetas globalmente
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "config/**",
      "migrations/**",
      "models/**"
    ],
  },

  // Archivos del proyecto
  {
    files: ["src/**/*.{ts,js}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.node,
    },
  },

  tseslint.configs.recommended,

  {
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],
      "no-undef": "off",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-debugger": "error",

      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",

      semi: ["error", "always"],
      indent: ["error", 2],
    },
  },

  prettier,
]);
```

---

## 6️⃣ Probar ESLint

```bash
npx eslint src
npx eslint src --fix
```

---

## 7️⃣ Integrar ESLint con VS Code

`.vscode/settings.json`

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.experimental.useFlatConfig": true,
  "eslint.validate": ["typescript", "javascript"]
}
```

---

## 8️⃣ (Opcional) Prettier

```bash
npm install --save-dev prettier eslint-config-prettier
```

*(Ya integrado arriba)*

---

## 9️⃣ Scripts útiles (`package.json`)

```json
{
  "scripts": {
    "build": "tsc",
    "lint": "eslint src",
    "lint:fix": "eslint src --fix"
  }
}
```

---

## 🔟 Instalar Sequelize + TypeScript

```bash
npm install sequelize sequelize-typescript reflect-metadata
npm install --save-dev @types/validator
```

---

## 1️⃣1️⃣ Instalar driver de base de datos (MySQL)

```bash
npm install mysql2
```

---

## 1️⃣2️⃣ Configurar conexión Sequelize

```ts
import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user.model.js";

export const sequelize = new Sequelize(
  "mysql://user:pass@host:3307/dbname",
  {
    models: [User],
    logging: false
  }
);

export async function connectToDatabase() {
  await sequelize.authenticate();
  console.log("Database connected");
}
```

---

## 1️⃣3️⃣ Instalar sequelize-cli

```bash
npm install --save-dev sequelize-cli
```

---

## 1️⃣4️⃣ Inicializar sequelize-cli

```bash
npx sequelize-cli init
```

Crea:

```
config/
migrations/
models/
```

---

## 1️⃣5️⃣ Configurar `config/config.json`

⚠️ **El CLI NO usa tu URI**, usa este archivo

```json
{
  "development": {
    "username": "user",
    "password": "pass",
    "database": "dbname",
    "host": "host",
    "port": 3307,
    "dialect": "mysql"
  }
}
```

---

## 1️⃣6️⃣ Crear migración

```bash
npx sequelize-cli migration:generate --name create-users
```

> ❌ **NO usar `model:generate` con sequelize-typescript**

---

## 1️⃣7️⃣ Migración (CommonJS → `.cjs`)

```js
// migrations/xxxx-create-users.cjs
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: Sequelize.STRING,
      lastName: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Users");
  },
};
```

---

## 1️⃣8️⃣ Crear modelo con sequelize-typescript

```ts
import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement, Unique } from "sequelize-typescript";
import { Optional } from "sequelize";

interface UserAttributes {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

@Table
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column(DataType.STRING)
  declare firstName: string;

  @Column(DataType.STRING)
  declare lastName?: string;

  @Unique
  @Column(DataType.STRING)
  declare email: string;
}
```

---

## 1️⃣9️⃣ Ejecutar migraciones

```bash
npx sequelize-cli db:migrate
```

---

## 2️⃣0️⃣ Cambios en tablas

* ❌ **NO editar migraciones ya ejecutadas**
* ✅ Crear nueva migración
* ❌ El modelo **NO crea tablas**
* ✅ Migración = estructura
* ✅ Modelo = lógica

---

## ✅  NOTAS

| Tema        | Corrección               |
| ----------- | ------------------------ |
| ESLint      | `ignores` global         |
| Migraciones | NO usar `model:generate` |
| ESM         | `.cjs` obligatorio       |
| Sequelize   | CLI ≠ app config         |
| Modelos     | `declare` obligatorio    |
| Flujo       | Migración ≠ modelo       |

