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

import type { CatalogEntry } from './catalog';

/**
 * Format bytes to human-readable string
 */
function formatSize(bytes: number | undefined): string {
  if (bytes === undefined) return '—';
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(0)} ${units[unitIndex]}`;
}

/**
 * Format date to relative time (e.g., "2 days ago")
 */
function formatRelativeDate(dateStr: string | undefined): string {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
  return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
}

/**
 * Generate HTML for a single catalog entry card (matching Docker Hub style)
 */
function generateCardHtml(entry: CatalogEntry, registryPath: string, localTags: string[] = []): string {
  const altSize = formatSize(entry.alternativeSize);
  const origSize = formatSize(entry.currentSize);
  const sizeReduction = entry.sizeSavingsPercent ?? 0;
  const cveReduction = entry.currentCVECount ?? 0;
  const tags = entry.tags ?? ['latest'];
  const hasLocalTags = localTags.length > 0;
  const defaultTag = localTags.includes('latest') ? 'latest' : (localTags[0] ?? 'latest');

  return `
    <div class="card" role="group" aria-label="${entry.hummingbirdImage}">
      <!-- Header with icon and name -->
      <div class="card-header">
        <div class="card-icon" title="Hummingbird hardened image">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" fill="currentColor" opacity="0.2"/>
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
          </svg>
        </div>
        <div class="card-header-info">
          <div class="card-title" title="${registryPath}/${entry.hummingbirdImage}">${entry.hummingbirdImage.charAt(0).toUpperCase() + entry.hummingbirdImage.slice(1)}</div>
          <a class="card-publisher" href="#" onclick="viewDetails('${entry.hummingbirdImage}'); return false;" title="View on Quay.io">${registryPath}/${entry.hummingbirdImage}</a>
        </div>
        ${hasLocalTags ? '<span class="local-badge" title="Image available locally">Local</span>' : ''}
      </div>

      <!-- Tags/Versions -->
      <div class="card-tags">
        ${tags
          .map(tag => {
            const isLocal = localTags.includes(tag);
            return `<span class="tag${isLocal ? ' tag-local' : ''}" title="${isLocal ? 'Available locally' : 'Pull'} ${registryPath}/${entry.hummingbirdImage}:${tag}">${tag}${isLocal ? ' ✓' : ''}</span>`;
          })
          .join('')}
      </div>

      <!-- Description -->
      <div class="card-description" title="${entry.description ?? ''}">${entry.description ?? ''}</div>

      <!-- Metadata section -->
      <div class="card-metadata">
        <div class="meta-row" title="Number of CVEs eliminated from the original image">
          <span class="meta-label">CVEs Fixed</span>
          <span class="meta-value meta-highlight">${cveReduction}</span>
        </div>
        <div class="meta-row" title="Compressed image size (original: ${origSize})">
          <span class="meta-label">Size</span>
          <span class="meta-value">${altSize} <span class="meta-savings">(-${sizeReduction}%)</span></span>
        </div>
        <div class="meta-row" title="Last time this image was updated">
          <span class="meta-label">Last Updated</span>
          <span class="meta-value">${formatRelativeDate(entry.lastUpdated)}</span>
        </div>
      </div>

      <!-- Actions -->
      <div class="card-actions">
        <div class="pull-dropdown" id="dropdown-${entry.hummingbirdImage}">
          <button class="btn-pull-dropdown" onclick="toggleDropdown('${entry.hummingbirdImage}')" title="Select tag to pull or run">
            <svg class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
            <span>Pull: ${defaultTag}</span>
            <svg class="dropdown-arrow" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
          <div class="dropdown-menu" id="menu-${entry.hummingbirdImage}">
            ${tags
              .map(tag => {
                const isLocal = localTags.includes(tag);
                if (isLocal) {
                  return `<div class="dropdown-item dropdown-item-local" onclick="runImage('${registryPath}/${entry.hummingbirdImage}:${tag}', '${tag}')">
                  <span class="item-tag">${tag}</span>
                  <span class="item-status">Run ▶</span>
                </div>`;
                } else {
                  return `<div class="dropdown-item" onclick="selectAndPull('${entry.hummingbirdImage}', '${registryPath}/${entry.hummingbirdImage}:${tag}', '${tag}')">
                  <span class="item-tag">${tag}</span>
                  <span class="item-status">Pull ↓</span>
                </div>`;
                }
              })
              .join('')}
          </div>
        </div>
        <button class="btn-details" onclick="viewDetails('${entry.hummingbirdImage}')" title="View more details about this image">
          Details
        </button>
      </div>
    </div>
  `;
}

/**
 * Local images map: image name -> array of local tags
 */
export type LocalImagesMap = Record<string, string[]>;

/**
 * Generate the full HTML for the Hummingbird Catalog webview
 */
export function generateCatalogHtml(
  entries: CatalogEntry[],
  registryPath: string,
  localImages: LocalImagesMap = {},
): string {
  const cardsHtml = entries
    .map(entry => {
      const localTags = localImages[entry.hummingbirdImage] ?? [];
      return generateCardHtml(entry, registryPath, localTags);
    })
    .join('\n');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hummingbird Catalog</title>
  <style>
    :root {
      --pd-content-bg: #1e1e1e;
      --pd-content-card-bg: #252526;
      --pd-content-card-border: #3c3c3c;
      --pd-content-card-border-selected: #a855f7;
      --pd-content-header: #e7e7e7;
      --pd-content-text: #cccccc;
      --pd-card-header-text: #ffffff;
      --pd-badge-purple: #7c3aed;
      --pd-badge-green: #22c55e;
      --pd-link: #a855f7;
      --pd-button-primary: #a855f7;
      --pd-button-primary-hover: #9333ea;
      --pd-input-field-bg: #252526;
      --pd-input-field-stroke: #4b5563;
      --pd-input-field-placeholder: #6b7280;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: var(--pd-content-bg);
      color: var(--pd-content-text);
      font-size: 13px;
      line-height: 1.4;
    }

    .page-container {
      padding: 16px 20px;
    }

    .page-header {
      display: flex;
      align-items: center;
      padding-bottom: 8px;
    }

    .page-title {
      font-size: 20px;
      color: var(--pd-content-header);
      font-weight: 700;
      text-transform: capitalize;
    }

    .header-actions {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    .btn-refresh {
      background: none;
      border: none;
      color: var(--pd-link);
      font-size: 13px;
      cursor: pointer;
      padding: 4px 8px;
    }

    .btn-refresh:hover {
      text-decoration: underline;
    }

    .page-description {
      margin-bottom: 16px;
      padding: 12px 16px;
      background: rgba(168, 85, 247, 0.08);
      border-left: 3px solid var(--pd-link);
      border-radius: 0 4px 4px 0;
    }

    .page-description p {
      color: var(--pd-content-text);
      font-size: 12px;
      line-height: 1.5;
      margin: 0;
    }

    .page-description strong {
      color: var(--pd-badge-green);
    }

    .catalog-grid {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 12px;
    }

    @media (min-width: 920px) {
      .catalog-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 1180px) {
      .catalog-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .card {
      background: var(--pd-content-card-bg);
      border: 1px solid var(--pd-content-card-border);
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transition: border-color 0.15s, box-shadow 0.15s;
    }

    .card:hover {
      border-color: var(--pd-content-card-border-selected);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    /* Header section */
    .card-header {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      padding: 12px 12px 0 12px;
    }

    .card-icon {
      width: 36px;
      height: 36px;
      color: var(--pd-badge-purple);
      flex-shrink: 0;
      cursor: help;
    }

    .card-icon svg {
      width: 100%;
      height: 100%;
    }

    .card-header-info {
      flex: 1;
      min-width: 0;
    }

    .card-title {
      color: var(--pd-content-header);
      font-weight: 500;
      font-size: 13px;
      line-height: 1.3;
      word-break: break-word;
      cursor: help;
    }

    .card-publisher {
      color: var(--pd-link);
      font-size: 11px;
      text-decoration: none;
      display: inline-block;
      margin-top: 2px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 100%;
    }

    .card-publisher:hover {
      text-decoration: underline;
    }

    /* Tags */
    .card-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      padding: 6px 12px;
    }

    /* Description */
    .card-description {
      color: var(--pd-content-text);
      font-size: 11px;
      line-height: 1.4;
      padding: 0 12px 8px 12px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      cursor: help;
    }

    .tag {
      display: inline-block;
      padding: 2px 6px;
      font-size: 10px;
      font-weight: 500;
      color: var(--pd-content-header);
      background: rgba(168, 85, 247, 0.15);
      border: 1px solid rgba(168, 85, 247, 0.3);
      border-radius: 3px;
      cursor: help;
    }

    .tag:hover {
      background: rgba(168, 85, 247, 0.25);
      border-color: var(--pd-link);
    }

    .tag-local {
      background: rgba(34, 197, 94, 0.15);
      border-color: rgba(34, 197, 94, 0.3);
      color: var(--pd-badge-green);
    }

    .tag-local:hover {
      background: rgba(34, 197, 94, 0.25);
      border-color: var(--pd-badge-green);
    }

    .local-badge {
      padding: 2px 6px;
      font-size: 9px;
      font-weight: 600;
      text-transform: uppercase;
      background: rgba(34, 197, 94, 0.2);
      color: var(--pd-badge-green);
      border-radius: 3px;
      margin-left: auto;
    }

    /* Metadata section */
    .card-metadata {
      padding: 0 12px 8px 12px;
      border-top: 1px solid var(--pd-content-card-border);
      margin-top: auto;
    }

    .meta-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      cursor: help;
    }

    .meta-row:last-child {
      border-bottom: none;
    }

    .meta-label {
      color: var(--pd-content-text);
      font-size: 11px;
    }

    .meta-value {
      color: var(--pd-content-header);
      font-size: 11px;
      font-weight: 500;
      text-align: right;
    }

    .meta-highlight {
      color: var(--pd-badge-green);
      font-weight: 600;
    }

    .meta-savings {
      color: var(--pd-badge-green);
      font-size: 10px;
      font-weight: 500;
    }

    /* Actions */
    .card-actions {
      display: flex;
      gap: 6px;
      padding: 8px 12px;
      border-top: 1px solid var(--pd-content-card-border);
      background: rgba(0, 0, 0, 0.1);
    }

    .pull-dropdown {
      position: relative;
      flex: 1;
    }

    .btn-pull-dropdown {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      width: 100%;
      background: var(--pd-button-primary);
      color: white;
      border: none;
      border-radius: 4px;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.15s;
    }

    .btn-pull-dropdown:hover {
      background: var(--pd-button-primary-hover);
    }

    .dropdown-arrow {
      width: 12px;
      height: 12px;
      margin-left: auto;
    }

    .dropdown-menu {
      display: none;
      position: absolute;
      bottom: 100%;
      left: 0;
      right: 0;
      background: var(--pd-content-card-bg);
      border: 1px solid var(--pd-content-card-border);
      border-radius: 4px;
      margin-bottom: 4px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
      z-index: 100;
      max-height: 150px;
      overflow-y: auto;
    }

    .dropdown-menu.show {
      display: block;
    }

    .dropdown-item {
      padding: 8px 12px;
      font-size: 12px;
      color: var(--pd-content-text);
      cursor: pointer;
      transition: background 0.1s;
    }

    .dropdown-item:hover {
      background: var(--pd-button-primary);
      color: white;
    }

    .dropdown-item:first-child {
      border-radius: 3px 3px 0 0;
    }

    .dropdown-item:last-child {
      border-radius: 0 0 3px 3px;
    }

    .dropdown-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .item-tag {
      flex: 1;
    }

    .item-status {
      font-size: 10px;
      opacity: 0.7;
      margin-left: 8px;
    }

    .dropdown-item-local {
      background: rgba(34, 197, 94, 0.1);
    }

    .dropdown-item-local:hover {
      background: var(--pd-badge-green);
    }

    .dropdown-item-local .item-status {
      color: var(--pd-badge-green);
    }

    .dropdown-item-local:hover .item-status {
      color: white;
    }

    .btn-icon {
      width: 12px;
      height: 12px;
    }

    .btn-details {
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: 1px solid var(--pd-content-card-border);
      border-radius: 4px;
      padding: 6px 12px;
      font-size: 12px;
      color: var(--pd-content-text);
      cursor: pointer;
      transition: border-color 0.15s, color 0.15s;
    }

    .btn-details:hover {
      border-color: var(--pd-link);
      color: var(--pd-link);
    }

    .search-container {
      margin-bottom: 16px;
      padding-left: 0;
      width: 288px;
    }

    .search-wrapper {
      display: flex;
      align-items: center;
      padding: 4px;
      background: var(--pd-input-field-bg);
      border-bottom: 1px solid var(--pd-input-field-stroke);
    }

    .search-wrapper:hover {
      background: #2d2d30;
    }

    .search-wrapper:focus-within {
      background: #2d2d30;
      border-radius: 6px;
      border: 1px solid var(--pd-input-field-stroke);
    }

    .search-icon {
      width: 16px;
      height: 16px;
      margin: 0 4px;
      color: #374151;
      flex-shrink: 0;
    }

    .search-input {
      flex: 1;
      padding: 2px 4px;
      font-size: 13px;
      background: transparent;
      border: none;
      color: var(--pd-content-text);
      outline: none;
    }

    .search-input::placeholder {
      color: var(--pd-input-field-placeholder);
    }
  </style>
</head>
<body>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">Hummingbird Catalog</h1>
      <div class="header-actions">
        <button class="btn-refresh" onclick="refreshCatalog()">Refresh the catalog</button>
      </div>
    </div>

    <div class="page-description">
      <p>Hummingbird images are hardened, minimal container images with <strong>zero known CVEs</strong>. They are rebuilt daily to ensure security and are significantly smaller than traditional images, reducing attack surface and improving deployment speed.</p>
    </div>

    <div class="search-container">
      <div class="search-wrapper">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input type="text" class="search-input" placeholder="Search Hummingbird Catalog..." id="searchInput" onkeyup="filterCards()">
      </div>
    </div>

    <div class="catalog-grid" id="catalogGrid">
      ${cardsHtml}
    </div>
  </div>

  <script>
    const vscode = acquireVsCodeApi();

    function pullImage(imageName) {
      vscode.postMessage({
        command: 'pullImage',
        imageName: imageName
      });
    }

    function runImage(imageName, tag) {
      // Close dropdown
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.remove('show');
      });
      
      vscode.postMessage({
        command: 'runImage',
        imageName: imageName
      });
    }

    function viewDetails(imageName) {
      vscode.postMessage({
        command: 'viewDetails',
        imageName: imageName
      });
    }

    function refreshCatalog() {
      vscode.postMessage({
        command: 'refresh'
      });
    }

    function filterCards() {
      const searchTerm = document.getElementById('searchInput').value.toLowerCase();
      const cards = document.querySelectorAll('.card');
      
      cards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const description = card.querySelector('.card-description').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }

    function toggleDropdown(imageId) {
      // Close all other dropdowns first
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        if (menu.id !== 'menu-' + imageId) {
          menu.classList.remove('show');
        }
      });
      
      const menu = document.getElementById('menu-' + imageId);
      menu.classList.toggle('show');
    }

    function selectAndPull(imageId, fullImageName, tag) {
      // Update button text
      const dropdown = document.getElementById('dropdown-' + imageId);
      const btn = dropdown.querySelector('.btn-pull-dropdown span');
      btn.textContent = 'Pull: ' + tag;
      
      // Close dropdown
      document.getElementById('menu-' + imageId).classList.remove('show');
      
      // Pull the image
      pullImage(fullImageName);
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.pull-dropdown')) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
          menu.classList.remove('show');
        });
      }
    });
  </script>
</body>
</html>
  `;
}
