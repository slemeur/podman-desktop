# Phase 4: Image Conversion & Migration

## Overview

This phase focuses on enabling users to actually try and adopt Hummingbird images. We'll provide tools to pull alternatives, run containers with hardened images, update Dockerfiles, and migrate existing workloads seamlessly.

## Goals

- Enable one-click migration to Hummingbird images
- Provide Dockerfile modification assistance
- Support running existing containers with hardened images
- Implement Compose/Kubernetes manifest updates
- Track and report on successful migrations

---

## Tickets

### HBIRD-301: Implement One-Click Pull & Replace

**Description:**
Allow users to pull the Hummingbird alternative and optionally remove the original image in one action.

**Tasks:**

- [ ] Implement "Try Hummingbird" button action
- [ ] Pull alternative image in background
- [ ] Show progress notification
- [ ] Offer to remove original after pull
- [ ] Navigate to new image details

**Acceptance Criteria:**

- [ ] Single click initiates pull
- [ ] Progress visible during download
- [ ] Success notification with next steps
- [ ] Original image optionally removed
- [ ] New image appears in Images list

---

### HBIRD-302: Run Container with Alternative Image

**Description:**
Enable users to run an existing container configuration with the Hummingbird image instead.

**Tasks:**

- [ ] Add "Run with Hummingbird" option to container actions
- [ ] Clone container configuration
- [ ] Replace image reference with alternative
- [ ] Handle environment variables and volumes
- [ ] Start new container with same settings

**Acceptance Criteria:**

- [ ] Container configuration preserved
- [ ] Ports, volumes, env vars copied correctly
- [ ] New container runs successfully
- [ ] Original container optionally stopped
- [ ] Clear distinction between original and new

---

### HBIRD-303: Dockerfile Helper Integration

**Description:**
Provide assistance for updating Dockerfiles to use Hummingbird base images.

**Tasks:**

- [ ] Detect Dockerfiles in project context
- [ ] Parse FROM statements
- [ ] Generate replacement suggestions
- [ ] Show diff preview
- [ ] Provide copy-to-clipboard functionality
- [ ] Link to documentation for manual updates

**Acceptance Criteria:**

- [ ] FROM statement replacement accurate
- [ ] Multi-stage builds handled correctly
- [ ] Clear instructions for users
- [ ] Diff shows exact changes needed
- [ ] Works with various Dockerfile locations

**Investigation Required:**

- [ ] **INVEST-301**: Determine Dockerfile detection strategy
- [ ] **INVEST-302**: Handle multi-stage builds with multiple FROM

---

### HBIRD-304: Docker Compose Support

**Description:**
Enable users to update Docker Compose files to use Hummingbird images.

**Tasks:**

- [ ] Detect docker-compose.yml files
- [ ] Parse service image references
- [ ] Identify services with Hummingbird alternatives
- [ ] Generate updated compose file
- [ ] Validate compose file syntax
- [ ] Provide "Apply Changes" action

**Acceptance Criteria:**

- [ ] All services scanned for alternatives
- [ ] YAML formatting preserved
- [ ] Comments and structure maintained
- [ ] Preview before applying changes
- [ ] Backup created before modification

**Investigation Required:**

- [ ] **INVEST-303**: YAML parsing library selection
- [ ] **INVEST-304**: Handling compose file versions (v2 vs v3)

---

### HBIRD-305: Kubernetes Manifest Support

**Description:**
Support updating Kubernetes manifests to use Hummingbird images.

**Tasks:**

- [ ] Detect Kubernetes YAML files
- [ ] Parse container image references in various resource types
- [ ] Handle Deployments, StatefulSets, DaemonSets, Jobs
- [ ] Generate updated manifests
- [ ] Support Kustomize overlays

**Acceptance Criteria:**

- [ ] Pod specs correctly identified
- [ ] Image references updated accurately
- [ ] Manifest remains valid YAML
- [ ] Multiple containers per pod handled
- [ ] InitContainers included

