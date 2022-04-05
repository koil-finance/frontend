<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { zip } from 'lodash';
import { format } from 'date-fns';

import { FullPool, PoolSnapshots } from '@/services/balancer/subgraph/types';
import { HistoricalPrices } from '@/services/coingecko/api/price.service';

import useTailwind from '@/composables/useTailwind';
import { isStablePhantom } from '@/composables/usePool';

import { default as NavTabs } from './components/NavTabs';
import { PoolChart } from '../';
import { PoolBalances } from '../';

/**
 * TYPES
 */
type Props = {
  historicalPrices: HistoricalPrices;
  snapshots: PoolSnapshots;
  loading: boolean;
  pool: FullPool;
};

/**
 * PROPS
 */
const props = withDefaults(defineProps<Props>(), {
  loading: false
});

/**Z
 * STATE
 */
const MIN_CHART_VALUES = 7;

const TABS = [
  {
    id: 'chart',
    name: 'Chart'
  },
  {
    id: 'pool-composition',
    name: 'Pool Composition'
  },
  // {
  //   id: 'my-pool-balances',
  //   name: 'My Pool Balances'
  // }
];
const CURRENT_TAB = ref('chart');

/**
 * COMPOSABLES
 */
const store = useStore();
const { t } = useI18n();
const tailwind = useTailwind();

/**
 * COMPUTED
 */
const hodlColor = computed(() => tailwind.theme.colors.black);

const chartColors = computed(() => [
  tailwind.theme.colors.green['400'],
  hodlColor.value
]);

const supportsPoolLiquidity = computed(() =>
  isStablePhantom(props.pool.poolType)
);

const appLoading = computed(() => store.state.app.loading);

const history = computed(() => {
  const pricesTimestamps = Object.keys(props.historicalPrices);
  const snapshotsTimestamps = Object.keys(props.snapshots);

  if (snapshotsTimestamps.length === 0) {
    return [];
  }

  // Prices are required when not using pool liquidity
  if (!supportsPoolLiquidity.value && pricesTimestamps.length === 0) {
    return [];
  }

  return snapshotsTimestamps
    .map(snapshotTimestamp => {
      const timestamp = parseInt(snapshotTimestamp);

      const snapshot = props.snapshots[timestamp];
      const prices = props.historicalPrices[timestamp] ?? [];
      const amounts = snapshot.amounts ?? [];
      const totalShares = parseFloat(snapshot.totalShares) ?? 0;
      const liquidity = parseFloat(snapshot.liquidity) ?? 0;

      return {
        timestamp,
        prices,
        amounts,
        totalShares,
        liquidity
      };
    })
    .filter(({ totalShares, prices, amounts, liquidity }) => {
      if (!supportsPoolLiquidity.value && prices.length === 0) {
        return false;
      } else if (supportsPoolLiquidity.value && liquidity === 0) {
        return false;
      }
      return totalShares > 0 && amounts.length > 0;
    });
});

const timestamps = computed(() =>
  history.value.map(state => format(state.timestamp, 'yyyy/MM/dd'))
);

const hodlValues = computed(() => {
  if (history.value.length === 0) {
    return [];
  }

  const firstState = history.value[0];
  const firstValue = getPoolValue(firstState.amounts, firstState.prices);

  return history.value.map(state => {
    if (state.timestamp < firstState.timestamp) {
      return 0;
    }

    const currentValue = getPoolValue(firstState.amounts, state.prices);

    return currentValue / firstValue - 1;
  });
});

const bptValues = computed(() => {
  if (history.value.length === 0) {
    return [];
  }

  const firstState = history.value[0];
  const firstValue = supportsPoolLiquidity.value
    ? firstState.liquidity
    : getPoolValue(firstState.amounts, firstState.prices);
  const firstShares = firstState.totalShares;
  const firstValuePerBpt = firstValue / firstShares;

  return history.value.map(state => {
    if (state.timestamp < firstState.timestamp) {
      return 0;
    }

    const currentValue = supportsPoolLiquidity.value
      ? state.liquidity
      : getPoolValue(state.amounts, state.prices);
    const currentShares = state.totalShares;
    const currentValuePerBpt = currentValue / currentShares;

    return currentValuePerBpt / firstValuePerBpt - 1;
  });
});

const series = computed(() => {
  // TODO: currently HODL series is disabled when using pool liquidity
  const supportsHODLSeries = !supportsPoolLiquidity.value;

  const chartSeries = [
    {
      name: t('poolReturns'),
      values: zip(timestamps.value, bptValues.value)
    }
  ];

  if (supportsHODLSeries) {
    chartSeries.push({
      name: 'HODL',
      values: zip(timestamps.value, hodlValues.value)
    });
  }

  return chartSeries;
});

/**
 * METHODS
 */
function getPoolValue(amounts: string[], prices: number[]) {
  return amounts
    .map((amount, index) => {
      const price = prices[index];

      return price * parseFloat(amount);
    })
    .reduce((total, value) => total + value, 0);
}
</script>

<template>
  <BalLoadingBlock v-if="loading || appLoading" class="h-112" />
  <BalCard noPad v-else>
    <NavTabs :tabs="TABS" :current-tab="CURRENT_TAB" @tab-switched="(newTabId) => CURRENT_TAB = newTabId" classes="mx-4 mt-4"></NavTabs>

    <PoolChart
      v-if="CURRENT_TAB === 'chart'"
      :pool="props.pool"
      :historicalPrices="props.historicalPrices"
      :snapshots="props.snapshots"
      class="mt-16 mx-4 mb-4"
    />
    <PoolBalances
      v-if="CURRENT_TAB === 'pool-composition'"
      :pool="props.pool"
      class="mt-14"
    />
<!--    <PoolBalances-->
<!--      v-if="CURRENT_TAB === 'my-pool-balances'"-->
<!--      :pool="props.pool"-->
<!--      only-user-balances-->
<!--      class="mt-14"-->
<!--    />-->
  </BalCard>
</template>
