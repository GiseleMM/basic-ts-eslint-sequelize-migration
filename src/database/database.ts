import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user.model.js";
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const sequelize = new Sequelize(process.env.URI_DB!);

sequelize.addModels([User]);
export async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection successfully to database")
  } catch (error) {
    console.log(error);
  }
}
export async function closeConnectionToDatabase() {
  try {
    
    await sequelize.close();
    console.log("closing the connection database");

  } catch (error) {
    console.log("Failed closing the connection database ",error);
  }
  
}
