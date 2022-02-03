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
        'https://storageapi.fleek.co/a667fff6-ded3-4ead-a644-e3562bed0a86-bucket/fuse.vetted.tokenlist.json',
      Vetted:
        'https://storageapi.fleek.co/a667fff6-ded3-4ead-a644-e3562bed0a86-bucket/fuse.vetted.tokenlist.json'
    },
    External: []
  }
};
