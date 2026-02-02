# Hummingbird Awareness Features - Requirements Document

This document describes the features implemented for the "Awareness" phase of the Hummingbird Extension integration in Podman Desktop. These features are designed to promote image security and optimization to users before they install the full Hummingbird extension.

---

## 1. Learning Center Integration

### 1.1 Hummingbird Guide Entry

**Description:**  
Add a new guide entry in the Learning Center to educate users about distroless and hardened container images.

**Requirements:**

- Add a new guide entry in the Learning Center guides list
- Position: 3rd in the list order (or ideally having a rotation)
- Title: "Understanding Distroless and Hardened Images"
- Description: "Learn how to use lightweight, secure Hummingbird images to reduce CVEs and image size."
- Categories: `["security", "hummingbird"]`
- URL: Link to Hummingbird blog post TBD
- Icon: Provide a placeholder icon (96x96 PNG, shield/security themed)

**Acceptance Criteria:**

- [ ] Guide appears in Learning Center
- [ ] Clicking "Get Started" opens the external Hummingbird documentation
- [ ] Icon is visible and represents security concept
- [ ] Telemetry tracks when users open this guide

---

## 2. Explore Features Integration

### 2.1 Image Security Optimization Feature Card

**Description:**  
Add a feature card in the "Explore Features" section on the dashboard to promote image security optimization.

**Requirements:**

- Add new feature entry in explore-features.json
- ID: `optimize-images-security`
- Title: "Optimize Images for Security"
- Description: Highlight Hummingbird hardened images with zero CVEs and reduced attack surface
- Button: "Explore Images" linking to `/images`
- Learn More: Link to Hummingbird extension documentation
- Image: Placeholder SVG showing a container with a lock/security concept

**Acceptance Criteria:**

- [ ] Feature card appears in Explore Features section
- [ ] Placeholder image displays correctly (container + lock visual)
- [ ] "Explore Images" button navigates to Images view
- [ ] "Learn more" link opens external documentation
- [ ] Telemetry tracks user interactions

---

## 3. Pull Image Security CTA

### 3.1 Security Insights CTA Component

**Description:**  
Add a call-to-action component in the Pull Image dialog to promote security extension installation.

**Requirements:**

- Create `HummingbirdCTA.svelte` component
- Display message: "Discover and adopt hardened, Zero-CVE container images."
- Clickable link text: "Install Image Optimizer extensions."
- Clicking redirects to Extensions Catalog filtered by "Hummingbird"
- Include security shield icon

**Acceptance Criteria:**

- [ ] CTA appears in Pull Image screen
- [ ] Clicking the link navigates to `/extensions?screen=catalog&searchTerm=Hummingbird`
- [ ] Telemetry tracks CTA clicks with image name context
- [ ] Styling matches Podman Desktop design system

---

## 4. Image Details - Image Optimizations Tab

### 4.1 New Tab in Image Details View

**Description:**  
Add a new "Image Optimizations" tab in the Image Details view that shows optimization recommendations or prompts extension installation.

**Requirements:**

#### Tab Configuration:

- Tab Name: "Image Optimizations"
- Route: `/optimize`
- Always visible (even when no optimizer extension is installed)

#### Empty State (No Extension Installed):

- Title: "Install an Image Optimizer Extension"
- Custom SVG placeholder icon showing:
  - Container box with layer bars
  - Security shield with checkmark (green)
  - Zero badge (green circle with "0")
- Description highlighting:
  - Zero-CVE alternatives
  - Distroless images
  - Reduced attack surface
  - Improved security posture
  - Proposed Text: "Get recommendations for optimized container images that are more secure and efficient. Image optimizer extensions analyze your images and suggest zero-CVE and distroless alternatives that reduce your attack surface, minimize image size, and improve container security posture."
- Button: "Install Extension"
- Button action: Navigate to Extensions Catalog filtered by "type: ImageOptimizer"

#### Active State (Extension Installed):

When an Image Optimizer extension is installed and an alternative is found, display:

**Comparison Dashboard:**

- Side-by-side comparison of current image vs Hummingbird alternative
- Current image details: name, size, CVE count
- Alternative image details: registry path, size, CVE count, signed status
- Savings summary: percentage of CVE reduction and size reduction
- Historical security badge showing "Daily Avg CVEs" for stability indication

**Severity Breakdown Chart:**

- Horizontal bar chart using Chart.js
- Side-by-side comparison of Critical, High, Medium, Low CVE counts
- Color-coded bars (red/orange/yellow/blue for current, green for alternative)
- Legend showing both images

**"What's Missing?" Section:**

- List of bloat removed from the hardened image
- Items displayed as tags (e.g., bash, apt, wget, curl, gcc, make, perl)
- Explanation text about reduced attack surface

**Dockerfile Helper:**

- Code snippet showing the new FROM line
- Copy-to-clipboard button
- Example: `FROM quay.io/hummingbird/nodejs:20`

**Actions:**

- "Pull Hummingbird Image" button to pull the alternative
- "Learn more" link to external documentation

#### No Alternative Available State:

- Title: "No Optimized Alternative"
- Message: "No Hummingbird alternative is available for this image at this time."
- "Learn More About Hummingbird" button linking to documentation

---

## 5. Image Optimizer Provider API

### 5.1 New Extension Point for Image Optimization

**Description:**  
Create a new extension API that allows extensions to provide image optimization recommendations.

**Requirements:**

#### API Types:

