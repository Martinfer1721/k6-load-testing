# Performance and Load Testing with k6

This repository contains automated load testing scripts built with [k6](https://k6.io/) to evaluate API latency, throughput, and system stability under concurrent virtual user workloads.

---

## Prerequisites

- [k6 installed](https://grafana.com/docs/k6/latest/get-started/installation/)
- Visual Studio Code or any modern text editor
- Git CLI configured locally

---

## Test Scenario Design

The test simulates a ramp-up and sustained workload profile with 20 maximum Virtual Users (VUs):

| Stage | Duration | Target VUs | Description |
| :--- | :--- | :--- | :--- |
| **Stage 1 (Ramp-up)** | 30s | 20 | Gradually increases active traffic to 20 concurrent users |
| **Stage 2 (Steady State)** | 1m | 20 | Sustains continuous peak workload |
| **Stage 3 (Ramp-down)** | 15s | 0 | Gracefully terminates active sessions |

---

## Quality Gates (Service Level Agreements - SLAs)

The execution validates automatic pass/fail criteria via thresholds:
- `http_req_duration`: 95th percentile ($p95$) latency must be under **500 ms**.
- `http_req_failed`: Error rate must stay below **1.00%**.

---

## Execution

Run the script from your terminal:

```bash
k6 run load_test.js