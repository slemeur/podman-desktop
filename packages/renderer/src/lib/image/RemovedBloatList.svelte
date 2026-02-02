<script lang="ts">
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Fa from 'svelte-fa';

interface Props {
  removedItems: string[];
}

const { removedItems }: Props = $props();
</script>

{#if removedItems.length > 0}
  <div class="bg-[var(--pd-content-card-bg)] rounded-lg p-4">
    <h3 class="flex items-center gap-2 mb-3 text-sm font-semibold text-[var(--pd-content-header)]">
      <Fa icon={faTrashAlt} class="text-[var(--pd-content-text)] opacity-70" size="sm" />
      <span>Packages Removed for Security</span>
    </h3>
    <div class="flex flex-wrap gap-2">
      {#each removedItems as item (item)}
        <span class="px-2 py-1 text-xs rounded bg-red-500/10 text-red-400 border border-red-500/20">
          {item}
        </span>
      {/each}
    </div>
    <p class="mt-3 text-xs text-[var(--pd-content-text)] opacity-60">
      These components have been removed to reduce the attack surface and eliminate potential vulnerabilities.
    </p>
  </div>
{/if}
