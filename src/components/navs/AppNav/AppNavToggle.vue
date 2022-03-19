<template>
  <div :class="`app-nav-toggle bg-custom-gray-200`">
    <router-link
      :to="{ name: 'home' }"
      :class="[
        'toggle-link px-6 rounded-l-lg',
        { [activeClasses]: !isTradePage }
      ]"
      @click="trackGoal(Goals.ClickNavInvest)"
    >
      {{ $t('invest') }}
    </router-link>
    <router-link
      :to="{ name: 'swap' }"
      :class="[
        'toggle-link px-6 rounded-r-lg',
        { [activeClasses]: isTradePage }
      ]"
      @click="trackGoal(Goals.ClickNavTrade)"
    >
      {{ $t('swap') }}
    </router-link>
  </div>
</template>

<script lang="ts">
import useFathom from '@/composables/useFathom';
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'AppNavToggle',

  setup() {
    const route = useRoute();
    const activeClasses = 'active text-white rounded-lg';
    const isTradePage = computed(() => route.name === 'swap');
    const { trackGoal, Goals } = useFathom();

    return {
      isTradePage,
      activeClasses,
      trackGoal,
      Goals
    };
  }
});
</script>

<style scoped>
.app-nav-toggle {
  @apply h-11 flex items-center;
  border-radius: 10px;
  font-style: normal;
  font-weight: 400;
  color: #6d697f;
  padding: 3px;
}

.toggle-link {
  @apply h-full flex items-center;
  border-radius: 10px;
}

.toggle-link.active {
  background: #ac503f;
}
</style>
