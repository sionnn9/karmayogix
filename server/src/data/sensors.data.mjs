// server/src/data/sensors.data.mjs
// This file acts like a temporary database.

// In-memory storage for sensor data

export const sensors = {
  S1: {
    sensorId: "S1",
    waterLevel: 0,
    levelLabel: "null",
    lastUpdated: null,
  },
  S2: {
    sensorId: "S2",
    waterLevel: 0,
    levelLabel: "null",
    lastUpdated: null,
  },
  S3: {
    sensorId: "S3",
    waterLevel: 67,
    levelLabel: "high",
    lastUpdated: new Date(),
  },
  S4: {
    sensorId: "S4",
    waterLevel: 78,
    levelLabel: "high",
    lastUpdated: new Date(),
  },
  S5: {
    sensorId: "S5",
    waterLevel: 45,
    levelLabel: "medium",
    lastUpdated: new Date(),
  },
  S6: {
    sensorId: "S6",
    waterLevel: 45,
    levelLabel: "low",
    lastUpdated: new Date(),
  },
  S7: {
    sensorId: "S7",
    waterLevel: 45,
    levelLabel: "high",
    lastUpdated: new Date(),
  },
  S8: {
    sensorId: "S8",
    waterLevel: 45,
    levelLabel: "low",
    lastUpdated: new Date(),
  },
  S9: {
    sensorId: "S9",
    waterLevel: 34,
    levelLabel: "medium",
    lastUpdated: new Date(),
  },
  S10: {
    sensorId: "S10",
    waterLevel: 45,
    levelLabel: "medium",
    lastUpdated: new Date(),
  },
};

export default sensors;

// This object lives in RAM
// When Arduino sends data, we update this object

/* Arduino sends an HTTP POST request like this:
    POST http://<server-ip>:3000/api/sensors/data

Body:    {
  "sensorId": "S1",
  "waterLevel": 78
}
*/
