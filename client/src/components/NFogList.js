import { Grid } from "@chakra-ui/react";
import { NFogCard } from "./NFogCard";
import { useContract } from "../hooks/useContract";
import { useEffect, useState, useContext } from "react";
import { useProvider } from "../hooks/useProvider";
import { retrieveFromIPFS } from "../utils/ipfs";
import { AppContext } from "../App";

const nfogJSON = require("../contracts/NFog.json");

export const NFogList = () => {
  const { state, dispatch } = useContext(AppContext);

  const local = useContract(
    process.env.REACT_APP_NFOG_CONTRACT_ADDRESS,
    nfogJSON.abi,
    useProvider(1337)
  );

  const providers = [{ provider: local, chainId: 1337 }];

  useEffect(() => {
    (async () => {
      for (const { provider, chainId } of providers) {
        let numberOfNfts = (await provider.tokenCount()).toNumber();
        for (let i = 1; i <= numberOfNfts; i++) {
          const tokenURI = await provider.tokenURI(i);
          dispatch({
            type: "ADD_NFOG",
            payload: { uri: tokenURI, id: i, chainId: chainId },
          });
        }
      }
    })();
    return dispatch({
      type: "CLEAN_NFOG_LIST",
    });
  }, []);

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
      {state.nfogList.map((token, i) => (
        <NFogCard token={token} key={i} />
      ))}
    </Grid>
  );
};
