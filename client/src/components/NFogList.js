import { Grid } from "@chakra-ui/react";
import { NFogCard } from "./NFogCard";
import { useContract } from "../hooks/useContract";
import { useEffect, useState } from "react";
import { useProvider } from "../hooks/useProvider";
import { retrieveFromIPFS } from "../utils/ipfs";
const nfogJSON = require("../contracts/NFog.json");

export const NFogList = () => {
  const [nfogList, setNfogList] = useState([]);

  const local = useContract(
    process.env.REACT_APP_NFOG_CONTRACT_ADDRESS,
    nfogJSON.abi,
    useProvider(1337)
  );

  const providers = [local];

  useEffect(() => {
    (async () => {
      var list = new Array();
      for (const p of providers) {
        let numberOfNfts = (await p.tokenCount()).toNumber();
        for (let i = 1; i <= numberOfNfts; i++) {
          const tokenURI = await p.tokenURI(i);
          list.push({ uri: tokenURI, id: i });
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
