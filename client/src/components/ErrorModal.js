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
import { useWeb3React } from "@web3-react/core";

export const ErrorModal = () => {
  const { state, dispatch } = useContext(AppContext);
  const { deactivate } =
    useWeb3React();
  return (
    <Modal
      isOpen={state.error !== ""}
      onClose={() => {
        dispatch({ type: "SET_ERROR", payload: "" });
        dispatch({ type: "SET_TX_STATUS", payload: "" });
        if (state.error.includes("UnsupportedChainIdError"))
          return deactivate();
      }}
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
