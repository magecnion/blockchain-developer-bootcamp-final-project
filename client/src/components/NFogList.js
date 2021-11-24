import { Grid } from "@chakra-ui/react";
import { NFogCard } from "./NFogCard";
import { useContract } from "../hooks/useContract";
import { useEffect } from "react";
const nfogJSON = require("../contracts/NFog.json");

export const NFogList = () => {
  const nfogContract = useContract(
    process.env.REACT_APP_NFOG_CONTRACT_ADDRESS,
    nfogJSON.abi
  );

  useEffect(() => {
    (async () => {
      console.log("TODO get nfog list");
    })();
  }, []);

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
      {[1].map((i) => (
        <NFogCard
          title={i}
          cid="Qmf4BLoUU9XiiqzpndJXFDd4x8tpgGYs16KftyR2Hmiew9"
        />
      ))}
    </Grid>
  );
};
