<template>
  <div>
    <div :class="['bal-tab-container', containerClasses]">
      <div
        v-for="(tab, i) in tabs"
        :key="i"
        :class="['bal-tab', stateClasses(tab)]"
        @click="onClick(tab)"
      >
        {{ tab.label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, computed } from 'vue';

interface Tab {
  value: string;
  label: string;
}

export default defineComponent({
  name: 'BalTabs',

  emits: ['selected', 'update:modelValue'],

  props: {
    tabs: { type: Array as PropType<Tab[]>, required: true },
    modelValue: { type: String, default: '' },
    noPad: { type: Boolean, default: false }
  },

  setup(props, { emit }) {
    const activeTab = ref(props.modelValue);

    function isActiveTab(tab: Tab): boolean {
      return activeTab.value === tab.value;
    }

    function onClick(tab: Tab) {
      activeTab.value = tab.value;
      emit('selected', tab.value);
      emit('update:modelValue', tab.value);
    }

    const containerClasses = computed(() => {
      return {
        'px-4': !props.noPad
      };
    });

    function stateClasses(tab: Tab): Record<string, boolean> {
      return {
        'border-ac503f text-ac503f border-b-4': isActiveTab(tab),
        'hover:text-black text-yellow-gray transition-colors border-none': !isActiveTab(
          tab
        )
      };
    }

    return {
      activeTab,
      onClick,
      containerClasses,
      stateClasses
    };
  }
});
</script>

<style>
.bal-tab {
  @apply border-b -mb-px mr-6 pt-3 pb-2 cursor-pointer;
}

.bal-tab-container {
  @apply flex font-medium;
  color: rgba(105, 99, 83, 1);
}

.text-yellow-gray {
  color: rgba(105, 99, 83, 1);
}

.border-ac503f {
  border-color: #ac503f;
}
.text-ac503f {
  color: #ac503f;
}

.border-b-4 {
  border-bottom-width: 4px;
}
</style>