```typescript
interface SeverityDistribution {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

interface ImageMetrics {
  tag?: string;
  size: string;
  sizeBytes?: number;
  cveCount: number;
  isSigned: boolean;
  severityDistribution?: SeverityDistribution;
}

interface HistoricalSecurityData {
  dailyAverageCVEs: number;
  lastUpdated: string;
}

interface OptimizeResult {
  currentImage: ImageMetrics;
  alternative: ImageMetrics & {
    imageName: string;
    registry: string;
  };
  historicalData?: HistoricalSecurityData;
  removedBloat?: string[];
}

interface ImageOptimizerProvider {
  getAlternative(imageName: string, token?: CancellationToken): Promise<OptimizeResult | undefined>;
  getCatalog?(token?: CancellationToken): Promise<HummingbirdCatalogEntry[]>;
}
```

#### Backend Implementation:

- `ImageOptimizerImpl` class to manage provider registration
- EventEmitter for provider updates
- Methods: `registerImageOptimizerProvider`, `getAlternative`, `getCatalog`, `getImageOptimizerProviders`

#### IPC Handlers:

- `image-optimizer:getProviders` - List registered providers
- `image-optimizer:getAlternative` - Get optimization recommendation for an image
- `image-optimizer:getCatalog` - Get full catalog of available alternatives

**Acceptance Criteria:**

- [ ] Extensions can register as image optimizer providers
- [ ] Provider registration emits update events
- [ ] Frontend can query registered providers
- [ ] Frontend can request optimization recommendations
- [ ] API supports severity distribution data
- [ ] API supports historical security data
- [ ] API supports removed bloat list
- [ ] Proper cleanup on provider disposal

---

## 6. Extensions Catalog Entry

### 6.1 Hummingbird Extension in Catalog

**Description:**  
Add the Hummingbird extension to the extensions catalog so users can discover and install it.

**Requirements:**

- Add entry to `extensions-catalog.json`
- Extension ID: `hummingbird.hummingbird-optimizer`
- Display Name: "Hummingbird Optimizer"
- Publisher: "Red Hat"
- Categories: `["Security", "Images"]`
- Keywords: `["hummingbird", "security", "cve", "hardened", "distroless", "optimization"]`
- Short Description: Highlight zero-CVE and distroless alternatives
- Icon: Hummingbird/security themed

**Acceptance Criteria:**

- [ ] Extension appears in catalog when searching "Hummingbird"
- [ ] Extension appears in catalog when searching "type: ImageOptimizer"
- [ ] Extension details page shows correct information
- [ ] Install button initiates installation flow

---

## 7. Hummingbird Extension (Reference Implementation)

### 7.1 Extension Structure

**Description:**  
Create a placeholder Hummingbird extension that implements the Image Optimizer Provider API.

**Requirements:**

#### Extension Manifest (`package.json`):

- Name: `hummingbird`
- Display Name: "Hummingbird Optimizer"
- Publisher: "hummingbird"
- Version: "0.0.1"
- Categories: `["Security", "Images"]`

#### Catalog (`catalog.ts`):

- Maintain mapping of standard images to hardened alternatives
- Include metadata: CVE counts, sizes, signed status
- Include severity distribution (Critical, High, Medium, Low)
- Include removed bloat list
- Include daily average CVE metric
- Support lookup by image name

#### Provider Implementation (`extension.ts`):

- Register as ImageOptimizerProvider on activation
- Implement `getAlternative()` to lookup catalog and return full OptimizeResult
- Implement `getCatalog()` to return full catalog
- Proper cleanup on deactivation

#### Sample Catalog Entries:

| Original | Hardened                   | Current CVEs | Current Severity (C/H/M/L) | Hardened CVEs | Removed Bloat                          |
| -------- | -------------------------- | ------------ | -------------------------- | ------------- | -------------------------------------- |
| node     | quay.io/hummingbird/nodejs | 284          | 12/45/127/100              | 0             | bash, apt, wget, curl, gcc, make, perl |
| python   | quay.io/hummingbird/python | 189          | 8/32/89/60                 | 0             | bash, apt, wget, curl, gcc, make, pip  |
| golang   | quay.io/hummingbird/go     | 95           | 3/18/45/29                 | 0             | bash, apt, wget, curl, gcc, git        |
| openjdk  | quay.io/hummingbird/jdk    | 312          | 18/67/156/71               | 0             | bash, apt, wget, curl, gcc, make       |
| ruby     | quay.io/hummingbird/ruby   | 145          | 5/28/78/34                 | 0             | bash, apt, wget, curl, gcc, make, gem  |

**Acceptance Criteria:**

- [ ] Extension activates without errors
- [ ] Provider is registered on activation
- [ ] Catalog contains sample image mappings with severity distribution
- [ ] getAlternative returns OptimizeResult with all fields (severity, bloat, historical)
- [ ] getCatalog returns full catalog
- [ ] Provider is unregistered on deactivation

---

## 8. Telemetry Requirements

### 8.1 Awareness Phase Tracking

**Description:**  
Track user interactions with Awareness features to measure effectiveness.

**Events to Track:**

| Event Name                         | Trigger                            | Properties                          |
| ---------------------------------- | ---------------------------------- | ----------------------------------- |
| `openLearningCenterGuide`          | User clicks Learning Center guide  | `guideId`                           |
| `exploreFeature.clicked`           | User clicks Explore Feature card   | `feature`                           |
| `securityInsights.pullCTA.clicked` | User clicks Pull Image CTA         | `imageName`                         |
| `imageOptimize.view`               | User views Image Optimizations tab | `hasAlternative`                    |
| `imageOptimize.installExtension`   | User clicks Install Extension      | -                                   |
| `imageOptimize.pullAlternative`    | User pulls alternative image       | `originalImage`, `alternativeImage` |
| `imageOptimize.learnMore`          | User clicks learn more link        | -                                   |

**Acceptance Criteria:**

- [ ] All events fire correctly with proper properties
- [ ] Events integrate with existing telemetry infrastructure
- [ ] No PII is included in event properties

---

_Document generated for Hummingbird Awareness implementation in Podman Desktop_
