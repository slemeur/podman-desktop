/**********************************************************************
 * Copyright (C) 2025 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ***********************************************************************/

/**
 * CVE severity distribution breakdown
 */
export interface SeverityDistribution {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

/**
 * Entry in the Hummingbird catalog mapping original images to hardened alternatives
 */
export interface CatalogEntry {
  /** Original image name (e.g., "node", "python", "nginx") */
  originalImage: string;
  /** Hummingbird alternative image name */
  hummingbirdImage: string;
  /** Description of the alternative */
  description?: string;
  /** Current CVE count for the original image (mock data for Phase 1) */
  currentCVECount?: number;
  /** CVE count for the Hummingbird alternative */
  alternativeCVECount?: number;
  /** Size of the current image in bytes */
  currentSize?: number;
  /** Size of the alternative image in bytes */
  alternativeSize?: number;
  /** Size savings percentage */
  sizeSavingsPercent?: number;
  /** CVE savings percentage */
  cveSavingsPercent?: number;
  /** Whether the image is signed */
  signed?: boolean;
  /** Tags available */
  tags?: string[];
  /** Severity distribution for current image */
  currentSeverity?: SeverityDistribution;
  /** Severity distribution for alternative image */
  alternativeSeverity?: SeverityDistribution;
  /** List of bloat removed in the alternative */
  removedBloat?: string[];
  /** Daily average CVEs for the alternative (stability metric) */
  dailyAverageCVEs?: number;
}

/**
 * Hummingbird catalog containing mappings from popular images to hardened alternatives
 *
 * Phase 1 includes language runtimes: Node.js, Python, Go, Java, Ruby
 */
const CATALOG_ENTRIES: CatalogEntry[] = [
  {
    originalImage: 'node',
    hummingbirdImage: 'nodejs',
    description: 'Hardened Node.js runtime with minimal attack surface',
    currentCVECount: 284,
    alternativeCVECount: 0,
    currentSize: 350 * 1024 * 1024, // 350MB
    alternativeSize: 45 * 1024 * 1024, // 45MB
    sizeSavingsPercent: 87,
    cveSavingsPercent: 100,
    signed: true,
    tags: ['18', '20', '22', 'latest'],
    currentSeverity: { critical: 12, high: 45, medium: 127, low: 100 },
    alternativeSeverity: { critical: 0, high: 0, medium: 0, low: 0 },
    removedBloat: ['bash', 'sh', 'apt', 'apt-get', 'wget', 'curl', 'gcc', 'g++', 'make', 'perl', 'python'],
    dailyAverageCVEs: 0.1,
  },
  {
    originalImage: 'nodejs',
    hummingbirdImage: 'nodejs',
    description: 'Hardened Node.js runtime with minimal attack surface',
    currentCVECount: 284,
    alternativeCVECount: 0,
    currentSize: 350 * 1024 * 1024,
    alternativeSize: 45 * 1024 * 1024,
    sizeSavingsPercent: 87,
    cveSavingsPercent: 100,
    signed: true,
    tags: ['18', '20', '22', 'latest'],
    currentSeverity: { critical: 12, high: 45, medium: 127, low: 100 },
    alternativeSeverity: { critical: 0, high: 0, medium: 0, low: 0 },
    removedBloat: ['bash', 'sh', 'apt', 'apt-get', 'wget', 'curl', 'gcc', 'g++', 'make', 'perl', 'python'],
    dailyAverageCVEs: 0.1,
  },
  {
    originalImage: 'python',
    hummingbirdImage: 'python',
    description: 'Hardened Python runtime with minimal attack surface',
    currentCVECount: 189,
    alternativeCVECount: 0,
    currentSize: 420 * 1024 * 1024, // 420MB
    alternativeSize: 52 * 1024 * 1024, // 52MB
    sizeSavingsPercent: 88,
    cveSavingsPercent: 100,
    signed: true,
    tags: ['3.10', '3.11', '3.12', 'latest'],
    currentSeverity: { critical: 8, high: 32, medium: 89, low: 60 },
    alternativeSeverity: { critical: 0, high: 0, medium: 0, low: 0 },
    removedBloat: ['bash', 'sh', 'apt', 'apt-get', 'wget', 'curl', 'gcc', 'make', 'perl', 'pip'],
    dailyAverageCVEs: 0.2,
  },
  {
    originalImage: 'golang',
    hummingbirdImage: 'go',
    description: 'Hardened Go runtime with minimal attack surface',
    currentCVECount: 95,
    alternativeCVECount: 0,
    currentSize: 850 * 1024 * 1024, // 850MB
    alternativeSize: 250 * 1024 * 1024, // 250MB
    sizeSavingsPercent: 71,
    cveSavingsPercent: 100,
    signed: true,
    tags: ['1.21', '1.22', 'latest'],
    currentSeverity: { critical: 3, high: 18, medium: 45, low: 29 },
    alternativeSeverity: { critical: 0, high: 0, medium: 0, low: 0 },
    removedBloat: ['bash', 'sh', 'apt', 'apt-get', 'wget', 'curl', 'gcc', 'git'],
    dailyAverageCVEs: 0.15,
  },
  {
    originalImage: 'go',
    hummingbirdImage: 'go',
    description: 'Hardened Go runtime with minimal attack surface',
    currentCVECount: 95,
    alternativeCVECount: 0,
    currentSize: 850 * 1024 * 1024,
    alternativeSize: 250 * 1024 * 1024,
    sizeSavingsPercent: 71,
    cveSavingsPercent: 100,
    signed: true,
    tags: ['1.21', '1.22', 'latest'],
    currentSeverity: { critical: 3, high: 18, medium: 45, low: 29 },
    alternativeSeverity: { critical: 0, high: 0, medium: 0, low: 0 },
    removedBloat: ['bash', 'sh', 'apt', 'apt-get', 'wget', 'curl', 'gcc', 'git'],
    dailyAverageCVEs: 0.15,
  },
  {
    originalImage: 'openjdk',
    hummingbirdImage: 'jdk',
    description: 'Hardened OpenJDK runtime with minimal attack surface',
    currentCVECount: 312,
    alternativeCVECount: 0,
    currentSize: 520 * 1024 * 1024, // 520MB
    alternativeSize: 180 * 1024 * 1024, // 180MB
    sizeSavingsPercent: 65,
    cveSavingsPercent: 100,
    signed: true,
    tags: ['11', '17', '21', 'latest'],
    currentSeverity: { critical: 18, high: 67, medium: 156, low: 71 },
    alternativeSeverity: { critical: 0, high: 0, medium: 0, low: 0 },
    removedBloat: ['bash', 'sh', 'apt', 'apt-get', 'wget', 'curl', 'gcc', 'make', 'binutils'],
    dailyAverageCVEs: 0.08,
  },
  {
    originalImage: 'java',
    hummingbirdImage: 'jdk',
    description: 'Hardened Java runtime with minimal attack surface',
    currentCVECount: 312,
    alternativeCVECount: 0,
    currentSize: 520 * 1024 * 1024,
    alternativeSize: 180 * 1024 * 1024,
    sizeSavingsPercent: 65,
    cveSavingsPercent: 100,
    signed: true,
    tags: ['11', '17', '21', 'latest'],
    currentSeverity: { critical: 18, high: 67, medium: 156, low: 71 },
    alternativeSeverity: { critical: 0, high: 0, medium: 0, low: 0 },
    removedBloat: ['bash', 'sh', 'apt', 'apt-get', 'wget', 'curl', 'gcc', 'make', 'binutils'],
    dailyAverageCVEs: 0.08,
  },
  {
    originalImage: 'ruby',
    hummingbirdImage: 'ruby',
    description: 'Hardened Ruby runtime with minimal attack surface',
    currentCVECount: 145,
    alternativeCVECount: 0,
    currentSize: 290 * 1024 * 1024, // 290MB
    alternativeSize: 35 * 1024 * 1024, // 35MB
    sizeSavingsPercent: 88,
    cveSavingsPercent: 100,
    signed: true,
    tags: ['3.2', '3.3', 'latest'],
    currentSeverity: { critical: 5, high: 28, medium: 78, low: 34 },
    alternativeSeverity: { critical: 0, high: 0, medium: 0, low: 0 },
    removedBloat: ['bash', 'sh', 'apt', 'apt-get', 'wget', 'curl', 'gcc', 'make', 'gem'],
    dailyAverageCVEs: 0.12,
  },
  // Web servers
  {
    originalImage: 'nginx',
    hummingbirdImage: 'nginx',
    description: 'Hardened NGINX web server with minimal attack surface',
    currentCVECount: 89,
    alternativeCVECount: 0,
    currentSize: 142 * 1024 * 1024, // 142MB
    alternativeSize: 12 * 1024 * 1024, // 12MB
    sizeSavingsPercent: 92,
    cveSavingsPercent: 100,
    signed: true,
    tags: ['1.24', '1.25', 'latest'],
    currentSeverity: { critical: 4, high: 18, medium: 42, low: 25 },
    alternativeSeverity: { critical: 0, high: 0, medium: 0, low: 0 },
    removedBloat: ['bash', 'sh', 'apt', 'apt-get', 'wget', 'curl', 'perl'],
    dailyAverageCVEs: 0.05,
  },
  {
    originalImage: 'httpd',
    hummingbirdImage: 'httpd',
    description: 'Hardened Apache HTTPD server with minimal attack surface',
    currentCVECount: 76,
    alternativeCVECount: 0,
    currentSize: 168 * 1024 * 1024, // 168MB
    alternativeSize: 18 * 1024 * 1024, // 18MB
    sizeSavingsPercent: 89,
    cveSavingsPercent: 100,
    signed: true,
    tags: ['2.4', 'latest'],
    currentSeverity: { critical: 2, high: 15, medium: 38, low: 21 },
    alternativeSeverity: { critical: 0, high: 0, medium: 0, low: 0 },
    removedBloat: ['bash', 'sh', 'apt', 'apt-get', 'wget', 'curl', 'perl'],
    dailyAverageCVEs: 0.08,
  },
  // Databases
  {
    originalImage: 'redis',
    hummingbirdImage: 'redis',
    description: 'Hardened Redis server with minimal attack surface',
    currentCVECount: 54,
    alternativeCVECount: 0,
    currentSize: 130 * 1024 * 1024, // 130MB
    alternativeSize: 15 * 1024 * 1024, // 15MB
    sizeSavingsPercent: 88,
    cveSavingsPercent: 100,
    signed: true,
    tags: ['7.0', '7.2', 'latest'],
    currentSeverity: { critical: 1, high: 12, medium: 28, low: 13 },
    alternativeSeverity: { critical: 0, high: 0, medium: 0, low: 0 },
    removedBloat: ['bash', 'sh', 'apt', 'apt-get', 'wget', 'curl'],
    dailyAverageCVEs: 0.03,
  },
  {
    originalImage: 'postgres',
    hummingbirdImage: 'postgresql',
    description: 'Hardened PostgreSQL database with minimal attack surface',
    currentCVECount: 112,
    alternativeCVECount: 0,
    currentSize: 380 * 1024 * 1024, // 380MB
    alternativeSize: 85 * 1024 * 1024, // 85MB
    sizeSavingsPercent: 78,
    cveSavingsPercent: 100,
    signed: true,
    tags: ['14', '15', '16', 'latest'],
    currentSeverity: { critical: 3, high: 22, medium: 56, low: 31 },
    alternativeSeverity: { critical: 0, high: 0, medium: 0, low: 0 },
    removedBloat: ['bash', 'sh', 'apt', 'apt-get', 'wget', 'curl', 'perl', 'python'],
    dailyAverageCVEs: 0.1,
  },
  {
    originalImage: 'postgresql',
    hummingbirdImage: 'postgresql',
    description: 'Hardened PostgreSQL database with minimal attack surface',
    currentCVECount: 112,
    alternativeCVECount: 0,
    currentSize: 380 * 1024 * 1024,
    alternativeSize: 85 * 1024 * 1024,
    sizeSavingsPercent: 78,
    cveSavingsPercent: 100,
    signed: true,
    tags: ['14', '15', '16', 'latest'],
    currentSeverity: { critical: 3, high: 22, medium: 56, low: 31 },
    alternativeSeverity: { critical: 0, high: 0, medium: 0, low: 0 },
    removedBloat: ['bash', 'sh', 'apt', 'apt-get', 'wget', 'curl', 'perl', 'python'],
    dailyAverageCVEs: 0.1,
  },
  // Base images
  {
    originalImage: 'alpine',
    hummingbirdImage: 'alpine',
    description: 'Hardened Alpine Linux base image',
    currentCVECount: 12,
    alternativeCVECount: 0,
    currentSize: 7 * 1024 * 1024, // 7MB
    alternativeSize: 3 * 1024 * 1024, // 3MB
    sizeSavingsPercent: 57,
    cveSavingsPercent: 100,
    signed: true,
    tags: ['3.18', '3.19', 'latest'],
    currentSeverity: { critical: 0, high: 2, medium: 6, low: 4 },
    alternativeSeverity: { critical: 0, high: 0, medium: 0, low: 0 },
    removedBloat: ['apk', 'busybox'],
    dailyAverageCVEs: 0.02,
  },
  {
    originalImage: 'ubuntu',
    hummingbirdImage: 'ubuntu',
    description: 'Hardened Ubuntu base image with minimal attack surface',
    currentCVECount: 156,
    alternativeCVECount: 0,
    currentSize: 78 * 1024 * 1024, // 78MB
    alternativeSize: 22 * 1024 * 1024, // 22MB
    sizeSavingsPercent: 72,
    cveSavingsPercent: 100,
    signed: true,
    tags: ['22.04', '24.04', 'latest'],
    currentSeverity: { critical: 8, high: 35, medium: 78, low: 35 },
    alternativeSeverity: { critical: 0, high: 0, medium: 0, low: 0 },
    removedBloat: ['bash', 'sh', 'apt', 'apt-get', 'wget', 'curl', 'dpkg'],
    dailyAverageCVEs: 0.15,
  },
  {
    originalImage: 'debian',
    hummingbirdImage: 'debian',
    description: 'Hardened Debian base image with minimal attack surface',
    currentCVECount: 134,
    alternativeCVECount: 0,
    currentSize: 124 * 1024 * 1024, // 124MB
    alternativeSize: 28 * 1024 * 1024, // 28MB
    sizeSavingsPercent: 77,
    cveSavingsPercent: 100,
    signed: true,
    tags: ['11', '12', 'bookworm', 'latest'],
    currentSeverity: { critical: 6, high: 28, medium: 68, low: 32 },
    alternativeSeverity: { critical: 0, high: 0, medium: 0, low: 0 },
    removedBloat: ['bash', 'sh', 'apt', 'apt-get', 'wget', 'curl', 'dpkg'],
    dailyAverageCVEs: 0.12,
  },
];

/**
 * Catalog class for managing Hummingbird image mappings
 */
export class HummingbirdCatalog {
  private entries: Map<string, CatalogEntry>;

