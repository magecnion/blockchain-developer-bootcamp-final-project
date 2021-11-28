import {
  Button,
  Tag,
  TagLabel,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  TagRightIcon,
  Kbd,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { injected } from "../utils/connectors";
import { useWeb3React } from "@web3-react/core";
import { useContext } from "react";
import { AppContext } from "../App";

export const WalletConnect = () => {
  const { activate, active, account, chainId } = useWeb3React();
  const { dispatch } = useContext(AppContext);

  return active ? (
    <Popover width="12%">
      <PopoverTrigger>
        <Tag size="lg" colorScheme="blue" variant="outline" borderRadius="full">
          <TagLabel>Connected</TagLabel>
          <TagRightIcon as={InfoOutlineIcon} />
        </Tag>
      </PopoverTrigger>
      <PopoverContent bg="blue.100">
        <PopoverArrow bg="blue.100" />
        <PopoverCloseButton bg="blue.100" />
        <PopoverBody>
          <Kbd>Account</Kbd>
          <br />
          {account}
          <br />
          <Kbd>ChainId</Kbd>
          <br />
          {chainId}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  ) : (
    <Button
      colorScheme="blue"
      width="12%"
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
