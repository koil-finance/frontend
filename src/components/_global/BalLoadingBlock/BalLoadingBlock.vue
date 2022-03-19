<template>
  <div :class="['bal-loading-block', classes]" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'BalLoadingBlock',

  props: {
    white: { type: Boolean, default: false },
    darker: { type: Boolean, default: false },
    rounded: {
      type: String,
      default: 'lg',
      validator: (val: string): boolean => ['sm', 'md', 'lg'].includes(val)
    }
  },

  setup(props) {
    const bgClass = computed(() => {
      if (props.white) return 'shimmer-white';
      return props.darker ? 'shimmer-light-mode-darker' : 'shimmer-light-mode';
    });

    const classes = computed(() => {
      return {
        [`rounded-${props.rounded}`]: true,
        [bgClass.value]: true
      };
    });

    return { classes };
  }
});
</script>

<style>
.bal-loading-block {
  min-height: 5px;
}

@keyframes shimmerBackground {
  0% {
    background-position: -5000px 0;
  }
  100% {
    background-position: 5000px 0;
  }
}

.shimmer-white {
  --startColor: #fef7e5;
  --midColor: #f6ecd1;
  --endColor: #fef7e5;

  animation: shimmerBackground 10s infinite;
  background: linear-gradient(
    to right,
    var(--startColor) 4%,
    var(--midColor) 25%,
    var(--endColor) 36%
  );
  background-size: 1000px 100%;
}

.shimmer-light-mode {
  --startColor: #fef7e5;
  --midColor: #f6ecd1;
  --endColor: #fef7e5;

  animation: shimmerBackground 10s infinite;
  background: linear-gradient(
    to right,
    var(--startColor) 4%,
    var(--midColor) 25%,
    var(--endColor) 36%
  );
  background-size: 1000px 100%;
}

.shimmer-light-mode-darker {
  --startColor: #fef7e5;
  --midColor: #f6ecd1;
  --endColor: #fef7e5;

  animation: shimmerBackground 10s infinite;
  background: linear-gradient(
    to right,
    var(--startColor) 4%,
    var(--midColor) 25%,
    var(--endColor) 36%
  );
  background-size: 1000px 100%;
}

.shimmer-dark-mode {
  --startColor: #fef7e5;
  --midColor: #f6ecd1;
  --endColor: #fef7e5;

  animation: shimmerBackground 10s infinite;
  background: linear-gradient(
    to right,
    var(--startColor) 4%,
    var(--midColor) 25%,
    var(--endColor) 36%
  );
  background-size: 1000px 100%;
}

.shimmer-dark-mode-darker {
  --startColor: theme('colors.gray.700');
  --midColor: theme('colors.gray.600');
  --endColor: theme('colors.gray.700');

  animation: shimmerBackground 10s infinite;
  background: linear-gradient(
    to right,
    var(--startColor) 4%,
    var(--midColor) 25%,
    var(--endColor) 36%
  );
  background-size: 1000px 100%;
}
</style>
