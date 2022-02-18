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
      '0x05af8fbfae654eb526059c653141d49ad6b3e7af000200000000000000000010',
      '0xcb983b242d5a24f9d564915eb01c661845f76383000200000000000000000008',
      '0x2ed0071c4c9d60f70eaeafec5e338a4e7b0488ef000200000000000000000013'
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
