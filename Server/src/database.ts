import mongoose from "mongoose";
import { config } from "./config/config";

export const dbConnection = async () => {
  try {
    await mongoose.connect(config.dbUrl);
    console.log("Connected to MongoDB successfully.");
  } catch (error: any) {
    console.error("MongoDB Connection Error:", error.message);

    // Retry connection after 5 seconds
    setTimeout(dbConnection, 5000);
  }
};
