// server/src/routes/sensor.route.mjs

import { Router } from "express";
import {
  getAllSensors,
  receiveSensorData,
  getSensorById,
} from "../controllers/sensor.controller.mjs";

const router = Router();

router.get("/", getAllSensors);
router.get("/:id", getSensorById);
router.post("/data", receiveSensorData);

export default router;
