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
  Text,
  Code,
} from "@chakra-ui/react";
import { decrypt, encrypt } from "../utils/encryption";
import { retrieveFromIPFS } from "../utils/ipfs";
import { useEffect, useState, useContext } from "react";
import { useContract } from "../hooks/useContract";
import { useWalletProvider } from "../hooks/useProvider";
import { useWeb3React } from "@web3-react/core";
import { AppContext } from "../App";
import { getContractAddress } from "../utils/blockchain";
const nfogJSON = require("../contracts/NFog.json");

export const NFogCardModal = ({
  isOpen,
  onClose,
  nftMetadata,
  setNFTMetadata,
  tokenId,
}) => {
  const { state, dispatch } = useContext(AppContext);
  const { activate, active, account, deactivate, chainId, error } =
    useWeb3React();

  const contract = useContract(
    getContractAddress(chainId),
    nfogJSON.abi,
    useWalletProvider()
  );

  const desencrypt = async () => {
    try {
      dispatch({ type: "SET_TX_STATUS", payload: "WAITING_WALLET" });
      const receipt = await contract.openNFog(tokenId);
      dispatch({ type: "SET_TX_STATUS", payload: "WAITING_BLOCKCHAIN" });
      await receipt.wait(1);
      dispatch({ type: "SET_TX_STATUS", payload: "COMPLETED" });
      setNFTMetadata({
        ...nftMetadata,
        isOpen: true,
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.data ? error.data.message : error.message,
      });
    }
  };

  const view = async () => {
    try {
      dispatch({ type: "SET_TX_STATUS", payload: "WAITING_WALLET" });
      const secret = await contract.viewNFog(tokenId);
      const result = decrypt(nftMetadata.content, secret);
      if (result === "") {
        dispatch({
          type: "SET_ERROR",
          payload: "invalid key for desencryption",
        });
        return;
      }

      setNFTMetadata({
        ...nftMetadata,
        content: result,
        encrypted: false,
      });
      dispatch({ type: "SET_TX_STATUS", payload: "COMPLETED" });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.data ? error.data.message : error.message,
      });
    }
  };
  const hide = async () => {
    dispatch({ type: "SET_TX_STATUS", payload: "WAITING_WALLET" });
    const secret = await contract.viewNFog(tokenId);
    setNFTMetadata({
      ...nftMetadata,
      content: encrypt(nftMetadata.content, secret),
      encrypted: true,
    });
    dispatch({ type: "SET_TX_STATUS", payload: "COMPLETED" });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>{nftMetadata.name}</ModalHeader>
        <ModalBody>
          <Text as="cite">{nftMetadata.description}</Text>
        </ModalBody>
        <ModalBody>
          <Code style={{overflowWrap:"break-word", display:"block"}}>{nftMetadata.content}</Code>
        </ModalBody>

        <ModalFooter>
          {nftMetadata.isOpen ? (
            nftMetadata.encrypted ? (
              <Button
                colorScheme="blue"
                mr={3}
                onClick={view}
                disabled={
                  !active ||
                  state.txStatus === "WAITING_WALLET" ||
                  state.txStatus === "WAITING_BLOCKCHAIN"
                }
              >
                View content
              </Button>
            ) : (
              <Button
                colorScheme="blue"
                mr={3}
                onClick={hide}
                disabled={!active}
              >
                Hide content
              </Button>
            )
          ) : (
            <Button
              colorScheme="blue"
              mr={3}
              onClick={desencrypt}
              disabled={
                !active ||
                state.txStatus === "WAITING_WALLET" ||
                state.txStatus === "WAITING_BLOCKCHAIN"
              }
              isLoading={
                state.txStatus === "WAITING_WALLET" ||
                state.txStatus === "WAITING_BLOCKCHAIN"
              }
              loadingText={
                state.txStatus === "WAITING_WALLET"
                  ? "Waiting for wallet"
                  : "Waiting for blockchain"
              }
            >
              Desencrypt content
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
