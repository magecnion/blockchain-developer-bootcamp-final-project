import { Contract } from "@ethersproject/contracts";
import { AddressZero } from "@ethersproject/constants";
import { getNetworkName } from "../utils/blockchain";
const nfogDeployment = require("../contracts/NFog.json");

export function useContract(chainId, signerOrProvider) {
  const contractAddress =
    nfogDeployment[chainId][getNetworkName(chainId)].contracts.NFog.address;
  const ABI =
    nfogDeployment[chainId][getNetworkName(chainId)].contracts.NFog.abi;
  if (contractAddress === AddressZero) {
    throw Error(`Invalid 'contractAddress' parameter '${contractAddress}'.`);
  }
  return new Contract(contractAddress, ABI, signerOrProvider);
}
