import mongoose from "mongoose";
import { config } from "dotenv";
import RawMaterials from "./models/RawMaterials.mjs";

config();

async function rebuildIndexes() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Drop all indexes
    await RawMaterials.collection.dropIndexes();
    console.log("Dropped all indexes");

    // Recreate indexes based on the schema
    await RawMaterials.syncIndexes();
    console.log("Recreated indexes");

    console.log("Index rebuild complete");
  } catch (error) {
    console.error("Error rebuilding indexes:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

rebuildIndexes();
