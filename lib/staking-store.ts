// This file is deprecated - all Web3 logic is now in /lib/contracts/web3.ts
// Keeping for backward compatibility, but the real integration uses ethers.js
// with the Ethereum Hoodi testnet.

export {
  type DeployedContracts as ContractAddresses,
  type SavedContractData,
  loadContractData as loadState,
  saveContractData as saveState,
  clearContractData,
} from "./contracts/web3";
