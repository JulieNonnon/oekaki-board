// Déclare les routes Express

import { Router } from "express";
import { getDrawings, getDrawingById, createDrawing } from "./drawings.controller";

const router = Router();
router.get("/", getDrawings);
router.get("/:id", getDrawingById);
router.post("/", createDrawing);

export default router;