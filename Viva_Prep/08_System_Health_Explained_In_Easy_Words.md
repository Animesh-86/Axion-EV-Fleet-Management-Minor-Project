# 08) System Health (Easy Words)

## 1. What is "System Health" in our project?
System Health means:
- Are all major services running?
- Is data flowing correctly?
- Is the backend responding fast enough?
- Is the project stable right now?

Think of it like a hospital monitor for our software stack.
It does not check only one vehicle. It checks the full platform.

---

## 2. Important difference: System Health vs Vehicle Health

### Vehicle Health
Vehicle Health is for one EV and is based on telemetry values such as:
- Battery SOC
- Battery Temperature
- Online/Offline state

That gives each vehicle a score (0 to 100) and state:
- HEALTHY
- DEGRADED
- CRITICAL

### System Health
System Health is for the platform/infrastructure:
- Backend API
- Redis
- Kafka
- MQTT
- Zookeeper

So:
- Vehicle Health = "How healthy is this car?"
- System Health = "How healthy is our whole platform?"

---

## 3. How System Health is calculated (simple flow)
The frontend "System Health" page runs a small check every 5 seconds.

Step 1:
It calls fleet summary API.

Step 2:
If API returns data, backend is considered healthy.

Step 3:
It checks total vehicle count.
- If vehicles are flowing, data pipeline is assumed active.

Step 4:
It marks service statuses.
- healthy / degraded / down

Step 5:
It shows overall banner status:
- All Systems Operational
- Partial Degradation
- System Down

---

## 4. Service-by-service rule (easy)

### A) Spring Boot API
- healthy: summary API call works
- down: summary API call fails

### B) Redis
- healthy: backend works and vehicleCount > 0
- degraded: backend works but no live vehicle data
- down: backend not reachable

### C) Kafka
- healthy: backend works and vehicleCount > 0 (data appears to be flowing)
- degraded: backend works but no active flow
- down: backend not reachable

### D) MQTT Broker
- healthy: backend works and live flow exists
- degraded: no clear live flow, status inferred
- down: backend not reachable

### E) Zookeeper
- healthy: inferred healthy when data flow is healthy
- degraded/down: inferred from backend/data condition

Note:
Some checks are inferred from data flow, not direct ping of each service.

---

## 5. Overall status formula
Let:
- healthyCount = number of services marked healthy
- totalCount = total services shown on page

Then:
- If healthyCount == totalCount -> All Systems Operational
- Else if healthyCount > 0 -> Partial Degradation
- Else -> System Down

This is the high-level logic used in UI.

---

## 6. How latency is shown
The page records backend API response time in milliseconds.
That becomes backend latency.

Redis latency shown in chart is estimated (inferred), not directly measured by ping.

So this panel is mostly an operational dashboard view, not a deep APM tool.

---

## 7. Why this design is used in a minor project
This approach is practical because:
- Easy to understand
- Easy to demo in viva
- Gives quick operational visibility
- No need to build a complex monitoring agent stack

For production systems, we usually add:
- Prometheus
- Grafana
- Real health endpoints for each service
- Alert rules

---

## 8. Viva-ready short answer
"In our project, System Health is calculated by periodically checking backend availability and live vehicle data flow, then inferring service status for Redis, Kafka, MQTT, and Zookeeper. Based on healthy service count, UI shows overall state as All Operational, Partial Degradation, or System Down."

---

## 9. Super short answer (10 seconds)
"Vehicle health checks one car. System health checks the whole platform. We poll every 5 seconds, infer service states from backend response and live data flow, and show overall status from healthy service count."