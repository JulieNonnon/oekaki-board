// Déclare les routes Express

import { Router } from "express";
import { getDrawings } from "./drawings.controller";

const router = Router();

router.get("/", getDrawings);

export default router;