// server/src/controllers/sensor.controller.mjs
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../utils/response.util.mjs";
import { updateSensor } from "../services/sensor.service.mjs";
import { sensors } from "../data/sensors.data.mjs";

// Allowed sensors
const ALLOWED_SENSORS = Object.keys(sensors);

// Controller for handling sensor data updates and retrieval
export const receiveSensorData = (req, res) => {
  try {
    const { sensorId, waterLevel } = req.body;

    // Validation for Arduino bugs
    // Presence validation
    if (!sensorId || waterLevel === undefined) {
      return sendErrorResponse(
        res,
        400,
        "sensorId and waterLevel are required",
      );
    }

    // Sensor ID validation
    if (!ALLOWED_SENSORS.includes(sensorId)) {
      return sendErrorResponse(res, 400, "Invalid sensorId");
    }

    // Water level type validation
    const level = 100 - Number(waterLevel);
    if (Number.isNaN(level)) {
      return sendErrorResponse(res, 400, "waterLevel must be a number");
    }

    // Water level range validation
    if (level < 0 || level > 100) {
      return sendErrorResponse(
        res,
        400,
        "waterLevel must be between 0 and 100",
      );
    }

    let levelLabel = null;
    if (level <= 30) {
      levelLabel = "low";
    } else if (level <= 60) {
      levelLabel = "medium";
    } else {
      levelLabel = "high";
    }

    // update the sensor data
    updateSensor(sensorId, level, levelLabel);

    return sendSuccessResponse(
      res,
      200,
      "Sensor data updated successfully",
      sensors[sensorId],
    );
  } catch (err) {
    console.error("Error while receiving sensor data", err);

    return sendErrorResponse(res, 500, "Failed to update sensor data");
  }
};

// Get all sensors data
export const getAllSensors = (req, res) => {
  try {
    return sendSuccessResponse(res, 200, "Sensor data fetched successfully", {
      sensors: Object.values(sensors),
    });
  } catch (err) {
    console.error("Error fetching sensor data", err);

    return sendErrorResponse(res, 500, "Failed to fetch sensor data");
  }
};

// Get single sensor data by ID
export const getSensorById = (req, res) => {
  try {
    const { id } = req.params;
    const sensor = sensors[id];
    if (!sensor) {
      return sendErrorResponse(res, 404, "Sensor not found");
    }
    return sendSuccessResponse(res, 200, "Sensor data fetched successfully", {
      sensor,
    });
  } catch (err) {
    console.error("Error fetching Sensor Data", err);

    return sendErrorResponse(res, 500, "Failed to fetch sensor data");
  }
};
