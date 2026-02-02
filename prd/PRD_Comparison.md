# **PRD: Hummingbird Security Extension \- Scope 2: Comparison**

## **1\. Project Overview**

**Project Name:** Hummingbird Security

**Phase:** Session 3 Focus \- Comparison

**Objective:** Provide a data-driven "Justification Layer" within Podman Desktop. This allows developers to visually compare their current "bloated" images against **Hummingbird Hardened Images**, focusing on CVE reduction, size optimization, and provenance.

---

## **2\. User Stories (Comparison & Justification)**

| ID        | Title                       | User Story                                                                                                                                    |
| :-------- | :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| **US.C1** | **Side-by-Side Comparison** | As a developer, I want to see a direct comparison of my current image vs. a Hummingbird equivalent so I can justify the switch based on data. |
| **US.C2** | **Vulnerability Delta**     | As a developer, I want to see which specific CVEs are removed when switching to a Hummingbird image.                                          |
| **US.C3** | **Performance & Size**      | As a developer, I want to compare the compressed and uncompressed size to understand the performance gains in pull times and storage.         |
| **US.C4** | **Compatibility Check**     | As a developer, I want to "Try it Now" by pulling the Hummingbird version to verify my application still runs correctly.                      |

---

## **3\. Functional Requirements**

### **3.1. The "Optimize" Tab (Comparison View)**

The extension must contribute an **"Optimize"** tab to the Image Details view in Podman Desktop. When active, it displays:

- **Recommendation Engine:** \* Logic to map standard images (e.g., node:20, python:3.11) to their Hummingbird counterparts (e.g., quay.io/hummingbird/node:20).
- **Comparison Dashboard:**
  - **CVE Total:** A large-text comparison (e.g., **Standard: 284** vs **Hummingbird: 0**).
  - **Size Metric:** Comparison of image footprints (e.g., **385 MB** vs **55 MB**).
  - **Signature Status:** Indicator showing if the image is digitally signed (Provenance).

### **3.2. Data Visualizations**

- **Severity Breakdown:** A side-by-side horizontal bar chart showing the count of **Critical, High, Medium, and Low** vulnerabilities.
- **Historical Security:** A line chart or metric showing "Daily Average CVEs" to prove the image's long-term stability.
- **"What's Missing?" List:** A list of "bloat" removed (e.g., shells, package managers, unnecessary libraries) that contributed to the CVE reduction.

### **3.3. Call to Action (CTA)**

- **"Pull & Test" Button:** Triggers the pulling of the Hummingbird image.
- **Dockerfile Helper:** A code snippet block providing the new FROM line for the user to copy.

---

## **4\. Technical Specifications for Cursor**

### **4.1. Expected Data Model**

TypeScript

```

interface ImageComparison {
  currentImage: {
    tag: string;
    cveCount: number;
    sizeBytes: number;
    isSigned: boolean;
    severityDistribution: { critical: number; high: number; medium: number; low: number; };
  };
  hummingbirdEquivalent: {
    tag: string;
    cveCount: number;
    sizeBytes: number;
    isSigned: boolean;
    severityDistribution: { critical: number; high: number; medium: number; low: number; };
  };
}

```

### **4.2. UI Elements**

- **Neutrality:** Use standard Podman Desktop components.
- **Color Palette:** \* **Red/Amber:** For sub-optimal/standard images.
  - **Hummingbird Green:** For the hardened/optimized images.
- **Labels:** Use "Hardened," "Zero-CVE," and "Minimal."

---

## **5\. Constraints & Risks**

- **Matching Accuracy:** Ensuring the extension correctly identifies the _exact_ Hummingbird version for a given standard tag.
- **Data Freshness:** CVE data must be pulled from a reliable, up-to-date source (Hummingbird API/Catalog).
- **Vendor Neutrality:** Ensure the "Optimize" tab feels like a value-add utility rather than a hard-sell advertisement.

---

## **6\. Success Metrics**

- **Engagement:** Number of developers who view the Comparison charts.
- **Conversion:** Number of users who click "Pull & Test" for a Hummingbird image after seeing the comparison.
