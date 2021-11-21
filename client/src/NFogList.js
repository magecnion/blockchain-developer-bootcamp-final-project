import { Grid } from "@chakra-ui/react";
import { NFogCard } from "./NFogCard";

export const NFogList = () => (
  <Grid templateColumns="repeat(5, 1fr)" gap={6}>
    {[1].map((i) => (
      <NFogCard
        title={i}
        cid="QmTj45nztyXYWffEkVj1WM375WCzg743q7j16jJCVFnRkV"
      />
    ))}
  </Grid>
);
