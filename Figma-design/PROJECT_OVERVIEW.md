# Axion - EV Fleet Digital Twin & OTA Orchestration Platform

## Overview
Axion is a modern enterprise dashboard for managing electric vehicle fleets with real-time telemetry monitoring, digital twin visualization, and OTA (Over-The-Air) update orchestration.

## Design System

### Color Palette
- **Primary Background**: `#0B0F14` (Deep dark)
- **Card Background**: `#121821`
- **Primary Accent**: `#00E5FF` (Electric cyan)
- **Secondary Accent**: `#6C63FF` (Violet)

### Status Colors
- **Healthy**: `#00FF85` (Green)
- **Warning**: `#FFB800` (Amber)
- **Critical**: `#FF3D71` (Red)

### Typography
- **Headings & Body**: Inter
- **System Font Stack**: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

## Application Structure

### Authentication Pages
1. **Login Page** (`/login`) - User authentication with email/password
2. **Signup Page** (`/signup`) - New user registration with company/fleet details

### Main Dashboard Screens

1. **Fleet Overview Dashboard** (`/`)
   - Real-time KPI cards (Total Vehicles, Online Vehicles, Avg Health, Active Campaigns)
   - Fleet health distribution (pie chart)
   - Telemetry activity timeline
   - Live event feed with auto-refresh

2. **Vehicle Fleet Table** (`/fleet`)
   - Comprehensive vehicle listing with filtering
   - Battery levels, temperature, health scores
   - Status indicators (online/offline)
   - OTA eligibility badges
   - Quick access to Digital Twin view

3. **Digital Twin View** (`/digital-twin/:vehicleId`)
   - Interactive vehicle visualization
   - Real-time metrics (battery, speed, temperature, last update)
   - Live telemetry charts (battery & temperature history)
   - Vehicle state monitoring
   - Recent event history

4. **OTA Campaign Manager** (`/ota-campaigns`)
   - Campaign cards with status tracking
   - Progress indicators with animations
   - Canary rollout visualization
   - Campaign controls (Start, Pause, Rollback)
   - Status badges (Running, Paused, Completed, Rolled Back)

5. **Fleet Analytics** (`/analytics`)
   - Battery degradation trends
   - Temperature anomaly detection
   - Health score evolution
   - AI-powered insights panel
   - Explainable health analysis

6. **Simulator Control Panel** (`/simulator`)
   - Test scenario injection
   - Fleet configuration controls
   - Live event logging
   - Scenario controls (Battery Drain, Temperature Spike, Network Failure)

7. **Settings** (`/settings`)
   - Account management
   - Notifications
   - Security settings
   - Data & privacy
   - API integrations

## Key Features

### Real-time Updates
- Live telemetry data with animated counters
- Auto-refreshing event feeds
- Smooth state transitions

### Animations
- Smooth micro-animations using Motion (Framer Motion)
- Hover effects with glow
- Loading skeletons
- Animated progress bars
- Live pulse indicators

### Data Visualization
- Recharts for all charts (pie, line, area, bar)
- Color-coded health indicators
- Interactive tooltips
- Responsive chart layouts

### Navigation
- React Router with Data Mode
- Sidebar navigation with active state highlighting
- Breadcrumb-style page headers
- 404 error handling

## Mock Data
All data is simulated using mock datasets located in `/src/app/data/mockData.ts`:
- 8 sample vehicles with varying statuses
- 4 OTA campaigns in different states
- Telemetry events with severity levels
- Auto-generated trend data for analytics

## Technical Stack
- **Framework**: React 18
- **Routing**: React Router v7 (Data Mode)
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Icons**: Lucide React
- **Animations**: Motion (motion/react)
- **Build Tool**: Vite

## Navigation Map
```
/login              → Login Page
/signup             → Signup Page
/                   → Fleet Overview Dashboard (default)
/fleet              → Vehicle Fleet Table
/digital-twin/:id   → Digital Twin View
/ota-campaigns      → OTA Campaign Manager
/analytics          → Fleet Analytics
/simulator          → Simulator Control Panel
/settings           → Settings
/*                  → 404 Not Found
```

## Design Principles
1. **Dark Mode First**: Optimized for low-light environments
2. **Information Dense**: Maximum data visibility without clutter
3. **Technical Aesthetic**: Inspired by Tesla, Datadog, and Stripe
4. **Performance**: Smooth 60fps animations
5. **Responsive**: Works on all screen sizes
6. **Enterprise Ready**: Professional UI suitable for operators and engineers
