// server/src/services/score.service.mjs

// This service calculates the score based on the current sensor data

import { sensors } from "../data/sensors.data.mjs";
import { systemData } from "../data/system.data.mjs";
import { sensorOrder } from "../data/sensorOrder.data.mjs";
import { CLOG_DIFFERENCE_THRESHOLD } from "../utils/constants.util.mjs";

export const calculateScore = () => {
  let maxDifference = 0;
  const detectedClogs = [];

  for (let i = 0; i < sensorOrder.length - 1; i++) {
    const sA = sensors[sensorOrder[i]];
    const sB = sensors[sensorOrder[i + 1]];

    const difference = sA.waterLevel - sB.waterLevel;

    // Track max difference (for score)
    if (difference > maxDifference) {
      maxDifference = difference;
    }

    // Detect clog
    if (difference >= CLOG_DIFFERENCE_THRESHOLD) {
      detectedClogs.push({
        from: sA.sensorId,
        to: sB.sensorId,
        difference,
      });
    }
  }

  const score = Math.min(maxDifference, 100);

  systemData.riskScore = score;
  systemData.status =
    score > 60 ? "CRITICAL" : score > 30 ? "WARNING" : "NORMAL";

  systemData.clogs = detectedClogs;
  systemData.lastUpdated = new Date();
};
