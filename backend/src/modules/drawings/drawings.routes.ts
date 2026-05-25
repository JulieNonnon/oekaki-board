// Déclare les routes Express

import { Router } from "express";
import { getDrawings, getDrawingById, createDrawing } from "./drawings.controller";

const router = Router();

// l'ordre des routes est important : les routes plus spécifiques (/:id) doivent être déclarées après les routes plus générales (/)
router.get("/", getDrawings);
router.get("/:id", getDrawingById);
router.post("/", createDrawing);

export default router;