// server/src/services/sensor.service.mjs

import { sensors } from "../data/sensors.data.mjs";
import { calculateScore } from "./score.service.mjs";

export const updateSensor = (sensorId, waterLevel) => {
  sensors[sensorId].waterLevel = waterLevel;
  sensors[sensorId].lastUpdated = new Date();

  // After updating sensor, recalculate score
  calculateScore();
};
