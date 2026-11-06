import http from 'k6/http';
import { check, sleep } from 'k6';

// 1. Load configuration and execution options
export const options = {
  // Define traffic stages to simulate realistic user behavior (ramping up, steady state, ramping down)
  stages: [
    { duration: '30s', target: 20 },  // Stage 1: Ramp up to 20 virtual users (VUs) over 30 seconds
    { duration: '1m',  target: 20 },  // Stage 2: Maintain a steady load of 20 VUs for 1 minute
    { duration: '15s', target: 0 },   // Stage 3: Ramp down to 0 VUs over 15 seconds
  ],
  thresholds: {
    // 95% of requests must complete within 500 milliseconds
    http_req_duration: ['p(95)<500'],
    // Request failure rate must remain below 1%
    http_req_failed: ['rate<0.01'],
  },
};

// 2. Default function executed repeatedly by each Virtual User (VU)
export default function () {
  // Target endpoint for the load test
  const url = 'https://test.k6.io/contacts.php';

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'k6-load-test-agent',
    },
  };

  // Perform HTTP GET request
  const res = http.get(url, params);

  // Functional validations (assertions)
  check(res, {
    'status code is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  // Pacing / Think time: 1-second pause before the next iteration
  sleep(1);
}