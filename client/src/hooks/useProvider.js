import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { AppContext } from "../App";
import { useContext } from "react";
export function useProvider(chainId) {
  const { dispatch } = useContext(AppContext);
  
  try {
    switch (chainId) {
      case 80001:
        return new ethers.providers.AlchemyProvider(
          80001,
          process.env.REACT_APP_MUMBAI_KEY
        );
      case 4:
        return new ethers.providers.AlchemyProvider(
          4,
          process.env.REACT_APP_RINKEBY_KEY
        );
      // case 1337:
      //   return new ethers.providers.JsonRpcProvider(
      //     process.env.REACT_APP_GANACHE_RPC
      //   );

      default:
        break;
    }
  } catch (error) {
    dispatch({
      type: "SET_ERROR", // TODO it doesnt work
      payload: error,
    });
  }
}
export function useWalletProvider() {
  const { library, account } = useWeb3React();

  return account ? library.getSigner(account).connectUnchecked() : library;
}
