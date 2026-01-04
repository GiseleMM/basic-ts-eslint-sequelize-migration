
import { connectToDatabase } from "./database/database.js";

function saludar(nombre: string) {
  console.log(`Hola, ${nombre}!`);
}
saludar("Mundo");
(async ()=>{
  await connectToDatabase();
})();