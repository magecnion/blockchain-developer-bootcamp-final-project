import { Button, Text, useDisclosure, Spacer, Flex } from "@chakra-ui/react";
import { injected } from "../utils/connectors";
import { useWeb3React } from "@web3-react/core";
import { NFogForm } from "./NFogForm";

export const Header = () => {
  const { activate, active, account, deactivate, chainId, error } =
    useWeb3React();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex width="100%" bg="red.100">
      <Text fontSize="2xl">NFog</Text>
      <Spacer />
      <NFogForm isOpen={isOpen} onClose={onClose} />
      <Button width="15%" onClick={onOpen}>
        Create my NFog
      </Button>
      {active ? (
        account
      ) : (
        <Button width="15%" onClick={() => activate(injected)}>
          Connect
        </Button>
      )}
      <Text fontSize="1s">{error ? error.toString() : ""}</Text>
    </Flex>
  );
};
