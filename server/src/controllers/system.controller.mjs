import { sendSuccessResponse } from "../utils/response.util.mjs";
import { systemData } from "../data/system.data.mjs";

export const getSystemStatus = (req, res) => {
  return sendSuccessResponse(res, 200, "System status fetched", systemData);
};
