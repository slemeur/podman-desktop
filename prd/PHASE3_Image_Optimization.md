# Phase 3: Image Optimization & CVE Analysis

## Overview

This phase adds the core image optimization functionality, including vulnerability scanning, alternative image matching, and detailed comparison views. Users will be able to analyze their images for security issues and receive actionable recommendations.

## Goals

- Integrate vulnerability scanning for local images
- Implement intelligent image matching algorithm
- Provide detailed side-by-side comparison of original vs hardened images
- Display CVE severity breakdowns and security improvements
- Enable informed decision-making about image selection

---

## Tickets

### HBIRD-201: Define Image Optimizer Provider API

**Description:**
Create the API contract for image optimizer providers that can be used by Hummingbird and potentially other extensions.

**Tasks:**

- [ ] Define `ImageOptimizerProvider` interface
- [ ] Create `OptimizeResult` type with all comparison data
- [ ] Implement provider registration mechanism
- [ ] Add provider store in renderer
- [ ] Create IPC channels for optimization requests

**Acceptance Criteria:**

- [ ] Clean API that other extensions could implement
- [ ] Type-safe interfaces for all data structures
- [ ] Registration/unregistration works correctly
- [ ] Multiple providers can coexist
- [ ] API documented with JSDoc comments

---

### HBIRD-202: Implement Image Matching Algorithm

**Description:**
Create an intelligent algorithm to match user images to their Hummingbird equivalents.

**Tasks:**

- [ ] Parse image names to extract base image
- [ ] Handle various naming conventions (docker.io/library/, short names)
- [ ] Match version tags (node:18 → nodejs:18)
- [ ] Handle digest-based references
- [ ] Support wildcard/fuzzy matching for variants

**Acceptance Criteria:**

- [ ] `node:18` matches `quay.io/hummingbird/nodejs:18`
- [ ] `python:3.11-slim` matches `quay.io/hummingbird/python:3.11`
- [ ] `docker.io/library/nginx:latest` matches correctly
- [ ] No false positives for unrelated images
- [ ] Performance: < 50ms for single match

**Investigation Required:**

- [ ] **INVEST-201**: Document all image naming patterns to support
- [ ] **INVEST-202**: Define matching priority rules (exact > fuzzy)

---

### HBIRD-203: Integrate Vulnerability Scanner

**Description:**
Integrate a vulnerability scanning solution to analyze local images for CVEs.

**Tasks:**

- [ ] Research and select scanning approach (Trivy, Grype, etc.)
- [ ] Implement scanner integration layer
- [ ] Parse scan results into structured format
- [ ] Extract severity distribution (Critical/High/Medium/Low)
- [ ] Cache scan results to avoid re-scanning
- [ ] Handle scanner binary installation/updates

**Acceptance Criteria:**

- [ ] Scan completes within 30 seconds for typical image
- [ ] CVE counts match industry-standard scanner output
- [ ] Severity breakdown is accurate
- [ ] Results cached for 24 hours
- [ ] Graceful handling when scanner unavailable

**Investigation Required:**

- [ ] **INVEST-203**: Evaluate Trivy vs Grype vs other scanners
- [ ] **INVEST-204**: Determine binary distribution strategy
- [ ] **INVEST-205**: Research CVE database update mechanisms

---

### HBIRD-204: Build Comparison View UI

**Description:**
Create the detailed comparison view showing current image vs Hummingbird alternative.

**Tasks:**

- [ ] Design side-by-side card layout
- [ ] Display image metadata (name, tag, size, CVEs)
- [ ] Show improvement banner with metrics
- [ ] Add CVE severity badges/breakdown
- [ ] Implement visual bar charts for comparisons
- [ ] Add "Try Hummingbird" call-to-action

**Acceptance Criteria:**

- [ ] Clear visual distinction between current and alternative
- [ ] Improvement metrics prominently displayed
- [ ] CVE reduction percentage calculated correctly
- [ ] Size reduction percentage calculated correctly
- [ ] Responsive layout for different window sizes

---

### HBIRD-205: Implement Scan-First Flow

**Description:**
When CVE data isn't available for the current image, prompt user to scan before showing comparison.

**Tasks:**

- [ ] Detect when CVE data is missing
- [ ] Show "Alternative Found" preview state
- [ ] Implement "Analyze and Compare" button
- [ ] Display scanning progress with steps
- [ ] Transition to full comparison after scan

**Acceptance Criteria:**

- [ ] Clear explanation of why scan is needed
- [ ] Preview shows alternative image info
- [ ] Progress steps visible during scan
- [ ] Smooth transition to comparison view
- [ ] User can cancel scan if needed

---

### HBIRD-206: Add Security Recommendations Panel

**Description:**
Provide contextual security recommendations based on scan results.

**Tasks:**

- [ ] Analyze CVE severity distribution
- [ ] Generate prioritized recommendations
- [ ] Explain specific risks of current image
- [ ] Highlight benefits of switching
- [ ] Add links to CVE details

**Acceptance Criteria:**

- [ ] Recommendations are relevant to scan results
- [ ] Critical CVEs highlighted prominently
- [ ] Clear action items for user
- [ ] Links to external CVE databases work
- [ ] Non-technical language for explanations

---

