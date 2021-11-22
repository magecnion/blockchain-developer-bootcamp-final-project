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
import { decrypt } from "./utils";
import { retrieveFromIPFS } from "./ipfs";
import { useEffect, useState } from "react";

export const NFogCard = ({ title, cid }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nftMetadata, setNFTMetadata] = useState({
    name: "",
    description: "",
    image: "",
    content: "",
  });

  useEffect(() => {
    (async () => {
      const {
        name,
        description,
        content: contentCid,
        image: imageCid,
      } = await retrieveFromIPFS(cid);
      const contentEnc = await retrieveFromIPFS(contentCid);
      const image = await retrieveFromIPFS(imageCid);
      setNFTMetadata({
        name,
        description,
        image: "todo",
        content: contentEnc,
      });
    })();
  }, []);

  return (
    <Box bg="tomato" height="80px" width="80px">
      {title}

      <Link color="teal.500" href="#" onClick={onOpen}>
        View
      </Link>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>{nftMetadata.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{nftMetadata.description}</ModalBody>
          <Image src={nftMetadata.image} alt="ipfs image" />
          <ModalBody>{nftMetadata.content}</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() =>
                setNFTMetadata({
                  ...nftMetadata,
                  content: decrypt(nftMetadata.content, "key"),
                })
              }
            >
              View
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
