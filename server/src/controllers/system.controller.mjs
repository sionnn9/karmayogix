export const getSystemStatus = (req, res) => {
  return sendSuccessResponse(res, 200, "System status fetched", systemData);
};
