// Asset Token ABI (OpenZeppelin ERC20 + Ownable with mint). Constructor (name, symbol) used when deploying with ERC20_BYTECODE.
export const ERC20_ABI = [
  {
    inputs: [
      { internalType: "string", name: "name_", type: "string" },
      { internalType: "string", name: "symbol_", type: "string" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "allowance", type: "uint256" },
      { internalType: "uint256", name: "needed", type: "uint256" },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "uint256", name: "balance", type: "uint256" },
      { internalType: "uint256", name: "needed", type: "uint256" },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "approver", type: "address" },
    ],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "receiver", type: "address" },
    ],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
    ],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "owner", type: "address" },
      { indexed: true, internalType: "address", name: "spender", type: "address" },
      { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
      { indexed: true, internalType: "address", name: "newOwner", type: "address" },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "newOwner", type: "address" },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

/** Pre-deployed asset token address. Set NEXT_PUBLIC_ASSET_TOKEN_ADDRESS in .env to use an existing asset contract; otherwise the app uses the address from deployment (localStorage). */
export const ASSET_TOKEN_ADDRESS =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_ASSET_TOKEN_ADDRESS) || "";

// Share Token ABI (OpenZeppelin ERC20 + Ownable with mint, burn, setStakingContract)
export const SHARE_TOKEN_ABI = [
  {
    inputs: [
      { internalType: "string", name: "name_", type: "string" },
      { internalType: "string", name: "symbol_", type: "string" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "allowance", type: "uint256" },
      { internalType: "uint256", name: "needed", type: "uint256" },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "uint256", name: "balance", type: "uint256" },
      { internalType: "uint256", name: "needed", type: "uint256" },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "approver", type: "address" },
    ],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "receiver", type: "address" },
    ],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
    ],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "owner", type: "address" },
      { indexed: true, internalType: "address", name: "spender", type: "address" },
      { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
      { indexed: true, internalType: "address", name: "newOwner", type: "address" },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_stakingContract", type: "address" },
    ],
    name: "setStakingContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stakingContract",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "newOwner", type: "address" },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

// Staking mechanism ABI (StakingVault: _assetToken, _shareToken, _metadataHash — deposit, withdraw, previewDeposit, previewWithdraw, calculateReward). Use STAKING_VAULT_ABI wherever the staking contract is read or written.
export const STAKING_VAULT_ABI = [
  {
    inputs: [
      { internalType: "address", name: "_assetToken", type: "address" },
      { internalType: "address", name: "_shareToken", type: "address" },
      { internalType: "string", name: "_metadataHash", type: "string" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "SECONDS_IN_YEAR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "assetToken",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "interestRate", type: "uint256" },
      { internalType: "uint256", name: "durationInSeconds", type: "uint256" },
    ],
    name: "calculateReward",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "assets", type: "uint256" }],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "metadataHash",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "assetAmount", type: "uint256" },
      { internalType: "uint256", name: "interestRate", type: "uint256" },
      { internalType: "uint256", name: "durationInSeconds", type: "uint256" },
    ],
    name: "previewDeposit",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "assets", type: "uint256" }],
    name: "previewDeposit",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "shares", type: "uint256" }],
    name: "previewWithdraw",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "shareAmount", type: "uint256" },
      { internalType: "uint256", name: "interestRate", type: "uint256" },
      { internalType: "uint256", name: "durationInSeconds", type: "uint256" },
    ],
    name: "previewWithdraw",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "shareToken",
    outputs: [{ internalType: "contract IShareToken", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "shares", type: "uint256" }],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

