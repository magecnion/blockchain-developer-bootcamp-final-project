import {
  Container,
  Button,
  Text,
  useDisclosure,
  ChakraProvider,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import NFogForm from "./NFogForm";
import NFogList from "./NFogList";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <ChakraProvider>
      <div className="App">
        <Container
          maxW="container.xl"
          centerContent
          bg="green.100"
          width="100%"
        >
          <Flex width="100%" bg="red.100">
            <Text fontSize="2xl">NFog</Text>
            <Spacer />
            <Button width="15%" onClick={onOpen}>
              Create my NFog
            </Button>
          </Flex>
          <NFogList/>
          <NFogForm isOpen={isOpen} onClose={onClose}/>
        </Container>
      </div>
    </ChakraProvider>
  );
}

export default App;
