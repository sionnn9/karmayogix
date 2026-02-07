// server/src/services/score.service.mjs

import { Router } from "express";
import { getSystemStatus } from "../controllers/system.controller.mjs";

const router = Router();

router.get("/", getSystemStatus);

export default router;
