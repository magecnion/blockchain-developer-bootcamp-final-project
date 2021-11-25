import {
  Button,
  Tag,
  Avatar,
  TagLabel,
  Popover,
  PopoverHeader,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { injected } from "../utils/connectors";
import { useWeb3React } from "@web3-react/core";
import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../App";

export const WalletConnect = () => {
  const { activate, active, account, deactivate, chainId, error } =
    useWeb3React();
  const { state, dispatch } = useContext(AppContext);

  return active ? (
    <Popover>
      <PopoverTrigger>
        <Tag size="lg" colorScheme="green" borderRadius="full">
          <InfoOutlineIcon color="green.500" />
          <TagLabel>Connected</TagLabel>
        </Tag>
      </PopoverTrigger>
      <PopoverContent bg="tomato" color="white">
        <PopoverArrow bg="pink.500" />
        <PopoverCloseButton bg="purple.500" />
        <PopoverBody>
          Account: {account}
          <br />
          ChainId: {chainId}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  ) : (
    <Button
      width="15%"
      onClick={() =>
        activate(injected, (error) =>
          dispatch({ type: "SET_ERROR", payload: error.toString() })
        )
      }
    >
      Connect
    </Button>
  );
};
