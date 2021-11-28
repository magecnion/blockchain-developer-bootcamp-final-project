import { Grid, GridItem, Tag, Spinner } from "@chakra-ui/react";
import { NFogCard } from "./NFogCard";
import { useContract } from "../hooks/useContract";
import { useEffect, useContext } from "react";
import { useProvider } from "../hooks/useProvider";
import { AppContext } from "../App";
import { getNetworkName } from "../utils/blockchain";

export const NFogList = () => {
  const { state, dispatch } = useContext(AppContext);

  // const local = useContract(1337, useProvider(1337));
  const mumbai = useContract(80001, useProvider(80001));
  const ropsten = useContract(3, useProvider(3));

  const providers = [
    // { contract: local, chainId: 1337 },
    { contract: mumbai, chainId: 80001 },
    { contract: ropsten, chainId: 3 },
  ];

  useEffect(() => {
    (async () => {
      for (const { contract, chainId } of providers) {
        let numberOfNfts = (await contract.tokenCount()).toNumber();
        for (let i = 1; i <= numberOfNfts; i++) {
          const tokenURI = await contract.tokenURI(i);
          const response = await contract.isNFogOpen(i);
          dispatch({
            type: "ADD_NFOG",
            payload: {
              uri: tokenURI,
              id: i,
              chainId: chainId,
              contract: contract,
              isOpen: response,
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
      <GridItem colSpan={5} paddingTop="100px"  w="100%">
        Available networks
        {providers.map((provider) => (
          <Tag size="lg">{getNetworkName(provider.chainId)}</Tag>
        ))}
      </GridItem>
      {state.nfogList.length === 0 ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        state.nfogList.map((token, i) => <NFogCard token={token} key={i} />)
      )}
    </Grid>
  );
};