---

### HBIRD-306: Migration Tracking Dashboard

**Description:**
Create a dashboard showing migration progress and security improvements achieved.

**Tasks:**

- [ ] Track images migrated to Hummingbird
- [ ] Calculate total CVE reduction
- [ ] Show size savings summary
- [ ] Display migration history
- [ ] Provide recommendations for remaining images

**Acceptance Criteria:**

- [ ] Accurate count of migrated images
- [ ] CVE reduction prominently displayed
- [ ] Size savings in MB/GB
- [ ] Historical view of migrations
- [ ] Actionable recommendations

---

### HBIRD-307: Rollback Support

**Description:**
Enable users to rollback to original images if Hummingbird alternative causes issues.

**Tasks:**

- [ ] Track original image for each migration
- [ ] Provide "Rollback" action in container/image context
- [ ] Preserve original configuration
- [ ] Show rollback confirmation
- [ ] Log rollback events for troubleshooting

**Acceptance Criteria:**

- [ ] One-click rollback available
- [ ] Original image re-pulled if needed
- [ ] Container configuration restored
- [ ] Rollback history tracked
- [ ] Clear messaging about rollback implications

---

### HBIRD-308: Batch Migration Tool

**Description:**
Allow users to migrate multiple images to Hummingbird alternatives at once.

**Tasks:**

- [ ] Show list of images with available alternatives
- [ ] Multi-select interface
- [ ] Batch pull with progress
- [ ] Handle failures gracefully
- [ ] Summary report on completion

**Acceptance Criteria:**

- [ ] Select all/individual selection
- [ ] Parallel pulls for speed
- [ ] Individual failure doesn't block others
- [ ] Clear summary of results
- [ ] Retry option for failed pulls

---

### HBIRD-309: CI/CD Integration Guidance

**Description:**
Provide guidance for integrating Hummingbird images into CI/CD pipelines.

**Tasks:**

- [ ] Document common CI/CD patterns
- [ ] Provide example configurations
- [ ] GitHub Actions workflow templates
- [ ] GitLab CI templates
- [ ] Jenkins pipeline examples

**Acceptance Criteria:**

- [ ] Clear step-by-step guides
- [ ] Copy-paste ready examples
- [ ] Common pitfalls documented
- [ ] Platform-specific guidance
- [ ] Links from extension to docs

---

### HBIRD-310: Compatibility Testing Assistance

**Description:**
Help users validate that Hummingbird images work with their applications.

**Tasks:**

- [ ] Suggest test scenarios based on image type
- [ ] Provide quick health check commands
- [ ] Document common compatibility issues
- [ ] Show application-specific guides
- [ ] Link to troubleshooting resources

**Acceptance Criteria:**

- [ ] Test suggestions relevant to image
- [ ] One-click health check execution
- [ ] Known issues documented
- [ ] Language/framework specific guides
- [ ] Community forum links for help

---

## Investigation Tasks

### INVEST-301: Dockerfile Detection Strategy

**Objective:** Determine how to find and associate Dockerfiles with images

**Questions to Answer:**

1. How do we detect Dockerfiles in the user's workspace?
2. How do we associate a Dockerfile with a built image?
3. Should we integrate with build history?
4. What about images pulled from registries (no Dockerfile)?

**Deliverable:** Detection algorithm specification

---

### INVEST-302: Multi-Stage Build Handling

**Objective:** Properly handle multi-stage Dockerfiles

**Questions to Answer:**

1. Which stages should we recommend replacing?
2. How do we handle AS aliases?
3. What if only some stages have alternatives?
4. How do we preserve build args and targets?

**Deliverable:** Multi-stage build support specification

---

### INVEST-303: YAML Parsing Library

**Objective:** Select best library for parsing Compose/K8s files

**Options:**

- js-yaml
- yaml (npm package)
- Custom parser

