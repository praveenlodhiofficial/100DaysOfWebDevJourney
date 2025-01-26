import { pgClient } from "./dbClient";

export const connectToDatabase = async () => {
  try {
    await pgClient.connect();
    console.log("Connected to PostgreSQL database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); 
  }
};
