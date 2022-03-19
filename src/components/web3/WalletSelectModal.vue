<template>
  <BalModal
    :show="isVisible"
    @close="$emit('close')"
    title="Connect to a wallet"
    class="connect-wallet-modal"
  >
    <p class="pb-3 text-md">
      {{ $t('byConnectingWallet') }}
      <router-link
        :to="{ name: 'terms-of-use' }"
        target="_blank"
        class="text-link"
      >
        <span className="link">{{ $t('policies.termsOfUse') }}</span
        >,
      </router-link>
      <router-link
        :to="{ name: 'cookies-policy' }"
        target="_blank"
        class="text-link"
      >
        <span className="link">{{ $t('policies.cookiesPolicy') }}</span>
      </router-link>
      {{ $t('and') }}
      <router-link
        :to="{ name: 'privacy-policy' }"
        target="_blank"
        class="text-link"
      >
        <span className="link">{{ $t('policies.privacyPolicy') }}</span
        >.
      </router-link>
    </p>
    <WalletButton v-for="wallet in wallets" :wallet="wallet" :key="wallet" />
    <div class="mt-4 modal-footer">
      <h6>{{ $t('newToFuse') }}</h6>
      <p class="text-sm">
        {{ $t('setUpFuseWallet') }}
        <BalLink :href="EXTERNAL_LINKS.Fuse.Wallets" external>
          {{ $t('learnMore') }}
          <span class="align-middle"
            ><BalIcon name="arrow-up-right" size="sm"
          /></span>
        </BalLink>
      </p>
    </div>
  </BalModal>
</template>

<script lang="ts">
import { SupportedWallets } from '@/services/web3/web3.plugin';
import WalletButton from '@/components/web3/WalletButton.vue';
import { EXTERNAL_LINKS } from '@/constants/links';
import { defineComponent } from 'vue';
export default defineComponent({
  emits: ['close'],
  components: {
    WalletButton
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {
      wallets: SupportedWallets.filter(id => id !== 'gnosis'),
      EXTERNAL_LINKS
    };
  }
});
</script>

<style scoped>
.modal-footer h6 {
  font-family: 'DM Sans Medium', monospace;
  font-style: normal;
  font-weight: 500;
}
</style>

<style>
.text-link span,
.modal-footer a {
  font-family: 'DM Sans Medium', monospace;
  font-style: normal;
  font-weight: 500;
  color: #ac503f;
}
</style>
