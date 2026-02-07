// server/src/services/sensor.service.mjs

import { sensors } from "../data/sensors.data.mjs";
import { calculateScore } from "./score.service.mjs";

export const updateSensor = (sensorId, waterLevel, levelLabel) => {
  sensors[sensorId].waterLevel = waterLevel;
  sensors[sensorId].levelLabel = levelLabel;
  sensors[sensorId].lastUpdated = new Date();

  // After updating sensor, recalculate score
  calculateScore();
};
