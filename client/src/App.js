import {
  Container,
  Button,
  Text,
  useDisclosure,
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ChakraProvider,
  Spacer,
  Flex,
} from "@chakra-ui/react";
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
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
              <ModalHeader>Create a NFog</ModalHeader>
              <ModalCloseButton />
              <ModalBody>{"TODO form..."}</ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3}>
                  Create
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Container>
      </div>
    </ChakraProvider>
  );
}

export default App;
