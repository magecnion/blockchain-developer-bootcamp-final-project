import { Button, Text, useDisclosure, Spacer, Flex } from "@chakra-ui/react";
import { NFogForm } from "./NFogForm";
import { WalletConnect } from "./WalletConnect";
import { useWeb3React } from "@web3-react/core";

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { activate, active, account, deactivate, chainId, error } =
    useWeb3React();
  return (
    <Flex width="100%" bg="red.100">
      <Text fontSize="2xl">NFog</Text>
      <Spacer />
      <NFogForm isOpen={isOpen} onClose={onClose}/>
      <Button width="15%" onClick={onOpen} disabled={!active}>
        Create my NFog
      </Button>
      <WalletConnect />
    </Flex>
  );
};
