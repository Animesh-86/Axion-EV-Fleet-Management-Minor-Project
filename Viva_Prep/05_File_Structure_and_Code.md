# 05 — File Structure & Code Deep Dive

This document is about location and responsibility. In a viva, one of the easiest ways to show that you actually understand your codebase is to explain exactly where each major piece of logic lives and why it belongs there.

---

## Repository Map

### Backend: `Axion-Backend`
The backend is the operational core. It receives telemetry, processes it, and makes derived fleet state available to the rest of the system.

Important files and concepts:

- `com.axion.ingestion.api.FleetController`: exposes fleet-facing REST endpoints for the dashboard
- `com.axion.ingestion.producer.TelemetryProducer`: publishes normalized telemetry into Kafka
- `com.axion.ingestion.consumer.TelemetryConsumer`: consumes Kafka events and triggers downstream updates
- `com.axion.ingestion.service.DigitalTwinService`: manages live vehicle state in Redis
- `com.axion.ingestion.health.HealthScoreEngine`: calculates and explains the health score
- `com.axion.ingestion.adapter.GenericTelemetryAdapter`: converts raw vendor-specific telemetry into the canonical format
- `com.axion.ingestion.model`: contains the data structures that represent telemetry and digital twin state

Why this structure is useful:

- controllers stay focused on HTTP concerns
- producers and consumers stay focused on event flow
- services hold the actual business logic
- adapters isolate format differences
- the code remains easier to test and reason about

### Frontend: `Axion-Frontend`
The frontend is a route-based React application with a landing page, auth flow, and authenticated dashboard shell.

Important files and concepts:

- `src/app/App.tsx`: boots the app and renders the router provider
- `src/app/routes.tsx`: defines the route structure
- `src/components/RootLayout.tsx`: wraps authenticated dashboard content
- `src/components/TopBar.tsx`: dashboard header, navigation, and user actions
- `src/components/auth/LoginPage.tsx`: login screen and navigation back to landing
- `src/components/auth/SignupPage.tsx`: signup screen and navigation back to landing
- `src/components/LandingPage.tsx`: assembles the marketing/landing sections
- `src/components/landing/*`: the landing page content blocks, including hero, analytics, and footer

Why this structure is useful:

- page concerns are separated cleanly
- route URLs map directly to major user flows
- dashboard shell and landing page do not interfere with each other
- the UI becomes easier to maintain as the project grows

### Simulator: `Axion-Simulator`
The simulator generates realistic telemetry and fault scenarios.

Important files and concepts:

- `main.py`: entry point that loads the fleet and starts vehicle tasks
- `core/vehicle.py`: vehicle state model and per-vehicle update loop
- `core/telemetry_builder.py`: builds telemetry payloads
- `emitters/rest_emitter.py` and `emitters/mqtt_emitter.py`: send payloads to the backend
- `scenarios/*`: inject different fault conditions and driving patterns
- `ota/*`: simulates the OTA update lifecycle

---

## Backend Walkthrough: `DigitalTwinService`
The `DigitalTwinService` is one of the most important classes in the backend because it acts like the live memory of the fleet.

### What it does
It takes incoming telemetry and turns it into a current-state record for each vehicle.

### Typical sequence
1. A canonical telemetry event arrives from Kafka.
2. The service checks whether the incoming event is newer than the stored state.
3. If the incoming event is stale, it is ignored to avoid overwriting better data.
4. If it is fresh, the service builds a snapshot of the vehicle state.
5. The health engine runs against that snapshot.
6. The resulting digital twin state is written to Redis with TTL.

### Why this matters
This service gives the system correctness. Without the freshness check, older events could overwrite newer ones, which would make the dashboard inaccurate. Without the TTL, stale vehicles would stay in the live cache forever and the dashboard would not be able to distinguish active from offline assets.

---

## Backend Walkthrough: Health Scoring
The health engine is rule-based. That means the score is not magical or opaque. It is the result of a defined set of deductions.

What makes this important:

- it is easier to explain in a viva
- it is easier to test than a black-box model
- it gives operators a reason for the score
- it lets the dashboard highlight specific problems rather than just a numeric total

You can describe the logic as:

1. take battery SOC, temperature, and other relevant readings
2. compare them against threshold rules
3. subtract points when a rule is violated
4. attach a reason string to each deduction
5. return both the score and the explanation list

---

## Simulator Walkthrough: `vehicle.py`
Each simulated vehicle behaves like a small state machine.

The asynchronous loop works like this:

```python
async def run(self):
    while True:
        self.update_physics()
        payload = self.build_telemetry()
        await self.emitter.send(payload)
        await asyncio.sleep(self.interval)
```

Why this works well:

- every vehicle gets its own coroutine
- one vehicle sleeping does not block the others
- the code remains easy to read because each cycle is explicit
- the approach scales much better than one-thread-per-vehicle simulation for this project

The important idea is that the simulator is cooperative. When one vehicle is waiting, the event loop can continue updating the others.

---

## Frontend Walkthrough: Route Structure
The frontend uses routes to separate concerns:

- landing page for introduction and discovery
- login/signup for authentication
- dashboard for live operations
- architecture page for the technical overview

This is better than toggling everything in a single component because it keeps each experience focused and easier to maintain.

---

## What To Say In A Viva
If the examiner asks where the important code lives, answer like this:

The backend logic is centered in the ingestion service, digital twin service, health engine, and telemetry consumer. The frontend logic is organized into routed pages and reusable landing/dashboard components. The simulator is split into vehicle models, emitters, scenarios, and OTA logic. This structure keeps the system modular and makes each responsibility easy to explain.
