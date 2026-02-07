'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { showToast } from '@/lib/toast';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { mockSensors, mockAlerts } from '@/lib/mock-data';
import { ArrowLeft, Download } from 'lucide-react';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const years = [2023, 2024, 2025];

export default function ReportsPage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Calculate statistics
  const monthlyAlerts = Array.from({ length: 12 }, (_, i) => ({
    month: months[i].slice(0, 3),
    alerts: Math.floor(Math.random() * 40) + 10,
  }));

  const responseTimeData = [
    { week: 'Week 1', avgTime: 120 },
    { week: 'Week 2', avgTime: 95 },
    { week: 'Week 3', avgTime: 78 },
    { week: 'Week 4', avgTime: 65 },
  ];

  const topProblematicSensors = mockSensors
    .map((sensor) => ({
      id: sensor.id,
      location: sensor.location,
      alertCount: mockAlerts.filter((a) => a.sensorId === sensor.id).length,
    }))
    .sort((a, b) => b.alertCount - a.alertCount)
    .slice(0, 5);

  const totalAlerts = mockAlerts.length;
  const avgResponseTime = Math.round(
    mockAlerts
      .filter((a) => a.resolutionTime)
      .reduce((sum, a) => sum + (a.resolutionTime || 0), 0) /
      (mockAlerts.filter((a) => a.resolutionTime).length || 1)
  );
  const resolvedAlerts = mockAlerts.filter((a) => a.resolved).length;
  const resolutionRate = Math.round(
    (resolvedAlerts / totalAlerts) * 100
  );

  const handleGenerateReport = () => {
    // Report generation logic - in a real app, this would fetch/generate data
    showToast(
      `Report generated for ${months[selectedMonth]} ${selectedYear}`,
      'success'
    );
  };

  const handleDownloadCSV = () => {
    // CSV export logic
    const csvContent = [
      [
        'Sensor ID',
        'Location',
        'Area',
        'Lane',
        'Risk Score',
        'Alert Count',
        'Status',
        'Last Updated',
      ],
      ...mockSensors.map((sensor) => [
        sensor.id,
        sensor.location,
        sensor.area,
        sensor.lane,
        sensor.riskScore,
        mockAlerts.filter((a) => a.sensorId === sensor.id).length,
        sensor.status,
        sensor.lastUpdated,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent)
    );
    element.setAttribute(
      'download',
      `report_${months[selectedMonth]}_${selectedYear}.csv`
    );
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast('CSV report downloaded successfully', 'success');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Report Generator */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Generate Report
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Month
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                {months.map((month, index) => (
                  <option key={index} value={index}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <Button onClick={handleGenerateReport} className="bg-blue-600 hover:bg-blue-700">
              Generate Report
            </Button>
            <Button
              onClick={handleDownloadCSV}
              variant="outline"
            >
              <Download className="w-4 h-4 mr-2" />
              Download CSV
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-2">Total Alerts</p>
            <p className="text-3xl font-bold text-gray-900">{totalAlerts}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-2">Avg Response Time</p>
            <p className="text-3xl font-bold text-gray-900">{avgResponseTime} min</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-2">Resolution Rate</p>
            <p className="text-3xl font-bold text-green-600">{resolutionRate}%</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-2">Resolved Alerts</p>
            <p className="text-3xl font-bold text-gray-900">{resolvedAlerts}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Monthly Trend */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Monthly Alert Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyAlerts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="alerts" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Response Time Improvement */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Response Time Improvement
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="avgTime"
                  stroke="#10b981"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Problematic Sensors */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Top Problematic Sensors
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">
                    Sensor ID
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">
                    Alert Count
                  </th>
                </tr>
              </thead>
              <tbody>
                {topProblematicSensors.map((sensor) => (
                  <tr
                    key={sensor.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {sensor.id}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{sensor.location}</td>
                    <td className="px-6 py-4 font-semibold text-red-600">
                      {sensor.alertCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Peak Alert Times */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Peak Alert Times
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { time: '6:00 - 9:00 AM', alerts: 15, label: 'Morning Peak' },
              { time: '12:00 - 2:00 PM', alerts: 12, label: 'Afternoon' },
              { time: '5:00 - 7:00 PM', alerts: 18, label: 'Evening Peak' },
              { time: '10:00 PM - 6:00 AM', alerts: 8, label: 'Night' },
            ].map((slot, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">{slot.label}</p>
                <p className="text-lg font-semibold text-gray-900 mb-1">
                  {slot.alerts} alerts
                </p>
                <p className="text-xs text-gray-500">{slot.time}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
