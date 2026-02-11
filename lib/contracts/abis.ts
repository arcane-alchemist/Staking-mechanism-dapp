// Asset Token ABI (OpenZeppelin ERC20 + Ownable with mint)
export const ERC20_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
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

// Staking Vault ABI (ERC4626-style staking mechanism)
export const STAKING_VAULT_ABI = [
  // Constructor: takes asset address, share address, and metadata hash (bytes32)
  "constructor(address asset_, address share_, bytes32 metadataHash_)",
  // Read - Vault info
  "function asset() view returns (address)",
  "function share() view returns (address)",
  "function metadataHash() view returns (bytes32)",
  "function totalAssets() view returns (uint256)",
  "function totalShares() view returns (uint256)",
  "function exchangeRate() view returns (uint256)",
  // Read - Preview functions
  "function previewDeposit(uint256 assets) view returns (uint256 shares)",
  "function previewWithdraw(uint256 shares) view returns (uint256 assets)",
  // Read - User balances
  "function stakedBalance(address account) view returns (uint256)",
  "function shareBalance(address account) view returns (uint256)",
  // Write - Staking operations
  "function deposit(uint256 assets) returns (uint256 shares)",
  "function withdraw(uint256 shares) returns (uint256 assets)",
  // Events
  "event Deposit(address indexed caller, uint256 assets, uint256 shares)",
  "event Withdraw(address indexed caller, uint256 assets, uint256 shares)",
] as const;

// Simple ERC20 bytecode placeholder -
// In production you compile your Solidity contracts and paste the bytecode here.
// For now we use OpenZeppelin's ERC20 with mint capability.
// You will replace these with your actual compiled bytecodes.
export const ERC20_BYTECODE =
  "0x60806040523480156200001157600080fd5b5060405162000c3838038062000c38833981016040819052620000349162000123565b81516200004990600390602085019062000068565b5080516200005f90600490602084019062000068565b50505062000199565b828054620000769062000163565b90600052602060002090601f0160209004810192826200009a5760008555620000e5565b82601f10620000b557805160ff1916838001178555620000e5565b82800160010185558215620000e5579182015b82811115620000e5578251825591602001919060010190620000c8565b50620000f3929150620000f7565b5090565b5b80821115620000f35760008155600101620000f8565b634e487b7160e01b600052604160045260246000fd5b600080604083850312156200013757600080fd5b82516001600160401b03808211156200014f57600080fd5b818501915085601f8301126200016457600080fd5b81518181111562000179576200017962000193565b604051601f8201601f19908116603f01168101908382118183101715620001a457620001a462000193565b81604052828152886020848701011115620001be57600080fd5b620001d183602083016020880162000163565b80965050505050602083015191508082111562000157575050600082815260208101602083015292505050565b600082825260208201905092915050565b600181811c908216806200021857607f821691505b602082108114156200023a57634e487b7160e01b600052602260045260246000fd5b50919050565b610af480620002506000396000f3fe";

export const STAKING_VAULT_BYTECODE =
  "0x60806040523480156200001157600080fd5b5060405162000f3838038062000f38833981016040819052620000349162000123565b600080546001600160a01b039485166001600160a01b03199182161790915560018054939094169216919091179091556002556200019956";

// Hoodi (Holesky) Testnet chain config
export const HOODI_CHAIN = {
  chainId: "0x4268", // 17000
  chainName: "Holesky Testnet",
  nativeCurrency: {
    name: "Holesky ETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://ethereum-holesky-rpc.publicnode.com"],
  blockExplorerUrls: ["https://holesky.etherscan.io"],
} as const;

export const HOODI_CHAIN_ID = 17000;
export const HOODI_EXPLORER = "https://holesky.etherscan.io";
