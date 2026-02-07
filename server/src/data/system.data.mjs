// server/src/data/system.data.mjs

// This file contains the current state of the system, including risk score, status, and clog information.

export const systemData = {
  riskScore: 0, // overall severity
  status: "NORMAL", // normal, warning, critical
  clogs: [], // multiple clog locations
  lastUpdated: null,
};
