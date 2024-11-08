import { Router } from "express";

import {
  getAllRawMaterials,
  createRawMaterial,
  getRawMaterialById,
  updateRawMaterial,
  deleteRawMaterial,
} from "../controllers/RawMaterialsController.mjs";

import { createUser, login } from "../controllers/UsersController.mjs";
import { authenticateToken } from "../middleware/auth.mjs";
import {
  createFood,
  getAllFoods,
  updateFood,
  deleteFood,
} from "../controllers/FoodsController.mjs";

/**
 * Configuración de rutas para el servidor Express que manejan operaciones relacionadas con materias primas, alimentos y usuarios.
 *
 * Este archivo define un conjunto de rutas para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre materias primas y alimentos.
 * Además, permite la creación y autenticación de usuarios. Todas las rutas están protegidas por un middleware de autenticación de token.
 *
 * @module routes/tabblesRoutes
 *
 * @example
 * // Ejemplo de cómo se utiliza esta configuración de rutas en un servidor Express.
 * import tabblesRoutes from './routes/tabblesRoutes.mjs';
 * app.use('/api/tabbles-tables', tabblesRoutes); // Se integran las rutas en la aplicación Express.
 */
const router = Router();

router.use(authenticateToken);

// Rutas para iniciar sesión y registrarse
router.post("/register", createUser);
router.post("/login", login);

// Rutas para las materias primas
router.get("/raw-materials", getAllRawMaterials);
router.get("/raw-materials/:id", getRawMaterialById);
router.post("/raw-material", createRawMaterial);
router.put("/raw-material/:id", updateRawMaterial);
router.delete("/raw-material/:id", deleteRawMaterial);
// rutas para los alimentos
router.post("/food", createFood);
router.get("/foods", getAllFoods);
router.put("/food/:id", updateFood);
router.delete("/food/:id", deleteFood);

export default router;
