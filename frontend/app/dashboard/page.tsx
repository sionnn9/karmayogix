'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SensorCard } from '@/components/sensor-card';
import { mockSensors } from '@/lib/mock-data';
import {
  calculateSummaryStats,
  filterSensors,
  exportToCSV,
} from '@/lib/dashboard-utils';
import { showToast } from '@/lib/toast';
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
} from 'lucide-react';

export default function DashboardPage() {
  const [sensors, setSensors] = useState(mockSensors);
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const filtered = filterSensors(sensors, riskFilter, statusFilter, searchTerm);
  const stats = calculateSummaryStats(sensors);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    window.location.href = '/login';
  };

  const handleDownloadCSV = () => {
    const csv = exportToCSV(sensors, []);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `drainage-data-${selectedMonth}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('CSV data exported successfully', 'success');
  };

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
            <div className="flex gap-2">
              <Link href="/dashboard/reports">
                <Button variant="outline" className="bg-transparent">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Reports
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 bg-transparent"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by ID, location, or area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Risk" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <Button onClick={handleDownloadCSV} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                CSV
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Summary Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-xs font-medium text-gray-500 mb-1">Total Active</p>
            <p className="text-2xl font-bold text-blue-900">{stats.active}</p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-xs font-medium text-gray-500 mb-1">
              High Priority
            </p>
            <p className="text-2xl font-bold text-red-600">{stats.highRisk}</p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-xs font-medium text-gray-500 mb-1">
              Medium Priority
            </p>
            <p className="text-2xl font-bold text-yellow-600">
              {stats.mediumRisk}
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-xs font-medium text-gray-500 mb-1">
              Low Priority
            </p>
            <p className="text-2xl font-bold text-green-600">{stats.lowRisk}</p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-xs font-medium text-gray-500 mb-1">
              Offline Sensors
            </p>
            <p className="text-2xl font-bold text-gray-600">{stats.offline}</p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-xs font-medium text-gray-500 mb-1">
              Avg Response Time
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {stats.avgResponseTime}m
            </p>
          </div>
        </div>
      </div>

      {/* Sensor Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Sensors ({filtered.length} of {sensors.length})
          </h2>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((sensor) => (
              <SensorCard key={sensor.id} sensor={sensor} />
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