// Canonical asset token (ERC20) bytecode — single source of truth for deploying the staking app's asset token.
export const ASSET_TOKEN_BYTECODE =
  "0x608060405234801561000f575f5ffd5b50336040518060400160405280600681526020017f5553444e544c00000000000000000000000000000000000000000000000000008152506040518060400160405280600681526020017f5553444e544c0000000000000000000000000000000000000000000000000000815250816003908161008c9190610701565b50806004908161009c9190610701565b5050505f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361010f575f6040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401610106919061080f565b60405180910390fd5b61011e8161015b60201b60201c565b506101563361013161021e60201b60201c565b600a61013d9190610990565b620f424061014b91906109da565b61022660201b60201c565b610aab565b5f60055f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508160055f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b5f6012905090565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610296575f6040517fec442f0500000000000000000000000000000000000000000000000000000000815260040161028d919061080f565b60405180910390fd5b6102a75f83836102ab60201b60201c565b5050565b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036102fb578060025f8282546102ef9190610a1b565b925050819055506103c9565b5f5f5f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2054905081811015610384578381836040517fe450d38c00000000000000000000000000000000000000000000000000000000815260040161037b93929190610a5d565b60405180910390fd5b8181035f5f8673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2081905550505b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610410578060025f828254039250508190555061045a565b805f5f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f82825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516104b79190610a92565b60405180910390fd5b5f81519050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f600282049050600182168061053f57607f821691505b602082108103610552576105516104fb565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f600883026105b47fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82610579565b6105be8683610579565b95508019841693508086168417925050509392505050565b5f819050919050565b5f819050919050565b5f6106026105fd6105f8846105d6565b6105df565b6105d6565b9050919050565b5f819050919050565b61061b836105e8565b61062f61062782610609565b848454610585565b825550505050565b5f5f905090565b610646610637565b610651818484610612565b505050565b5b81811015610674576106695f8261063e565b600181019050610657565b5050565b601f8211156106b95761068a81610558565b6106938461056a565b810160208510156106a2578190505b6106b66106ae8561056a565b830182610656565b50505b505050565b5f82821c905092915050565b5f6106d95f19846008026106be565b1980831691505092915050565b5f6106f183836106ca565b9150826002028217905092915050565b61070a826104c4565b67ffffffffffffffff811115610723576107226104ce565b5b61072d8254610528565b610738828285610678565b5f60209050601f831160018114610769575f8415610757578287015190505b61076185826106e6565b8655506107c8565b601f19841661077786610558565b5f5b8281101561079e57848901518255600182019150602085019450602081019050610779565b868310156107bb57848901516107b7601f8916826106ca565b8355505b6001600288020188555050505b505050505050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6107f9826107d0565b9050919050565b610809816107ef565b82525050565b5f6020820190506108225f830184610800565b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f8160011c9050919050565b5f5f8291508390505b60018511156108aa5780860481111561088657610885610828565b5b60018516156108955780820291505b80810290506108a385610855565b945061086a565b94509492505050565b5f826108c2576001905061097d565b816108cf575f905061097d565b81600181146108e557600281146108ef5761091e565b600191505061097d565b60ff84111561090157610900610828565b5b8360020a91508482111561091857610917610828565b5b5061097d565b5060208310610133831016604e8410600b84101617156109535782820a90508381111561094e5761094d610828565b5b61097d565b6109608484846001610861565b9250905081840481111561097757610976610828565b5b81810290505b9392505050565b5f60ff82169050919050565b5f61099a826105d6565b91506109a583610984565b92506109d27fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff84846108b3565b905092915050565b5f6109e4826105d6565b91506109ef836105d6565b92508282026109fd816105d6565b91508282048414831517610a1457610a13610828565b5b5092915050565b5f610a25826105d6565b9150610a30836105d6565b9250828201905080821115610a4857610a47610828565b5b92915050565b610a57816105d6565b82525050565b5f606082019050610a705f830186610800565b610a7d6020830185610a4e565b610a8a604083018464610a4e565b949350505050565b5f602082019050610aa55f830184610a4e565b92915050565b61111480610ab85f395ff3fe608060405234801561000f575f5ffd5b50600436106100cd575f3560e01c806370a082311161008a57806395d89b411161006464806395d89b41146101ff578063a9059cbb1461021d578063dd62ed3e1461024d578063f2fde38b1461027d576100cd565b806370a08231146101a7578063715018a6146101d75780638da5cb5b146101e1576100cd565b806306fdde03146100d1578063095ea7b3146100ef57806318160ddd1461011f57806323b872dd1461013d578063313ce5671461016d57806340c10f191461018b575b5f5ffd5b6100d9610299565b6040516100e69190610d8d565b60405180910390f35b61010960048036038101906101049190610e3e565b610329565b6040516101169190610e96565b60405180910390f35b61012761034b565b6040516101349190610ebe565b60405180910390f35b61015760048036038101906101529190610ed7565b610354565b6040516101649190610e96565b60405180910390f35b610175610382565b6040516101829190610f42565b60405180910390f35b6101a560048036038101906101a09190610e3e565b61038a565b005b6101c160048036038101906101bc9190610f5b565b610398565b6040516101ce9190610ebe565b60405180910390f35b6101df6103dd565b005b6101e96103f0565b6040516101f69190610f95565b60405180910390fd5b610207610418565b6040516102149190610d8d565b60405180910390f35b61023760048036038101906102329190610e3e565b6104a8565b6040516102449190610e96565b60405180910390f35b61026760048036038101906102629190610fae565b6104ca565b6040516102749190610ebe565b60405180910390f35b61029760048036038101906102929190610f5b565b61054c565b005b6060600380546102a890611019565b80601f01602080910402602001604051908101604052809291908181526020018280546102d490611019565b801561031f5780601f106102f65761010080835404028352916020019161031f565b820191905f5260205f20905b81548152906001019060200180831161030257829003601f168201915b5050505050905090565b5f5f6103336105d0565b90506103408185856105d7565b600191505092915050565b5f600254905090565b5f5f61035e6105d0565b905061036b8582856105e9565b61037685858561067c565b60019150509392505050565b5f6012905090565b610394828261076c565b5050565b5f5f5f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20549050919050565b6103e56107eb565b6103ee5f610872565b565b5f60055f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60606004805461042790611019565b80601f016020809104026020016040519081016040528092919081815260200182805461045390611019565b801561049e5780601f106104755761010080835404028352916020019161049e565b820191905f5260205f20905b81548152906001019060200180831161048157829003601f168201915b5050505050905090565b5f5f6104b26105d0565b90506104bf81858561067c565b600191505092915050565b5f60015f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2054905092915050565b6105546107eb565b5f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036105c4575f6040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081526004016105bb9190610f95565b60405180910390fd5b6105cd81610872565b50565b5f33905090565b6105e48383836001610935565b505050565b5f6105f484846104ca565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8110156106765781811015610667578281836040517ffb8f41b200000000000000000000000000000000000000000000000000000000815260040161065e93929190611049565b60405180910390fd5b61067584848484035f610935565b5b50505050565b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036106ec575f6040517f96c6fd1e0000000000000000000000000000000000000000000000000000000081526004016106e39190610f95565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361075c575f6040517fec442f050000000000000000000000000000000000000000000000000000000081526004016107539190610f95565b60405180910390fd5b610767838383610b04565b505050565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036107dc575f6040517fec442f050000000000000000000000000000000000000000000000000000000081526004016107d39190610f95565b60405180910390fd5b6107e75f8383610b04565b5050565b6107f36105d0565b73ffffffffffffffffffffffffffffffffffffffff166108116103f0565b73ffffffffffffffffffffffffffffffffffffffff1614610870576108346105d0565b6040517f118cdaa70000000000000000000000000000000000000000000000000000000081526004016108679190610f95565b60405180910390fd5b565b5f60055f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508160055f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b5f73ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16036109a5575f6040517fe602df0500000000000000000000000000000000000000000000000000000000815260040161099c9190610f95565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610a15575f6040517f94280d62000000000000000000000000000000000000000000000000000000008152600401610a0c9190610f95565b60405180910390fd5b8160015f8673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20819055508015610afe578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92584604051610af59190610ebe565b60405180910390a35b50505050565b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610b54578060025f828254610b4891906110ab565b92505081905550610c22565b5f5f5f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2054905081811015610bdd578381836040517fe450d38c000000000000000000000000000000000000000000000000000000008152600401610bd493929190611049565b60405180910390fd5b8181035f5f8673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2081905550505b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610c69578060025f8282540392505081905550610cb3565b805f5f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f82825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610d109190610ebe565b60405180910390a3505050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f601f19601f8301169050919050565b5f610d5f82610d1d565b610d698185610d27565b9350610d79818560208601610d37565b610d8281610d45565b840191505092915050565b5f6020820190508181035f830152610da58184610d55565b905092915050565b5f5ffd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f610dda82610db1565b9050919050565b610dea81610dd0565b8114610df4575f5ffd5b50565b5f81359050610e0581610de1565b92915050565b5f819050919050565b610e1d81610e0b565b8114610e27575f5ffd5b50565b5f81359050610e3881610e14565b92915050565b5f5f60408385031215610e5457610e53610dad565b5b5f610e6185828601610df7565b9250506020610e7285828601610e2a565b9150509250929050565b5f8115159050919050565b610e9081610e7c565b82525050565b5f602082019050610ea95f830184610e87565b92915050565b610eb881610e0b565b82525050565b5f602082019050610ed15f830184610eaf565b92915050565b5f5f5f60608486031215610eee57610eed610dad565b5b5f610efb86828701610df7565b9350506020610f0c86828701610df7565b9250506040610f1d86828701610e2a565b9150509250925092565b5f60ff82169050919050565b610f3c81610f27565b82525050565b5f602082019050610f555f830184610f33565b92915050565b5f60208284031215610f7057610f6f610dad565b5b5f610f7d84828501610df7565b91505092915050565b610f8f81610dd0565b82525050565b5f602082019050610fa85f830184610f86565b92915050565b5f5f60408385031215610fc457610fc3610dad565b5b5f610fd185828601610df7565b9250506020610fe285828601610df7565b9150509250929050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f600282049050600182168061103057607f821691505b60208210810361104357611042610fec565b5b50919050565b5f60608201905061105c5f830186610f86565b6110696020830185610eaf565b6110766040830184610eaf565b949350505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f6110b582610e0b565b91506110c083610e0b565b92508282019050808211156110d8576110d761107e565b5b9291505056fea264697066735822122010b35392d6862eb0f0fdf45689c877f2d13bf6aa200d75adae857514cc21d0f964736f6c634300081e0033";

