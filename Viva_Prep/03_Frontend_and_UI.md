# 03 — Frontend & UI: The Control Center

The Axion Frontend is designed as a **mission-critical dashboard**. It prioritizes visibility, real-time updates, and an aesthetic that feels like a modern cockpit.

---

## 🎨 Design Philosophy: Glassmorphism & Dark Mode
We chose a **Glassmorphism** aesthetic (frosted glass effects) over a dark theme for several reasons:
1.  **High Contrast**: Highlights critical metrics like Battery SOC and Health Scores against a deep background.
2.  **Modern Feel**: Aligns with modern OS design (like macOS and Windows 11), making the academic project feel like a professional product.
3.  **Visual Hierarchy**: Uses depth and transparency to separate navigation from data visualization.

---

## 🛠 Technology Stack (What & Why?)

### 1. React 18 & TypeScript
*   **What**: React is a JavaScript library for building user interfaces. TypeScript is a superset of JavaScript that adds "types" (like defining that a `batteryLevel` must be a number).
*   **Why**: React allows us to build "Reusable Components" (like a `VehicleCard`). TypeScript prevents common bugs by catching errors before the code even runs.

### 2. Vite
*   **What**: A modern build tool that makes frontend development extremely fast.
*   **Why**: Unlike older tools (like Create-React-App), Vite provides "Hot Module Replacement," allowing us to see UI changes instantly.

### 3. Tailwind CSS & Shadcn UI
*   **What**: Tailwind is a "utility-first" CSS framework. Shadcn UI is a collection of high-quality components built on Radix UI.
*   **Why**: Tailwind allows us to build complex designs without writing custom CSS files. Shadcn provides the "Premium" look for Tables, Buttons, and KPI Cards.

### 4. Recharts & Framer Motion
*   **What**: Recharts is a charting library. Framer Motion is an animation library.
*   **Why**: Recharts helps us visualize "Fleet Health Distribution" (Pie charts) and "Telemetry Trends." Framer Motion adds smooth transitions when switching between pages.

---

## 🕒 Real-Time Data Strategy

In this version of Axion, we used **Short Polling** (3-5 seconds):
-   **How it works**: Every 3-5 seconds, the dashboard asks the Backend: *"Give me the latest state of all vehicles."*
-   **Why not WebSockets?**: While WebSockets are better for "instant" updates, Short Polling is more reliable for 250 vehicles in an academic setting, as it handles network reconnections more gracefully and is easier to debug.

---

## 🗺 Dashboard Layout

1.  **Global KPIs**: Total Vehicles, Online Stats, Average SOC, and Fleet Health.
2.  **Fleet Grid**: A high-density grid showing every vehicle's status at a glance.
3.  **Digital Twin View**: A detailed page for a single vehicle, showing:
    -   **Battery Physics**: Voltage, Current, Temperature.
    -   **Motion**: Speed, Odometer.
    -   **Diagnosis**: Explainable health deductions.
4.  **OTA Manager**: A control panel to trigger and monitor firmware updates across the fleet.
