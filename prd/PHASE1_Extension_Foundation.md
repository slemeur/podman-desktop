# Phase 1: Extension Foundation & Image Catalog

## Overview

This phase focuses on building the foundational infrastructure of the Hummingbird extension, including the basic extension structure and the image catalog feature that allows users to browse available hardened images.

## Goals

- Create a fully functional Podman Desktop extension
- Implement a browsable catalog of Hummingbird hardened images
- Establish connection with Quay.io registry for image metadata
- Set up the extension's navigation entry in the sidebar

---

## Tickets

### HBIRD-001: Create Extension Scaffolding

**Description:**
Set up the basic Hummingbird extension structure following Podman Desktop extension guidelines.

**Tasks:**

- [ ] Create extension directory structure
- [ ] Set up `package.json` with proper metadata and contributions
- [ ] Configure TypeScript and Vite build system
- [ ] Create activation/deactivation lifecycle handlers
- [ ] Add extension icon (PNG format for sidebar compatibility)

**Acceptance Criteria:**

- [ ] Extension loads successfully in Podman Desktop
- [ ] Extension appears in the Extensions catalog
- [ ] Extension can be enabled/disabled without errors

---

### HBIRD-002: Implement Catalog Data Layer

**Description:**
Create the data layer for managing the Hummingbird image catalog, including the catalog entries structure and data management.

**Tasks:**

- [ ] Define interface with all required fields
- [ ] Create static catalog data for Phase 1 (language runtimes)
- [ ] Include metadata: CVE counts, sizes, tags, signatures, last updated

**Acceptance Criteria:**

- [ ] Catalog contains entries for: Node.js, Python, Go, Java, Ruby, Redis, PostgreSQL, Nginx, httpd
- [ ] Each entry has: original image name, hummingbird image name, description, CVE count, size, tags

**Investigation Required:**

- [ ] **INVEST-001**: Determine the list of images available in Quay.io Hummingbird repository
- [ ] **INVEST-002**: Define the schema for catalog entries based on available metadata

---

### HBIRD-003: Create Catalog Webview Panel

**Description:**
Implement the webview panel that displays the Hummingbird image catalog in the Podman Desktop sidebar.

**Tasks:**

- [ ] Create webview panel registration in extension activation
- [ ] Implement HTML/CSS generation for catalog UI
- [ ] Design card layout for each image entry
- [ ] Add search/filter functionality
- [ ] Implement message passing between webview and extension
- [ ] Style to match Podman Desktop design system

**Acceptance Criteria:**

- [ ] Catalog appears as navigation item in sidebar
- [ ] Cards display: image name, description, CVE count, size, last updated
- [ ] Search filters images by name and description
- [ ] "Pull" button triggers image pull by redirecting to the "Pull image" screen
- [ ] "More details" opens external link or detail view, to quay.io
- [ ] UI matches Podman Desktop styling conventions

---

### HBIRD-004: Integrate with Quay.io Registry API

**Description:**
Connect to Quay.io API to fetch real-time metadata for Hummingbird images.

**Tasks:**

- [ ] Research Quay.io API endpoints for image metadata
- [ ] Implement API client for fetching image info
- [ ] Cache responses to minimize API calls
- [ ] Handle authentication if required
- [ ] Parse and normalize response data
- [ ] Implement fallback to static data on API failure

**Acceptance Criteria:**

- [ ] Extension fetches image metadata from Quay.io
- [ ] Available tags are retrieved dynamically
- [ ] Image sizes are accurate and up-to-date
- [ ] Last updated timestamps reflect actual push dates
- [ ] Graceful degradation when API is unavailable

**Investigation Required:**

- [ ] **INVEST-003**: Document Quay.io API authentication requirements
- [ ] **INVEST-004**: Identify rate limits and caching strategy
- [ ] **INVEST-005**: Determine if CVE data is available via Quay.io API or requires separate source

---

### HBIRD-005: Implement Image Pull Action

**Description:**
Enable users to pull Hummingbird images directly from the catalog.

**Tasks:**

- [ ] Implement `pullImage` command handler
- [ ] Use Podman Desktop API to trigger image pull
- [ ] Show progress notification during pull
- [ ] Handle errors and display appropriate messages
- [ ] Navigate to Images view after successful pull

**Acceptance Criteria:**

- [ ] Clicking "Pull" initiates image download
- [ ] Progress is visible to user
- [ ] Success message shown on completion
- [ ] Error message shown on failure with actionable info
- [ ] Pulled image appears in Images list

---

### HBIRD-006: Implement Telemetry Tracking

**Description:**
Add telemetry tracking for key user actions to measure extension adoption and feature usage.

**Tasks:**

- [ ] Define telemetry events for catalog interactions
- [ ] Track catalog view events (page open, search, filter)
- [ ] Track image pull actions
- [ ] Track "More details" link clicks
- [ ] Ensure telemetry respects user privacy preferences
- [ ] Document all telemetry events in USAGE_DATA.md

**Acceptance Criteria:**

- [ ] All key user actions are tracked
- [ ] Telemetry events include relevant context (image name, action type)
- [ ] No PII is collected in telemetry
- [ ] Telemetry can be disabled by user preferences
- [ ] Events are properly namespaced (e.g., `hummingbird.catalog.view`)

---

## Investigation Tasks

### INVEST-001: Quay.io Repository Analysis

**Objective:** Document all available Hummingbird images in Quay.io

**Questions to Answer:**

1. What images are currently available under `quay.io/hummingbird/`?
2. What tags are available for each image?
3. What is the naming convention for images?
4. Are there version-specific variants (e.g., node:18, node:20)?

**Deliverable:** Spreadsheet/document listing all images with their tags

---

### INVEST-002: Image Metadata Schema

**Objective:** Define the complete schema for catalog entries

**Questions to Answer:**

1. What metadata is available from Quay.io?
2. What additional metadata do we need to store?
3. How do we track CVE counts (static vs dynamic)?
4. How do we handle version mapping (node:18 → nodejs:18)?

**Deliverable:** TypeScript interface definitions with documentation

---

### INVEST-003: Quay.io API Authentication

**Objective:** Understand authentication requirements for Quay.io API

**Questions to Answer:**

1. Is anonymous access sufficient for public repositories?
2. What endpoints require authentication?
3. How do we handle API tokens securely?
4. What are the rate limits for authenticated vs anonymous?

**Deliverable:** Authentication strategy document

---

## Success Metrics

- [ ] Extension installs and activates without errors
- [ ] Catalog displays at least 9 hardened images
- [ ] Users can successfully pull images from catalog
- [ ] UI is responsive and matches Podman Desktop styling
- [ ] No critical bugs in extension lifecycle

## Dependencies

- Podman Desktop extension API
- Quay.io public registry access
- Network connectivity for image pulls

## Risks & Mitigations

| Risk                  | Impact | Mitigation                 |
| --------------------- | ------ | -------------------------- |
| Quay.io API changes   | Medium | Use static fallback data   |
| Rate limiting         | Low    | Implement caching layer    |
| Extension API changes | Medium | Pin to specific PD version |
