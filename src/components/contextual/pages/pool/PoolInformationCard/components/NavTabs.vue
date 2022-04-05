<template>
  <div :class="`tab-nav-toggle bg-custom-gray-200 ${classes}`">
    <div
      v-for="tab of tabs"
      :key="tab.id"
      @click="$emit('tab-switched', tab.id)"
      :class="[
        'toggle-link px-4 rounded-sm text-sm',
        { [activeClasses]: tab.id === currentTab }
      ]"
    >
      {{ tab.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NavTabs',

  props: ['tabs', 'currentTab', 'classes'],
  setup() {
    const activeClasses = 'active text-white rounded-lg';

    return {
      activeClasses
    };
  }
});
</script>

<style scoped>
.tab-nav-toggle {
  @apply h-9 flex items-center;
  border-radius: 10px;
  font-style: normal;
  font-weight: 400;
  color: #6d697f;
  padding: 3px;
  width: max-content;
  float: right;
}

.toggle-link {
  @apply h-full flex items-center;
  border-radius: 10px;
  cursor: pointer;
}

.toggle-link.active {
  background: #ac503f;
}

.toggle-link:not(.active):hover {
  background: #ddd5c0;
}

.tab-nav-toggle > a:not(:last-child),
.tab-nav-toggle > div:not(:last-child) {
  @apply mr-1;
}
</style>

<style>
.more-toggle-button,
.more-toggle-button .bal-popover-activator {
  @apply h-full;
}

.more-sublink {
  @apply p-2 text-black rounded-md;
}
.more-sublink:nth-child(n) {
  vertical-align: middle;
}
.more-sublink:hover {
  background: #d8ceb5;
}
</style>
