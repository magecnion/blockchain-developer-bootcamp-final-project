import {
  Box,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import { decrypt } from "./utils";
import { retrieveFromIPFS } from "./ipfs";
import { useEffect } from "react";

export const NFogCard = ({ title, cid }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    (async () => {
      const content = await retrieveFromIPFS(cid);
      console.log(decrypt(content, "key"));
    })();
  }, [onOpen]);

  return (
    <Box bg="tomato" height="80px" width="80px">
      {title}

      <Link color="teal.500" href="#" onClick={onOpen}>
        View
      </Link>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>NFog: {title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>info...</ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
