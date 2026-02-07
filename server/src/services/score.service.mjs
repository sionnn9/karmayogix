// server/src/services/score.service.mjs
// This service calculates the score based on the current sensor data

import { sensors } from "../data/sensors.data.mjs";
import { systemData } from "../data/system.data.mjs";

export const calculateScore = () => {
  const s1 = sensors.S1.waterLevel;
  const s2 = sensors.S2.waterLevel;

  const difference = Math.abs(s1 - s2);
  const score = Math.min(difference, 100);

  systemData.riskScore = score;
  systemData.status =
    score > 60 ? "CRITICAL" : score > 30 ? "WARNING" : "NORMAL";
};
