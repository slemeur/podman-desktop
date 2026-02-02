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

import * as extensionApi from '@podman-desktop/api';

import { HummingbirdCatalog } from './catalog';
import { generateCatalogHtml } from './catalog-view';

// Hummingbird registry path
const registryPath = 'quay.io/hummingbird';

// Create catalog instance
const catalog = new HummingbirdCatalog();

// Store the disposables for cleanup
let providerDisposable: extensionApi.Disposable | undefined;
let webviewPanel: extensionApi.WebviewPanel | undefined;

/**
 * Format bytes to human-readable string
 */
function formatSize(bytes: number | undefined): string {
  if (bytes === undefined) return 'Unknown';
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

export async function activate(extensionContext: extensionApi.ExtensionContext): Promise<void> {
  console.log('Hummingbird extension activating...');

  // Create the Hummingbird Catalog webview panel
  webviewPanel = extensionApi.window.createWebviewPanel('hummingbird-catalog', 'Hummingbird Catalog', {
    localResourceRoots: [],
  });

  // Set the webview HTML content
  const catalogEntries = catalog.getAll();
  webviewPanel.webview.html = generateCatalogHtml(catalogEntries, registryPath);

  // Handle messages from the webview
  webviewPanel.webview.onDidReceiveMessage((rawMessage: unknown) => {
    const message = rawMessage as { command: string; imageName?: string };
    (async (): Promise<void> => {
      switch (message.command) {
        case 'pullImage':
          if (message.imageName) {
            console.log(`Pulling image: ${message.imageName}`);
            // Navigate to pull image page
            await extensionApi.navigation.navigateToImages();
            await extensionApi.window.showInformationMessage(
              `To pull ${message.imageName}, use: podman pull ${message.imageName}`,
            );
          }
          break;
        case 'runImage':
          if (message.imageName) {
            console.log(`Running image: ${message.imageName}`);
            // Navigate to images page to run
            await extensionApi.navigation.navigateToImages();
            await extensionApi.window.showInformationMessage(
              `To run ${message.imageName}, use: podman run ${message.imageName}`,
            );
          }
          break;
        case 'viewDetails':
          if (message.imageName) {
            console.log(`Viewing details for: ${message.imageName}`);
            // Open external link to the image
            await extensionApi.env.openExternal(extensionApi.Uri.parse(`https://${registryPath}/${message.imageName}`));
          }
          break;
      }
    })().catch((err: unknown) => console.error('Error handling webview message', err));
  });

  extensionContext.subscriptions.push(webviewPanel);

  // Register as an image optimizer provider
  providerDisposable = extensionApi.imageOptimizer.registerImageOptimizerProvider(
    {
      id: 'hummingbird',
      label: 'Hummingbird Optimizer',
    },
    {
      getAlternative: async (
        imageName: string,
        _token?: extensionApi.CancellationToken,
      ): Promise<extensionApi.OptimizeResult | undefined> => {
        // Look up the image in our catalog
        const entry = catalog.findAlternative(imageName);

        if (!entry) {
          return undefined;
        }

        // Build the result using the correct API types
        const result: extensionApi.OptimizeResult = {
          currentImage: {
            tag: imageName,
            size: formatSize(entry.currentSize),
            sizeBytes: entry.currentSize,
            cveCount: entry.currentCVECount ?? 0,
            isSigned: false,
            severityDistribution: entry.currentSeverity,
          },
          alternative: {
            imageName: entry.hummingbirdImage,
            registry: `${registryPath}/${entry.hummingbirdImage}`,
            tag: entry.tags?.[0] ?? 'latest',
            size: formatSize(entry.alternativeSize),
            sizeBytes: entry.alternativeSize,
            cveCount: entry.alternativeCVECount ?? 0,
            isSigned: entry.signed ?? true,
            severityDistribution: entry.alternativeSeverity,
          },
          historicalData:
            entry.dailyAverageCVEs !== undefined
              ? {
                  dailyAverageCVEs: entry.dailyAverageCVEs,
                  lastUpdated: new Date().toISOString(),
                }
              : undefined,
          removedBloat: entry.removedBloat,
        };

        return result;
      },

      getCatalog: async (_token?: extensionApi.CancellationToken): Promise<extensionApi.HummingbirdCatalogEntry[]> => {
        const entries = catalog.getAll();
        return entries.map(entry => ({
          originalImage: entry.originalImage,
          hummingbirdImage: `${registryPath}/${entry.hummingbirdImage}`,
          description: entry.description,
        }));
      },
    },
  );

  extensionContext.subscriptions.push(providerDisposable);

  console.log('Hummingbird extension activated successfully');
}

export async function deactivate(): Promise<void> {
  console.log('Hummingbird extension deactivating...');

  if (webviewPanel) {
    webviewPanel.dispose();
    webviewPanel = undefined;
  }

  if (providerDisposable) {
    providerDisposable.dispose();
    providerDisposable = undefined;
  }

  console.log('Hummingbird extension deactivated');
}
