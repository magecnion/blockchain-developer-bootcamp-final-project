import {
  Button,
  Divider,Text,
  useDisclosure,
  Spacer,
  Flex,
  Center,
  
} from "@chakra-ui/react";
import { NFogForm } from "./NFogForm";
import { WalletConnect } from "./WalletConnect";
import { useWeb3React } from "@web3-react/core";

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { activate, active, account, deactivate, chainId, error } =
    useWeb3React();
  return (
    <Flex width="100%" align="center" padding="10px">
      <Text fontSize="5xl">NFog</Text>
      <Text fontSize="1xl" padding="5px">
        Non Fungible Foggy Token
      </Text>

      <Spacer />
      {active && <NFogForm isOpen={isOpen} onClose={onClose} />}
      <Button colorScheme="blue" mr="4" width="12%" onClick={onOpen} disabled={!active}>
        Create my NFog
      </Button>
      <WalletConnect />
    </Flex>
  );
};
