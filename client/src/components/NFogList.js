import { Grid, GridItem, Tag } from "@chakra-ui/react";
import { NFogCard } from "./NFogCard";
import { useContract } from "../hooks/useContract";
import { useEffect, useState, useContext } from "react";
import { useProvider } from "../hooks/useProvider";
import { retrieveFromIPFS } from "../utils/ipfs";
import { AppContext } from "../App";
import { getNetworkName } from "../utils/blockchain";

const nfogJSON = require("../contracts/NFog.json");

export const NFogList = () => {
  const { state, dispatch } = useContext(AppContext);

  const local = useContract(
    process.env.REACT_APP_NFOG_CONTRACT_ADDRESS_LOCAL,
    nfogJSON.abi,
    useProvider(1337)
  );
  const mumbai = useContract(
    process.env.REACT_APP_NFOG_CONTRACT_ADDRESS_MUMBAI,
    nfogJSON.abi,
    useProvider(80001)
  );

  const providers = [
    { contract: local, chainId: 1337 },
    { contract: mumbai, chainId: 80001 },
  ];

  useEffect(() => {
    (async () => {
      for (const { contract, chainId } of providers) {
        let numberOfNfts = (await contract.tokenCount()).toNumber();
        for (let i = 1; i <= numberOfNfts; i++) {
          const tokenURI = await contract.tokenURI(i);
          dispatch({
            type: "ADD_NFOG",
            payload: {
              uri: tokenURI,
              id: i,
              chainId: chainId,
              contract: contract,
            },
          });
        }
      }
    })();
    return dispatch({
      type: "CLEAN_NFOG_LIST",
    });
  }, []);

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={6} w="90%">
      <GridItem colSpan={5} height="50px" w="100%">
        Available networks:
        {providers.map((provider) => (
          <Tag size="lg">{getNetworkName(provider.chainId)}</Tag>
        ))}
      </GridItem>
      {state.nfogList.map((token, i) => (
        <NFogCard token={token} key={i} />
      ))}
    </Grid>
  );
};
