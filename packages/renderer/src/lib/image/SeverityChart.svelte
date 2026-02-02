<script lang="ts">
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { Chart, registerables } from 'chart.js';
import { onMount } from 'svelte';
import Fa from 'svelte-fa';

import type { SeverityDistribution } from '/@api/image-optimizer-info';

// Register Chart.js components
Chart.register(...registerables);

interface Props {
  currentSeverity: SeverityDistribution;
  alternativeSeverity: SeverityDistribution;
  currentLabel?: string;
  alternativeLabel?: string;
}

const {
  currentSeverity,
  alternativeSeverity,
  currentLabel = 'Current Image',
  alternativeLabel = 'Hummingbird',
}: Props = $props();

let chartCanvas: HTMLCanvasElement;
let chartInstance: Chart | undefined;

function getTotalCurrent(): number {
  return currentSeverity.critical + currentSeverity.high + currentSeverity.medium + currentSeverity.low;
}

function getTotalAlternative(): number {
  return alternativeSeverity.critical + alternativeSeverity.high + alternativeSeverity.medium + alternativeSeverity.low;
}

onMount(() => {
  if (chartCanvas) {
    const ctx = chartCanvas.getContext('2d');
    if (ctx) {
      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Critical', 'High', 'Medium', 'Low'],
          datasets: [
            {
              label: currentLabel,
              data: [currentSeverity.critical, currentSeverity.high, currentSeverity.medium, currentSeverity.low],
              backgroundColor: [
                'rgba(220, 38, 38, 0.9)',
                'rgba(249, 115, 22, 0.9)',
                'rgba(251, 191, 36, 0.9)',
                'rgba(253, 224, 71, 0.9)',
              ],
              borderColor: ['#dc2626', '#f97316', '#fbbf24', '#fde047'],
              borderWidth: 2,
              borderRadius: 6,
              barPercentage: 0.85,
              categoryPercentage: 0.7,
            },
            {
              label: alternativeLabel,
              data: [
                alternativeSeverity.critical,
                alternativeSeverity.high,
                alternativeSeverity.medium,
                alternativeSeverity.low,
              ],
              backgroundColor: 'rgba(34, 197, 94, 0.9)',
              borderColor: '#22c55e',
              borderWidth: 2,
              borderRadius: 6,
              barPercentage: 0.85,
              categoryPercentage: 0.7,
              minBarLength: 8, // Show a small bar even when value is 0
            },
          ],
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: 'rgba(255, 255, 255, 0.8)',
                padding: 24,
                font: {
                  size: 13,
                  weight: 500,
                },
                usePointStyle: true,
                pointStyle: 'rectRounded',
              },
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              titleColor: '#fff',
              bodyColor: '#fff',
              padding: 14,
              cornerRadius: 8,
              titleFont: {
                size: 13,
                weight: 600,
              },
              bodyFont: {
                size: 12,
              },
              callbacks: {
                label: function (context): string {
                  const value = context.raw as number;
                  if (value === 0) {
                    return ` ${context.dataset.label}: 0 CVEs ✓ Secure`;
                  }
                  return ` ${context.dataset.label}: ${value} CVE${value !== 1 ? 's' : ''}`;
                },
              },
            },
          },
          scales: {
            x: {
              beginAtZero: true,
              grid: {
                color: 'rgba(255, 255, 255, 0.08)',
              },
              ticks: {
                color: 'rgba(255, 255, 255, 0.6)',
                font: {
                  size: 11,
                },
                stepSize: 1,
              },
              title: {
                display: true,
                text: 'Number of CVEs',
                color: 'rgba(255, 255, 255, 0.5)',
                font: {
                  size: 11,
                },
              },
            },
            y: {
              grid: {
                display: false,
              },
              ticks: {
                color: 'rgba(255, 255, 255, 0.85)',
                font: {
                  size: 13,
                  weight: 600,
                },
                padding: 8,
              },
            },
          },
        },
      });
    }
  }

  return (): void => {
    if (chartInstance) {
      chartInstance.destroy();
    }
  };
});
</script>

<div class="bg-[var(--pd-content-card-bg)] rounded-lg p-5">
  <div class="flex items-center justify-between mb-4">
    <h3 class="flex items-center gap-2 text-sm font-semibold text-[var(--pd-content-header)]">
      <Fa icon={faChartBar} class="text-[var(--pd-content-text)] opacity-70" size="sm" />
      <span>CVE Severity Breakdown</span>
    </h3>
    
    <!-- Summary badges -->
    <div class="flex items-center gap-3">
      <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20">
        <span class="text-xs text-[var(--pd-content-text)] opacity-70">{currentLabel}:</span>
        <span class="text-sm font-bold text-red-400">{getTotalCurrent()}</span>
      </div>
      <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
      </svg>
      <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
        <span class="text-xs text-[var(--pd-content-text)] opacity-70">{alternativeLabel}:</span>
        <span class="text-sm font-bold text-green-500">{getTotalAlternative()}</span>
      </div>
    </div>
  </div>

  <!-- Chart -->
  <div class="h-[220px]">
    <canvas bind:this={chartCanvas}></canvas>
  </div>
  
  <!-- Zero CVE callout when alternative has no CVEs -->
  {#if getTotalAlternative() === 0 && getTotalCurrent() > 0}
    <div class="mt-4 pt-4 border-t border-[var(--pd-content-card-border)] flex items-center justify-center gap-2">
      <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>
      <span class="text-sm font-medium text-green-500">
        Hummingbird alternative eliminates all {getTotalCurrent()} CVEs — achieving Zero-CVE status
      </span>
    </div>
  {/if}
</div>
