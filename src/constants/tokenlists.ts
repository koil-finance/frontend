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
        'https://raw.githubusercontent.com/koil-finance/frontend/master/public/json/fuse.vetted.tokenlist.json',
      Vetted:
        'https://raw.githubusercontent.com/koil-finance/frontend/master/public/json/fuse.vetted.tokenlist.json'
    },
    External: []
  }
};
