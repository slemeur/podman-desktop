<script lang="ts">
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import type { ImageInfo } from '@podman-desktop/api';
import { Button, EmptyScreen } from '@podman-desktop/ui-svelte';
import { onDestroy, onMount } from 'svelte';
import type { Unsubscriber } from 'svelte/store';
import { router } from 'tinro';

import { imageOptimizerProviders } from '/@/stores/image-optimizer-providers';
import type { ImageOptimizerInfo, OptimizeResult } from '/@api/image-optimizer-info';

import DockerfileHelper from './DockerfileHelper.svelte';
import RemovedBloatList from './RemovedBloatList.svelte';

interface Props {
  imageInfo?: ImageInfo;
}

const { imageInfo }: Props = $props();

let providers: ImageOptimizerInfo[] = $state([]);
let optimizeResult: OptimizeResult | undefined = $state(undefined);
let loading = $state(true);
let analyzing = $state(false);
let analyzeProgress: string = $state('');
let error: string | undefined = $state(undefined);
let cancellableTokenId: number = $state(0);
let needsAnalysis = $state(false);

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

      // Check if we have CVE data for the current image
      // If currentImage.cveCount is -1 or undefined, we need to run analysis first
      if (
        optimizeResult?.alternative &&
        (optimizeResult.currentImage.cveCount === undefined || optimizeResult.currentImage.cveCount === -1)
      ) {
        needsAnalysis = true;
      }
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
      needsAnalysis: needsAnalysis,
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

function handleViewCatalog(): void {
  window
    .telemetryTrack('imageOptimize.viewCatalog')
    .catch((err: unknown) => console.error('Error tracking telemetry', err));
  router.goto('/webviews/hummingbird-catalog');
}

