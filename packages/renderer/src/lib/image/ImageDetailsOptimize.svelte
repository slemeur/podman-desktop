<script lang="ts">
import {
  faArrowRight,
  faBoxOpen,
  faCalendarCheck,
  faExternalLinkAlt,
  faLeaf,
  faShieldHalved,
} from '@fortawesome/free-solid-svg-icons';
import type { ImageInfo } from '@podman-desktop/api';
import { Button, EmptyScreen, Link, Tooltip } from '@podman-desktop/ui-svelte';
import { onDestroy, onMount } from 'svelte';
import type { Unsubscriber } from 'svelte/store';
import Fa from 'svelte-fa';
import { router } from 'tinro';

import { imageOptimizerProviders } from '/@/stores/image-optimizer-providers';
import type { ImageOptimizerInfo, OptimizeResult } from '/@api/image-optimizer-info';

import DockerfileHelper from './DockerfileHelper.svelte';
import RemovedBloatList from './RemovedBloatList.svelte';
import SeverityChart from './SeverityChart.svelte';

interface Props {
  imageInfo?: ImageInfo;
}

const { imageInfo }: Props = $props();

let providers: ImageOptimizerInfo[] = $state([]);
let optimizeResult: OptimizeResult | undefined = $state(undefined);
let loading = $state(true);
let error: string | undefined = $state(undefined);
let cancellableTokenId: number = $state(0);

let providersUnsubscribe: Unsubscriber;

onMount(() => {
  providersUnsubscribe = imageOptimizerProviders.subscribe(_providers => {
    providers = [..._providers];
    if (providers.length > 0 && imageInfo) {
      checkForAlternative().catch((err: unknown) => console.error('Error checking for alternative', err));
    } else {
      loading = false;
    }
  });
});

onDestroy(() => {
  providersUnsubscribe?.();
  if (cancellableTokenId !== 0) {
    window.cancelToken(cancellableTokenId).catch((err: unknown) => console.error('Error cancelling token', err));
  }
});

async function checkForAlternative(): Promise<void> {
  if (!imageInfo || providers.length === 0) {
    loading = false;
    return;
  }

  loading = true;
  error = undefined;

  try {
    // Get a cancellable token
    cancellableTokenId = await window.getCancellableTokenSource();

    // Extract image name from the RepoTags
    const imageName = extractImageName(imageInfo);
    if (!imageName) {
      loading = false;
      return;
    }

    // Call the first provider (we can extend this to support multiple providers)
    const provider = providers[0];
    if (provider) {
      optimizeResult = await window.getImageOptimizerAlternative(provider.id, imageName, cancellableTokenId);
    }
  } catch (err) {
    if (err instanceof Error) {
      error = err.message;
    }
  } finally {
    loading = false;
    // Track telemetry
    await window.telemetryTrack('imageOptimize.view', {
      hasAlternative: !!optimizeResult?.alternative,
    });
  }
}

function extractImageName(image: ImageInfo): string | undefined {
  if (image.RepoTags && image.RepoTags.length > 0) {
    const repoTag = image.RepoTags[0];
    if (repoTag) {
      // Extract the base name (e.g., "node" from "node:18" or "docker.io/library/node:18")
      const parts = repoTag.split('/');
      const nameTag = parts[parts.length - 1];
      if (nameTag) {
        const [name] = nameTag.split(':');
        return name;
      }
    }
  }
  return undefined;
}

function handlePullAlternative(): void {
  if (!optimizeResult?.alternative) return;

  window
    .telemetryTrack('imageOptimize.pullAlternative', {
      originalImage: extractImageName(imageInfo!) ?? '',
      alternativeImage: optimizeResult.alternative.registry,
    })
    .catch((err: unknown) => console.error('Error tracking telemetry', err));

  // Navigate to pull image with the alternative pre-filled
  // This will be implemented when the pull dialog is enhanced
}

function handleLearnMore(): void {
  window
    .openExternal('https://developers.redhat.com/hummingbird')
    .then(() => window.telemetryTrack('imageOptimize.learnMore'))
    .catch((err: unknown) => console.error('Error opening external link', err));
}

function handleInstallExtension(): void {
  window
    .telemetryTrack('imageOptimize.installExtension')
    .catch((err: unknown) => console.error('Error tracking telemetry', err));
  router.goto('/extensions?screen=catalog&searchTerm=' + encodeURIComponent('Hummingbird'));
}
</script>

