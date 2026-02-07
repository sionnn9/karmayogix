"use client";
import { useEffect, useState } from "react";

interface Clog {
  from: string;
  to: string;
  difference: number;
}

interface SystemStatus {
  riskScore: number;
  status: "NORMAL" | "WARNING" | "DANGER";
  clogs: Clog[];
  lastUpdated: string | null;
}

export default function SystemStatusCard() {
  const [data, setData] = useState<SystemStatus | null>(null);

  async function getStatus() {
    try {
      const res = await fetch(
        "https://karmayogix.onrender.com/api/system/status",
        { cache: "no-store" },
      );
      const json = await res.json();
      console.log("Fetched system status:", json.data);
      setData(json.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getStatus();
    const interval = setInterval(getStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <p className="p-6">Loading system status...</p>;

  // progress circle math
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progress = (data.riskScore / 100) * circumference;

  const strokeColor =
    data.status === "NORMAL"
      ? "#10b981"
      : data.status === "WARNING"
        ? "#f59e0b"
        : "#ef4444";

  const badgeColor =
    data.status === "NORMAL"
      ? "bg-green-500"
      : data.status === "WARNING"
        ? "bg-yellow-500"
        : "bg-red-500";

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border mb-20">
      <h2 className="text-2xl font-bold mb-6">System Status</h2>

      <div className="flex items-center gap-10">
        {/* Circular Risk Meter */}
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90">
            {/* background circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="10"
            />

            {/* progress circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke={strokeColor}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${progress} ${circumference}`}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-3xl font-bold">{data.riskScore}%</p>
            <p className="text-sm text-gray-500">Risk Score</p>
          </div>
        </div>

        {/* Right side info */}
        <div className="flex-1">
          <span className={`${badgeColor} text-white px-4 py-1 rounded-full`}>
            {data.status}
          </span>

          <p className="mt-3 text-gray-500">
            Last updated: {data.lastUpdated ?? "No data yet"}
          </p>

          {/* Clogs */}
          <div className="mt-6">
            <p className="font-semibold mb-2">Detected Blockages</p>

            {data.clogs.length === 0 ? (
              <p className="text-green-600">No clogs detected</p>
            ) : (
              <ul className="space-y-2">
                {data.clogs.map((clog, i) => (
                  <li
                    key={i}
                    className="bg-red-50 border border-red-200 px-3 py-2 rounded-lg text-red-700"
                  >
                    🚨 {clog.from} → {clog.to} ({clog.difference}% difference)
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
