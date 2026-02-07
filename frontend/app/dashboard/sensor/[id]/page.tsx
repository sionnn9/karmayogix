"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface Sensor {
  sensorId: string;
  waterLevel: number;
  levelLabel: "low" | "medium" | "high" | "null";
  lastUpdated: string | null;
}

export default function SensorDetailPage() {
  const params = useParams();
  const sensorId = params.id as string;

  const [sensor, setSensor] = useState<Sensor | null>(null);

  useEffect(() => {
    async function getSensor() {
      try {
        const res = await fetch(
          `https://karmayogix.onrender.com/api/sensors/${sensorId}`,
        );
        const data = await res.json();
        setSensor(data.data.sensor);
      } catch (err) {
        console.error(err);
      }
    }
    getSensor();
  }, [sensorId]);

  if (!sensor) return <p className="p-10">Loading sensor...</p>;

  // ----- styling helpers -----
  const levelColor =
    sensor.levelLabel === "low"
      ? "#10b981"
      : sensor.levelLabel === "medium"
        ? "#f59e0b"
        : "#ef4444";

  const levelBg =
    sensor.levelLabel === "low"
      ? "bg-green-100 text-green-700"
      : sensor.levelLabel === "medium"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700";

  const percentage = sensor.waterLevel;
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>

          <h1 className="text-3xl font-bold text-gray-900">
            Sensor {sensor.sensorId}
          </h1>
          <p className="text-gray-500 mt-1">
            Last updated:{" "}
            {sensor.lastUpdated
              ? new Date(sensor.lastUpdated).toLocaleString()
              : "No data yet"}
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Water Level Circle */}
          <div className="bg-white rounded-2xl border p-10 shadow-sm">
            <h2 className="text-lg font-semibold mb-6">Water Level</h2>

            <div className="flex justify-center">
              <div className="relative w-44 h-44">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="88"
                    cy="88"
                    r="70"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="88"
                    cy="88"
                    r="70"
                    stroke={levelColor}
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-4xl font-bold">{percentage}%</p>
                  <span
                    className={`mt-2 px-3 py-1 rounded-full text-sm font-semibold ${levelBg}`}
                  >
                    {sensor.levelLabel.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-white rounded-2xl border p-10 shadow-sm">
            <h2 className="text-lg font-semibold mb-6">Details</h2>

            <div className="space-y-5 text-gray-700">
              <div>
                <p className="text-sm text-gray-500">Sensor ID</p>
                <p className="text-xl font-semibold">{sensor.sensorId}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Water Level</p>
                <p className="text-xl font-semibold">{sensor.waterLevel}%</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Risk Level</p>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${levelBg}`}
                >
                  {sensor.levelLabel.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
