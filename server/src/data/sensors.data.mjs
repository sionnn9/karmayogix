// server/src/data/sensors.data.mjs
// This file acts like a temporary database.

// In-memory storage for sensor data

const sensors = {
  S1: {
    sensorId: "S1",
    waterLevel: 0,
    lastUpdated: null,
  },
  S2: {
    sensorId: "S2",
    waterLevel: 0,
    lastUpdated: null,
  },
};

module.exports = sensors;

// This object lives in RAM
// When Arduino sends data, we update this object
