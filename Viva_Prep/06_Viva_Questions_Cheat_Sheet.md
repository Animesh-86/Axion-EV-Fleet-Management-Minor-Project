# 06 — Viva Questions Cheat Sheet

This section is meant to help you answer questions in a natural, confident way. The best strategy in a viva is to give a direct answer first, then add one or two technical reasons.

---

## General Architecture

**Q: What is the most unique feature of your project?**

**A:** The digital twin layer. Instead of treating vehicles as plain database rows, Axion maintains a live virtual state for each vehicle that updates as telemetry arrives. That makes the system more operationally useful because the operator can see what is happening right now, not just what happened last hour.

**Q: Why did you choose an event-driven architecture instead of a simple REST API?**

**A:** Because telemetry is continuous and time-sensitive. An event-driven architecture lets ingestion, processing, and storage remain loosely coupled. Kafka buffers the stream, so even if one downstream consumer slows down, the ingestion service can keep accepting data without losing it.

**Q: What problem does Axion solve?**

**A:** It helps fleet operators understand battery health, thermal behavior, connectivity status, and OTA readiness across many EVs at once. The system turns raw telemetry into decisions.

---

## Backend Questions

**Q: What is the role of Kafka in Axion?**

**A:** Kafka is the event backbone. It separates the intake of telemetry from the processing of telemetry. That means the ingestion layer can stay fast, and consumers can update the digital twin and health state independently.

**Q: Why use Redis if you already have a database?**

**A:** Because the dashboard needs current state, not historical query-heavy storage. Redis keeps the live vehicle snapshot in memory, which gives fast reads and supports TTL-based freshness so stale vehicles can naturally age out.

**Q: How does the health score work?**

**A:** It is rule-based. The engine looks at the latest telemetry snapshot and applies deductions based on thresholds such as battery state of charge and temperature. The output is explainable because it includes the reasons behind each deduction.

**Q: What does the digital twin actually store?**

**A:** It stores the vehicle’s latest operational snapshot, including current telemetry values, derived health, and connectivity freshness. It is not a full historical database. It is the live operational mirror of the fleet.

---

## Simulator Questions

**Q: How do you simulate 250 vehicles without lagging?**

**A:** The simulator uses Python `asyncio`. Each vehicle runs as a coroutine, so the program can switch between vehicles whenever one is waiting. That avoids the overhead of one thread per vehicle and keeps the simulation efficient.

**Q: What is fault injection?**

**A:** Fault injection is the deliberate creation of abnormal conditions such as battery drain, temperature spikes, or network loss. It is useful because it lets us prove that the backend and UI can detect real operational problems instead of only happy-path telemetry.

**Q: Why is a simulator necessary at all?**

**A:** Because it makes the entire system testable end to end. Without a simulator, we would only have code. With it, we can show live data flowing through the backend and appearing on the dashboard.

---

## Frontend Questions

**Q: Why use polling instead of WebSockets?**

**A:** Polling is simpler and more stable for this project size. The dashboard refreshes every few seconds, which is enough to feel live while keeping the implementation easier to debug. The backend architecture is still compatible with a more real-time push approach in the future.

**Q: What is glassmorphism and why did you use it?**

**A:** Glassmorphism is a visual style that uses transparency, blur, and layered surfaces. I used it because it creates a premium dashboard feel and helps important KPI cards stand out against the dark background.

**Q: Why did you move to route-based navigation?**

**A:** Because real URLs make the application easier to use, easier to debug, and easier to explain. It also allows direct navigation to landing, auth, architecture, and dashboard pages without depending on internal component state.

---

## Tricky Questions

**Q: What happens if Kafka goes down?**

**A:** In the current implementation, ingestion and processing would be impacted because Kafka is the event backbone. In a production version, I would use a Kafka cluster with multiple brokers, better retry handling, and monitoring around producer and consumer health.

**Q: Is the system secure?**

**A:** In this project phase, the focus was on telemetry flow and system behavior rather than full production security. The architecture is ready for stronger security layers such as JWT authentication, HTTPS/TLS, and stronger access control in a major-project phase.

**Q: How would you scale this to 10,000 vehicles?**

**A:** I would increase Kafka partitions, run more consumer instances, and move Redis to a more scalable deployment such as Redis Cluster. I would also monitor ingestion and dashboard latency separately so scaling is controlled rather than guesswork.

**Q: What is the biggest engineering trade-off in the project?**

**A:** The main trade-off is choosing a simpler polling dashboard and a realistic event-driven backend instead of building a more complex live push architecture. That keeps the project understandable while still demonstrating production-style design.

---

## Short Answer Formula
If you freeze during the viva, use this structure:

1. State the direct answer.
2. Give one technical reason.
3. Tie it back to the project value.

Example: “We use Redis because the dashboard needs fast live state, and Redis gives us in-memory access with TTL support, which keeps the digital twin fresh and the UI responsive.”
