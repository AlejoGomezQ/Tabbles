import express, { json } from "express";
import { config } from "dotenv";
import tabblesRoutes from "./routes/tabblesRoutes.mjs";
import databaseInstance from "./database.mjs";

config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(json());

databaseInstance
  .connect()
  .then(() => {
    app.use("/api/tabbles-tables", tabblesRoutes);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
