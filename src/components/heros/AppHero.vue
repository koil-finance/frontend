<template>
  <div :class="['app-hero', 'h-56']">
    <div class="lg:container lg:mx-auto pt-10 md:pt-12">
      <!--      <template v-if="isWalletReady">-->
      <!--        <h1-->
      <!--          v-text="$t('myInvestments')"-->
      <!--          class="text-base font-medium opacity-90 font-body mb-2 text-red-900"-->
      <!--        />-->
      <!--        <BalLoadingBlock-->
      <!--          v-if="isLoadingUserPools"-->
      <!--          class="h-10 w-40 mx-auto"-->
      <!--          white-->
      <!--        />-->
      <!--        <span v-else class="text-3xl font-bold text-red-900">-->
      <!--          {{-->
      <!--            fNum2(totalInvestedAmount || '', {-->
      <!--              style: 'currency',-->
      <!--              fixedFormat: true-->
      <!--            })-->
      <!--          }}-->
      <!--        </span>-->
      <!--      </template>-->
      <!--      <template>-->
      <h1 class="text-4xl md:text-5xl pb-2 text-black">
        {{ $t('unlockThePowerOfFuse') }}<br />
        {{ $t('through') }} <b>{{ $t('koil') }}</b>
      </h1>
      <!--      </template>-->
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import useNumbers from '@/composables/useNumbers';
import usePools from '@/composables/pools/usePools';

import { EXTERNAL_LINKS } from '@/constants/links';
import useFathom from '@/composables/useFathom';
import useWeb3 from '@/services/web3/useWeb3';

export default defineComponent({
  name: 'AppHero',

  setup() {
    // COMPOSABLES
    const { fNum2 } = useNumbers();
    const { isWalletReady, toggleWalletSelectModal } = useWeb3();
    const { trackGoal, Goals } = useFathom();
    const { totalInvestedAmount, isLoadingUserPools } = usePools();

    function onClickConnect() {
      toggleWalletSelectModal(true);
      trackGoal(Goals.ClickHeroConnectWallet);
    }

    return {
      // data
      totalInvestedAmount,
      isLoadingUserPools,
      Goals,

      // computed
      isWalletReady,

      // methods
      toggleWalletSelectModal,
      fNum2,
      onClickConnect,
      trackGoal,
      // constants
      EXTERNAL_LINKS
    };
  }
});
</script>

<style>
.app-hero {
  @apply bg-cover bg-center flex items-center justify-center px-4;
  transition: all 0.3s ease-in-out;
}
.app-hero h1 {
  @apply text-black;
  font-family: 'DM Sans Medium', monospace;
  font-weight: 500;
}
</style>
