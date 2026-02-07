// server/src/routes/sensor.route.mjs

import { Router } from "express";
import { receiveSensorData } from "../controllers/sensor.controller.mjs";

const router = Router();

router.post("/data", receiveSensorData);

export default router;
