// server/src/routes/mistral.route.mjs

import { Router } from "express";

const router = Router();

router.get("/", getAllSensors);

export default router;
