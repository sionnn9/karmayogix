"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SensorCard } from "@/components/sensor-card";
import { mockSensors } from "@/lib/mock-data";
import {
  calculateSummaryStats,
  filterSensors,
  exportToCSV,
} from "@/lib/dashboard-utils";
import { showToast } from "@/lib/toast";
import {
  Droplets,
  Search,
  Download,
  LogOut,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Zap,
  BarChart3,
} from "lucide-react";
import SystemStatusCard from "@/components/SystemStatusCard";

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [sensors, setSensors] = useState<Sensor2[]>([]);
  interface Sensor2 {
    lastUpdated: string;

    levelLabel: string;

    sensorId: string;

    waterLevel: number;
  }

  const fetchSensors = async () => {
    try {
      const API = "https://karmayogix.onrender.com/api/sensors";
      const res = await fetch(API);
      const data = await res.json();
      setSensors(data.data.sensors);
      console.log("Fetched sensors:", data.data.sensors);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSensors();
    const interval = setInterval(fetchSensors, 5000); // refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Droplets className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-blue-900">
                Drainage Monitoring Dashboard
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Sensor Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <SystemStatusCard />
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Sensors ({sensors.length} of {sensors.length})
          </h2>
        </div>

        {sensors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sensors.map((sensor) => (
              <SensorCard key={sensor.sensorId} sensor={sensor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              No sensors found matching your filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