async function startVulnerabilityAnalysis(): Promise<void> {
  analyzing = true;
  analyzeProgress = 'Initializing scanner...';

  try {
    // Simulate the analysis steps
    await new Promise(resolve => setTimeout(resolve, 800));
    analyzeProgress = 'Pulling image layers...';

    await new Promise(resolve => setTimeout(resolve, 1200));
    analyzeProgress = 'Scanning for vulnerabilities...';

    await new Promise(resolve => setTimeout(resolve, 1500));
    analyzeProgress = 'Analyzing CVE database...';

    await new Promise(resolve => setTimeout(resolve, 1000));
    analyzeProgress = 'Generating report...';

    await new Promise(resolve => setTimeout(resolve, 500));

    // Update the optimizeResult with the scanned CVE data
    // In a real implementation, this would come from the actual scan results
    if (optimizeResult) {
      // Simulate finding CVEs in the current image (mock data)
      const mockCveCount = 54; // This would come from actual scan
      optimizeResult = {
        ...optimizeResult,
        currentImage: {
          ...optimizeResult.currentImage,
          cveCount: mockCveCount,
        },
      };
    }

    // Mark analysis as complete and show results
    needsAnalysis = false;
    analyzing = false;

    // Track telemetry
    await window.telemetryTrack('imageOptimize.analyzeComplete', {
      imageName: extractImageName(imageInfo!) ?? '',
    });
  } catch (err) {
    analyzing = false;
    if (err instanceof Error) {
      error = err.message;
    }
  }
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
  {:else if analyzing}
    <!-- Vulnerability Analysis in Progress -->
    <div class="flex flex-col items-center justify-center h-full gap-8 p-8">
      <!-- Animated Scanner Icon -->
      <div class="relative">
        <svg width="120" height="120" viewBox="0 0 120 120" class="animate-pulse">
          <!-- Outer ring -->
          <circle cx="60" cy="60" r="50" fill="none" stroke="var(--pd-content-text)" stroke-width="2" opacity="0.2"/>
          <!-- Scanning arc -->
          <circle 
            cx="60" cy="60" r="50" 
            fill="none" 
            stroke="#a855f7" 
            stroke-width="3" 
            stroke-dasharray="80 235"
            class="animate-spin origin-center"
            style="animation-duration: 2s;"
          />
          <!-- Inner hexagon -->
          <polygon 
            points="60,20 95,40 95,80 60,100 25,80 25,40" 
            fill="var(--pd-content-card-bg)" 
            stroke="#a855f7" 
            stroke-width="2"
          />
          <!-- Shield icon in center -->
          <path 
            d="M60 35 L75 42 L75 58 C75 68 68 76 60 80 C52 76 45 68 45 58 L45 42 Z" 
            fill="#a855f7" 
            opacity="0.3"
          />
          <path 
            d="M60 35 L75 42 L75 58 C75 68 68 76 60 80 C52 76 45 68 45 58 L45 42 Z" 
            fill="none" 
            stroke="#a855f7" 
            stroke-width="2"
          />
          <!-- Magnifying glass -->
          <circle cx="62" cy="55" r="8" fill="none" stroke="white" stroke-width="2"/>
          <line x1="68" y1="61" x2="74" y2="67" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      
      <div class="flex flex-col items-center gap-3 max-w-lg text-center">
        <h2 class="text-xl font-semibold text-[var(--pd-content-header)]">Analyzing Vulnerabilities</h2>
        <p class="text-[var(--pd-content-text)] leading-relaxed">
          Scanning your image for known vulnerabilities and security issues...
        </p>
        <div class="flex items-center gap-2 mt-2">
          <div class="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
          <span class="text-sm text-purple-400 font-medium">{analyzeProgress}</span>
        </div>
      </div>
      
      <!-- Progress bar -->
      <div class="w-64 h-1 bg-[var(--pd-content-card-bg)] rounded-full overflow-hidden">
        <div class="h-full bg-purple-500 rounded-full animate-pulse" style="width: 60%"></div>
      </div>
    </div>
  {:else if needsAnalysis && optimizeResult?.alternative}
    <!-- Alternative Found but Needs Analysis -->
    <div class="flex flex-col items-center justify-center h-full gap-6 p-8">
      <!-- Icon: Image with question mark -->
      <div class="relative">
        <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" class="opacity-80">
          <!-- Hexagon background -->
          <polygon 
            points="70,10 120,35 120,95 70,120 20,95 20,35" 
            fill="var(--pd-content-card-bg)" 
            stroke="#a855f7" 
            stroke-width="2"
          />
          <!-- Shield with checkmark (alternative found) -->
          <path 
            d="M70 30 L100 45 L100 75 C100 90 85 105 70 110 C55 105 40 90 40 75 L40 45 Z" 
            fill="#a855f7" 
            opacity="0.2"
          />
          <path 
            d="M70 30 L100 45 L100 75 C100 90 85 105 70 110 C55 105 40 90 40 75 L40 45 Z" 
            fill="none" 
            stroke="#a855f7" 
            stroke-width="2"
          />
          <!-- Checkmark -->
          <path d="M55 70 L65 80 L85 55" stroke="#a855f7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          <!-- Question badge -->
          <circle cx="105" cy="35" r="18" fill="#f59e0b"/>
          <text x="105" y="42" text-anchor="middle" fill="white" font-size="20" font-weight="bold">?</text>
        </svg>
      </div>
      
      <div class="flex flex-col items-center gap-3 max-w-lg text-center">
        <h2 class="text-xl font-semibold text-[var(--pd-content-header)]">Hardened Alternative Available!</h2>
        <p class="text-[var(--pd-content-text)] leading-relaxed">
          A <span class="text-purple-400 font-medium">Hummingbird</span> hardened image is available for 
          <span class="font-mono text-sm bg-[var(--pd-content-card-bg)] px-2 py-0.5 rounded">{imageInfo?.RepoTags?.[0] ?? 'this image'}</span>.
        </p>
        <p class="text-[var(--pd-content-text)] text-sm opacity-70">
          To compare security improvements, we need to scan your current image for vulnerabilities first.
        </p>
      </div>
      
      <!-- Alternative preview card -->
      <div class="bg-[var(--pd-content-card-bg)] rounded-lg border border-purple-500/30 p-4 max-w-md w-full">
        <div class="flex items-center gap-3 mb-3">
          <svg class="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" fill="currentColor" opacity="0.2"/>
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
          </svg>
          <div>
            <div class="text-sm font-semibold text-[var(--pd-content-header)]">{optimizeResult.alternative.registry}:{optimizeResult.alternative.tag ?? 'latest'}</div>
            <div class="text-xs text-purple-400">Hummingbird hardened image</div>
          </div>
        </div>
        <div class="flex items-center gap-4 text-xs text-[var(--pd-content-text)]">
          <div class="flex items-center gap-1">
            <span class="text-green-500 font-bold">{optimizeResult.alternative.cveCount}</span>
            <span class="opacity-60">CVEs</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="font-medium">{optimizeResult.alternative.size}</span>
            <span class="opacity-60">Size</span>
          </div>
          {#if optimizeResult.alternative.isSigned}
            <div class="flex items-center gap-1 text-green-500">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span>Signed</span>
            </div>
          {/if}
          {#if optimizeResult.historicalData?.lastUpdated}
            <div class="flex items-center gap-1">
              <svg class="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="opacity-60">Updated</span>
              <span class="font-medium">{new Date(optimizeResult.historicalData.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
          {/if}
        </div>
      </div>
      
      <Button onclick={startVulnerabilityAnalysis}>
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
          <span>Analyze and compare images</span>
        </div>
      </Button>
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
            <!-- CVEs -->
            <div class="text-center">
              <div class="text-3xl font-bold text-purple-300">-{cvesFixed}</div>
              <div class="text-xs text-[var(--pd-content-text)] opacity-60">CVEs</div>
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

      <!-- Try the Alternate Base Image - Combined Section -->
      <div class="bg-[var(--pd-content-card-bg)] rounded-lg border border-[var(--pd-content-card-border)] p-5">
        <!-- Header -->
        <div class="flex items-center gap-3 mb-3">
          <div class="w-9 h-9 bg-purple-500/20 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" fill="currentColor" opacity="0.3"/>
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
            </svg>
          </div>
          <div>
            <span class="text-base font-bold text-[var(--pd-content-header)]">Try the Alternate Base Image</span>
            <p class="text-xs text-[var(--pd-content-text)] opacity-70">Switch to Hummingbird for enhanced security and performance</p>
          </div>
        </div>
        
        <!-- Two Column Layout -->
        <div class="grid grid-cols-2 gap-6 mt-4">
          <!-- Left: Benefits List -->
          <div class="space-y-3">
            <div class="flex items-start gap-2">
              <div class="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-2.5 h-2.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <span class="text-xs font-semibold text-[var(--pd-content-header)]">{cveReduction}% Fewer Vulnerabilities</span>
                <p class="text-[10px] text-[var(--pd-content-text)] opacity-60">Only {optimizeResult.alternative.cveCount} CVE vs {optimizeResult.currentImage.cveCount}</p>
              </div>
            </div>
            
            <div class="flex items-start gap-2">
              <div class="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-2.5 h-2.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <span class="text-xs font-semibold text-[var(--pd-content-header)]">{sizeReduction}% Smaller Image Size</span>
                <p class="text-[10px] text-[var(--pd-content-text)] opacity-60">{optimizeResult.alternative.size} vs {optimizeResult.currentImage.size}</p>
              </div>
            </div>
            
            <div class="flex items-start gap-2">
              <div class="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-2.5 h-2.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <span class="text-xs font-semibold text-[var(--pd-content-header)]">Enterprise-Grade Security</span>
                <p class="text-[10px] text-[var(--pd-content-text)] opacity-60">FIPS-compliant with continuous scanning</p>
              </div>
            </div>
            
            <div class="flex items-start gap-2">
              <div class="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-2.5 h-2.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <span class="text-xs font-semibold text-[var(--pd-content-header)]">Minimal Attack Surface</span>
                <p class="text-[10px] text-[var(--pd-content-text)] opacity-60">Distroless with essential components only</p>
              </div>
            </div>
          </div>
          
          <!-- Right: Evaluation Criteria -->
          <div class="space-y-3">
            <!-- Image Size Comparison -->
            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-xs text-[var(--pd-content-text)]">Image Size</span>
                <span class="text-xs font-semibold text-purple-400">-{sizeReduction}%</span>
              </div>
              <div class="space-y-1">
                <div class="h-5 rounded bg-purple-500/40 flex items-center px-2" style="width: {100 - sizeReduction}%">
                  <span class="text-[10px] font-medium text-purple-200">{optimizeResult.alternative.size}</span>
                </div>
                <div class="h-5 rounded bg-purple-500/20 flex items-center px-2" style="width: 100%">
                  <span class="text-[10px] font-medium text-purple-200/60">{optimizeResult.currentImage.size}</span>
                </div>
              </div>
            </div>
            
            <!-- CVE Count Comparison -->
            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-xs text-[var(--pd-content-text)]">CVE Count</span>
                <span class="text-xs font-semibold text-purple-400">-{cveReduction}%</span>
              </div>
              <div class="space-y-1">
                <div class="h-5 rounded bg-purple-500/40 flex items-center px-2" style="width: {optimizeResult.currentImage.cveCount > 0 ? Math.max(8, (optimizeResult.alternative.cveCount / optimizeResult.currentImage.cveCount) * 100) : 8}%">
                  <span class="text-[10px] font-medium text-purple-200">{optimizeResult.alternative.cveCount}</span>
                </div>
                <div class="h-5 rounded bg-purple-500/20 flex items-center px-2" style="width: 100%">
                  <span class="text-[10px] font-medium text-purple-200/60">{optimizeResult.currentImage.cveCount}</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        
        <!-- CTA Button & Learn More -->
        <div class="flex items-center gap-4 mt-5">
          <button 
            class="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm"
            onclick={handlePullAlternative}
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" fill="currentColor" opacity="0.3"/>
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
            </svg>
            Switch to Hummingbird
          </button>
          <button class="text-sm text-[var(--pd-link)] hover:underline cursor-pointer" onclick={handleLearnMore}>
            Learn more about Hummingbird
          </button>
        </div>
      </div>

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
    <!-- No Alternative Available -->
    <div class="flex flex-col items-center justify-center h-full gap-6 p-8">
      <!-- Icon -->
      <div class="relative">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="opacity-60">
          <!-- Hexagon outline -->
          <polygon 
            points="60,10 105,32.5 105,77.5 60,100 15,77.5 15,32.5" 
            fill="var(--pd-content-card-bg)" 
            stroke="var(--pd-content-text)" 
            stroke-width="2"
            opacity="0.5"
          />
          <!-- Dashed inner hexagon -->
          <polygon 
            points="60,25 90,42 90,68 60,85 30,68 30,42" 
            fill="none" 
            stroke="var(--pd-content-text)" 
            stroke-width="1.5"
            stroke-dasharray="4 4"
            opacity="0.3"
          />
          <!-- Question mark or empty indicator -->
          <text x="60" y="62" text-anchor="middle" fill="var(--pd-content-text)" font-size="28" font-weight="300" opacity="0.4">?</text>
        </svg>
      </div>
      
      <div class="flex flex-col items-center gap-3 max-w-lg text-center">
        <h2 class="text-xl font-semibold text-[var(--pd-content-header)]">No Hardened Alternative Available</h2>
        <p class="text-[var(--pd-content-text)] opacity-70 leading-relaxed">
          There is currently no Hummingbird hardened image available for 
          <span class="font-mono text-sm bg-[var(--pd-content-card-bg)] px-2 py-0.5 rounded">{imageInfo?.RepoTags?.[0] ?? 'this image'}</span>.
        </p>
        <p class="text-sm text-[var(--pd-content-text)] opacity-50">
          Hummingbird images are continuously being added. Check back later or request support for this image.
        </p>
      </div>
      
      <!-- Info card about Hummingbird -->
      <div class="bg-[var(--pd-content-card-bg)] rounded-lg border border-[var(--pd-content-card-border)] p-4 max-w-md w-full">
        <div class="flex items-start gap-3">
          <svg class="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" fill="currentColor" opacity="0.2"/>
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
          </svg>
          <div class="text-sm">
            <div class="font-semibold text-[var(--pd-content-header)] mb-1">What is Hummingbird?</div>
            <p class="text-[var(--pd-content-text)] opacity-70 text-xs leading-relaxed">
              Hummingbird provides hardened, minimal container images with zero or near-zero CVEs, 
              smaller footprint, and enterprise-grade security for production workloads.
            </p>
          </div>
        </div>
      </div>
      
      <div class="flex items-center gap-3">
        <Button onclick={handleViewCatalog}>
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" fill="currentColor" opacity="0.2"/>
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
            </svg>
            <span>Browse Available Images</span>
          </div>
        </Button>
        <button 
          class="text-sm text-[var(--pd-link)] hover:underline cursor-pointer"
          onclick={handleLearnMore}
        >
          Learn More
        </button>
      </div>
    </div>
  {/if}
</div>
