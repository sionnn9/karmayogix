// server/src/controllers/system.controller.mjs

import { sendSuccessResponse } from "../utils/response.util.mjs";
import { systemData } from "../data/system.data.mjs";

export const getSystemStatus = (req, res) => {
  try {
    return sendSuccessResponse(res, 200, "System status fetched", systemData);
  } catch (error) {
    console.error("Error fetching system status:", error);

    return sendErrorResponse(
      res,
      500,
      "Failed to fetch system status",
      error.message,
    );
  }
};
