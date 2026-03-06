import { Vehicle, OTACampaign, TelemetryEvent, FleetStats } from '../types';

export const mockVehicles: Vehicle[] = [
  {
    id: 'VH-2847-TX',
    vendor: 'Tesla',
    model: 'Model 3',
    battery: 87,
    temperature: 32,
    healthScore: 94,
    status: 'online',
    otaEligible: true,
    speed: 65,
    lastUpdate: new Date(Date.now() - 2000),
    connectionQuality: 'excellent',
    location: 'San Francisco, CA'
  },
  {
    id: 'VH-5621-NY',
    vendor: 'Rivian',
    model: 'R1T',
    battery: 42,
    temperature: 45,
    healthScore: 76,
    status: 'online',
    otaEligible: true,
    speed: 0,
    lastUpdate: new Date(Date.now() - 5000),
    connectionQuality: 'good',
    location: 'New York, NY'
  },
  {
    id: 'VH-8392-CA',
    vendor: 'Lucid',
    model: 'Air',
    battery: 15,
    temperature: 58,
    healthScore: 45,
    status: 'online',
    otaEligible: false,
    speed: 0,
    lastUpdate: new Date(Date.now() - 8000),
    connectionQuality: 'poor',
    location: 'Los Angeles, CA'
  },
  {
    id: 'VH-1247-FL',
    vendor: 'Ford',
    model: 'F-150 Lightning',
    battery: 91,
    temperature: 28,
    healthScore: 98,
    status: 'online',
    otaEligible: true,
    speed: 48,
    lastUpdate: new Date(Date.now() - 1000),
    connectionQuality: 'excellent',
    location: 'Miami, FL'
  },
  {
    id: 'VH-9384-WA',
    vendor: 'Tesla',
    model: 'Model Y',
    battery: 68,
    temperature: 35,
    healthScore: 88,
    status: 'offline',
    otaEligible: true,
    speed: 0,
    lastUpdate: new Date(Date.now() - 120000),
    connectionQuality: 'poor',
    location: 'Seattle, WA'
  },
  {
    id: 'VH-4521-TX',
    vendor: 'Rivian',
    model: 'R1S',
    battery: 79,
    temperature: 31,
    healthScore: 92,
    status: 'online',
    otaEligible: true,
    speed: 72,
    lastUpdate: new Date(Date.now() - 3000),
    connectionQuality: 'excellent',
    location: 'Austin, TX'
  },
  {
    id: 'VH-7654-CO',
    vendor: 'Tesla',
    model: 'Model S',
    battery: 54,
    temperature: 38,
    healthScore: 82,
    status: 'online',
    otaEligible: true,
    speed: 0,
    lastUpdate: new Date(Date.now() - 4000),
    connectionQuality: 'good',
    location: 'Denver, CO'
  },
  {
    id: 'VH-3298-AZ',
    vendor: 'Lucid',
    model: 'Air Dream',
    battery: 23,
    temperature: 62,
    healthScore: 58,
    status: 'online',
    otaEligible: false,
    speed: 0,
    lastUpdate: new Date(Date.now() - 6000),
    connectionQuality: 'poor',
    location: 'Phoenix, AZ'
  }
];

export const mockCampaigns: OTACampaign[] = [
  {
    id: 'OTA-2024-001',
    name: 'Battery Management Firmware v2.4.1',
    targetFleet: 85,
    progress: 67,
    status: 'running',
    version: 'v2.4.1',
    vehicles: 142,
    startedAt: new Date(Date.now() - 3600000 * 4),
    canaryProgress: 100
  },
  {
    id: 'OTA-2024-002',
    name: 'Thermal Control System Update',
    targetFleet: 45,
    progress: 100,
    status: 'completed',
    version: 'v1.8.3',
    vehicles: 89,
    startedAt: new Date(Date.now() - 3600000 * 24 * 2),
    canaryProgress: 100
  },
  {
    id: 'OTA-2024-003',
    name: 'Autopilot Safety Patch',
    targetFleet: 100,
    progress: 34,
    status: 'paused',
    version: 'v3.1.0',
    vehicles: 203,
    startedAt: new Date(Date.now() - 3600000 * 6),
    canaryProgress: 85
  },
  {
    id: 'OTA-2023-089',
    name: 'Connectivity Module Rollback',
    targetFleet: 12,
    progress: 100,
    status: 'rolled-back',
    version: 'v1.2.4',
    vehicles: 24,
    startedAt: new Date(Date.now() - 3600000 * 24 * 5),
    canaryProgress: 45
  }
];

export const mockTelemetryEvents: TelemetryEvent[] = [
  {
    id: 'TEL-001',
    vehicleId: 'VH-2847-TX',
    type: 'battery',
    message: 'Battery level optimal at 87%',
    timestamp: new Date(Date.now() - 2000),
    severity: 'info'
  },
  {
    id: 'TEL-002',
    vehicleId: 'VH-8392-CA',
    type: 'temperature',
    message: 'High temperature detected: 58°C',
    timestamp: new Date(Date.now() - 8000),
    severity: 'warning'
  },
  {
    id: 'TEL-003',
    vehicleId: 'VH-5621-NY',
    type: 'battery',
    message: 'Battery approaching medium level: 42%',
    timestamp: new Date(Date.now() - 12000),
    severity: 'warning'
  },
  {
    id: 'TEL-004',
    vehicleId: 'VH-1247-FL',
    type: 'connection',
    message: 'Connection quality excellent',
    timestamp: new Date(Date.now() - 15000),
    severity: 'info'
  },
  {
    id: 'TEL-005',
    vehicleId: 'VH-8392-CA',
    type: 'alert',
    message: 'Critical: Battery level below 20%',
    timestamp: new Date(Date.now() - 18000),
    severity: 'critical'
  },
  {
    id: 'TEL-006',
    vehicleId: 'VH-4521-TX',
    type: 'speed',
    message: 'Vehicle speed: 72 mph',
    timestamp: new Date(Date.now() - 22000),
    severity: 'info'
  },
  {
    id: 'TEL-007',
    vehicleId: 'VH-9384-WA',
    type: 'connection',
    message: 'Vehicle offline - last seen 2 minutes ago',
    timestamp: new Date(Date.now() - 120000),
    severity: 'warning'
  }
];

export const mockFleetStats: FleetStats = {
  totalVehicles: 203,
  onlineVehicles: 187,
  averageHealth: 84.5,
  activeCampaigns: 2
};

export const generateBatteryTrendData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    average: 75 + Math.random() * 15 - 5,
    degradation: 100 - (i * 0.8 + Math.random() * 2)
  }));
};

export const generateTemperatureData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    avg: 30 + Math.random() * 15,
    anomalies: Math.random() > 0.7 ? 1 : 0
  }));
};

export const generateHealthTrendData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    day: `Day ${i + 1}`,
    score: 85 - (i * 0.5) + (Math.random() * 5 - 2.5)
  }));
};
