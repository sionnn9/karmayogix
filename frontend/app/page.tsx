"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Droplets,
  AlertTriangle,
  MapPin,
  Zap,
  ArrowRight,
  Shield,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Droplets className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold text-blue-900">
              Smart Drainage Monitoring
            </h1>
          </div>
          <Link href="/login">
            <Button variant="outline">Sign In</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-4">
            Smart Drainage Monitoring System
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Preventing floods through real-time blockage detection
          </p>
          <Link href="/login">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Access Dashboard <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h3 className="text-3xl font-bold text-center text-blue-900 mb-12">
            How It Works
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Sensors Detect
              </h4>
              <p className="text-gray-600">
                Dual water level sensors monitor drainage pipes continuously
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                System Calculates Risk
              </h4>
              <p className="text-gray-600">
                Advanced algorithms assess blockage probability and severity
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Teams Get Alerts
              </h4>
              <p className="text-gray-600">
                Priority alerts with exact locations sent to response teams
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-3xl font-bold text-center text-blue-900 mb-12">
          Key Features
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                <Droplets className="w-6 h-6" />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                Real-time Monitoring
              </h4>
              <p className="mt-2 text-gray-600">
                Continuous monitoring of all drainage pipes with instant updates
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                <AlertTriangle className="w-6 h-6" />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                Automated Detection
              </h4>
              <p className="mt-2 text-gray-600">
                AI-powered algorithms automatically detect blockage patterns
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                <Zap className="w-6 h-6" />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                Priority Alerts
              </h4>
              <p className="mt-2 text-gray-600">
                Intelligent alert system prioritizes critical situations
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                <MapPin className="w-6 h-6" />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                Location Tracking
              </h4>
              <p className="mt-2 text-gray-600">
                Precise GPS coordinates for rapid dispatch and response
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6" />
              <p>Smart Drainage Monitoring System</p>
            </div>
            <p className="text-sm text-blue-100">
              Municipal Flood Prevention Initiative
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
