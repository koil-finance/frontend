<script setup lang="ts">
import { computed, ref, toRef } from 'vue';
import { useI18n } from 'vue-i18n';

import { FullPool } from '@/services/balancer/subgraph/types';

import { usePool } from '@/composables/usePool';

import Activities from './PoolActivities/Activities.vue';
import BoostedActivities from './BoostedPoolActivities/Activities.vue';
import Swaps from './PoolSwaps/Swaps.vue';

import { PoolTransactionsTab } from './types';

/**
 * TYPES
 */
type Props = {
  pool: FullPool;
  loading: boolean;
};

/**
 * PROPS
 */
const props = withDefaults(defineProps<Props>(), {
  loading: false
});

/**
 * COMPOSABLES
 */
const { isStablePhantomPool } = usePool(toRef(props, 'pool'));
const { t } = useI18n();

/**
 * COMPUTED
 */
const tabs = computed(() =>
  isStablePhantomPool.value
    ? [
        {
          value: PoolTransactionsTab.ALL_ACTIVITY,
          label: t('poolTransactions.tabs.allTransactions')
        },
        {
          value: PoolTransactionsTab.USER_ACTIVITY,
          label: t('poolTransactions.tabs.myTransactions')
        }
      ]
    : [
        {
          value: PoolTransactionsTab.ALL_ACTIVITY,
          label: t('poolTransactions.tabs.allInvestments')
        },
        {
          value: PoolTransactionsTab.SWAPS,
          label: t('poolTransactions.tabs.swaps')
        },
        {
          value: PoolTransactionsTab.USER_ACTIVITY,
          label: t('poolTransactions.tabs.myInvestments')
        }
      ]
);

/**
 * STATE
 */
const activeTab = ref(tabs.value[0].value);
</script>

<template>
  <div class="px-4 sm:px-0 flex justify-between items-end mb-6">
    <BalTabs v-model="activeTab" :tabs="tabs" no-pad class="-mb-px" />
  </div>

  <Activities
    v-if="activeTab === PoolTransactionsTab.ALL_ACTIVITY"
    :pool-activity-type="PoolTransactionsTab.ALL_ACTIVITY"
    :pool="pool"
    :loading="loading"
  />
  <Activities
    v-else-if="activeTab === PoolTransactionsTab.USER_ACTIVITY"
    :pool-activity-type="PoolTransactionsTab.USER_ACTIVITY"
    :pool="pool"
    :loading="loading"
  />
  <Swaps
    v-else-if="activeTab === PoolTransactionsTab.SWAPS"
    :pool="pool"
    :loading="loading"
  />
</template>