<div class="flex flex-col w-full h-full p-4">
  {#if loading}
    <div class="flex items-center justify-center h-full">
      <div class="text-[var(--pd-content-text)]">Checking for optimized alternatives...</div>
    </div>
  {:else if error}
    <div class="flex items-center justify-center h-full">
      <EmptyScreen
        icon={faShieldHalved}
        title="Error checking for alternatives"
        message={error}
      />
    </div>
  {:else if providers.length === 0}
    <div class="flex flex-col items-center justify-center h-full gap-6 p-8">
      <!-- Custom SVG placeholder: Container with Security Shield -->
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" class="opacity-70">
        <!-- Container Box -->
        <rect x="20" y="50" width="80" height="70" rx="6" fill="var(--pd-content-card-bg)" stroke="var(--pd-content-text)" stroke-width="2" opacity="0.6"/>
        <rect x="28" y="58" width="64" height="8" rx="2" fill="var(--pd-content-text)" opacity="0.3"/>
        <rect x="28" y="72" width="64" height="8" rx="2" fill="var(--pd-content-text)" opacity="0.3"/>
        <rect x="28" y="86" width="64" height="8" rx="2" fill="var(--pd-content-text)" opacity="0.3"/>
        <rect x="28" y="100" width="40" height="8" rx="2" fill="var(--pd-content-text)" opacity="0.3"/>
        
        <!-- Security Shield -->
        <path d="M115 35C115 35 95 42 95 42C95 42 95 70 95 80C95 95 105 105 115 110C125 105 135 95 135 80C135 70 135 42 135 42C135 42 115 35 115 35Z" 
              fill="var(--pd-content-card-bg)" stroke="#22c55e" stroke-width="3"/>
        <!-- Checkmark inside shield -->
        <path d="M107 72L113 78L125 62" stroke="#22c55e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        
        <!-- Zero badge -->
        <circle cx="130" cy="100" r="16" fill="#22c55e"/>
        <text x="130" y="106" text-anchor="middle" fill="white" font-size="14" font-weight="bold">0</text>
      </svg>
      
      <div class="flex flex-col items-center gap-3 max-w-lg text-center">
        <h2 class="text-xl font-semibold text-[var(--pd-content-header)]">Install an Image Optimizer Extension</h2>
        <p class="text-[var(--pd-content-text)] leading-relaxed">
          Get recommendations for optimized container images that are more secure and efficient. 
          Image optimizer extensions analyze your images and suggest <span class="text-green-500 font-medium">zero-CVE</span> and 
          <span class="text-green-500 font-medium">distroless</span> alternatives that reduce your attack surface, 
          minimize image size, and improve container security posture.
        </p>
      </div>
      
      <Button onclick={handleInstallExtension}>Install Extension</Button>
    </div>
  {:else if optimizeResult?.alternative}
    <div class="flex flex-col gap-5 overflow-auto">
      <!-- Header -->
      <div class="flex flex-col gap-3 mb-2">
        <h2 class="flex items-center gap-2 text-lg font-semibold text-[var(--pd-content-header)]">
          <Fa icon={faLeaf} class="text-green-500" size="lg" />
          <span>Hardened Alternative Available</span>
        </h2>
        <p class="text-sm text-[var(--pd-content-text)] opacity-70">
          A secure, optimized version of <span class="font-semibold text-[var(--pd-content-header)]">{imageInfo?.RepoTags?.[0] ?? 'this image'}</span> is available
        </p>
        <div class="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-2.5">
          <div class="flex items-center justify-center w-7 h-7 rounded-full bg-green-500/20">
            <Fa icon={faLeaf} class="text-green-500" size="xs" />
          </div>
          <div class="flex flex-col gap-0.5">
            <span class="text-[10px] text-green-500/80 uppercase tracking-wide font-medium">Recommended Alternative</span>
            <Link onclick={(): void => { window.openExternal(`https://${optimizeResult?.alternative.registry}`).catch(() => {}); }} icon={faExternalLinkAlt}>
              <span class="text-green-400 font-semibold">{optimizeResult.alternative.registry}</span>
            </Link>
          </div>
        </div>
      </div>

      <!-- Benefits Summary Bar -->
      <div class="flex items-stretch bg-[var(--pd-content-card-bg)] rounded-lg border border-[var(--pd-content-card-border)] divide-x divide-[var(--pd-content-card-border)]">
          <!-- Size Reduction -->
          {#if optimizeResult.currentImage.sizeBytes && optimizeResult.alternative.sizeBytes}
            {@const sizeReduction = Math.round((1 - optimizeResult.alternative.sizeBytes / optimizeResult.currentImage.sizeBytes) * 100)}
            <div class="flex-1 flex flex-col gap-1 px-5 py-3">
              <span class="text-[10px] text-[var(--pd-content-text)] opacity-50 uppercase tracking-wider font-medium">Size Reduction</span>
              <div class="flex items-baseline gap-2">
                <span class="text-xl font-bold text-green-500">{sizeReduction}%</span>
                <span class="text-xs text-[var(--pd-content-text)] opacity-60">smaller</span>
              </div>
            </div>
          {/if}

          <!-- CVE Reduction -->
          {#if optimizeResult.currentImage.cveCount > 0}
            {@const cveReduction = optimizeResult.alternative.cveCount === 0 ? 100 : Math.round((1 - optimizeResult.alternative.cveCount / optimizeResult.currentImage.cveCount) * 100)}
            <div class="flex-1 flex flex-col gap-1 px-5 py-3">
              <span class="text-[10px] text-[var(--pd-content-text)] opacity-50 uppercase tracking-wider font-medium">Vulnerabilities</span>
              <div class="flex items-baseline gap-2">
                <span class="text-xl font-bold text-green-500">{optimizeResult.currentImage.cveCount} → {optimizeResult.alternative.cveCount}</span>
                <span class="text-xs text-green-500 font-medium">-{cveReduction}%</span>
              </div>
            </div>
          {/if}

          <!-- Severity Breakdown -->
          {#if optimizeResult.currentImage.severityDistribution && optimizeResult.alternative.severityDistribution}
            <div class="flex-1 flex flex-col gap-1.5 px-5 py-3">
              <span class="text-[10px] text-[var(--pd-content-text)] opacity-50 uppercase tracking-wider font-medium">CVE Severity Comparison</span>
              <div class="flex items-center gap-3">
                <!-- Current Image -->
                <div class="flex items-center gap-1">
                  <span class="inline-flex items-center justify-center min-w-[22px] px-1 py-0.5 rounded text-[11px] font-bold bg-red-600 text-white cursor-help" title="Critical: {optimizeResult.currentImage.severityDistribution.critical} CVEs - Highest severity, immediate action required">{optimizeResult.currentImage.severityDistribution.critical}</span>
                  <span class="inline-flex items-center justify-center min-w-[22px] px-1 py-0.5 rounded text-[11px] font-bold bg-orange-500 text-white cursor-help" title="High: {optimizeResult.currentImage.severityDistribution.high} CVEs - Serious vulnerabilities, should be addressed soon">{optimizeResult.currentImage.severityDistribution.high}</span>
                  <span class="inline-flex items-center justify-center min-w-[22px] px-1 py-0.5 rounded text-[11px] font-bold bg-amber-400 text-gray-900 cursor-help" title="Medium: {optimizeResult.currentImage.severityDistribution.medium} CVEs - Moderate risk, plan to address">{optimizeResult.currentImage.severityDistribution.medium}</span>
                  <span class="inline-flex items-center justify-center min-w-[22px] px-1 py-0.5 rounded text-[11px] font-bold bg-yellow-300 text-gray-900 cursor-help" title="Low: {optimizeResult.currentImage.severityDistribution.low} CVEs - Minor issues, low priority">{optimizeResult.currentImage.severityDistribution.low}</span>
                </div>
                <Fa icon={faArrowRight} class="text-green-500" size="sm" />
                <!-- Alternative Image -->
                <div class="flex items-center gap-1">
                  <span class="inline-flex items-center justify-center min-w-[22px] px-1 py-0.5 rounded text-[11px] font-bold bg-green-500/20 text-green-500 border border-green-500/30 cursor-help" title="Critical: {optimizeResult.alternative.severityDistribution.critical} CVEs in Hummingbird image">{optimizeResult.alternative.severityDistribution.critical}</span>
                  <span class="inline-flex items-center justify-center min-w-[22px] px-1 py-0.5 rounded text-[11px] font-bold bg-green-500/20 text-green-500 border border-green-500/30 cursor-help" title="High: {optimizeResult.alternative.severityDistribution.high} CVEs in Hummingbird image">{optimizeResult.alternative.severityDistribution.high}</span>
                  <span class="inline-flex items-center justify-center min-w-[22px] px-1 py-0.5 rounded text-[11px] font-bold bg-green-500/20 text-green-500 border border-green-500/30 cursor-help" title="Medium: {optimizeResult.alternative.severityDistribution.medium} CVEs in Hummingbird image">{optimizeResult.alternative.severityDistribution.medium}</span>
                  <span class="inline-flex items-center justify-center min-w-[22px] px-1 py-0.5 rounded text-[11px] font-bold bg-green-500/20 text-green-500 border border-green-500/30 cursor-help" title="Low: {optimizeResult.alternative.severityDistribution.low} CVEs in Hummingbird image">{optimizeResult.alternative.severityDistribution.low}</span>
                </div>
              </div>
            </div>
          {/if}

          <!-- Signed Status -->
          {#if optimizeResult.alternative.isSigned}
            <div class="flex-1 flex flex-col gap-1 px-5 py-3">
              <span class="text-[10px] text-[var(--pd-content-text)] opacity-50 uppercase tracking-wider font-medium">Security</span>
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span class="text-sm font-semibold text-green-500">Signed & Verified</span>
              </div>
            </div>
          {/if}

          <!-- Last Updated -->
          {#if optimizeResult.historicalData?.lastUpdated}
            <div class="flex-1 flex flex-col gap-1 px-5 py-3">
              <span class="text-[10px] text-[var(--pd-content-text)] opacity-50 uppercase tracking-wider font-medium">Last Updated</span>
            <span class="text-sm font-medium text-[var(--pd-content-text)]">
              {new Date(optimizeResult.historicalData.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        {/if}
      </div>

      <!-- Comparison Card -->
      <div class="bg-[var(--pd-content-card-bg)] rounded-lg p-5">
        <div class="grid grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
          <!-- Current Image -->
          <div class="flex flex-col gap-3 p-4 rounded-lg bg-[var(--pd-content-bg)] border-l-4 border-red-500/50">
            <div class="flex items-center gap-2">
              <Fa icon={faBoxOpen} class="text-[var(--pd-content-text)] opacity-70" size="sm" />
              <span class="text-xs text-[var(--pd-content-text)] opacity-60 uppercase tracking-wide font-medium">Current Image</span>
            </div>
            <div class="flex items-center gap-2 min-h-[24px]">
              <Fa icon={faBoxOpen} class="text-[var(--pd-content-text)] opacity-60" size="xs" />
              <span class="text-[var(--pd-content-text)] font-semibold break-all">{imageInfo?.RepoTags?.[0] ?? 'Unknown'}</span>
            </div>
            <div class="flex flex-col gap-2.5 mt-auto">
              <!-- Size -->
              <Tooltip tip="Compressed image size" bottom>
                <div class="flex items-center gap-2 h-6">
                  <Fa icon={faBoxOpen} class="text-[var(--pd-content-text)] opacity-60" size="xs" />
                  <span class="text-sm text-[var(--pd-content-text)]">{optimizeResult.currentImage.size}</span>
                </div>
              </Tooltip>
              <!-- Date -->
              <Tooltip tip="Image creation date" bottom>
                <div class="flex items-center gap-2 h-6">
                  <Fa icon={faCalendarCheck} class="text-[var(--pd-content-text)] opacity-60" size="xs" />
                  <span class="text-sm text-[var(--pd-content-text)] opacity-70">
                    {#if imageInfo?.Created}
                      {new Date(imageInfo.Created * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    {:else}
                      —
                    {/if}
                  </span>
                </div>
              </Tooltip>
              <!-- CVEs -->
              <Tooltip tip="Known vulnerabilities in this image" bottom>
                <div class="flex items-center gap-2 h-6">
                  <Fa icon={faShieldHalved} class="text-red-500" size="xs" />
                  <span class="text-sm text-red-500 font-semibold">{optimizeResult.currentImage.cveCount ?? 0} CVEs</span>
                </div>
              </Tooltip>
              <!-- Signed -->
              <Tooltip tip="Image signature status" bottom>
                <div class="flex items-center gap-2 h-6">
                  <Fa icon={faShieldHalved} class="text-[var(--pd-content-text)] opacity-40" size="xs" />
                  <span class="text-sm text-[var(--pd-content-text)] opacity-50">Not signed</span>
                </div>
              </Tooltip>
            </div>
          </div>

          <!-- Arrow -->
          <div class="flex items-center justify-center px-2">
            <div class="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/10">
              <Fa icon={faArrowRight} class="text-green-500" size="lg" />
            </div>
          </div>

          <!-- Alternative Image -->
          <div class="flex flex-col gap-3 p-4 rounded-lg bg-green-500/5 border-l-4 border-green-500">
            <div class="flex items-center gap-2">
              <Fa icon={faLeaf} class="text-green-500" size="sm" />
              <span class="text-xs text-green-500 uppercase tracking-wide font-medium">Hummingbird Alternative</span>
            </div>
            <div class="min-h-[24px]">
              <Link onclick={(): void => { window.openExternal(`https://${optimizeResult?.alternative.registry}`).catch(() => {}); }} icon={faExternalLinkAlt}>
                <span class="text-green-400 font-semibold">{optimizeResult.alternative.registry}</span>
              </Link>
            </div>
            <div class="flex flex-col gap-2.5 mt-auto">
              <!-- Size -->
              <Tooltip tip="Compressed image size - optimized and smaller" bottom>
                <div class="flex items-center gap-2 h-6">
                  <Fa icon={faBoxOpen} class="text-green-500" size="xs" />
                  <span class="text-sm text-green-500">{optimizeResult.alternative.size ?? '—'}</span>
                </div>
              </Tooltip>
              <!-- Date -->
              <Tooltip tip="Last security update for this image" bottom>
                <div class="flex items-center gap-2 h-6">
                  <Fa icon={faCalendarCheck} class="text-green-500" size="xs" />
                  <span class="text-sm text-green-500">
                    {#if optimizeResult.historicalData?.lastUpdated}
                      {new Date(optimizeResult.historicalData.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    {:else}
                      —
                    {/if}
                  </span>
                </div>
              </Tooltip>
              <!-- CVEs -->
              <Tooltip tip="Known vulnerabilities - hardened for security" bottom>
                <div class="flex items-center gap-2 h-6">
                  <Fa icon={faShieldHalved} class="text-green-500" size="xs" />
                  <span class="text-sm text-green-500 font-semibold">{optimizeResult.alternative.cveCount ?? 0} CVEs</span>
                </div>
              </Tooltip>
              <!-- Signed -->
              <Tooltip tip="Image is cryptographically signed and verified" bottom>
                <div class="flex items-center gap-2 h-6">
                  {#if optimizeResult.alternative.isSigned}
                    <svg class="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-sm text-green-500 font-medium">Signed</span>
                  {:else}
                    <Fa icon={faShieldHalved} class="text-[var(--pd-content-text)] opacity-40" size="xs" />
                    <span class="text-sm text-[var(--pd-content-text)] opacity-50">Not signed</span>
                  {/if}
                </div>
              </Tooltip>
            </div>
          </div>
        </div>

        <!-- Action Button -->
        <div class="mt-4 flex items-center gap-3">
          <Button onclick={handlePullAlternative}>Pull Hummingbird Image</Button>
          <button class="text-xs text-[var(--pd-link)] hover:underline cursor-pointer" onclick={handleLearnMore}>
            Learn more
          </button>
        </div>
      </div>

      <!-- Severity Chart -->
      {#if optimizeResult.currentImage.severityDistribution && optimizeResult.alternative.severityDistribution}
        <SeverityChart
          currentSeverity={optimizeResult.currentImage.severityDistribution}
          alternativeSeverity={optimizeResult.alternative.severityDistribution}
          currentLabel={imageInfo?.RepoTags?.[0] ?? 'Current'}
          alternativeLabel="Hummingbird"
        />
      {/if}

      <!-- Removed Bloat List -->
      {#if optimizeResult.removedBloat && optimizeResult.removedBloat.length > 0}
        <RemovedBloatList removedItems={optimizeResult.removedBloat} />
      {/if}

      <!-- Dockerfile Helper -->
      <DockerfileHelper 
        imagePath={optimizeResult.alternative.registry} 
        tag={optimizeResult.alternative.tag ?? 'latest'} 
      />
    </div>
  {:else}
    <EmptyScreen
      icon={faLeaf}
      title="No Optimized Alternative"
      message="No Hummingbird alternative is available for this image at this time."
    >
      <Button onclick={handleLearnMore}>Learn More About Hummingbird</Button>
    </EmptyScreen>
  {/if}
</div>
