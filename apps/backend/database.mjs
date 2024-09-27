import mongoose from "mongoose";

class Database {
  constructor() {
    this.connection = null;
  }

  async connect() {
    if (!this.connection) {
      try {
        this.connection = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
      } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
      }
    }
    return this.connection;
  }
}

const databaseInstance = new Database();
export default databaseInstance;
