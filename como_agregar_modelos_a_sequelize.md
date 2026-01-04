# Como agregar modelos a sequelize cuando usas sequelize-typescipt?
Cuando usas **sequelize-typescript**, los modelos **no se registran solos**: debes **agregarlos explícitamente** al `Sequelize`.

Tienes **2 formas correctas**. Te muestro ambas y te digo cuál recomiendo.

---

## ✅ Forma 1 (RECOMENDADA): pasar los modelos al crear `Sequelize`

### 1️⃣ Importa tus modelos

Supongamos que tu modelo está en:

```
src/models/user.model.ts
```

### 2️⃣ Agrega la opción `models`

```ts
import { Sequelize } from "sequelize-typescript";
import { User } from "./models/user.model"; // ajusta la ruta

export const sequelize = new Sequelize(
  "connection uri",
  {
    models: [User], // 👈 aquí
  }
);

export async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection successfully to database");
  } catch (error) {
    console.error(error);
  }
}
```

🔹 Así Sequelize **conoce el modelo**
🔹 Necesario para `sync`, asociaciones, etc.

---

## ✅ Forma 2: usar `sequelize.addModels()` (útil si tienes muchos modelos)

```ts
import { Sequelize } from "sequelize-typescript";
import { User } from "./models/user.model";

export const sequelize = new Sequelize(
  "mysql://testbd_2026_memberfix:6d069498c63b13d1ce726d4d99ff305ff1ad289e@cfximh.h.filess.io:3307/testbd_2026_memberfix"
);

sequelize.addModels([User]); // 👈 aquí

export async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection successfully to database");
  } catch (error) {
    console.error(error);
  }
}
```

---

## 🔄 Si quieres sincronizar las tablas (opcional)

```ts
await sequelize.sync({ alter: true });
// o
await sequelize.sync();
```

⚠️ **No uses `force: true` en producción** (borra tablas)

---

## 📌 Recomendación de estructura

```
src/
 ├─ config/
 │   └─ database.ts
 ├─ models/
 │   └─ user.model.ts
 └─ app.ts
```

---

## 🧠 Tip importante

Si **olvidas registrar el modelo**, verás errores como:

* `Model not initialized`
* `User is not associated`
* `relation does not exist`

---