  constructor() {
    this.entries = new Map();
    for (const entry of CATALOG_ENTRIES) {
      this.entries.set(this.normalizeImageName(entry.originalImage), entry);
    }
  }

  /**
   * Normalize an image name by extracting just the base name
   * e.g., "docker.io/library/node:18" -> "node"
   */
  private normalizeImageName(imageName: string): string {
    // Remove registry prefix
    let name = imageName;

    // Remove common registry prefixes
    const registryPrefixes = ['docker.io/library/', 'docker.io/', 'quay.io/', 'gcr.io/', 'ghcr.io/'];

    for (const prefix of registryPrefixes) {
      if (name.startsWith(prefix)) {
        name = name.slice(prefix.length);
        break;
      }
    }

    // Remove tag
    const colonIndex = name.indexOf(':');
    if (colonIndex !== -1) {
      name = name.slice(0, colonIndex);
    }

    // Remove namespace if it's a library image
    const slashIndex = name.lastIndexOf('/');
    if (slashIndex !== -1) {
      name = name.slice(slashIndex + 1);
    }

    return name.toLowerCase();
  }

  /**
   * Find a Hummingbird alternative for the given image
   */
  findAlternative(imageName: string): CatalogEntry | undefined {
    const normalized = this.normalizeImageName(imageName);
    return this.entries.get(normalized);
  }

  /**
   * Get all catalog entries
   */
  getAll(): CatalogEntry[] {
    // Return unique entries (some originals map to the same Hummingbird image)
    const seen = new Set<string>();
    const unique: CatalogEntry[] = [];

    for (const entry of this.entries.values()) {
      if (!seen.has(entry.hummingbirdImage)) {
        seen.add(entry.hummingbirdImage);
        unique.push(entry);
      }
    }

    return unique;
  }

  /**
   * Check if an image has a Hummingbird alternative
   */
  hasAlternative(imageName: string): boolean {
    return this.findAlternative(imageName) !== undefined;
  }
}
