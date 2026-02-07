'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
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
  ResponsiveContainer,
} from 'recharts';
import { mockSensors, mockAlerts, mockActionLogs, Alert } from '@/lib/mock-data';
import {
  getRiskLevel,
  getRiskBadgeClass,
  getStatusColor,
  formatDate,
  getTimeSince,
} from '@/lib/dashboard-utils';
import {
  ArrowLeft,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Clock,
  MessageSquare,
  Navigation,
  ExternalLink,
} from 'lucide-react';

export default function SensorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const sensorId = params.id as string;

  const [status, setStatus] = useState<'online' | 'offline' | 'maintenance'>(
    'online'
  );
  const [notes, setNotes] = useState('');
  const [isAcknowledged, setIsAcknowledged] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  const sensor = mockSensors.find((s) => s.id === sensorId);
  const sensorAlerts = mockAlerts.filter((a) => a.sensorId === sensorId);
  const sensorLogs = mockActionLogs.filter((l) =>
    sensorAlerts.some((a) => a.id === l.alertId)
  );

  if (!sensor) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <p className="text-gray-600">Sensor not found</p>
      </div>
    );
  }

  const riskLevel = getRiskLevel(sensor.riskScore);
  const historicalData = Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    risk: sensor.sevenDayTrend[i],
    alerts: Math.floor(Math.random() * 3),
  }));

  const alertHistoryData = Array.from({ length: 30 }, (_, i) => ({
    date: i,
    count: Math.floor(Math.random() * 4),
  }));

  const handleAcknowledge = () => {
    setIsAcknowledged(true);
    showToast('Alert acknowledged successfully', 'success');
  };

  const handleMarkFixed = () => {
    setIsFixed(true);
    showToast('Alert marked as fixed', 'success');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/dashboard"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {sensor.id} - {sensor.location}
              </h1>
              <p className="text-gray-600">
                {sensor.area} • {sensor.lane}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-2">Status</p>
              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as 'online' | 'offline' | 'maintenance')
                }
                className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium"
              >
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Risk Score Circle */}
        <div className="mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="flex items-center justify-center gap-8">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke={
                      riskLevel === 'low'
                        ? '#10b981'
                        : riskLevel === 'medium'
                          ? '#f59e0b'
                          : '#ef4444'
                    }
                    strokeWidth="8"
                    strokeDasharray={`${(sensor.riskScore / 100) * 440} 440`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-4xl font-bold text-gray-900">
                    {sensor.riskScore}
                  </p>
                  <p className="text-sm text-gray-600">Risk Score</p>
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900 mb-4">
                  {riskLevel === 'low'
                    ? 'Low Risk'
                    : riskLevel === 'medium'
                      ? 'Medium Risk'
                      : 'High Risk'}
                </p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600">Water Level Difference</p>
                    <p className="font-semibold text-gray-900">
                      {sensor.waterLevelDifference} cm
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Blockage Estimate</p>
                    <p className="font-semibold text-gray-900">
                      {sensor.blockageEstimate}%
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Detection Time</p>
                    <p className="font-semibold text-gray-900">
                      {formatDate(sensor.detectionTime)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Risk Trend */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              7-Day Risk Trend
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="risk"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Alerts Per Day */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Alerts per Day
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="alerts" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alert History Table */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Alert History
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">
                    Water Level Diff
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">
                    Blockage Est.
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">
                    Resolution Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {sensorAlerts.map((alert) => (
                  <tr
                    key={alert.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      {formatDate(alert.detectionTime)}
                    </td>
                    <td className="px-6 py-4">{alert.waterLevelDifference} cm</td>
                    <td className="px-6 py-4">{alert.blockageEstimate}%</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {alert.resolved ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-green-700">Fixed</span>
                          </>
                        ) : alert.acknowledged ? (
                          <>
                            <Clock className="w-4 h-4 text-yellow-600" />
                            <span className="text-yellow-700">Acknowledged</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                            <span className="text-red-700">Pending</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {alert.resolutionTime
                        ? `${alert.resolutionTime} min`
                        : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Location Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Location Details
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Full Address</p>
                <p className="font-semibold text-gray-900">{sensor.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Lane Number</p>
                <p className="font-semibold text-gray-900">{sensor.lane}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Area</p>
                <p className="font-semibold text-gray-900">{sensor.area}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Coordinates</p>
                <p className="font-semibold text-gray-900">
                  {sensor.latitude.toFixed(4)}, {sensor.longitude.toFixed(4)}
                </p>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open in Maps
                </Button>
                <Button variant="outline" size="sm">
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
              </div>
            </div>
          </div>

          {/* Response Timeline */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Response Timeline
            </h3>
            <div className="space-y-4">
              {sensorAlerts.map((alert) => (
                <div key={alert.id} className="relative pl-6">
                  <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Alert Detected</p>
                    <p className="text-sm text-gray-600">
                      {formatDate(alert.detectionTime)}
                    </p>
                  </div>
                  {alert.acknowledgedTime && (
                    <div className="mt-4">
                      <div className="absolute left-0 top-16 w-3 h-3 rounded-full bg-yellow-500" />
                      <p className="font-semibold text-gray-900">Acknowledged</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(alert.acknowledgedTime)}
                      </p>
                    </div>
                  )}
                  {alert.resolvedTime && (
                    <div className="mt-4">
                      <div className="absolute left-0 top-32 w-3 h-3 rounded-full bg-green-600" />
                      <p className="font-semibold text-gray-900">Fixed</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(alert.resolvedTime)}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-blue-600" />
            Alert Actions
          </h3>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about this alert or sensor..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleAcknowledge}
                disabled={isAcknowledged}
                className={
                  isAcknowledged
                    ? 'bg-gray-300 text-gray-600'
                    : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                }
              >
                {isAcknowledged ? 'Alert Acknowledged' : 'Acknowledge Alert'}
              </Button>
              <Button
                onClick={handleMarkFixed}
                disabled={isFixed}
                className={
                  isFixed
                    ? 'bg-gray-300 text-gray-600'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }
              >
                {isFixed ? 'Marked as Fixed' : 'Mark as Fixed'}
              </Button>
            </div>
          </div>

          {/* Action History */}
          {sensorLogs.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Action History</h4>
              <div className="space-y-3">
                {sensorLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">
                        {log.user}{' '}
                        <span className="text-sm font-normal text-gray-600">
                          {log.action === 'acknowledged'
                            ? 'acknowledged'
                            : log.action === 'fixed'
                              ? 'marked as fixed'
                              : 'added note'}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {log.comments}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {formatDate(log.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
