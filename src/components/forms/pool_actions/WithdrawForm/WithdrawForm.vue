<script setup lang="ts">
import { toRef, computed, ref, onBeforeMount } from 'vue';
import { FullPool } from '@/services/balancer/subgraph/types';
import { isLessThanOrEqualTo, isRequired } from '@/lib/utils/validations';
// Composables
import useWithdrawMath from './composables/useWithdrawMath';
import useWithdrawalState from './composables/useWithdrawalState';
import useWeb3 from '@/services/web3/useWeb3';
import { useI18n } from 'vue-i18n';
// Components
import TokenInput from '@/components/inputs/TokenInput/TokenInput.vue';
import WithdrawTotals from './components/WithdrawTotals.vue';
import WithdrawPreviewModal from './components/WithdrawPreviewModal/WithdrawPreviewModal.vue';
import ProportionalWithdrawalInput from './components/ProportionalWithdrawalInput.vue';
import WithdrawalTokenSelect from './components/WithdrawalTokenSelect.vue';

/**
 * TYPES
 */
type Props = {
  pool: FullPool;
};

/**
 * PROPS & EMITS
 */
const props = defineProps<Props>();

const showPreview = ref(false);

/**
 * COMPOSABLES
 */
const { t } = useI18n();

const {
  isProportional,
  tokenOut,
  tokenOutIndex,
  highPriceImpactAccepted,
  validInput,
  maxSlider,
  tokensOut,
  error,
  parseError,
  setError
} = useWithdrawalState(toRef(props, 'pool'));

const withdrawMath = useWithdrawMath(
  toRef(props, 'pool'),
  isProportional,
  tokenOut,
  tokenOutIndex
);

const {
  hasAmounts,
  highPriceImpact,
  singleAssetMaxes,
  tokenOutAmount,
  tokenOutPoolBalance,
  initMath,
  loadingAmountsOut
} = withdrawMath;

const {
  isWalletReady,
  toggleWalletSelectModal,
  isMismatchedNetwork
} = useWeb3();

/**
 * COMPUTED
 */
const hasAcceptedHighPriceImpact = computed((): boolean =>
  highPriceImpact.value ? highPriceImpactAccepted.value : true
);

const hasValidInputs = computed(
  (): boolean => validInput.value && hasAcceptedHighPriceImpact.value
);

const singleAssetRules = computed(() => [
  isLessThanOrEqualTo(tokenOutPoolBalance.value, t('exceedsPoolBalance'))
]);

/**
 * CALLBACKS
 */
onBeforeMount(() => {
  isProportional.value = true;
  maxSlider();
  initMath();
});
</script>

<template>
  <div>
    <ProportionalWithdrawalInput
      v-if="isProportional"
      :pool="pool"
      :tokenAddresses="tokensOut"
      :math="withdrawMath"
    />
    <TokenInput
      v-else
      :name="tokenOut"
      :address="tokenOut"
      v-model:amount="tokenOutAmount"
      v-model:isValid="validInput"
      :disableBalance="singleAssetMaxes[tokenOutIndex] === '-'"
      :customBalance="singleAssetMaxes[tokenOutIndex] || '0'"
      :rules="singleAssetRules"
      :balanceLabel="$t('singleTokenMax')"
      :balanceLoading="loadingAmountsOut"
      fixedToken
      disableNativeAssetBuffer
    >
      <template #tokenSelect>
        <WithdrawalTokenSelect :pool="pool" :initToken="tokenOut" />
      </template>
    </TokenInput>

    <WithdrawTotals :math="withdrawMath" class="mt-4" />

    <div
      v-if="highPriceImpact"
      class="border rounded-lg p-2 pb-2 mt-4"
      style="border-color: #d8ceb5;"
    >
      <BalCheckbox
        v-model="highPriceImpactAccepted"
        :rules="[isRequired($t('priceImpactCheckbox'))]"
        name="highPriceImpactAccepted"
        size="sm"
        :label="$t('priceImpactAccept', [$t('withdrawing')])"
        :noMargin="highPriceImpactAccepted"
      />
    </div>

    <BalAlert
      v-if="error !== null"
      type="error"
      :title="parseError(error).title"
      :description="parseError(error).description"
      class="mt-4"
      block
      actionLabel="Dismiss"
      @actionClick="setError(null)"
    />

    <div class="mt-4">
      <BalBtn
        v-if="!isWalletReady"
        :label="$t('connectWallet')"
        color="gradient"
        block
        @click="toggleWalletSelectModal"
      />
      <BalBtn
        v-else
        :label="$t('preview')"
        class="preview-button"
        :disabled="
          !hasAmounts ||
            !hasValidInputs ||
            isMismatchedNetwork ||
            loadingAmountsOut
        "
        block
        @click="showPreview = true"
      />
    </div>

    <teleport to="#modal">
      <WithdrawPreviewModal
        v-if="showPreview"
        :pool="pool"
        :math="withdrawMath"
        @close="showPreview = false"
      />
    </teleport>
  </div>
</template>

<style scoped>
.preview-button {
  background: #ac503f;
}
.preview-button:disabled {
  background: rgba(172, 80, 63, 0.5);
}
.preview-button:not(:disabled):hover {
  background: #85392b;
}
</style>
