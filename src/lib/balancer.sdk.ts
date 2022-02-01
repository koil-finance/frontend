import { configService } from '@/services/config/config.service';
import { KoilSDK, Network } from '@koil-finance/sdk';

const network = ((): Network => {
  switch (configService.network.key) {
    case '122':
      return Network.FUSE;
    default:
      return Network.FUSE;
  }
})();

export const balancer = new KoilSDK({
  network,
  rpcUrl: configService.rpc
});
