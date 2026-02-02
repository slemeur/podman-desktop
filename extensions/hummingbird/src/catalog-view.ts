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
 * Generate HTML for a single catalog entry card (matching Extension Catalog format)
 */
function generateCardHtml(entry: CatalogEntry, registryPath: string): string {
  const altSize = formatSize(entry.alternativeSize);
  const sizeReduction = entry.sizeSavingsPercent ?? 0;
  const latestTag = entry.tags?.[0] ?? 'latest';

  return `
    <div class="card" role="group" aria-label="${entry.hummingbirdImage}">
      <!-- Zero CVE Banner -->
      <div class="featured-banner">
        <svg class="banner-icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        Zero CVE
      </div>

      <div class="card-content">
        <div class="card-main">
          <div class="card-left">
            <div class="card-header-row">
              <div class="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" fill="currentColor" opacity="0.2"/>
                  <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
                </svg>
              </div>
              <div class="card-info">
                <div class="card-title">${entry.hummingbirdImage}</div>
                <div class="card-description">${entry.description ?? ''}</div>
              </div>
            </div>
            <div class="card-publisher">Red Hat • ${altSize} • -${sizeReduction}% smaller</div>
          </div>

          <div class="card-right">
            <button class="btn-install" onclick="pullImage('${registryPath}/${entry.hummingbirdImage}:${latestTag}')">
              <svg class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
              Pull
            </button>
          </div>
        </div>

        <div class="card-footer">
          <div class="card-version">${latestTag}</div>
          <button class="btn-details" onclick="viewDetails('${entry.hummingbirdImage}')">
            <svg class="details-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
            </svg>
            More details
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generate the full HTML for the Hummingbird Catalog webview
 */
export function generateCatalogHtml(entries: CatalogEntry[], registryPath: string): string {
  const cardsHtml = entries.map(entry => generateCardHtml(entry, registryPath)).join('\n');

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
      --pd-content-header: #ffffff;
      --pd-content-text: #cccccc;
      --pd-card-header-text: #ffffff;
      --pd-badge-purple: #7c3aed;
      --pd-badge-green: #22c55e;
      --pd-link: #a855f7;
      --pd-button-primary: #a855f7;
      --pd-button-primary-hover: #9333ea;
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
      padding: 12px 20px;
    }

    .page-header {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
    }

    .page-title {
      font-size: 14px;
      color: var(--pd-content-header);
      font-weight: 400;
    }

    .header-actions {
      flex: 1;
      text-align: right;
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
      border: 1px solid var(--pd-content-bg);
      border-radius: 8px;
      min-height: 128px;
      max-height: 128px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transition: border-color 0.15s;
    }

    .card:hover {
      border-color: var(--pd-content-card-border-selected);
    }

    .featured-banner {
      background: var(--pd-badge-green);
      color: var(--pd-card-header-text);
      padding: 0 8px;
      font-size: 12px;
      min-height: 24px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .banner-icon {
      width: 14px;
      height: 14px;
    }

    .card-content {
      padding: 12px;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .card-main {
      display: flex;
      flex-direction: row;
      width: 100%;
    }

    .card-left {
      flex: 3;
      display: flex;
      flex-direction: column;
    }

    .card-header-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .card-icon {
      width: 40px;
      height: 40px;
      color: var(--pd-badge-purple);
      flex-shrink: 0;
    }

    .card-icon svg {
      width: 100%;
      height: 100%;
    }

    .card-info {
      flex: 1;
      min-width: 0;
    }

    .card-title {
      color: var(--pd-content-header);
      font-weight: 500;
      line-height: 1.2;
      max-height: 32px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .card-description {
      color: var(--pd-content-text);
      font-size: 12px;
      margin-top: 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .card-publisher {
      color: var(--pd-content-text);
      font-size: 12px;
      margin-top: 4px;
    }

    .card-right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .btn-install {
      display: flex;
      align-items: center;
      gap: 4px;
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

    .btn-install:hover {
      background: var(--pd-button-primary-hover);
    }

    .btn-icon {
      width: 14px;
      height: 14px;
    }

    .card-footer {
      display: flex;
      align-items: center;
      margin-top: auto;
      padding-top: 8px;
    }

    .card-version {
      color: var(--pd-content-text);
      font-size: 12px;
    }

    .btn-details {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 4px;
      background: none;
      border: none;
      color: var(--pd-link);
      font-size: 12px;
      cursor: pointer;
      padding: 2px 4px;
    }

    .btn-details:hover {
      text-decoration: underline;
    }

    .details-icon {
      width: 14px;
      height: 14px;
    }

    .search-container {
      margin-bottom: 16px;
    }

    .search-input {
      width: 100%;
      max-width: 300px;
      padding: 8px 12px;
      font-size: 13px;
      background: var(--pd-content-card-bg);
      border: 1px solid var(--pd-content-card-border);
      border-radius: 4px;
      color: var(--pd-content-text);
      outline: none;
    }

    .search-input:focus {
      border-color: var(--pd-link);
    }

    .search-input::placeholder {
      color: #808080;
    }
  </style>
</head>
<body>
  <div class="page-container">
    <div class="page-header">
      <div class="page-title">Hummingbird Images (${entries.length})</div>
      <div class="header-actions">
        <button class="btn-refresh" onclick="refreshCatalog()">Refresh the catalog</button>
      </div>
    </div>

    <div class="search-container">
      <input type="text" class="search-input" placeholder="Search images..." id="searchInput" onkeyup="filterCards()">
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
  </script>
</body>
</html>
  `;
}
