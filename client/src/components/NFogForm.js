import {
  Input,
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
  Button,
} from "@chakra-ui/react";
import { encrypt, randomKey } from "../utils/encryption";
import {
  uploadTextToIPFS,
  uploadJSONToIPFS,
  uploadFileToIPFS,
} from "../utils/ipfs";

import { useState, useContext } from "react";
import { useContract } from "../hooks/useContract";
import { useWalletProvider } from "../hooks/useProvider";
import { AppContext } from "../App";
import { useWeb3React } from "@web3-react/core";

const initialState = {
  name: "",
  description: "",
  file: "",
};

export const NFogForm = ({ isOpen, onClose }) => {
  const { state, dispatch } = useContext(AppContext);
  const [nftMetadata, setNFTMetadata] = useState(initialState);
  const { chainId } = useWeb3React();

  const contract = useContract(
    chainId,
    useWalletProvider()
  );

  const submit = async () => {
    try {
      dispatch({ type: "SET_TX_STATUS", payload: "WAITING_WALLET" });
      const key = randomKey();
      const tokenCid = await uploadToIpfs(key);
      const tokenUri = "https://ipfs.io/ipfs/" + tokenCid;
      const receipt = await contract.mint(tokenUri, key);
      dispatch({ type: "SET_TX_STATUS", payload: "WAITING_BLOCKCHAIN" });
      await receipt.wait(1);
      const id = await contract.tokenCount();
      dispatch({ type: "SET_TX_STATUS", payload: "COMPLETED" });
      dispatch({
        type: "ADD_NFOG",
        payload: {
          uri: tokenUri,
          id: id,
          chainId: chainId,
          contract: contract,
        },
      });
      setNFTMetadata(initialState);
      onClose();
    } catch (error) {
      setNFTMetadata(initialState);
      onClose();
      dispatch({ type: "SET_TX_STATUS", payload: "" });
      dispatch({
        type: "SET_ERROR",
        payload: "Error submitting you request...\n" + error.message,
      });
    }
  };

  const uploadToIpfs = async (key) => {
    const contentEncCid = await uploadTextToIPFS(
      encrypt(nftMetadata.file, key)
    );
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 350;
    canvas.height = 350;
    ctx.fillStyle = stringToColour(nftMetadata.file);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const blob = await new Promise((resolve) => canvas.toBlob(resolve));
    const contentColorCid = await uploadFileToIPFS(blob);
    return uploadJSONToIPFS({
      name: nftMetadata.name,
      description: nftMetadata.description,
      content: contentEncCid,
      image: "https://ipfs.io/ipfs/" + contentColorCid,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Create a NFog</ModalHeader>
        <ModalCloseButton onClick={() => setNFTMetadata(initialState)} />
        <ModalBody>
          <Text mb="2px">Name</Text>
          <Input
            mb="8px"
            value={nftMetadata.name}
            onChange={(e) =>
              setNFTMetadata({ ...nftMetadata, name: e.target.value })
            }
            size="sm"
          />
          <Text mb="2px">Description</Text>
          <Input
            mb="8px"
            value={nftMetadata.description}
            onChange={(e) =>
              setNFTMetadata({ ...nftMetadata, description: e.target.value })
            }
            size="sm"
          />
          <Text mb="2px">Content</Text>
          <Input
            mb="8px"
            value={nftMetadata.file}
            onChange={(e) =>
              setNFTMetadata({ ...nftMetadata, file: e.target.value })
            }
            size="sm"
          />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={submit}
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
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const stringToColour = function (str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = "#";
  for (let i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
};
