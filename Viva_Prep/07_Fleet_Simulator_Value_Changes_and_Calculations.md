# 07 - Fleet Simulator: How Values Change Automatically and What We Calculate

This file explains exactly what happens in the simulator on each tick, what formulas are used, and why the system works without machine learning.

---

## 1. Big Picture

In Axion, values change automatically because each vehicle runs in a continuous async loop:

1. compute elapsed time (`delta_time`)
2. apply scenario rules (speed, battery, temperature, connectivity)
3. update odometer using speed and elapsed time
4. emit telemetry if vehicle is online
5. sleep for `tick_interval_seconds` and repeat

This loop is implemented in `Axion-Simulator/core/vehicle.py`.

---

## 2. Where Initial Values Come From

At startup (`Axion-Simulator/main.py`), each vehicle gets random initial values from profile ranges in `config/fleet.yaml`:

- battery temp range by profile
- SOC range by profile
- speed range by profile
- odometer random range
- default packet loss and signal strength

So every vehicle starts with slightly different values, then changes over time.

---

## 3. Core Tick Logic (Automatic Updates)

On every loop iteration:

- `now = datetime.utcnow()`
- `delta_time = now - last_timestamp` (seconds)
- apply all scenarios in order
- update odometer
- emit message (if online)

Why `delta_time` matters:

Using elapsed seconds makes the simulation time-based instead of frame-based. If one tick takes longer, calculations still scale correctly.

---

## 4. Exact Calculations in Simulator

## 4.1 Speed Variation (`NormalDriveScenario`)

File: `Axion-Simulator/scenarios/normal_drive.py`

Speed changes by randomly selecting one value from:

`[-1.5, -0.5, 0.0, 0.5, 0.5, 1.0]`

Then:

- new speed is clamped between `0` and `max_speed` (default `120 km/h`)

So speed evolves gradually, not by unrealistic jumps.

---

## 4.2 Battery Drain (`BatteryDrainScenario`)

File: `Axion-Simulator/scenarios/battery_drain.py`

Formula:

`drain = drain_rate_per_sec * delta_time`

`battery_soc_pct = max(0, battery_soc_pct - drain)`

Configured rates from `fleet.yaml`:

- normal drain: `0.01` per second
- critical drain: `0.5` per second

This is deterministic math, not ML.

---

## 4.3 Temperature Increase (`TempSpikeScenario`)

File: `Axion-Simulator/scenarios/temp_spike.py`

Formula:

`spike = spike_rate_per_sec * delta_time`

`battery_temp_c = min(max_temp, battery_temp_c + spike)`

Configured defaults:

- `spike_rate_per_sec = 0.5`
- `max_temp_c = 75`

Again, rule-based and bounded.

---

## 4.4 Network Dropout (`NetworkDropoutScenario`)

File: `Axion-Simulator/scenarios/network_dropout.py`

Logic:

1. If online, random dropout occurs with probability `dropout_probability` (default `0.01` per tick).
2. When offline:
   - packet loss forced to `100%`
   - signal strength forced to `-120 dBm`
3. After `max_offline_seconds` (default `20`), reconnect:
   - `online = true`
   - packet loss randomized in `[0.1, 1.0]`
   - signal strength randomized in `[-85, -65]`

This models temporary connectivity failures.

---

## 4.5 Odometer Update

File: `Axion-Simulator/core/vehicle.py`

If speed > 0:

`km_driven = (speed_kmph / 3600) * delta_time`

`odometer_km += km_driven`

This is physically consistent unit conversion:

- speed is in km/h
- divide by 3600 to get km/s
- multiply by elapsed seconds

---

## 4.6 Sequence Number

File: `Axion-Simulator/core/telemetry_builder.py`

Each emitted telemetry message increments:

`sequence_number += 1`

This helps track message order.

---

## 5. Why This Is Not Machine Learning

No model training, no inference model, no neural network is used for simulator value updates.

The simulator uses:

- deterministic formulas
- random sampling from configured ranges
- fixed scenario rules
- fixed probabilities for dropouts/events

So it is a rule-based simulation engine, not ML.

---

## 6. If Not ML, Then Where Is "Intelligence"?

The "intelligence" in this project is mostly in rule-based decision logic, especially backend health scoring.

Backend file: `Axion-Backend/ingestion/src/main/java/com/axion/ingestion/health/HealthScoreEngine.java`

Rules (from `application.properties`):

- base score = 100
- SOC critical < 15: minus critical penalty
- SOC warning < 30: minus warning penalty
- battery temp warning > 45 C: minus warning penalty
- battery temp critical > 55 C: minus critical penalty
- offline: minus critical penalty

Penalties:

- warning penalty = 30
- critical penalty = 60

State mapping:

- HEALTHY: score >= 80
- DEGRADED: 50 <= score < 80
- CRITICAL: score < 50

This is explainable, auditable logic.

---

## 7. One Complete Example Tick

Assume vehicle state at time T:

- speed = 60 km/h
- SOC = 50
- battery temp = 40 C
- odometer = 10000 km
- online = true
- delta_time = 0.1 s

Applied updates:

1. normal drive picks `+0.5` => speed = 60.5 km/h
2. normal battery drain (`0.01/s`):
   - drain = 0.01 * 0.1 = 0.001
   - SOC = 49.999
3. odometer:
   - km_driven = (60.5/3600) * 0.1 = 0.0016805 km
   - odometer = 10000.0016805
4. message emitted, sequence increments

This is exactly how values auto-change every loop.

---

## 8. Viva-Ready Short Answers

Q: How are simulator values changing automatically?
A: Each vehicle runs an async loop, computes elapsed time, applies scenario formulas, updates odometer from speed, and emits telemetry every tick.

Q: What calculations are used?
A: Speed delta sampling, SOC drain = rate x delta_time, temp spike = rate x delta_time, odometer = (speed/3600) x delta_time, and probability-based network dropouts.

Q: Are you using ML for this?
A: No. Simulator and health scoring are rule-based and threshold-based. This makes the output deterministic, explainable, and easy to validate.
