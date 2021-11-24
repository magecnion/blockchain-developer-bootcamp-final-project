import { Container, ChakraProvider } from "@chakra-ui/react";
import { NFogList } from "./components/NFogList";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Header } from "./components/Header";

function getLibrary(provider) {
  return new Web3Provider(provider);
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ChakraProvider>
        <div className="App">
          <Container
            maxW="container.xl"
            centerContent
            bg="green.100"
            width="100%"
          >
            <Header />
            <NFogList />
          </Container>
        </div>
      </ChakraProvider>
    </Web3ReactProvider>
  );
}

export default App;
