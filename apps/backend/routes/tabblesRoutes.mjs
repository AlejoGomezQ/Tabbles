import { Router } from "express";

import {
  getAllRawMaterials,
  createRawMaterial,
  getRawMaterialById,
  updateRawMaterial,
  deleteRawMaterial,
} from "../controllers/RawMaterialsController.mjs";

import { createUser, login } from "../controllers/UsersController.mjs";

const router = Router();

// Rutas para iniciar sesión y registrarse
router.post("/register", createUser);
router.post("/login", login);

// Rutas para las materias primas
router.get("/raw-materials", getAllRawMaterials);
router.get("/raw-materials/:id", getRawMaterialById);
router.post("/raw-materials", createRawMaterial);
router.put("/raw-materials/:id", updateRawMaterial);
router.delete("/raw-materials/:id", deleteRawMaterial);

export default router;
