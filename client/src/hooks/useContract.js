import { Contract } from "@ethersproject/contracts";
import { AddressZero } from "@ethersproject/constants";
import { useWeb3React } from "@web3-react/core";

export function useContract(contractAddress, ABI) {
  if (contractAddress === AddressZero) {
    throw Error(`Invalid 'contractAddress' parameter '${contractAddress}'.`);
  }
  const { library, account } = useWeb3React();

  const signerOrProvider = account
    ? library.getSigner(account).connectUnchecked()
    : library;
  return new Contract(contractAddress, ABI, signerOrProvider);
}