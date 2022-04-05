<script setup lang="ts">
import { toRef, computed } from 'vue';
import useWithdrawMath from '@/components/forms/pool_actions/WithdrawForm/composables/useWithdrawMath';
import { FullPool } from '@/services/balancer/subgraph/types';
import useTokens from '@/composables/useTokens';
import useNumbers, { FNumFormats } from '@/composables/useNumbers';
import { bnum } from '@/lib/utils';
import useWeb3 from '@/services/web3/useWeb3';
import { lpTokensFor } from '@/composables/usePool';

/**
 * TYPES
 */
type Props = {
  pool: FullPool;
  missingPrices: boolean;
};

/**
 * PROPS
 */
const props = defineProps<Props>();

/**
 * COMPOSABLES
 */
const { hasBpt } = useWithdrawMath(toRef(props, 'pool'));
const { balanceFor, nativeAsset, wrappedNativeAsset } = useTokens();
const { fNum2, toFiat } = useNumbers();
const { isWalletReady, toggleWalletSelectModal } = useWeb3();

/**
 * COMPUTED
 */
const fiatTotal = computed(() => {
  const fiatValue = lpTokensFor(props.pool)
    .map(address => {
      let tokenBalance = '0';

      if (address === wrappedNativeAsset.value.address) {
        const wrappedBalance = balanceFor(address);
        const nativeBalance = balanceFor(nativeAsset.address);
        tokenBalance = bnum(nativeBalance).gt(wrappedBalance)
          ? nativeBalance
          : wrappedBalance;
      } else {
        tokenBalance = balanceFor(address);
      }

      return toFiat(tokenBalance, address);
    })
    .reduce((total, value) =>
      bnum(total)
        .plus(value)
        .toString()
    );

  return fNum2(fiatValue, FNumFormats.fiat);
});
</script>

<template>
  <BalCard>
    <div class="text-gray-500 text-sm">
      {{ $t('basedOnTokensInWallet') }}
    </div>
    <div class="flex justify-between items-center mb-4">
      <h5>
        {{ $t('youCanInvest') }}
      </h5>
      <h5>
        {{ isWalletReady ? fiatTotal : '-' }}
      </h5>
    </div>

    <BalBtn
      v-if="!isWalletReady"
      :label="$t('connectWallet')"
      class="connect-wallet-button"
      block
      @click="toggleWalletSelectModal"
    />
    <div v-else class="grid gap-2 grid-cols-2">
      <BalBtn
        tag="router-link"
        :to="{ name: 'invest' }"
        :label="$t('invest')"
        class="deposit-button"
        block
      />
      <BalBtn
        :tag="hasBpt ? 'router-link' : 'div'"
        :to="{ name: 'withdraw' }"
        :label="$t('withdraw.label')"
        :disabled="!hasBpt"
        class="withdraw-button"
        block
      />
    </div>
  </BalCard>
</template>

<style scoped>
.connect-wallet-button {
  background: #ac503f;
}
.connect-wallet-button:disabled {
  background: rgba(172, 80, 63, 0.5);
}
.connect-wallet-button:not(:disabled):hover {
  background: #85392b;
}

.deposit-button {
  background: #ac503f;
}
.deposit-button:disabled {
  background: rgba(172, 80, 63, 0.5);
}
.deposit-button:not(:disabled):hover {
  background: #85392b;
}

.withdraw-button {
  background: black;
}
.withdraw-button:disabled {
  background: rgba(0, 0, 0, 0.5);
}
.withdraw-button:not(:disabled):hover {
  background: #1c1b1b;
}
</style>
