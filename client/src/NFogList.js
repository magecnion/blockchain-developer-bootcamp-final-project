
import {
  Grid,
} from "@chakra-ui/react";
import NFogCard from "./NFogCard";

const NFogList = () => (
    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
      {[1,2,3,4,5,6].map(i => <NFogCard title={i} />)}
    </Grid>
);
export default NFogList;