### HBIRD-207: Implement Evaluation Criteria Panel

**Description:**
Show visual comparison metrics for Image Size and CVE Count.

**Tasks:**

- [ ] Create horizontal bar chart component
- [ ] Show current vs alternative for each metric
- [ ] Display percentage improvement
- [ ] Add tooltips with exact values
- [ ] Animate bars for visual appeal

**Acceptance Criteria:**

- [ ] Bar lengths proportional to values
- [ ] Improvement percentages accurate
- [ ] Tooltips provide additional context
- [ ] Colors consistent with design system
- [ ] Works with various data ranges

---

### HBIRD-208: Handle Edge Cases

**Description:**
Handle various edge cases in the optimization flow.

**Tasks:**

- [ ] No alternative available state
- [ ] Scan failure state
- [ ] Network error handling
- [ ] Already using Hummingbird image
- [ ] Multiple alternatives available

**Acceptance Criteria:**

- [ ] Clear messaging for each edge case
- [ ] Actionable guidance (e.g., browse catalog)
- [ ] No broken UI states
- [ ] Error recovery options provided
- [ ] Telemetry for edge case frequency

---

## Investigation Tasks

### INVEST-201: Image Naming Patterns

**Objective:** Document all image naming patterns we need to support

**Questions to Answer:**

1. What registries do users commonly pull from?
2. How are tags typically structured?
3. How do we handle multi-arch images?
4. What about images with build variants (-slim, -alpine)?

**Deliverable:** Comprehensive regex patterns for parsing

---

### INVEST-202: Matching Priority Rules

**Objective:** Define how to prioritize when multiple matches exist

**Questions to Answer:**

1. Should exact tag match take priority?
2. How do we handle major vs minor version matching?
3. What if user has `python:3.11.1` and we have `python:3.11`?
4. How do we handle `-slim`, `-alpine` variants?

**Deliverable:** Matching algorithm specification

---

### INVEST-203: Vulnerability Scanner Evaluation

**Objective:** Select the best vulnerability scanning solution

**Options to Evaluate:**

- **Trivy**: Popular, fast, good database
- **Grype**: Anchore-backed, good accuracy
- **Clair**: Red Hat solution, enterprise focus
- **Snyk**: Commercial but has free tier

**Evaluation Criteria:**

- Scan speed
- CVE database completeness
- Binary size and portability
- Ease of integration
- Offline capability
- Update mechanism

**Deliverable:** Recommendation with pros/cons analysis

---

### INVEST-204: Scanner Binary Distribution

**Objective:** Determine how to distribute scanner binary

**Questions to Answer:**

1. Bundle with extension vs download on first use?
2. How do we handle platform-specific binaries?
3. What's the update strategy?
4. How do we verify binary integrity?
5. What about enterprise/air-gapped environments?

**Deliverable:** Distribution architecture document

---

### INVEST-205: CVE Database Updates

**Objective:** Ensure CVE database stays current

**Questions to Answer:**

1. How often should database update?
2. Can we use offline database?
3. What's the database size impact?
4. How do we handle update failures?

**Deliverable:** Database update strategy

---

### INVEST-206: Quay.io Security Metadata

**Objective:** Investigate security metadata available from Quay.io

**Questions to Answer:**

1. Does Quay.io provide CVE scan results via API?
2. Can we get security scores for Hummingbird images?
3. Is there a security manifest we can fetch?
4. How current is Quay.io's vulnerability data?

**Deliverable:** API documentation for security endpoints

---

## Success Metrics

- [ ] 90% of scans complete within 30 seconds
- [ ] Image matching accuracy > 95%
- [ ] CVE count accuracy within 5% of Trivy baseline
- [ ] Comparison view load time < 2 seconds
- [ ] User satisfaction with recommendations > 4/5

## Dependencies

- Phase 1 & 2 completion
- Vulnerability scanner binary
- CVE database access
- Quay.io metadata API

## Risks & Mitigations

| Risk                   | Impact | Mitigation                            |
| ---------------------- | ------ | ------------------------------------- |
| Scanner binary size    | Medium | Lazy download on first use            |
| Scan performance       | High   | Parallel scanning, caching            |
| CVE database staleness | Medium | Daily update checks                   |
| False positive matches | High   | Conservative matching + user override |
| Network dependency     | Medium | Offline mode with cached data         |

## Technical Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Image Optimization Flow                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────┐    ┌──────────┐    ┌──────────────────────┐  │
│  │  Image   │───▶│  Matcher │───▶│  Hummingbird Catalog │  │
│  │  Name    │    │          │    │                      │  │
│  └──────────┘    └──────────┘    └──────────────────────┘  │
│       │                                    │                 │
│       ▼                                    ▼                 │
│  ┌──────────────────┐           ┌──────────────────────┐   │
│  │ Vulnerability    │           │   Alternative Info   │   │
│  │ Scanner (Trivy)  │           │   (CVEs, Size, etc)  │   │
│  └──────────────────┘           └──────────────────────┘   │
│       │                                    │                 │
│       └──────────────┬─────────────────────┘                │
│                      ▼                                       │
│              ┌──────────────────┐                           │
│              │  Comparison View │                           │
│              │  (Side by Side)  │                           │
│              └──────────────────┘                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```
