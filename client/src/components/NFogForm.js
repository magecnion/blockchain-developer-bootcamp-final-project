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
import { encrypt } from "../utils/encryption";
import {
  uploadTextToIPFS,
  uploadJSONToIPFS,
  uploadFileToIPFS,
} from "../utils/ipfs";

import { useState, useContext } from "react";
import { useContract } from "../hooks/useContract";
import { useWalletProvider } from "../hooks/useProvider";
import { AppContext } from "../App";

const nfogJSON = require("../contracts/NFog.json");

const initialState = {
  name: "",
  description: "",
  file: "",
};

export const NFogForm = ({ isOpen, onClose }) => {
  const { state, dispatch } = useContext(AppContext);
  const [nftMetadata, setNFTMetadata] = useState(initialState);

  const contract = useContract(
    process.env.REACT_APP_NFOG_CONTRACT_ADDRESS,
    nfogJSON.abi,
    useWalletProvider()
  );

  const submit = async () => {
    try {
      dispatch({ type: "SET_TX_STATUS", payload: "LOADING" });
      const tokenUri = await uploadToIpfs();
      const receipt = await contract.mint(tokenUri, "key");
      dispatch({ type: "SET_TX_STATUS", payload: "COMPLETED" });
      setNFTMetadata(initialState);
    } catch (error) {
      setNFTMetadata(initialState);
      onClose()
      dispatch({ type: "SET_TX_STATUS", payload: "" });
      dispatch({
        type: "SET_ERROR",
        payload: "Error submitting you request...\n" + error.message,
      });
    }
  };

  const uploadToIpfs = async () => {
    const contentEncCid = await uploadTextToIPFS(
      encrypt(nftMetadata.file, "key")
    );
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 300;
    canvas.height = 300;
    ctx.fillStyle = stringToColour(nftMetadata.file);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const blob = await new Promise((resolve) => canvas.toBlob(resolve));
    const contentColorCid = await uploadFileToIPFS(blob);
    return uploadJSONToIPFS({
      name: nftMetadata.name,
      description: nftMetadata.description,
      content: contentEncCid,
      image: contentColorCid,
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
            isLoading={state.txStatus === "LOADING"}
            loadingText="waiting for wallet"
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
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
};
