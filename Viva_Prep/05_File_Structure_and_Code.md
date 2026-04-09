# 05 — File Structure & Code Deep Dive

To impress your examiners, you need to show them you know exactly **where** each piece of logic lives. Here is a map of the most important files in the Axion repository.

---

## 📂 Repository Map

### 🟢 Backend (Axion-Backend)
The heart of the system is the **Ingestion Service**.

-   `com.axion.ingestion.api.FleetController`: Handles the REST endpoints for the dashboard (e.g., getting all vehicles).
-   `com.axion.ingestion.producer.TelemetryProducer`: Takes validated telemetry and pushes it into the **Kafka** topic.
-   `com.axion.ingestion.consumer.TelemetryConsumer`: Listens to Kafka and triggers the Digital Twin update.
-   `com.axion.ingestion.service.DigitalTwinService`: The most important service. It reads/writes the vehicle state from **Redis**.
-   `com.axion.ingestion.health.HealthScoreEngine`: Contains the math and logic for the 0-100 health score.
-   `com.axion.ingestion.adapter.GenericTelemetryAdapter`: Normalizes external JSON into our internal format.

### 🔵 Frontend (Axion-Frontend)
The dashboard uses a modern React structure.

-   `src/App.tsx`: Manages the main Routing (switching between Dashboard, Vehicles, etc.).
-   `src/components/dashboard/FleetDashboard.tsx`: The main "Main View" with KPI cards and the vehicle grid.
-   `src/components/vehicle/DigitalTwinView.tsx`: The detailed "Vehicle Profile" page.
-   `src/services/api.service.ts`: Contains all the `fetch()` calls to the Spring Boot backend.
-   `src/styles/index.css`: Contains the Tailwind configuration and Glassmorphism effects.

### 🟡 Simulator (Axion-Simulator)
A clean Python project using asynchronous principles.

-   `main.py`: The entry point that reads `fleet.yaml` and starts the 250 vehicle tasks.
-   `core/vehicle.py`: The main Class representing an EV. It manages its own SOC, Temp, and Speed.
-   `scenarios/fault_injector.py`: Logic for triggering Battery Drain or Thermal Spikes.
-   `emitters/mqtt_emitter.py`: Handles the connection to the Mosquitto MQTT broker.

---

## 🔍 Code Walkthrough: `DigitalTwinService.java`

If the examiner asks: *"How do you keep the data in sync?"*, show them this logic:

1.  **Incoming Event**: A `CanonicalTelemetryEnvelope` arrives from Kafka.
2.  **Concurrency Check**: We check if the incoming data is older than what we already have in Redis (using timestamps). If it's old, we discard it.
3.  **Create Snapshot**: We extract Battery SOC, Template, and Odometer into a `TelemetrySnapshot`.
4.  **Health Evaluation**: We pass the snapshot to the `HealthScoreEngine`.
5.  **Redis Save**: We save the entire `DigitalTwinState` to Redis with a **120-second TTL**.

---

## 🔍 Code Walkthrough: `vehicle.py` (Simulator)

If they ask: *"How do you simulate 250 cars on one laptop?"*, explain the **Async loop**:

```python
async def run(self):
    while True:
        # 1. Update Physics (SOC, Temp)
        self.update_physics()
        
        # 2. Build JSON Payload
        payload = self.build_telemetry()
        
        # 3. Send to Backend (Non-blocking)
        await self.emitter.send(payload)
        
        # 4. Sleep for 3 seconds (Yields control to other vehicles)
        await asyncio.sleep(self.interval)
```
The `await asyncio.sleep()` is the "magic"—it tells Python: *"I'm done for now, go update the other 249 vehicles while I wait."*
