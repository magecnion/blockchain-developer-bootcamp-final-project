import {
  FormControl,
  Input,
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from "@chakra-ui/react";
import { encrypt } from "./utils";
import { uploadToIPFS } from "./ipfs";

import { useState } from "react";

export const NFogForm = ({ isOpen, onClose }) => {
  const [value, setValue] = useState("");
  const handleChange = (event) => setValue(event.target.value);

  const handleClick = () => {
    const json = { value: encrypt(value) };
    uploadToIPFS(json);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Create a NFog</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input value={value} onChange={handleChange} size="sm" />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleClick}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
