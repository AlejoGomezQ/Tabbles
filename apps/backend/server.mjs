import express, { json } from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import nutritionalRoutes from "./routes/nutritionalRoutes.mjs";

config();

const app = express();
app.use(json());

// Conexión a MongoDB
connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Rutas
app.use("/api/nutritional-tables", nutritionalRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
