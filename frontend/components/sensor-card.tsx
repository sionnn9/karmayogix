import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sensor } from "@/lib/mock-data";
import {
  getRiskBadgeClass,
  getRiskLevel,
  getStatusColor,
  getTimeSince,
} from "@/lib/dashboard-utils";
import { TrendingUp } from "lucide-react";

export function SensorCard({ sensor }: { sensor: Sensor }) {
  const riskLevel = getRiskLevel(sensor.riskScore);
  const riskLabel =
    riskLevel === "low"
      ? "Low Risk"
      : riskLevel === "medium"
        ? "Medium Risk"
        : "High Risk";

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full ${getStatusColor(sensor.status)}`}
          />
          <div>
            <h3 className="font-semibold text-gray-900">{sensor.id}</h3>
            <p className="text-xs text-gray-500">{sensor.location}</p>
          </div>
        </div>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${getRiskBadgeClass(sensor.riskScore)}`}
        >
          {sensor.riskScore}
        </span>
      </div>

      {/* Location Info */}
      <div className="mb-4 text-sm">
        <p className="text-gray-600">
          <span className="font-medium text-gray-900">{sensor.area}</span> •{" "}
          {sensor.lane}
        </p>
        <p className="text-gray-500 text-xs mt-1">
          {sensor.latitude.toFixed(4)}, {sensor.longitude.toFixed(4)}
        </p>
      </div>

      {/* Risk Score Badge */}
      <div className="mb-4">
        <div className="inline-block px-3 py-1 rounded-lg text-sm font-medium bg-blue-50 text-blue-900">
          {riskLabel}
        </div>
      </div>

      {/* Alert Message */}
      <div
        className={`mb-4 p-3 rounded-lg text-sm ${
          sensor.riskScore >= 61
            ? "bg-red-50 text-red-900 border border-red-200"
            : sensor.riskScore >= 31
              ? "bg-yellow-50 text-yellow-900 border border-yellow-200"
              : "bg-green-50 text-green-900 border border-green-200"
        }`}
      >
        {sensor.alertMessage}
      </div>

      {/* Trend Sparkline */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-600">7-Day Trend</span>
          <TrendingUp className="w-3 h-3 text-gray-400" />
        </div>
        <div className="flex items-end gap-1 h-12">
          {sensor.sevenDayTrend.map((value, i) => (
            <div
              key={i}
              className="flex-1 bg-blue-200 rounded-t"
              style={{
                height: `${(value / 100) * 100}%`,
                minHeight: "4px",
              }}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
          {getTimeSince(sensor.lastUpdated)}
        </span>
        <Link href={`/dashboard/sensor/${sensor.id}`}>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
