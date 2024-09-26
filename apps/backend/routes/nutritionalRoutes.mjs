import { Router } from "express";
import {
  getAllTables,
  createTable,
} from "../controllers/nutritionalController.mjs";

const router = Router();

router.get("/", getAllTables);
router.post("/", createTable);

export default router;
