# Phase 2: Extension Discovery & User Guidance

## Overview

This phase focuses on creating touchpoints and guides that help users discover the Hummingbird extension and understand its value proposition. We will add contextual prompts, onboarding flows, and integration points throughout Podman Desktop.

## Goals

- Increase extension discoverability through strategic placement
- Educate users about container security and hardened images
- Create non-intrusive but effective prompts to try Hummingbird
- Build awareness during key user workflows

---

## Tickets

### HBIRD-101: Add "Image Optimization" Tab to Image Details

**Description:**
Add a new tab in the Image Details view that surfaces optimization opportunities and Hummingbird alternatives.

**Tasks:**

- [ ] Register new tab in Image Details page
- [ ] Design empty state when no optimizer extension is installed
- [ ] Add prompt to install Hummingbird extension
- [ ] Implement conditional tab visibility based on provider availability

**Acceptance Criteria:**

- [ ] "Image Optimization" tab appears for all images
- [ ] Empty state shows explanation of image optimization
- [ ] "Install Extension" button navigates to extension catalog
- [ ] Tab only shows detailed content when Hummingbird is installed
- [ ] Styling matches other Image Details tabs

---

### HBIRD-102: Add Explore Feature Guide

**Description:**
Create an "Explore" feature guide that introduces users to Hummingbird when they first interact with the extension or relevant features.

**Tasks:**

- [ ] Register feature guide with Podman Desktop's explore/guide system
- [ ] Design guide content highlighting Hummingbird benefits
- [ ] Add step-by-step walkthrough of catalog and optimization features
- [ ] Link to catalog and Image Optimization tab

**Acceptance Criteria:**

- [ ] Feature guide appears in Podman Desktop's Explore section
- [ ] Guide is triggered appropriately (first install, manual access)
- [ ] Clear value proposition communicated
- [ ] User can navigate to catalog from guide
- [ ] Guide can be dismissed and re-accessed

---

### HBIRD-103: Add Blog Post to Learning Center

**Description:**
Create educational blog post content for the Learning Center explaining container security and Hummingbird images.

**Tasks:**

- [ ] Write blog post about container image security best practices
- [ ] Explain what Hummingbird images are and their benefits
- [ ] Include real-world CVE reduction examples
- [ ] Add visual comparison (before/after)
- [ ] Register blog post with Learning Center

**Acceptance Criteria:**

- [ ] Blog post appears in Learning Center
- [ ] Content is accessible and easy to understand
- [ ] Includes actionable next steps (try Hummingbird)
- [ ] Links to catalog and documentation
- [ ] Proper metadata and categorization

---

### HBIRD-104: Add Hummingbird Link in Pull Image Screen

**Description:**
Add a contextual link or banner in the Pull Image screen to suggest Hummingbird alternatives.

**Tasks:**

- [ ] Add "Try Hummingbird" link/banner to Pull Image screen
- [ ] Check if entered image has a Hummingbird alternative
- [ ] Show contextual suggestion when alternative exists
- [ ] Link to Hummingbird catalog
- [ ] Track link clicks for telemetry

**Acceptance Criteria:**

- [ ] Link/banner is visible on Pull Image screen
- [ ] Suggestion is contextual (shows when alternative exists)
- [ ] Clicking navigates to Hummingbird catalog
- [ ] Non-intrusive design that doesn't block workflow
- [ ] Link only shows when Hummingbird extension is installed

---

## Investigation Tasks

### INVEST-101: Feature Guide Integration

**Objective:** Understand how to integrate with Podman Desktop's explore/guide system

**Questions to Answer:**

1. What API is available for registering feature guides?
2. How do we trigger guides at appropriate moments?
3. What content format is supported?
4. How do we track guide completion?

**Deliverable:** Technical documentation for guide integration

---

### INVEST-102: Learning Center Integration

**Objective:** Understand how to add content to the Learning Center

**Questions to Answer:**

1. What is the process for adding blog posts?
2. What metadata is required?
3. How is content categorized and discovered?
4. Can we link directly from extension to blog post?

**Deliverable:** Integration guide for Learning Center content

---

## Success Metrics

- [ ] 40% of users view the Image Optimization tab within first week
- [ ] 25% of users who see explore guide interact with it
- [ ] Learning Center blog post has >100 views in first month
- [ ] Pull Image link click-through rate > 5%

## Dependencies

- Phase 1 completion (extension foundation)
- Access to Images Details view for optimization tab
- Explore/Guide API access
- Learning Center publishing access

## Risks & Mitigations

| Risk                      | Impact | Mitigation                            |
| ------------------------- | ------ | ------------------------------------- |
| Guide API not available   | High   | Use alternative notification approach |
| Learning Center delays    | Medium | Publish to external blog first        |
| UI clutter in Pull screen | Medium | Keep link subtle and dismissible      |
