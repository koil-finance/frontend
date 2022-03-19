<template>
  <button class="wallet-connect-btn" @click="connectWallet(wallet)">
    <div class="flex items-center" style="width: 100%">
      <h5 class="text-gray-700 dark:text-white text-base">
        <span class="capitalize">{{ WalletNameMap[wallet] }}</span>
      </h5>
      <img
        :src="require(`@/assets/images/connectors/${wallet}.svg`)"
        class="h-10 w-10 ml-4"
        style="margin-left: auto;"
      />
    </div>
  </button>
</template>

<script lang="ts">
import { Wallet, WalletNameMap } from '@/services/web3/web3.plugin';
import { defineComponent, PropType } from 'vue';
import useWeb3 from '@/services/web3/useWeb3';
export default defineComponent({
  props: {
    wallet: {
      type: String as PropType<Wallet>,
      required: true
    }
  },
  setup() {
    const { connectWallet } = useWeb3();
    return {
      WalletNameMap,
      connectWallet
    };
  }
});
</script>

<style>
.wallet-connect-btn {
  @apply transition-all;
  @apply border dark:border-gray-900;
  @apply p-4 flex justify-start items-center w-full h-16 rounded-md mb-3;
}
.wallet-connect-btn:hover {
  background: #f2e9d1;
}
.wallet-connect-btn span {
  @apply text-lg;
  font-family: 'DM Sans Medium', monospace;
  font-style: normal;
  font-weight: 500;
}
</style>
