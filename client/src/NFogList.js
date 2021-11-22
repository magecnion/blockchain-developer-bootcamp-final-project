import { Grid } from "@chakra-ui/react";
import { NFogCard } from "./NFogCard";

export const NFogList = () => (
  <Grid templateColumns="repeat(5, 1fr)" gap={6}>
    {[1].map((i) => (
      <NFogCard
        title={i}
        cid="Qmf4BLoUU9XiiqzpndJXFDd4x8tpgGYs16KftyR2Hmiew9"
      />
    ))}
  </Grid>
);
