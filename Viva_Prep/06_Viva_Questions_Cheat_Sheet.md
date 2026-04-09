# 06 — Viva Questions Cheat Sheet

Be prepared! Examiners love to test if you've actually written the code or just followed a tutorial. Here are the most likely questions and how to answer them like a pro.

---

## 🏗 General & Architecture

**Q: What is the most unique feature of your project?**
*   **A**: It's the **Digital Twin** approach. We don't just store vehicle data; we maintain a real-time, event-driven virtual model that calculates health scores "on the fly" using an asynchronous pipeline (Kafka + Redis).

**Q: Why did you choose an Event-Driven Architecture (EDA) instead of a simple REST API?**
*   **A**: Scalability and Loose Coupling. If our health service gets slow, it won't crash the ingestion service because Kafka acts as a buffer. In a real fleet of 10,000+ cars, a simple REST API would crumble under the constant pressure.

---

## 🟢 Backend (Spring Boot, Kafka, Redis)

**Q: What is the role of Kafka in Axion?**
*   **A**: It acts as the "messaging backbone." It takes data from the ingestion service and provides it to the consumer for processing. It ensures that data is never lost, even if a service restarts.

**Q: Why use Redis if you already have a database?**
*   **A**: Speed. Our dashboard polls every few seconds. If we queried a traditional SQL database for 250 vehicles that often, it would be a bottleneck. Redis stores the "Live State" in RAM, allowing for sub-millisecond responses.

**Q: How does the Health Score engine work?**
*   **A**: It's a rule-based engine. It looks at the `TelemetrySnapshot` (Battery SOC, Temp, etc.) and subtracts points based on safety thresholds. Crucially, it returns **Reasons**, making the score "Explainable."

---

## 🟡 Simulator (Python & asyncio)

**Q: How do you simulate 250 vehicles without lagging?**
*   **A**: We use **Python's `asyncio`**. It uses "Cooperative Multitasking." Instead of using heavy OS threads, we use light coroutines. When one vehicle is waiting for the network, the CPU immediately switches to the next vehicle.

**Q: What is "Fault Injection"?**
*   **A**: It's the ability to intentionally force a vehicle into an "Error State" (like a Battery Drain). This allows us to prove that our Backend and Dashboard actually detect and alert the operator about anomalies.

---

## 🔵 Frontend (React & Design)

**Q: Why use Polling instead of WebSockets?**
*   **A**: For an academic project of this scale (250 vehicles), polling is more robust and easier to implement/debug. It also handles reconnections automatically. However, our architecture (Kafka) is ready to switch to WebSockets in a future "Production" phase.

**Q: What is Glassmorphism and why use it?**
*   **A**: It's a design trend using transparency and blurred backgrounds. We used it to create a "Premium" look that emphasizes the data cards, making critical KPIs pop against the dark background.

---

## 🔥 Tricky Questions (Be Careful!)

**Q: What happens if the Kafka broker goes down?**
*   **A**: Currently, the ingestion service would fail to publish. In a production system, we would use a "Kafka Cluster" with multiple brokers for high availability.

**Q: Is your system secure? How do you protect vehicle data?**
*   **A**: In this version (Minor Project), we focused on the **Data Pipeline**. For the Major Project, we have a roadmap to add **JWT Authentication** and **TLS encryption** for MQTT and REST traffic.

**Q: How would you scale this to 10,000 vehicles?**
*   **A**: I would:
    1.  Add more Kafka Partitions.
    2.  Run multiple instances of the Ingestion Consumer (Horizontal Scaling).
    3.  Upgrade the Redis instance or use Redis Cluster.
