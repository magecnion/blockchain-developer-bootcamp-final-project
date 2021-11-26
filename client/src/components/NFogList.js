import { Grid } from "@chakra-ui/react";
import { NFogCard } from "./NFogCard";
import { useContract } from "../hooks/useContract";
import { useEffect, useState } from "react";
import { useProvider } from "../hooks/useProvider";
import { retrieveFromIPFS } from "../utils/ipfs";
import { useWeb3React } from "@web3-react/core";

const nfogJSON = require("../contracts/NFog.json");

export const NFogList = () => {
  const [nfogList, setNfogList] = useState([]);

  const local = useContract(
    process.env.REACT_APP_NFOG_CONTRACT_ADDRESS,
    nfogJSON.abi,
    useProvider(1337)
  );

  const providers = [{ provider: local, chainId: 1337 }];

  useEffect(() => {
    (async () => {
      var list = new Array();
      for (const { provider, chainId } of providers) {
        let numberOfNfts = (await provider.tokenCount()).toNumber();
        for (let i = 1; i <= numberOfNfts; i++) {
          const tokenURI = await provider.tokenURI(i);
          list.push({ uri: tokenURI, id: i, chainId: chainId });
        }
      }
      setNfogList(list);
    })();
  }, []);

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
      {nfogList.map((token, i) => (
        <NFogCard token={token} key={i} />
      ))}
    </Grid>
  );
};
