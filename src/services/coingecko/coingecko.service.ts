import { SUPPORTED_FIAT } from '@/constants/currency';
import { PriceService } from './api/price.service';
import { coingeckoClient } from './coingecko.client';

export const getNativeAssetId = (chainId: string): string => {
  const mapping = {
    '122': 'fuse-network-token'
  };

  return mapping[chainId] || 'fuse-network-token';
};

export const getPlatformId = (chainId: string): string => {
  const mapping = {
    '122': 'fuse'
  };

  return mapping[chainId] || 'fuse';
};

export class CoingeckoService {
  supportedFiat: string;
  prices: PriceService;

  constructor(
    public readonly client = coingeckoClient,
    priceServiceClass = PriceService
  ) {
    this.supportedFiat = SUPPORTED_FIAT.join(',');
    this.prices = new priceServiceClass(this);
  }
}

export const coingeckoService = new CoingeckoService();
