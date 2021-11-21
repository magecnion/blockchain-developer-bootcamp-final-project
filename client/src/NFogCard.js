import {
  Box,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import axios from "axios";

const NFogCard = ({ title, cid }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // TODO useEffect
  getJSONFromIPFS(cid);

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
}


export default NFogCard;

const getJSONFromIPFS = (cid) => {
  return axios
    .get(process.env.REACT_APP_IFPS_GATEWAY + cid)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};