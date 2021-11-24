import { Container, ChakraProvider } from "@chakra-ui/react";
import { NFogList } from "./components/NFogList";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Header } from "./components/Header";
import { createContext, useReducer } from "react";
import { ErrorModal } from "./components/ErrorModal";

function getLibrary(provider) {
  return new Web3Provider(provider);
}

const initialState = {
  error: "",
  nfogContract: null,
};

const reducer = (state, { type, payload }) => {
  console.log(payload)
  console.log(type)
  switch (type) {
    case "SET_ERROR":
      return { ...state, error: payload };
    case "SET_NFOG_CONTRACT":
      return { ...state, nfogContract: payload };
    default:
      return state;
  }
};

export const AppContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
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
              <ErrorModal />
            </Container>
          </div>
        </ChakraProvider>
      </Web3ReactProvider>
    </AppContext.Provider>
  );
}

export default App;
