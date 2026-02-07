"use client";

import React, { useRef, useState, Suspense } from "react";
import Link from "next/link";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Float,
  MeshWobbleMaterial,
  ContactShadows,
} from "@react-three/drei";
import { Button } from "@/components/ui/button";
import {
  Droplets,
  AlertTriangle,
  MapPin,
  Zap,
  ArrowRight,
  Shield,
} from "lucide-react";

function SewerModel() {
  const gateRef = useRef<THREE.Mesh>(null);
  const upstreamWaterRef = useRef<THREE.Mesh>(null);
  const [isBlocked, setIsBlocked] = useState(false);

  useFrame(() => {
    // 1. Gate Animation
    const targetGateY = isBlocked ? -0.4 : 1.2;
    if (gateRef.current) {
      gateRef.current.position.y = THREE.MathUtils.lerp(
        gateRef.current.position.y,
        targetGateY,
        0.1,
      );
    }

    // 2. Upstream Water Animation (Rising 3D Block)
    // We adjust the Y position and slightly increase the Y scale for a "filling" effect
    const targetWaterY = isBlocked ? -0.4 : -1.1;
    if (upstreamWaterRef.current) {
      upstreamWaterRef.current.position.y = THREE.MathUtils.lerp(
        upstreamWaterRef.current.position.y,
        targetWaterY,
        0.05,
      );
    }
  });

  return (
    <group onClick={() => setIsBlocked(!isBlocked)}>
      {/* 1. Concrete Vault (Light Blue/Slate) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 3, 5]} />
        <meshStandardMaterial
          color="#cbd5e1"
          side={THREE.BackSide}
          roughness={1}
        />
      </mesh>

      {/* 2. Motorized Gate */}
      <mesh ref={gateRef} position={[0, 1.2, 0]}>
        <boxGeometry args={[3.98, 2.2, 0.1]} />
        <meshStandardMaterial
          color={isBlocked ? "#f97316" : "#64748b"}
          metalness={0.6}
        />
      </mesh>

      {/* 3. UPSTREAM WATER (3D Volume - Non-Transparent) */}
      {/* Using BoxGeometry instead of Plane ensures it looks solid from the side */}
      <mesh ref={upstreamWaterRef} position={[0, -1.1, 1.25]}>
        <boxGeometry args={[3.99, 1, 2.5]} />
        <meshStandardMaterial
          color="#1e3a8a" // Deep Navy Blue
          roughness={0.3}
          metalness={0.2}
          emissive="#1e3a8a"
          emissiveIntensity={0.2}
          transparent={false} // Solid color
        />
      </mesh>

      {/* 4. DOWNSTREAM WATER (3D Volume - Static) */}
      <mesh position={[0, -1.1, -1.25]}>
        <boxGeometry args={[3.99, 1, 2.5]} />
        <meshStandardMaterial color="#1e40af" transparent={false} />
      </mesh>

      {/* 5. Sensors */}
      <mesh position={[-1.9, 0.5, 1.5]}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial
          color={isBlocked ? "#ff0000" : "#3b82f6"}
          emissive={isBlocked ? "#ff0000" : "#3b82f6"}
          emissiveIntensity={2}
        />
      </mesh>
      <mesh position={[-1.9, 0.5, -1.9]}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial emissive="#3b82f6" emissiveIntensity={2} />
      </mesh>
      <mesh position={[1.9, 0.5, -1.9]}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial emissive="#3b82f6" emissiveIntensity={2} />
      </mesh>
      <mesh position={[1.9, 0.5, 1.5]}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial
          color={isBlocked ? "#ff0000" : "#3b82f6"}
          emissive={isBlocked ? "#ff0000" : "#3b82f6"}
          emissiveIntensity={2}
        />
      </mesh>

      <ambientLight intensity={0.8} />
      <pointLight position={[5, 5, 5]} intensity={1.5} />
      <spotLight position={[0, 5, 2]} intensity={2} angle={0.5} />
    </group>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Navigation */}
      <nav className="border-b border-gray-200 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Droplets className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold text-blue-900">
              Smart Drainage Monitoring
            </h1>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center text-center lg:text-left">
          <div>
            <h2 className="text-4xl sm:text-6xl font-extrabold text-blue-900 mb-6 leading-tight">
              Sewer Blockage <br />
              <span className="text-blue-600">Prevention IoT</span>
            </h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Real-time monitoring and automated gate control to prevent urban
              flooding caused by debris.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 h-14 px-8 rounded-xl shadow-lg"
                >
                  Access Dashboard <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* 3D CANVAS COMPONENT */}
          <div className="h-[500px] w-full bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-4 left-4 z-10 bg-black/40 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-bold text-white uppercase tracking-widest">
              Live Simulation: Click to Toggle Blockage
            </div>
            <Canvas shadows>
              <Suspense fallback={null}>
                <PerspectiveCamera makeDefault position={[6, 4, 6]} />
                <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
                  <SewerModel />
                </Float>
                <OrbitControls
                  enableZoom={false}
                  autoRotate
                  autoRotateSpeed={0.4}
                />
                <ContactShadows
                  position={[0, -1.5, 0]}
                  opacity={0.4}
                  scale={10}
                  blur={2}
                  far={4.5}
                />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h3 className="text-3xl font-bold text-center text-blue-900 mb-12">
            How It Works
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-slate-50 rounded-2xl">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Detection
              </h4>
              <p className="text-gray-600">
                Dual sensors monitor water level differences on both sides of
                the gate.
              </p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-2xl">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Automation
              </h4>
              <p className="text-gray-600">
                Gate drops automatically when a blockage is detected to stop
                overflow.
              </p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-2xl">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Alerting
              </h4>
              <p className="text-gray-600">
                System notifies the municipality to clean the specific clog
                location.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
