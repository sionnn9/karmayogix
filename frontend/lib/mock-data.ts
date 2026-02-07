export interface Sensor {
  id: string;
  location: string;
  area: string;
  lane: string;
  latitude: number;
  longitude: number;
  status: "online" | "offline" | "maintenance";
  riskScore: number;
  waterLevelDifference: number;
  blockageEstimate: number;
  lastUpdated: Date;
  alertMessage: string;
  detectionTime: Date;
  sevenDayTrend: number[];
}

export interface Alert {
  id: string;
  sensorId: string;
  detectionTime: Date;
  waterLevelDifference: number;
  blockageEstimate: number;
  acknowledged: boolean;
  acknowledgedTime?: Date;
  resolved: boolean;
  resolvedTime?: Date;
  resolutionTime?: number; // minutes
  notes: string;
}

export interface ActionLog {
  id: string;
  alertId: string;
  action: "acknowledged" | "fixed" | "note";
  timestamp: Date;
  user: string;
  comments: string;
}

const generateTrend = (baseScore: number): number[] => {
  return Array.from({ length: 7 }, (_, i) => {
    const variance = (Math.random() - 0.5) * 20;
    return Math.max(0, Math.min(100, baseScore + variance));
  });
};

export const mockSensors: Sensor[] = [
  {
    id: "S001",
    location: "Main Street Drainage",
    area: "Downtown District",
    lane: "Lane A1",
    latitude: 40.7128,
    longitude: -74.006,
    status: "online",
    riskScore: 15,
    waterLevelDifference: 8,
    blockageEstimate: 12,
    lastUpdated: new Date(Date.now() - 3600000),
    alertMessage: "Normal flow",
    detectionTime: new Date(Date.now() - 3600000),
    sevenDayTrend: generateTrend(15),
  },
  {
    id: "S002",
    location: "Oak Avenue Pipe",
    area: "Riverside Zone",
    lane: "Lane B2",
    latitude: 40.7282,
    longitude: -73.9942,
    status: "online",
    riskScore: 52,
    waterLevelDifference: 45,
    blockageEstimate: 48,
    lastUpdated: new Date(Date.now() - 1800000),
    alertMessage: "Partial blockage detected",
    detectionTime: new Date(Date.now() - 3600000),
    sevenDayTrend: generateTrend(52),
  },
  {
    id: "S003",
    location: "Harbor Road Collector",
    area: "Waterfront",
    lane: "Lane C3",
    latitude: 40.7489,
    longitude: -73.9680,
    status: "online",
    riskScore: 78,
    waterLevelDifference: 72,
    blockageEstimate: 85,
    lastUpdated: new Date(Date.now() - 600000),
    alertMessage: "CRITICAL: Immediate attention required",
    detectionTime: new Date(Date.now() - 7200000),
    sevenDayTrend: generateTrend(78),
  },
  {
    id: "S004",
    location: "Park Lane Extension",
    area: "North Sector",
    lane: "Lane D4",
    latitude: 40.7614,
    longitude: -73.9776,
    status: "offline",
    riskScore: 0,
    waterLevelDifference: 0,
    blockageEstimate: 0,
    lastUpdated: new Date(Date.now() - 86400000),
    alertMessage: "Sensor offline",
    detectionTime: new Date(Date.now() - 86400000),
    sevenDayTrend: [0, 0, 0, 0, 0, 0, 0],
  },
  {
    id: "S005",
    location: "Commerce Street Main",
    area: "Downtown District",
    lane: "Lane E5",
    latitude: 40.7505,
    longitude: -73.9934,
    status: "online",
    riskScore: 28,
    waterLevelDifference: 22,
    blockageEstimate: 25,
    lastUpdated: new Date(Date.now() - 2400000),
    alertMessage: "Normal flow",
    detectionTime: new Date(Date.now() - 2400000),
    sevenDayTrend: generateTrend(28),
  },
  {
    id: "S006",
    location: "Bridge Underpass",
    area: "Central Valley",
    lane: "Lane F6",
    latitude: 40.758,
    longitude: -73.9855,
    status: "maintenance",
    riskScore: 0,
    waterLevelDifference: 0,
    blockageEstimate: 0,
    lastUpdated: new Date(Date.now() - 172800000),
    alertMessage: "Under maintenance",
    detectionTime: new Date(Date.now() - 172800000),
    sevenDayTrend: [0, 0, 0, 0, 0, 0, 0],
  },
  {
    id: "S007",
    location: "University Avenue Canal",
    area: "Education District",
    lane: "Lane G7",
    latitude: 40.8075,
    longitude: -73.9626,
    status: "online",
    riskScore: 42,
    waterLevelDifference: 38,
    blockageEstimate: 40,
    lastUpdated: new Date(Date.now() - 1200000),
    alertMessage: "Elevated blockage risk",
    detectionTime: new Date(Date.now() - 3600000),
    sevenDayTrend: generateTrend(42),
  },
  {
    id: "S008",
    location: "Industrial Zone Trunk",
    area: "Industrial East",
    lane: "Lane H8",
    latitude: 40.7305,
    longitude: -73.9474,
    status: "online",
    riskScore: 18,
    waterLevelDifference: 12,
    blockageEstimate: 15,
    lastUpdated: new Date(Date.now() - 4200000),
    alertMessage: "Normal flow",
    detectionTime: new Date(Date.now() - 4200000),
    sevenDayTrend: generateTrend(18),
  },
  {
    id: "S009",
    location: "Residential District Branch",
    area: "South Sector",
    lane: "Lane I9",
    latitude: 40.7069,
    longitude: -74.0113,
    status: "offline",
    riskScore: 0,
    waterLevelDifference: 0,
    blockageEstimate: 0,
    lastUpdated: new Date(Date.now() - 259200000),
    alertMessage: "Sensor offline",
    detectionTime: new Date(Date.now() - 259200000),
    sevenDayTrend: [0, 0, 0, 0, 0, 0, 0],
  },
  {
    id: "S010",
    location: "Commerce Street Branch",
    area: "Downtown District",
    lane: "Lane J10",
    latitude: 40.7489,
    longitude: -73.9680,
    status: "online",
    riskScore: 65,
    waterLevelDifference: 62,
    blockageEstimate: 70,
    lastUpdated: new Date(Date.now() - 900000),
    alertMessage: "High blockage risk - action needed",
    detectionTime: new Date(Date.now() - 5400000),
    sevenDayTrend: generateTrend(65),
  },
  {
    id: "S011",
    location: "Market Street Lateral",
    area: "Central Valley",
    lane: "Lane K11",
    latitude: 40.7614,
    longitude: -73.9776,
    status: "online",
    riskScore: 8,
    waterLevelDifference: 5,
    blockageEstimate: 6,
    lastUpdated: new Date(Date.now() - 3000000),
    alertMessage: "Normal flow",
    detectionTime: new Date(Date.now() - 3000000),
    sevenDayTrend: generateTrend(8),
  },
  {
    id: "S012",
    location: "Harbor View Secondary",
    area: "Waterfront",
    lane: "Lane L12",
    latitude: 40.7282,
    longitude: -73.9942,
    status: "online",
    riskScore: 35,
    waterLevelDifference: 30,
    blockageEstimate: 32,
    lastUpdated: new Date(Date.now() - 1500000),
    alertMessage: "Moderate blockage risk",
    detectionTime: new Date(Date.now() - 1500000),
    sevenDayTrend: generateTrend(35),
  },
];

