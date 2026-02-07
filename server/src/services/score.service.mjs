// server/src/services/score.service.mjs
// This service calculates the score based on the current sensor data

import { sensors } from "../data/sensors.data.mjs";
import { systemData } from "../data/system.data.mjs";
import { sensorOrder } from "../data/sensorOrder.data.mjs";

export const calculateScore = () => {
  let maxDifference = 0;
  let clogBetween = null;

  for (let i = 0; i < sensorOrder.length - 1; i++) {
    const sA = sensors[sensorOrder[i]];
    const sB = sensors[sensorOrder[i + 1]];

    const difference = Math.abs(sA.waterLevel - sB.waterLevel);

    if (difference > maxDifference) {
      maxDifference = difference;
      clogBetween = {
        from: sA.sensorId,
        to: sB.sensorId,
        difference,
      };
    }
  }

  const score = Math.min(maxDifference, 100);

  systemData.riskScore = score;
  systemData.status =
    score > 60 ? "CRITICAL" : score > 30 ? "WARNING" : "NORMAL";

  systemData.clogLocation = clogBetween;
  systemData.lastUpdated = new Date();
};
