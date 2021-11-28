import {
  Button,
  Text,
  useDisclosure,
  Spacer,
  Flex,
  
} from "@chakra-ui/react";
import { NFogForm } from "./NFogForm";
import { WalletConnect } from "./WalletConnect";
import { useWeb3React } from "@web3-react/core";

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { active } =
    useWeb3React();
  return (
    <Flex width="100%" align="center" padding="10px">
      <Text as="kbd" fontSize="5xl">
        NFog
      </Text>
      <Text as="kbd" fontSize="1xl" paddingLeft="30px">
        Non Fungible
      </Text>
      <Text as="kbd" fontSize="1xl">
        <Text as="u" fontSize="1xl" paddingLeft="7px">
          Foggy
        </Text>
      </Text>
      <Text as="kbd" fontSize="1xl" padding="5px">
        Token
      </Text>

      <Spacer />
      {active && <NFogForm isOpen={isOpen} onClose={onClose} />}
      <Button
        colorScheme="blue"
        mr="4"
        width="12%"
        onClick={onOpen}
        disabled={!active}
      >
        Create my NFog
      </Button>
      <WalletConnect />
    </Flex>
  );
};
