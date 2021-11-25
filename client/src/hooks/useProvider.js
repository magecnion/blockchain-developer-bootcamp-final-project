import { Contract } from "@ethersproject/contracts";
import { AddressZero } from "@ethersproject/constants";
import { useWeb3React } from "@web3-react/core";
import {ethers} from "ethers";

export function useProvider(chainId) {
  switch (chainId) {
    case 80001:
      return new ethers.providers.AlchemyProvider(
        80001,
        process.env.REACT_APP_MUMBAI_KEY
      );
    case 1337:
      return new ethers.providers.JsonRpcProvider(
        process.env.REACT_APP_GANACHE_RPC
      );
  
    default:
      break;
  }
}
export function useWalletProvider() {
  const { library, account } = useWeb3React();

  return account
    ? library.getSigner(account).connectUnchecked()
    : library;
}