import express, { json } from "express";
import { config } from "dotenv";
import tabblesRoutes from "./routes/tabblesRoutes.mjs";
import databaseInstance from "./database.mjs";

/**
 * Configura y arranca un servidor Express para manejar rutas relacionadas con tablas nutricionales,
 * y se conecta a una base de datos MongoDB utilizando la configuración de la aplicación.
 *
 * Este componente se encarga de:
 * 1. Cargar la configuración del entorno desde un archivo `.env` utilizando `dotenv`.
 * 2. Configurar el servidor Express para aceptar solicitudes en formato JSON.
 * 3. Conectar a la base de datos MongoDB usando una instancia de conexión.
 * 4. Definir las rutas bajo `/api/tabbles-tables` para manejar las solicitudes de la aplicación.
 * 5. Iniciar el servidor Express en el puerto especificado en las variables de entorno.
 *
 * @example
 * // Ejemplo de cómo se ejecuta la configuración del servidor
 * // El servidor se inicia en el puerto 5000 (o el que se haya configurado en .env)
 * // y las rutas de la API se manejan bajo '/api/tabbles-tables'.
 *
 * // No se necesita invocar directamente este código, ya que se ejecuta automáticamente al iniciar el servidor.
 */
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
