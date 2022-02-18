export const POOLS = {
  Pagination: {
    PerPage: 10
  },
  DelegateOwner: '0xba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1b',
  ZeroAddress: '0x0000000000000000000000000000000000000000',
  DynamicFees: {
    Gauntlet: ['0x0000000000000000000000000000000000000000']
  },
  BlockList: [''],
  ExcludedPoolTypes: ['Element', 'AaveLinear', 'Linear'],
  Stable: {
    AllowList: [
      '0x2c1f8499598e735de23f855ad01f65136492d74a000200000000000000000000',
      '0x9acc685a8e5517d519aad808988a8d1b26e1fa8f000200000000000000000001'
    ]
  },
  Investment: {
    AllowList: ['0x0000000000000000000000000000000000000000']
  },
  Factories: {
    '0x85c256263d69597b4cdee6adf67538704b317eac': 'weightedPool',
    '0x9f05d6efd8cd4b10425e78b9beda7543f1534bd5': 'stablePool',
    '0xbfd0aba0d24732abca13a3087cbc7b65a92140a6': 'metaStablePool',
    '0xc618c2b1e4b357bd39b432d861e3744868f16ad1': 'weightedPool'
  }
};
