import {
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AppContext } from "../App";

export const ErrorModal = () => {
  const { state, dispatch } = useContext(AppContext);
  return (
    <Modal
      isOpen={state.error !== ""}
      onClose={() => dispatch({ type: "SET_ERROR", payload: "" })}
    >
      <ModalContent>
        <ModalHeader>Error</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="2px">{state.error}</Text>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