/** Alias for asset token deployment; use ASSET_TOKEN_BYTECODE as single source of truth. */
export const ERC20_BYTECODE = ASSET_TOKEN_BYTECODE;

// Canonical share token bytecode — single source of truth for deploying the staking app's share token.
export const SHARE_TOKEN_BYTECODE =
  "0x608060405234801561000f575f5ffd5b50336040518060400160405280600d81526020017f5374616b6564205553444e544c000000000000000000000000000000000000008152506040518060400160405280600881526020017f53205553444e544c000000000000000000000000000000000000000000000000815250816003908161008c9190610424565b50806004908161009c9190610424565b5050505f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361010f575f6040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081526004016101069190610532565b60405180910390fd5b61011e8161012460201b60201c565b5061054b565b5f60055f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508160055f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b5f81519050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f600282049050600182168061026257607f821691505b6020821081036102755761027461021e565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f600883026102d77fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8261029c565b6102e1868361029c565b95508019841693508086168417925050509392505050565b5f819050919050565b5f819050919050565b5f61032561032061031b846102f9565b610302565b6102f9565b9050919050565b5f819050919050565b61033e8361030b565b61035261034a8261032c565b8484546102a8565b825550505050565b5f5f905090565b61036961035a565b610374818484610335565b505050565b5b818110156103975761038c5f82610361565b60018101905061037a565b5050565b601f8211156103dc576103ad8161027b565b6103b68461028d565b810160208510156103c5578190505b6103d96103d18561028d565b830182610379565b50505b505050565b5f82821c905092915050565b5f6103fc5f19846008026103e1565b1980831691505092915050565b5f61041483836103ed565b9150826002028217905092915050565b61042d826101e7565b67ffffffffffffffff811115610446576104456101f1565b5b610450825461024b565b61045b82828561039b565b5f60209050601f83116001811461048c575f841561047a578287015190505b6104848582610409565b8655506104eb565b601f19841661049a8661027b565b5f5b828110156104c15784890151825560018201915060208501945060208101905061049c565b868310156104de57848901516104da601f8916826103ed565b8355505b6001600288020188555050505b505050505050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f61051c826104f3565b9050919050565b61052c81610512565b82525050565b5f6020820190506105455f830184610523565b92915050565b611486806105588f395ff3fe608060405234801561000f575f5ffd5b50600436106100fe575f3560e01c80638da5cb5b11610095578063a9059cbb11610064578063a9059cbb14610286578063dd62ed3e146102b6578063ee99205c146102e6578063f2fde38b14610304576100fe565b80638da5cb5b146102123806395d89b41146102305780639dc29fac1461024e5780639dd373b91461026a576100fe565b8063313ce567116100d1578063313ce5671461019e57806340c10f19146101bc57806370a08231146101d8578063715018a614610208576100fe565b806306fdde0314610102578063095ea7b31461012057806318160ddd1461015057806323b872dd1461016d575b5f5ffd5b61010a610320565b6040516100e6919061102f565b60405180910390f35b61013a600480360381019061013591906110e0565b6103b0565b6040516101169190611138565b60405180910390f35b6101586103d2565b6040516101659190611160565b60405180910390f35b61018860048036038101906101839190611179565b6103db565b6040516101959190611138565b60405180910390f35b6101a6610409565b6040516101b391906111e4565b60405180910390f35b6101d660048036038101906101d191906110e0565b610411565b005b6101f260048036038101906101ed91906111fd565b6104ae565b6040516101ff9190611160565b60405180910390f35b6102106104f353565b005b61021a610506565b6040516102279190611237565b60405180910390f35b61023861052e565b604051610245919061102f565b60405180910390f35b610268600480360381019061026391906110e0565b6105be565b005b610284600480360381019061027f91906111fd565b61065b565b005b6102a0600480360381019061029b91906110e0565b6106a6565b6040516102ad9190611138565b60405180910390f35b6102d060048036038101906102cb9190611250565b6106c8565b6040516102dd9190611160565b60405180910390f35b6102ee61074a565b6040516102fb9190611237565b60405180910390f35b61031e600480360381019061031991906111fd565b61076f565b005b60606003805461032f906112bb565b80601f016020809104026020016040519081016040528092919081815260200182805461035b906112bb565b80156103a65780601f1061037d576101008083540402835291602001916103a6565b820191905f5260205f20905b81548152906001019060200180831161038957829003601f168201915b5050505050905090565b5f5f6103ba6107f3565b90506103c78185856107fa565b600191505092915050565b5f600254905090565b5f5f6103e56107f3565b90506103f285828561080c565b6103fd85858561089f565b60019150509392505050565b5f6012905090565b60065f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146104a0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161049790611335565b60405180910390fd5b6104aa828261098f565b5050565b5f5f5f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20549050919050565b6104fb610a0e565b6105045f610a95565b565b5f60055f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60606004805461053d906112bb565b80601f0160208091040260200160405190810160405280929190818152602001828054610569906112bb565b80156105b45780601f1061058b576101008083540402835291602001916105b4565b820191905f5260205f20905b81548152906001019060200180831161059757829003601f168201915b5050505050905090565b60065f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461064d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106449061139d565b60405180910390fd5b6106578282610b58565b5050565b610663610a0e565b8060065f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b5f5f6106b06107f3565b90506106bd81858561089f565b600191505092915050565b5f60015f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2054905092915050565b60065f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b610777610a0e565b5f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036107e7575f6040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081526004016107de9190611237565b60405180910390fd5b6107f081610a95565b50565b5f33905090565b6108078383836001610bd7565b505050565b5f61081784846106c8565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff811015610899578181101561088a578281836040517ffb8f41b2000000000000000000000000000000000000000000000000000000008152600401610881939291906113bb565b60405180910390fd5b61089884848484035f610bd7565b5b50505050565b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361090f575f6040517f96c6fd1e0000000000000000000000000000000000000000000000000000000081526004016109069190611237565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361097f575f6040517fec442f050000000000000000000000000000000000000000000000000000000081526004016109769190611237565b60405180910390fd5b61098a838383610da6565b505050565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036109ff575f6040517fec442f050000000000000000000000000000000000000000000000000000000081526004016109f69190611237565b60405180910390fd5b610a0a5f8383610da6565b5050565b610a166107f3565b73ffffffffffffffffffffffffffffffffffffffff16610a34610506565b73ffffffffffffffffffffffffffffffffffffffff1614610a9357610a576107f3565b6040517f118cdaa7000000000000000000000000000000000000000000000000000000008152600401610a8a9190611237565b60405180910390fd5b565b5f60055f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508160055f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610bc8575f6040517f96c6fd1e000000000000000000000000000000000000000000000000000000008152600401610bbf9190611237565b60405180910390fd5b610bd3825f83610da6565b5050565b5f73ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610c47575f6040517fe602df05000000000000000000000000000000000000000000000000000000008152600401610c3e9190611237565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610cb7575f6040517f94280d62000000000000000000000000000000000000000000000000000000008152600401610cae9190611237565b60405180910390fd5b8160015f8673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20819055508015610da0578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92584604051610d979190611160565b60405180910390fd5b50505050565b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610df6578060025f828254610dea919061141d565b92505081905550610ec4565b5f5f5f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2054905081811015610e7f578381836040517fe450d38c000000000000000000000000000000000000000000000000000000008152600401610e76939291906113bb565b60405180910390fd5b8181035f5f8673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2081905550505b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610f0b578060025f8282540392505081905550610f55565b805f5f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f82825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610fb29190611160565b60405180910390fd5b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f601f19601f8301169050919050565b5f61100182610fbf565b61100b8185610fc9565b935061101b818560208601610fd9565b61102481610fe7565b840191505092915050565b5f6020820190508181035f8301526110478184610ff7565b905092915050565b5f5ffd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f61107c82611053565b9050919050565b61108c81611072565b8114611096575f5ffd5b50565b5f813590506110a781611083565b92915050565b5f819050919050565b6110bf816110ad565b81146110c9575f5ffd5b50565b5f813590506110da816110b6565b92915050565b5f5f604083850312156110f6576110f561104f565b5b5f61110385828601611099565b9250506020611114858286016110cc565b9150509250929050565b5f8115159050919050565b6111328161111e565b82525050565b5f60208201905061114b5f830184611129565b92915050565b61115a816110ad565b82525050565b5f6020820190506111735f830184611151565b92915050565b5f5f5f606084860312156111905761118f61104f565b5b5f61119d86828701611099565b93505060206111ae86828701611099565b92505060406111bf868287016110cc565b9150509250925092565b5f60ff82169050919050565b6111de816111c9565b82525050565b5f6020820190506111f75f8301846111d5565b92915050565b5f602082840312156112125761121161104f565b5b5f61121f84828501611099565b91505092915050565b61123181611072565b82525050565b5f60208201905061124a5f830184611228565b92915050565b5f5f604083850312156112665761126561104f565b5b5f61127385828601611099565b925050602061128485828601611099565b9150509250929050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f60028204905060018216806112d257607f821691505b6020821081036112e5576112e461128e565b5b50919050565b7f4f6e6c79205374616b696e6720436f6e74726163742063616e206d696e7400005f82015250565b5f61131f601e83610fc9565b915061132a826112eb565b602082019050919050565b5f6020820190508181035f83015261134c81611313565b9050919050565b7f4f6e6c79205374616b696e6720436f6e74726163742063616e206275726e00005f82015250565b5f611387601e83610fc9565b915061139282611353565b602082019050919050565b5f6020820190508181035f8301526113b48161137b565b9050919050565b5f6060820190506113ce5f830186611228565b6113db6020830185611151565b6113e86040830184611151565b949350505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f611427826110ad565b9150611432836110ad565b925082820190508082111561144a576114496113f0565b5b9291505056fea2646970667358221220f59eef1b7f3f88b4131268f9401a80f3fd49dd481ad594f9695b350285544a1864736f6c634300081e0033";

