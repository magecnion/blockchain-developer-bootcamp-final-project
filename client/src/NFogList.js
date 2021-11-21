
import {
  Grid,
} from "@chakra-ui/react";
import NFogCard from "./NFogCard";

const NFogList = () => (
  <Grid templateColumns="repeat(5, 1fr)" gap={6}>
    {[1].map((i) => (
      <NFogCard
        title={i}
        cid="QmWfadZdkJVks6djA9neRqbGo9Bdd8PHHDoZMXdqrHY1jP"
      />
    ))}
  </Grid>
);
export default NFogList;