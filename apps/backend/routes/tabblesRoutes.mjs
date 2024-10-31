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
import { createFood, getAllFoods } from "../controllers/FoodsController.mjs";
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

export default router;
