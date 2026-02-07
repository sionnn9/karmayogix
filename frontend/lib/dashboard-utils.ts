import { Sensor } from "./mock-data";

export function getRiskLevel(score: number): "low" | "medium" | "high" {
  if (score <= 30) return "low";
  if (score <= 60) return "medium";
  return "high";
}

export function getRiskColor(score: number): string {
  const level = getRiskLevel(score);
  if (level === "low") return "green";
  if (level === "medium") return "yellow";
  return "red";
}

export function getRiskBgColor(score: number): string {
  const level = getRiskLevel(score);
  if (level === "low") return "bg-green-50";
  if (level === "medium") return "bg-yellow-50";
  return "bg-red-50";
}

export function getRiskBadgeClass(score: number): string {
  const level = getRiskLevel(score);
  if (level === "low") return "bg-green-100 text-green-800";
  if (level === "medium") return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
}

export function getStatusColor(status: string): string {
  if (status === "online") return "bg-green-500";
  if (status === "offline") return "bg-red-500";
  return "bg-yellow-500";
}

export function getAlertMessage(riskScore: number): string {
  if (riskScore <= 30) return "Normal flow";
  if (riskScore <= 60) return "Partial blockage";
  return "CRITICAL: Immediate attention";
}

export function formatDate(date: Date): string {
  return date.toLocaleString();
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getTimeSince(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export function calculateSummaryStats(sensors: Sensor[]) {
  const active = sensors.filter((s) => s.status === "online").length;
  const offline = sensors.filter((s) => s.status === "offline").length;
  const highRisk = sensors.filter((s) => s.riskScore >= 61).length;
  const mediumRisk = sensors.filter(
    (s) => s.riskScore >= 31 && s.riskScore <= 60,
  ).length;
  const lowRisk = sensors.filter((s) => s.riskScore <= 30).length;

  return {
    active,
    offline,
    highRisk,
    mediumRisk,
    lowRisk,
    avgResponseTime: 145, // minutes - demo data
  };
}

export function filterSensors(
  sensors: Sensor[],
  riskFilter: string,
  statusFilter: string,
  searchTerm: string,
): Sensor[] {
  let filtered = sensors;

  // Risk filter
  if (riskFilter !== "all") {
    filtered = filtered.filter((s) => {
      if (riskFilter === "high") return s.riskScore >= 61;
      if (riskFilter === "medium")
        return s.riskScore >= 31 && s.riskScore <= 60;
      if (riskFilter === "low") return s.riskScore <= 30;
      return true;
    });
  }

  // Status filter
  if (statusFilter !== "all") {
    filtered = filtered.filter((s) => s.status === statusFilter);
  }

  // Search filter
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (s) =>
        s.id.toLowerCase().includes(term) ||
        s.location.toLowerCase().includes(term) ||
        s.area.toLowerCase().includes(term) ||
        s.lane.toLowerCase().includes(term),
    );
  }

  return filtered;
}

export function exportToCSV(sensors: Sensor[], alerts: any[]): string {
  const headers = [
    "Sensor ID",
    "Location",
    "Area",
    "Lane",
    "Status",
    "Risk Score",
    "Water Level Difference",
    "Blockage Estimate",
    "Last Updated",
  ];

  const rows = sensors.map((s) => [
    s.id,
    s.location,
    s.area,
    s.lane,
    s.status,
    s.riskScore,
    s.waterLevelDifference,
    s.blockageEstimate,
    s.lastUpdated.toISOString(),
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((r) => r.map((v) => `"${v}"`).join(",")),
  ].join("\n");

  return csvContent;
}
