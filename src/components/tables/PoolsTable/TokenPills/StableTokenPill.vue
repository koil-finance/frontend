<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

type Props = {
  hasBalance: boolean;
  symbol: string;
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
    <div class="pill-text">
      {{ symbol }}
    </div>
  </div>
</template>

<style scoped>
.pill {
  @apply flex;
  @apply relative;
  @apply mr-1 my-px;
}
.pill:last-child {
  @apply mr-0;
}

.pill::before {
  @apply w-full h-full;
  @apply absolute;
  background: #d8cfb6;
  content: '';
  transform: skew(-12deg);
}

.pill:first-child::before {
  border-radius: 4px 0px 0px 4px;
}

.pill:last-child::before {
  border-radius: 0px 4px 4px 0px;
}

.pill-text {
  @apply px-2 py-1;
  z-index: 1;
}

.pill-selected::before {
  @apply bg-red-600 dark:bg-red-600;
}

.pill-selected .pill-text {
  @apply text-white;
}

.balance-indicator {
  @apply w-3 h-3;
  @apply rounded-full border-2 border-white;
  @apply bg-green-300;
  @apply absolute top-0 right-0 -mt-1 -mr-1;
}
</style>
