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

const NFogCard = ({ title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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