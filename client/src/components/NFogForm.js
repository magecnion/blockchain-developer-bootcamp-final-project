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

import { useState } from "react";

export const NFogForm = ({ isOpen, onClose }) => {
  const [nftMetadata, setNFTMetadata] = useState({
    name: "",
    description: "",
    file: "",
  });

  const handleUploadToIPFS = async () => {
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
    const nftUri = uploadJSONToIPFS({
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
        <ModalCloseButton />
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
          <Button colorScheme="blue" mr={3} onClick={handleUploadToIPFS}>
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
