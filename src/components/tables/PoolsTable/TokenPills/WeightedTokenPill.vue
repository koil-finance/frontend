<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

type Props = {
  hasBalance: boolean;
  symbol: string;
  weight: string;
  isSelected: boolean;
};

withDefaults(defineProps<Props>(), {
  hasBalance: false,
  isSelected: false
});
</script>

<template>
  <div
    :class="[
      'pill',
      {
        'pill-selected': isSelected
      }
    ]"
  >
    <div v-if="hasBalance" class="balance-indicator" />
    <span>
      {{ symbol }}
    </span>
    <span class="pill-weight">
      {{ weight }}
    </span>
  </div>
</template>

<style scoped>
.pill {
  @apply flex items-center px-2 mr-2 my-1 py-1 rounded-lg relative;
  background: #d8cfb6;
}
.pill:last-child {
  @apply mr-0;
}

.pill-selected {
  @apply bg-red-600 dark:bg-red-600;
  @apply text-white;
}

.pill-weight {
  @apply font-medium text-xs;
  @apply mt-px ml-1;
  font-family: 'DM Mono Light', monospace;
}

.balance-indicator {
  @apply w-3 h-3;
  @apply rounded-full border-2 border-white;
  @apply bg-green-300;
  @apply absolute top-0 right-0 -mt-1 -mr-1;
}
</style>
