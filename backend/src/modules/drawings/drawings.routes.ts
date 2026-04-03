// Déclare les routes Express

import { Router } from "express";
import { getDrawings, getDrawingById } from "./drawings.controller";

const router = Router();
router.get("/", getDrawings);
router.get("/:id", getDrawingById);

export default router;