import { Contract } from "@ethersproject/contracts";
import { AddressZero } from "@ethersproject/constants";

export function useContract(contractAddress, ABI, signerOrProvider) {
  if (contractAddress === AddressZero) {
    throw Error(`Invalid 'contractAddress' parameter '${contractAddress}'.`);
  }
  return new Contract(contractAddress, ABI, signerOrProvider);
}
