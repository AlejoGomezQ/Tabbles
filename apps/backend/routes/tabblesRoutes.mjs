import { Router } from "express";
import {
  getAllRawMaterials,
  createRawMaterial,
} from "../controllers/RawMaterialsController.mjs";

const router = Router();

router.get("/raw-materials", getAllRawMaterials);
router.post("/raw-materials", createRawMaterial);

export default router;
