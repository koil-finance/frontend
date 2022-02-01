export interface TokenListMap {
  Balancer: {
    Default: string;
    Vetted: string;
  };
  External: string[];
}

interface TokenListMapByNetwork {
  [networkKey: string]: TokenListMap;
}

/**
 * Mapping of the TokenLists used on each network
 */
export const TOKEN_LIST_MAP: TokenListMapByNetwork = {
  '122': {
    Balancer: {
      Default:
        'https://storageapi.fleek.co/tomafrench-team-bucket/polygon.listed.tokenlist.json',
      Vetted:
        'https://storageapi.fleek.co/tomafrench-team-bucket/polygon.vetted.tokenlist.json'
    },
    External: [
      'https://unpkg.com/quickswap-default-token-list@1.0.67/build/quickswap-default.tokenlist.json'
    ]
  }
};
