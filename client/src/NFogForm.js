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
import axios from "axios";

import { useState } from "react"

const NFogForm = ({isOpen, onClose}) => {
    
 const [value, setValue] = useState("");
 const handleChange = (event) => setValue(event.target.value);

    const uploadToIPFS = () => {
        const json = {value: value}
        pinJSONToIPFS(
          json
        );
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
          <Button colorScheme="blue" mr={3} onClick={uploadToIPFS}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NFogForm;


const pinJSONToIPFS = (JSONBody) => {
  return axios
    .post(process.env.REACT_APP_PINATA_PINNING_URL, JSONBody, {
      headers: {
        pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
        pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_API_KEY,
      },
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};