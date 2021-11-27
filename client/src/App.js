import { Container, ChakraProvider, Divider } from "@chakra-ui/react";
import { NFogList } from "./components/NFogList";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Header } from "./components/Header";
import { createContext, useReducer } from "react";
import { ErrorModal } from "./components/ErrorModal";
import { useWeb3React } from "@web3-react/core";

function getLibrary(provider) {
  return new Web3Provider(provider);
}

const initialState = {
  error: "",
  nfogContract: null,
  txStatus: "",
  nfogList: [],
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_ERROR":
      return { ...state, error: payload };
    case "SET_NFOG_CONTRACT":
      return { ...state, nfogContract: payload };
    case "SET_TX_STATUS":
      return { ...state, txStatus: payload };
    case "ADD_NFOG":
      return { ...state, nfogList: [...state.nfogList, payload] };
    case "CLEAN_NFOG_LIST":
      return { ...state, nfogList: [] };
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
            <Container maxW="container.xl" centerContent width="100%">
              <Header />
              <hr
                style={{
                  color: "red",
                  backgroundColor: "red",
                  height: 5,
                }}
              />
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
