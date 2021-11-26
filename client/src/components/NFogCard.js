import {
  Box,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Link,
  ModalFooter,
  Button,
  Image,
} from "@chakra-ui/react";
import { decrypt, encrypt } from "../utils/encryption";
import { retrieveFromIPFS } from "../utils/ipfs";
import { useEffect, useState, useContext } from "react";
import { useContract } from "../hooks/useContract";
import { useWalletProvider } from "../hooks/useProvider";
import { useWeb3React } from "@web3-react/core";
import { AppContext } from "../App";
const nfogJSON = require("../contracts/NFog.json");

export const NFogCard = ({ token }) => {
  const { state, dispatch } = useContext(AppContext);

  const [nftMetadata, setNFTMetadata] = useState({
    name: "",
    description: "",
    image: "",
    content: "",
    isOpen: false,
    encrypted: true,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const contract = useContract(
    process.env.REACT_APP_NFOG_CONTRACT_ADDRESS,
    nfogJSON.abi,
    useWalletProvider()
  );
  const { activate, active, account, deactivate, chainId, error } =
    useWeb3React();

  useEffect(() => {
    (async () => {
      try {
        const {
          name,
          description,
          content: contentCid,
          image: imageCid,
        } = await retrieveFromIPFS(token.uri);
        const contentEnc = await retrieveFromIPFS(contentCid);
        const image = "https://ipfs.io/ipfs/" + imageCid;
        setNFTMetadata({
          name,
          description,
          image: image,
          content: contentEnc,
          encrypted: true,
        });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: error.message,
        });
      }
    })();
  }, []);

  const desencrypt = async () => {
    try {
      dispatch({ type: "SET_TX_STATUS", payload: "LOADING" });
      const receipt = await contract.openNFog(token.id);
      dispatch({ type: "SET_TX_STATUS", payload: "COMPLETED" });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.message,
      });
    }
  };
  const viewCard = async () => {
    try {
      const response = await contract.isNFogOpen(token.id);
      setNFTMetadata({
        ...nftMetadata,
        isOpen: response,
      });
      onOpen();
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.message,
      });
    }
  };
  const view = async () => {
    try {
      dispatch({ type: "SET_TX_STATUS", payload: "LOADING" });
      const secret = await contract.viewNFog(token.id);

      setNFTMetadata({
        ...nftMetadata,
        content: decrypt(nftMetadata.content, secret),
        encrypted: false,
      });
      dispatch({ type: "SET_TX_STATUS", payload: "COMPLETED" });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.data.message,
      });
    }
  };
  const hide = async () => {
    dispatch({ type: "SET_TX_STATUS", payload: "LOADING" });
    const secret = await contract.viewNFog(token.id);
    setNFTMetadata({
      ...nftMetadata,
      content: encrypt(nftMetadata.content, secret),
      encrypted: true,
    });
    dispatch({ type: "SET_TX_STATUS", payload: "COMPLETED" });
  };

  return (
    <Box bg="tomato" height="80px" width="80px">
      {nftMetadata.name}
      <Button
        colorScheme="blue"
        mr={3}
        onClick={viewCard}
        disabled={!active || token.chainId !== chainId}
      >
        View
      </Button>
      <Image src={nftMetadata.image} alt="ipfs image" />
      {token.chainId}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>{nftMetadata.name}</ModalHeader>
          <ModalBody>{nftMetadata.description}</ModalBody>
          <ModalBody>{nftMetadata.content}</ModalBody>
          <ModalFooter>
            {nftMetadata.isOpen ? (
              nftMetadata.encrypted ? (
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={view}
                  disabled={!active}
                  isLoading={state.txStatus === "LOADING"}
                  loadingText="waiting for wallet"
                >
                  View content
                </Button>
              ) : (
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={hide}
                  disabled={!active}
                  isLoading={state.txStatus === "LOADING"}
                  loadingText="waiting for wallet"
                >
                  Encrypt content
                </Button>
              )
            ) : (
              <Button
                colorScheme="blue"
                mr={3}
                onClick={desencrypt}
                disabled={!active}
                isLoading={state.txStatus === "LOADING"}
                loadingText="waiting for wallet"
              >
                Desencrypt content
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