// Staking vault compiled bytecode (use when deploying staking vault)
export const STAKING_VAULT_BYTECODE =
  "0x608060405234801561000f575f5ffd5b506040516111f43803806111f48339818101604052810190610031919061026f565b825f5f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508160015f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600290816100bf91906104eb565b505050506105ba565b5f604051905090565b5f5ffd5b5f5ffd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f610102826100d9565b9050919050565b610112816100f8565b811461011c575f5ffd5b50565b5f8151905061012d81610109565b92915050565b5f5ffd5b5f5ffd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6101818261013b565b810181811067ffffffffffffffff821117156101a05761019f61014b565b5b80604052505050565b5f6101b26100c8565b90506101be8282610178565b919050565b5f67ffffffffffffffff8211156101dd576101dc61014b565b5b6101e68261013b565b9050602081019050919050565b8281835e5f83830152505050565b5f61021361020e846101c3565b6101a9565b90508281526020810184848401111561022f5761022e610137565b5b61023a8482856101f3565b509392505050565b5f82601f83011261025657610255610133565b5b8151610266848260208601610201565b91505092915050565b5f5f5f60608486031215610286576102856100d1565b5b5f6102938682870161011f565b93505060206102a48682870161011f565b925050604084015167ffffffffffffffff8111156102c5576102c46100d5565b5b6102d186828701610242565b9150509250925092565b5f81519050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f600282049050600182168061032957607f821691505b60208210810361033c5761033b6102e5565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f6008830261039e7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82610363565b6103a88683610363565b95508019841693508086168417925050509392505050565b5f819050919050565b5f819050919050565b5f6103ec6103e76103e2846103c0565b6103c9565b6103c0565b9050919050565b5f819050919050565b610405836103d2565b610419610411826103f3565b84845461036f565b825550505050565b5f5f905090565b610430610421565b61043b8184846103fc565b505050565b5b8181101561045e576104535f82610428565b600181019050610441565b5050565b601f8211156104a35761047481610342565b61047d84610354565b8101602085101561048c578190505b6104a061049885610354565b830182610440565b50505b505050565b5f82821c905092915050565b5f6104c35f19846008026104a8565b1980831691505092915050565b5f6104db83836104b4565b9150826002028217905092915050565b6104f4826102db565b67ffffffffffffffff81111561050d5761050c61014b565b5b6105178254610312565b610522828285610462565b5f60209050601f831160018114610553575f8415610541578287015190505b61054b85826104d0565b8655506105b2565b601f19841661056186610342565b5f5b8281101561058857848901518255600182019150602085019450602081019050610563565b868310156105a557848901516105a1601f8916826104b4565b8355505b6001600288020188555050505b505050505050565b610c2d806105c75f395ff3fe608060405234801561000f575f5ffd5b50600436106100a7575f3560e01c80636c9fa59e1161006f5780636c9fa59e146101635780637f0e803014610181578063a8e62b97146101b1578063b6b55f25146101e1578063c5a1d7f0146101fd578063ef8b30f71461021b576100a7565b80630a28a477146100ab5780631083f761146100db578063224fe64d146100f95780632e1a7d4d146101295780635dcc939114610145575b5f5ffd5b6100c560048036038101906100c091906106f1565b61024b565b6040516100d2919061072b565b60405180910390f35b6100e3610254565b6040516100f091906107be565b60405180910390f35b610113600480360381019061010e91906107d7565b610278565b604051610120919061072b565b60405180910390f35b610143600480360381019061013e91906106f1565b61029d565b005b61014d610414565b60405161015a919061072b565b60405180910390f35b61016b61041c565b6040516101789190610847565b60405180910390f35b61019b600480360381019061019691906107d7565b610441565b6040516101a8919061072b565b60405180910390f35b6101cb60048036038101906101c691906107d7565b61046b565b6040516101d8919061072b565b60405180910390f35b6101fb60048036038101906101f691906106f1565b6104ac565b005b610205610625565b60405161021291906108d0565b60405180910390f35b610235600480360381019061023091906106f1565b6106b1565b604051610242919061072b565b60405180910390f35b5f819050919050565b5f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b5f5f61028585858561046b565b90508085610293919061091d565b9150509392505050565b5f81116102df576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102d69061099a565b60405180910390fd5b5f6102e98261024b565b905060015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16639dc29fac33846040518363ffffffff1660e01b81526004016103479291906109d8565b5f604051808303815f87803b15801561035e575f5ffd5b505af1158015610370573d5f5f3e3d5ffd5b505050505f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33836040518363ffffffff1660e01b81526004016103cf9291906109d8565b6020604051808303815f875af11580156103eb573d5f5f3e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061040f9190610a34565b505050565b6301e1338081565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b5f5f8490505f61045282868661046b565b90508082610460919061091d565b925050509392505050565b5f5f6301e13380606461047e9190610a5f565b83858761048b9190610a5f565b6104959190610a5f565b61049f9190610acd565b9050809150509392505050565b5f81116104ee576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104e590610b47565b60405180910390fd5b5f6104f8826106b1565b90505f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330856040518463ffffffff1660e01b815260040161055793929190610b65565b6020604051808303815f875af1158015610573573d5f5f3e3d5ffd5b505050506040513d601f19601f820116820180604052508101906105979190610a34565b5060015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166340c10f1933836040518363ffffffff1660e01b81526004016105f49291906109d8565b5f604051808303815f87803b15801561060b575f5ffd5b505af115801561061d573d5f5f3e3d5ffd5b505050505050565b6002805461063290610bc7565b80601f016020809104026020016040519081016040528092919081815260200182805461065e90610bc7565b80156106a95780601f10610680576101008083540402835291602001916106a9565b820191905f5260205f20905b81548152906001019060200180831161068c57829003601f168201915b505050505081565b5f819050919050565b5f5ffd5b5f819050919050565b6106d0816106be565b81146106da575f5ffd5b50565b5f813590506106eb816106c7565b92915050565b5f60208284031215610706576107056106ba565b5b5f610713848285016106dd565b91505092915050565b610725816106be565b82525050565b5f60208201905061073e5f83018461071c565b92915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f819050919050565b5f61078661078161077c84610744565b610763565b610744565b9050919050565b5f6107978261076c565b9050919050565b5f6107a88261078d565b9050919050565b6107b88161079e565b82525050565b5f6020820190506107d15f8301846107af565b92915050565b5f5f5f606084860312156107ee576107ed6106ba565b5b5f6107fb868287016106dd565b935050602061080c868287016106dd565b925050604061081d868287016106dd565b9150509250925092565b5f6108318261078d565b9050919050565b61084181610827565b82525050565b5f60208201905061085a5f830184610838565b92915050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f601f19601f8301169050919050565b5f6108a282610860565b6108ac818561086a565b93506108bc81856020860161087a565b6108c581610888565b840191505092915050565b5f6020820190508181035f8301526108e88184610898565b905092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f610927826106be565b9150610932836106be565b925082820190508082111561094a576109496108f0565b5b92915050565b7f43616e6e6f7420776974686472617720300000000000000000000000000000005f82015250565b5f61098460118361086a565b915061098f82610950565b602082019050919050565b5f6020820190508181035f8301526109b181610978565b9050919050565b5f6109c282610744565b9050919050565b6109d2816109b8565b82525050565b5f6040820190506109eb5f8301856109c9565b6109f8602083018461071c565b9392505050565b5f8115159050919050565b610a13816109ff565b8114610a1d575f5ffd5b50565b5f81519050610a2e81610a0a565b92915050565b5f60208284031215610a4957610a486106ba565b5b5f610a5684828501610a20565b91505092915050565b5f610a69826106be565b9150610a74836106be565b9250828202610a82816106be565b91508282048414831517610a9957610a986108f0565b5b5092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601260045260245ffd5b5f610ad7826106be565b9150610ae2836106be565b925082610af257610af1610aa0565b5b828204905092915050565b7f43616e6e6f74207374616b6520300000000000000000000000000000000000005f82015250565b5f610b31600e8361086a565b9150610b3c82610afd565b602082019050919050565b5f6020820190508181035f830152610b5e81610b25565b9050919050565b5f606082019050610b785f8301866109c9565b610b8560208301856109c9565b610b92604083018461071c565b949350505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f6002820490506001821680610bde57607f821691505b602082108103610bf157610bf0610b9a565b5b5091905056fea26469706673582212209ebf9903248c5af31bf1cb316b0ace83ec8cbdd11296028527b57a91c164497c64736f6c634300081e0033";

// Ethereum Hoodi Testnet chain config (Chain ID 560048)
// Multiple RPCs so MetaMask can use a working endpoint if one fails
export const HOODI_CHAIN = {
  chainId: "0x88bb0", // 560048
  chainName: "Ethereum Hoodi",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: [
    "https://rpc.hoodi.ethpandaops.io",
    "https://0xrpc.io/hoodi",
    "https://ethereum-hoodi.gateway.tatum.io"
  ],
  blockExplorerUrls: ["https://hoodi.etherscan.io"],
} as const;

export const HOODI_CHAIN_ID = 560048;
export const HOODI_EXPLORER = "https://hoodi.etherscan.io";
/** Primary RPC to show in error messages when user needs to add network manually */
export const HOODI_RPC_PRIMARY = HOODI_CHAIN.rpcUrls[0];
