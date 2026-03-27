import type { FYPIdea } from "@/context/AppContext";

export function generateTestCases(idea: FYPIdea): string {
  return `# Test Cases Document
## ${idea.title}

> Complete test suite covering unit tests, integration tests, and end-to-end test scenarios.
> Use this as a guide when writing automated tests for your FYP.

---

## 1. Authentication & User Management

### TC-001: User Registration
| Field | Value |
|-------|-------|
| Priority | P0 - Critical |
| Precondition | User is not registered |
| Steps | 1. Navigate to registration page |
|       | 2. Enter valid email and password |
|       | 3. Submit form |
| Expected | Account created, verification email sent, redirect to onboarding |

### TC-002: User Login - Valid Credentials
| Field | Value |
|-------|-------|
| Priority | P0 - Critical |
| Steps | 1. Navigate to login page |
|       | 2. Enter registered email and password |
|       | 3. Click login |
| Expected | Successful authentication, redirect to dashboard, session created |

### TC-003: User Login - Invalid Credentials
| Field | Value |
|-------|-------|
| Priority | P0 - Critical |
| Steps | 1. Navigate to login page |
|       | 2. Enter incorrect email or password |
|       | 3. Click login |
| Expected | Error message displayed, no session created, form not cleared |

### TC-004: Password Reset Flow
| Field | Value |
|-------|-------|
| Priority | P1 - High |
| Steps | 1. Click "Forgot Password" |
|       | 2. Enter registered email |
|       | 3. Check email for reset link |
|       | 4. Set new password |
| Expected | Password updated, able to login with new credentials |

### TC-005: Session Expiry
| Field | Value |
|-------|-------|
| Priority | P1 - High |
| Steps | 1. Login successfully |
|       | 2. Wait for session timeout |
|       | 3. Attempt to access protected route |
| Expected | Redirect to login, previous session invalidated |

---

## 2. Core Feature Tests

${idea.features.map((feature, i) => `
### TC-${String(i + 6).padStart(3, "0")}: ${feature}
| Field | Value |
|-------|-------|
| Priority | ${i < 2 ? "P0 - Critical" : i < 4 ? "P1 - High" : "P2 - Medium"} |
| Precondition | User is authenticated |
| Steps | 1. Navigate to the relevant feature section |
|       | 2. Provide required input data |
|       | 3. Trigger the processing action |
|       | 4. Wait for results |
| Expected | Feature processes input correctly, results displayed accurately |
| Edge Cases | Empty input, maximum length input, special characters, concurrent requests |

### TC-${String(i + 6).padStart(3, "0")}a: ${feature} - Error Handling
| Field | Value |
|-------|-------|
| Priority | P1 - High |
| Steps | 1. Provide invalid or malformed input |
|       | 2. Trigger processing |
| Expected | Graceful error message, no system crash, input preserved |
`).join("")}

---

## 3. API Tests

### TC-API-001: GET /api/data - Authorized
| Field | Value |
|-------|-------|
| Priority | P0 - Critical |
| Method | GET |
| Headers | Authorization: Bearer [valid_token] |
| Expected Status | 200 OK |
| Expected Body | JSON array of user's data |

### TC-API-002: GET /api/data - Unauthorized
| Field | Value |
|-------|-------|
| Priority | P0 - Critical |
| Method | GET |
| Headers | No auth header |
| Expected Status | 401 Unauthorized |
| Expected Body | Error message |

### TC-API-003: POST /api/process - Valid Input
| Field | Value |
|-------|-------|
| Priority | P0 - Critical |
| Method | POST |
| Body | Valid request payload |
| Expected Status | 200 OK or 201 Created |
| Expected Body | Processing result |

### TC-API-004: POST /api/process - Invalid Input
| Field | Value |
|-------|-------|
| Priority | P1 - High |
| Method | POST |
| Body | Invalid or empty payload |
| Expected Status | 400 Bad Request |
| Expected Body | Validation error details |

### TC-API-005: Rate Limiting
| Field | Value |
|-------|-------|
| Priority | P1 - High |
| Steps | Send 100+ requests in rapid succession |
| Expected Status | 429 Too Many Requests (after limit) |
| Expected Body | Rate limit message with retry-after |

---

## 4. Database Tests

### TC-DB-001: Data Integrity
| Field | Value |
|-------|-------|
| Test | Insert record with all required fields |
| Expected | Record created with correct data types and constraints |

### TC-DB-002: Foreign Key Constraints
| Field | Value |
|-------|-------|
| Test | Attempt to insert record with invalid foreign key |
| Expected | Database rejects insert with constraint violation |

### TC-DB-003: Cascade Delete
| Field | Value |
|-------|-------|
| Test | Delete parent record |
| Expected | All child records are automatically deleted |

### TC-DB-004: Concurrent Writes
| Field | Value |
|-------|-------|
| Test | Two users update same record simultaneously |
| Expected | No data corruption, proper conflict resolution |

---

## 5. UI/UX Tests

### TC-UI-001: Responsive Layout
| Field | Value |
|-------|-------|
| Test | View app on mobile (375px), tablet (768px), desktop (1440px) |
| Expected | Layout adapts properly, no overflow or broken elements |

### TC-UI-002: Loading States
| Field | Value |
|-------|-------|
| Test | Trigger any async operation |
| Expected | Loading indicator shown, UI not interactive during load |

### TC-UI-003: Empty States
| Field | Value |
|-------|-------|
| Test | View pages with no data |
| Expected | Meaningful empty state message, action CTA where appropriate |

### TC-UI-004: Form Validation
| Field | Value |
|-------|-------|
| Test | Submit forms with invalid data |
| Expected | Inline validation errors, clear guidance on fixing |

### TC-UI-005: Navigation Flow
| Field | Value |
|-------|-------|
| Test | Navigate through all app routes |
| Expected | Correct pages load, back button works, no dead ends |

---

## 6. Performance Tests

### TC-PERF-001: Page Load Time
| Field | Value |
|-------|-------|
| Metric | Time to First Contentful Paint |
| Target | < 2 seconds on 4G connection |

### TC-PERF-002: API Response Time
| Field | Value |
|-------|-------|
| Metric | Average response time for core endpoints |
| Target | < 500ms for 95th percentile |

### TC-PERF-003: Concurrent Users
| Field | Value |
|-------|-------|
| Metric | System stability under 100 concurrent users |
| Target | No errors, response times < 2x baseline |

---

## 7. Security Tests

### TC-SEC-001: SQL Injection
| Field | Value |
|-------|-------|
| Test | Submit SQL injection patterns in all input fields |
| Expected | Input sanitized, no data leak |

### TC-SEC-002: XSS Prevention
| Field | Value |
|-------|-------|
| Test | Submit script tags and event handlers in inputs |
| Expected | Output escaped, no script execution |

### TC-SEC-003: CSRF Protection
| Field | Value |
|-------|-------|
| Test | Submit state-changing request without CSRF token |
| Expected | Request rejected |

### TC-SEC-004: Data Access Control
| Field | Value |
|-------|-------|
| Test | User A attempts to access User B's data |
| Expected | 403 Forbidden, no data returned |

---

## Test Summary Matrix

| Category | Total | P0 | P1 | P2 |
|----------|-------|----|----|-----|
| Auth | 5 | 3 | 2 | 0 |
| Core Features | ${idea.features.length * 2} | ${Math.min(4, idea.features.length)} | ${idea.features.length} | ${Math.max(0, idea.features.length - 4)} |
| API | 5 | 3 | 2 | 0 |
| Database | 4 | 2 | 2 | 0 |
| UI/UX | 5 | 1 | 3 | 1 |
| Performance | 3 | 1 | 2 | 0 |
| Security | 4 | 3 | 1 | 0 |

---

*Generated by FYP Forge — Your AI Project Mentor*
`;
}
