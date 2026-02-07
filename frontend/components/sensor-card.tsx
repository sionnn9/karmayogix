import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getRiskBgColor } from "@/lib/dashboard-utils";

export interface Sensor2 {
  lastUpdated: string;

  levelLabel: string;

  sensorId: string;

  waterLevel: number;
}

import {
  getRiskBadgeClass,
  getRiskLevel,
  getStatusColor,
  getTimeSince,
} from "@/lib/dashboard-utils";
import { TrendingUp } from "lucide-react";

export function SensorCard({ sensor }: { sensor: Sensor2 }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full $`} />
          <div>
            <h3 className="font-semibold text-gray-900">
              Water Level{"  " + sensor.waterLevel}
            </h3>
            <p className="text-xs text-gray-500">ID:{"  " + sensor.sensorId}</p>
          </div>
        </div>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${getRiskBadgeClass(sensor.waterLevel)}`}
        >
          {sensor.lastUpdated}
        </span>
      </div>

      {/* Risk Score Badge */}
      <div className="mb-4">
        <div
          className={
            (sensor.levelLabel === "low"
              ? "bg-red-500 text-white"
              : sensor.levelLabel === "medium"
                ? "bg-yellow-500 text-white"
                : "bg-green-500 text-white") +
            " inline-block px-3 py-1 rounded-full text-sm font-medium"
          }
        >
          {sensor.levelLabel}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500"></span>
        <Link href={`/dashboard/sensor/${sensor.sensorId}`}>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
