import { Router } from "express";
import {
  getAllRawMaterials,
  createRawMaterial,
  getRawMaterialById,
  updateRawMaterial,
  deleteRawMaterial,
} from "../controllers/RawMaterialsController.mjs";

const router = Router();

router.get("/raw-materials", getAllRawMaterials);
router.get("/raw-materials/:id", getRawMaterialById);
router.post("/raw-materials", createRawMaterial);
router.put("/raw-materials/:id", updateRawMaterial);
router.delete("/raw-materials/:id", deleteRawMaterial);

export default router;
