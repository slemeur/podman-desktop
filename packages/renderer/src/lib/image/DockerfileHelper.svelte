<script lang="ts">
import { faCheck, faCopy, faFileCode } from '@fortawesome/free-solid-svg-icons';
import Fa from 'svelte-fa';

interface Props {
  imagePath: string;
  tag?: string;
}

const { imagePath, tag = 'latest' }: Props = $props();

let copied = $state(false);

const dockerfileLine = $derived(`FROM ${imagePath}:${tag}`);

async function copyToClipboard(): Promise<void> {
  try {
    await navigator.clipboard.writeText(dockerfileLine);
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
  }
}
</script>

<div class="bg-[var(--pd-content-card-bg)] rounded-lg p-4">
  <h3 class="flex items-center gap-2 mb-3 text-sm font-semibold text-[var(--pd-content-header)]">
    <Fa icon={faFileCode} class="text-[var(--pd-content-text)] opacity-70" size="sm" />
    <span>Dockerfile Helper</span>
  </h3>
  <p class="text-xs text-[var(--pd-content-text)] opacity-70 mb-3">
    Replace your current FROM line with this hardened alternative:
  </p>
  <div class="flex items-center gap-2 bg-[var(--pd-content-bg)] rounded border border-[var(--pd-content-card-border)]">
    <code class="flex-1 px-3 py-2 text-sm font-mono text-green-400">
      {dockerfileLine}
    </code>
    <button
      class="p-2 hover:bg-[var(--pd-content-card-hover-bg)] rounded-r transition-colors cursor-pointer"
      onclick={copyToClipboard}
      title="Copy to clipboard"
    >
      {#if copied}
        <div class="flex items-center justify-center w-4 h-4">
          <Fa icon={faCheck} class="text-green-500 text-sm" />
        </div>
      {:else}
        <div class="flex items-center justify-center w-4 h-4">
          <Fa icon={faCopy} class="text-[var(--pd-content-text)] opacity-70 hover:opacity-100 text-sm" />
        </div>
      {/if}
    </button>
  </div>
</div>
