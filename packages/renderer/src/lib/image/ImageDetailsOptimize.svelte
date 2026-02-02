<script lang="ts">
import { faLeaf, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import type { ImageInfo } from '@podman-desktop/api';
import { Button, EmptyScreen } from '@podman-desktop/ui-svelte';
import { onDestroy, onMount } from 'svelte';
import type { Unsubscriber } from 'svelte/store';
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
    {@const sizeReduction = optimizeResult.currentImage.sizeBytes && optimizeResult.alternative.sizeBytes 
      ? Math.round((1 - optimizeResult.alternative.sizeBytes / optimizeResult.currentImage.sizeBytes) * 100) 
      : 0}
    {@const cveReduction = optimizeResult.currentImage.cveCount > 0 
      ? (optimizeResult.alternative.cveCount === 0 ? 100 : Math.round((1 - optimizeResult.alternative.cveCount / optimizeResult.currentImage.cveCount) * 100))
      : 0}
    {@const cvesFixed = optimizeResult.currentImage.cveCount - optimizeResult.alternative.cveCount}
    <div class="flex flex-col gap-5 overflow-auto">
      <!-- Alternate Image Found Banner -->
      <div class="bg-gradient-to-r from-purple-600/20 to-purple-500/10 border border-purple-500/40 rounded-lg p-5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 bg-purple-500/30 rounded-full flex items-center justify-center border-2 border-purple-400/50">
              <svg class="w-7 h-7 text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" fill="currentColor" opacity="0.3"/>
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
                <path d="M9 12l2 2 4-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="flex flex-col">
              <span class="text-lg font-bold text-purple-300">Hardened Alternative Found!</span>
              <span class="text-sm text-[var(--pd-content-text)] opacity-70">A Hummingbird image is available with significant security improvements</span>
            </div>
          </div>
          <div class="flex items-center gap-8 bg-[var(--pd-content-card-bg)]/50 rounded-lg px-6 py-3">
            <!-- CVEs Fixed -->
            <div class="text-center">
              <div class="text-3xl font-bold text-purple-300">-{cvesFixed}</div>
              <div class="text-xs text-[var(--pd-content-text)] opacity-60">CVEs Fixed</div>
            </div>
            <!-- CVE Reduction % -->
            <div class="text-center">
              <div class="text-3xl font-bold text-purple-300">{cveReduction}%</div>
              <div class="text-xs text-[var(--pd-content-text)] opacity-60">Fewer CVEs</div>
            </div>
            <!-- Size Reduction -->
            <div class="text-center">
              <div class="text-3xl font-bold text-purple-300">-{sizeReduction}%</div>
              <div class="text-xs text-[var(--pd-content-text)] opacity-60">Smaller Size</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Side by Side Cards -->
      <div class="grid grid-cols-2 gap-5">
        <!-- Hummingbird Card -->
        <div class="bg-[var(--pd-content-card-bg)] rounded-lg border border-purple-500/30 p-5">
          <!-- Header -->
          <div class="flex items-center gap-3 mb-4">
            <svg class="w-8 h-8 text-purple-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" fill="currentColor" opacity="0.15"/>
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
            </svg>
            <div class="min-w-0 flex-1">
              <span class="text-base font-bold text-[var(--pd-content-header)] block">{optimizeResult.alternative.registry}:{optimizeResult.alternative.tag ?? 'latest'}</span>
              <span class="text-xs text-purple-400 block">Hummingbird hardened image</span>
            </div>
          </div>
          
          <!-- Metadata List -->
          <div class="space-y-3">
            <!-- Version/Tag Row -->
            <div class="flex justify-between items-center">
              <span class="text-xs text-[var(--pd-content-text)] opacity-50 uppercase tracking-wide">Version</span>
              <span class="text-sm font-mono text-purple-400">{optimizeResult.alternative.tag ?? 'latest'}</span>
            </div>
            <!-- Vulnerabilities Row -->
            <div class="flex justify-between items-center">
              <span class="text-xs text-[var(--pd-content-text)] opacity-50 uppercase tracking-wide">Vulnerabilities</span>
              <div class="flex items-center gap-2">
                <div class="flex items-center gap-1">
                  <span class="w-7 h-6 flex items-center justify-center text-xs font-semibold rounded {optimizeResult.alternative.severityDistribution?.critical ? 'bg-red-600 text-white' : 'bg-[var(--pd-content-card-border)] text-[var(--pd-content-text)] opacity-50'}" title="Critical">{optimizeResult.alternative.severityDistribution?.critical ?? 0}</span>
                  <span class="w-7 h-6 flex items-center justify-center text-xs font-semibold rounded {optimizeResult.alternative.severityDistribution?.high ? 'bg-orange-500 text-white' : 'bg-[var(--pd-content-card-border)] text-[var(--pd-content-text)] opacity-50'}" title="High">{optimizeResult.alternative.severityDistribution?.high ?? 0}</span>
                  <span class="w-7 h-6 flex items-center justify-center text-xs font-semibold rounded {optimizeResult.alternative.severityDistribution?.medium ? 'bg-amber-400 text-gray-900' : 'bg-[var(--pd-content-card-border)] text-[var(--pd-content-text)] opacity-50'}" title="Medium">{optimizeResult.alternative.severityDistribution?.medium ?? 0}</span>
                  <span class="w-7 h-6 flex items-center justify-center text-xs font-semibold rounded {optimizeResult.alternative.severityDistribution?.low ? 'bg-yellow-300 text-gray-900' : 'bg-[var(--pd-content-card-border)] text-[var(--pd-content-text)] opacity-50'}" title="Low">{optimizeResult.alternative.severityDistribution?.low ?? 0}</span>
                </div>
                <span class="text-xs text-purple-400 font-medium">(-{cvesFixed})</span>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs text-[var(--pd-content-text)] opacity-50 uppercase tracking-wide">Size</span>
              <span class="text-sm text-[var(--pd-content-header)]">{optimizeResult.alternative.size ?? '—'} <span class="text-xs text-purple-400 font-medium">(-{sizeReduction}%)</span></span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs text-[var(--pd-content-text)] opacity-50 uppercase tracking-wide">Last Updated</span>
              <span class="text-sm text-[var(--pd-content-header)]">
                {#if optimizeResult.historicalData?.lastUpdated}
                  {new Date(optimizeResult.historicalData.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                {:else}
                  Today
                {/if}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs text-[var(--pd-content-text)] opacity-50 uppercase tracking-wide">Signed</span>
              {#if optimizeResult.alternative.isSigned}
                <span class="flex items-center gap-1 text-sm text-green-500">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  Yes
                </span>
              {:else}
                <span class="text-sm text-[var(--pd-content-text)] opacity-40">No</span>
              {/if}
            </div>
          </div>
        </div>

        <!-- Current Image Card -->
        <div class="bg-[var(--pd-content-card-bg)] rounded-lg border border-[var(--pd-content-card-border)] p-5">
          <!-- Header -->
          <div class="flex items-center gap-3 mb-4">
            <svg class="w-8 h-8 text-[var(--pd-content-text)] opacity-40 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" fill="currentColor" opacity="0.1"/>
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
            </svg>
            <div class="min-w-0 flex-1">
              <span class="text-base font-bold text-[var(--pd-content-header)] block">{imageInfo?.RepoTags?.[0] ?? 'Unknown'}</span>
              <span class="text-xs text-[var(--pd-content-text)] opacity-50 block">Current image</span>
            </div>
          </div>
          
          <!-- Metadata List -->
          <div class="space-y-3">
            <!-- Version/Tag Row -->
            <div class="flex justify-between items-center">
              <span class="text-xs text-[var(--pd-content-text)] opacity-50 uppercase tracking-wide">Version</span>
              <span class="text-sm font-mono text-[var(--pd-content-header)]">{imageInfo?.RepoTags?.[0]?.split(':')[1] ?? 'latest'}</span>
            </div>
            <!-- Vulnerabilities Row -->
            <div class="flex justify-between items-center">
              <span class="text-xs text-[var(--pd-content-text)] opacity-50 uppercase tracking-wide">Vulnerabilities</span>
              <div class="flex items-center gap-1">
                <span class="w-7 h-6 flex items-center justify-center text-xs font-semibold rounded {optimizeResult.currentImage.severityDistribution?.critical ? 'bg-red-600 text-white' : 'bg-[var(--pd-content-card-border)] text-[var(--pd-content-text)] opacity-50'}" title="Critical">{optimizeResult.currentImage.severityDistribution?.critical ?? 0}</span>
                <span class="w-7 h-6 flex items-center justify-center text-xs font-semibold rounded {optimizeResult.currentImage.severityDistribution?.high ? 'bg-orange-500 text-white' : 'bg-[var(--pd-content-card-border)] text-[var(--pd-content-text)] opacity-50'}" title="High">{optimizeResult.currentImage.severityDistribution?.high ?? 0}</span>
                <span class="w-7 h-6 flex items-center justify-center text-xs font-semibold rounded {optimizeResult.currentImage.severityDistribution?.medium ? 'bg-amber-400 text-gray-900' : 'bg-[var(--pd-content-card-border)] text-[var(--pd-content-text)] opacity-50'}" title="Medium">{optimizeResult.currentImage.severityDistribution?.medium ?? 0}</span>
                <span class="w-7 h-6 flex items-center justify-center text-xs font-semibold rounded {optimizeResult.currentImage.severityDistribution?.low ? 'bg-yellow-300 text-gray-900' : 'bg-[var(--pd-content-card-border)] text-[var(--pd-content-text)] opacity-50'}" title="Low">{optimizeResult.currentImage.severityDistribution?.low ?? 0}</span>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs text-[var(--pd-content-text)] opacity-50 uppercase tracking-wide">Size</span>
              <span class="text-sm text-[var(--pd-content-header)]">{optimizeResult.currentImage.size}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs text-[var(--pd-content-text)] opacity-50 uppercase tracking-wide">Created</span>
              <span class="text-sm text-[var(--pd-content-header)]">
                {#if imageInfo?.Created}
                  {new Date(imageInfo.Created * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                {:else}
                  —
                {/if}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs text-[var(--pd-content-text)] opacity-50 uppercase tracking-wide">Signed</span>
              {#if optimizeResult.currentImage.isSigned}
                <span class="flex items-center gap-1 text-sm text-green-500">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  Yes
                </span>
              {:else}
                <span class="text-sm text-[var(--pd-content-text)] opacity-40">No</span>
              {/if}
            </div>
          </div>
        </div>
      </div>

      <!-- Action Bar -->
      <div class="flex items-center gap-3">
        <Button onclick={handlePullAlternative}>Try Hummingbird Image</Button>
        <button class="text-sm text-[var(--pd-link)] hover:underline cursor-pointer" onclick={handleLearnMore}>
          Learn more about Hummingbird
        </button>
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