**Criteria:**

- Comment preservation
- Formatting preservation
- Error handling
- Performance

**Deliverable:** Library recommendation with rationale

---

### INVEST-304: Compose File Versions

**Objective:** Ensure support for all Compose file versions

**Questions to Answer:**

1. What versions are in common use?
2. How do image references differ between versions?
3. Do we need to handle Docker Swarm mode?
4. What about Compose specification vs Docker Compose?

**Deliverable:** Version compatibility matrix

---

### INVEST-305: Image Compatibility Analysis

**Objective:** Understand what makes images compatible

**Questions to Answer:**

1. What are common compatibility issues with distroless images?
2. How do we detect if an app needs shell access?
3. What about images requiring specific system packages?
4. How can we pre-screen for compatibility?

**Deliverable:** Compatibility checklist and detection rules

---

### INVEST-306: Registry Authentication for Pull

**Objective:** Handle authentication for pulling from Quay.io

**Questions to Answer:**

1. Is Quay.io Hummingbird public?
2. Do we need to handle private registries?
3. How do we use existing Podman credentials?
4. What about rate limiting?

**Deliverable:** Authentication flow documentation

---

## Success Metrics

- [ ] 70% of users who see "Try Hummingbird" click it
- [ ] 80% of pulled alternatives are kept (not rolled back)
- [ ] Average migration time < 2 minutes
- [ ] Dockerfile helper used in 30% of migrations
- [ ] Batch migration adoption > 20%

## Dependencies

- Phase 3 completion (optimization flow)
- Podman/Docker API for container operations
- File system access for Dockerfile/Compose editing
- Registry access for pulls

## Risks & Mitigations

| Risk                          | Impact | Mitigation                                |
| ----------------------------- | ------ | ----------------------------------------- |
| Application incompatibility   | High   | Comprehensive testing guides, rollback    |
| Data loss from container swap | High   | Never auto-delete, user confirmation      |
| File corruption from edits    | Medium | Backup before modify, preview changes     |
| Complex multi-stage builds    | Medium | Conservative suggestions, manual fallback |
| Registry authentication       | Low    | Use existing Podman credentials           |

## User Flows

### Flow 1: Simple Image Swap

```
User clicks "Try Hummingbird"
    ↓
Confirm pull dialog
    ↓
Pull Hummingbird image (progress shown)
    ↓
Success notification
    ↓
Optional: "Remove original image?"
    ↓
Navigate to new image
```

### Flow 2: Container Migration

```
User has running container with vulnerable image
    ↓
Views Image Optimization tab
    ↓
Clicks "Run with Hummingbird"
    ↓
Review configuration (ports, volumes, env)
    ↓
Pull alternative if needed
    ↓
Create new container
    ↓
Optional: Stop original container
    ↓
Verify new container running
```

### Flow 3: Dockerfile Update

```
User views Dockerfile Helper section
    ↓
System detects associated Dockerfile
    ↓
Shows current FROM statement
    ↓
Displays suggested replacement
    ↓
Preview diff
    ↓
Copy to clipboard or Apply
    ↓
Rebuild instruction shown
```

## Technical Considerations

### Container Configuration Cloning

When creating a new container with an alternative image, we must preserve:

- Port mappings
- Volume mounts
- Environment variables
- Network configuration
- Resource limits
- Restart policy
- Labels
- Health checks

### File Modification Safety

When editing Dockerfiles or Compose files:

1. Always create backup (.bak)
2. Show preview before applying
3. Preserve comments and formatting
4. Validate syntax after modification
5. Provide undo option

### Rollback Data Storage

Store migration history:

```json
{
  "migrations": [
    {
      "timestamp": "2025-01-15T10:30:00Z",
      "originalImage": "python:3.11-slim",
      "hummingbirdImage": "quay.io/hummingbird/python:3.11",
      "containerId": "abc123",
      "status": "success"
    }
  ]
}
```
