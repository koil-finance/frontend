import { configService } from '@/services/config/config.service';

export const NATIVE_ASSET_ADDRESS = configService.network.nativeAsset.address;
export const DEFAULT_TOKEN_DECIMALS = 18;

export const TOKENS = {
  Popular: {
    Symbols: ['WBTC', 'DAI', 'USDC', 'WETH', 'WFUSE']
  },
  AddressMap: {
    '1': {
      BAL: '0xba100000625a3754423978a60c9317c58a424e3d'
    }
  },
  Prices: {
    ChainMap: {
      /**
       * Addresses must be lower case and map from kovan to mainnet, e.g
       * [kovan address]: mainnet address
       */
      '42': {
        '0xdfcea9088c8a88a76ff74892c1457c17dfeef9c1':
          '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        '0x1c8e3bcb3378a443cc591f154c5ce0ebb4da9648':
          '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
        '0x41286bb1d3e870f3f750eb7e1c25d7e48c8a1ac7':
          '0xba100000625a3754423978a60c9317c58a424e3d',
        '0x8f4bebf498cc624a0797fe64114a6ff169eee078':
          '0xbc396689893d065f41bc2c6ecbee5e0085233447',
        '0xaf9ac3235be96ed496db7969f60d354fe5e426b0':
          '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
        // USDC
        '0xc2569dd7d0fd715b054fbf16e75b001e5c0c1115':
          '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        '0x04df6e4121c27713ed22341e7c7df330f56f289b':
          '0x6b175474e89094c44da98b954eedeac495271d0f',
        '0x4803bb90d18a1cb7a2187344fe4feb0e07878d05':
          '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
        // AAVE DAI
        '0xff795577d9ac8bd7d90ee22b6c1703490b6512fd':
          '0x6b175474e89094c44da98b954eedeac495271d0f', // DAI
        // AAVE USDC
        '0xe22da380ee6b445bb8273c81944adeb6e8450422':
          '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // USDC
        // AAVE USDT
        '0x13512979ade267ab5100878e2e0f485b568328a4':
          '0xdac17f958d2ee523a2206206994597c13d831ec7' // USDT
      }
    },
    // TODO - remove once coingecko supports wstETH
    ExchangeRates: {
      wstETH: {
        stETH: 1.0352
      }
    }
  }
};
