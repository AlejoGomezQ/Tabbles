import mongoose from "mongoose";

/**
 * Clase para gestionar la conexión a la base de datos MongoDB utilizando Mongoose.
 *
 * Esta clase proporciona un método para conectar a la base de datos MongoDB solo una vez, asegurando
 * que la conexión se realice de manera eficiente y manejando errores si la conexión falla.
 *
 * @class
 */
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