export const mockAlerts: Alert[] = [
  {
    id: "A001",
    sensorId: "S003",
    detectionTime: new Date(Date.now() - 7200000),
    waterLevelDifference: 72,
    blockageEstimate: 85,
    acknowledged: true,
    acknowledgedTime: new Date(Date.now() - 6900000),
    resolved: false,
    notes:
      "Critical blockage detected. Dispatch team sent to inspect and clear the drainage pipe.",
  },
  {
    id: "A002",
    sensorId: "S010",
    detectionTime: new Date(Date.now() - 5400000),
    waterLevelDifference: 62,
    blockageEstimate: 70,
    acknowledged: true,
    acknowledgedTime: new Date(Date.now() - 5100000),
    resolved: false,
    notes: "High risk alert. Monitoring situation closely.",
  },
  {
    id: "A003",
    sensorId: "S002",
    detectionTime: new Date(Date.now() - 3600000),
    waterLevelDifference: 45,
    blockageEstimate: 48,
    acknowledged: false,
    resolved: false,
    notes: "",
  },
  {
    id: "A004",
    sensorId: "S007",
    detectionTime: new Date(Date.now() - 86400000),
    waterLevelDifference: 38,
    blockageEstimate: 40,
    acknowledged: true,
    acknowledgedTime: new Date(Date.now() - 82800000),
    resolved: true,
    resolvedTime: new Date(Date.now() - 79200000),
    resolutionTime: 60,
    notes: "Debris removed. Flow normalized.",
  },
];

export const mockActionLogs: ActionLog[] = [
  {
    id: "L001",
    alertId: "A001",
    action: "acknowledged",
    timestamp: new Date(Date.now() - 6900000),
    user: "John Martinez",
    comments: "Dispatcher acknowledged alert. Team en route.",
  },
  {
    id: "L002",
    alertId: "A001",
    action: "note",
    timestamp: new Date(Date.now() - 6300000),
    user: "Sarah Chen",
    comments: "Team arrived on site. Conducting visual inspection.",
  },
  {
    id: "L003",
    alertId: "A002",
    action: "acknowledged",
    timestamp: new Date(Date.now() - 5100000),
    user: "Mike Johnson",
    comments: "High priority alert logged. Monitoring continue.",
  },
  {
    id: "L004",
    alertId: "A004",
    action: "acknowledged",
    timestamp: new Date(Date.now() - 82800000),
    user: "David Brown",
    comments: "Maintenance team dispatched.",
  },
  {
    id: "L005",
    alertId: "A004",
    action: "fixed",
    timestamp: new Date(Date.now() - 79200000),
    user: "David Brown",
    comments: "Drainage pipe cleared. Flow restored to normal.",
  },
];
