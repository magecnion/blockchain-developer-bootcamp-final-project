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
  Spinner,
  GridItem,
} from "@chakra-ui/react";
import { decrypt, encrypt } from "../utils/encryption";
import { retrieveFromIPFS } from "../utils/ipfs";
import { useEffect, useState, useContext } from "react";
import { useContract } from "../hooks/useContract";
import { useWalletProvider } from "../hooks/useProvider";
import { useWeb3React } from "@web3-react/core";
import { AppContext } from "../App";
import { getContractAddress } from "../utils/blockchain";
import { NFogCardModal } from "./NFogCardModal";
import { getNetworkName } from "../utils/blockchain";
const nfogJSON = require("../contracts/NFog.json");

export const NFogCard = ({ token }) => {
  const { state, dispatch } = useContext(AppContext);

  const [nftMetadata, setNFTMetadata] = useState({
    name: "",
    description: "",
    image: "",
    content: "",
    isOpen: false,
    encrypted: true,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { activate, active, account, deactivate, chainId, error } =
    useWeb3React();

  useEffect(() => {
    (async () => {
      try {
        const {
          name,
          description,
          content: contentCid,
          image: imageCid,
        } = await retrieveFromIPFS(token.uri);
        const contentEnc = await retrieveFromIPFS("https://ipfs.io/ipfs/"+contentCid);
        const image = imageCid;
        setNFTMetadata({
          name,
          description,
          image: image,
          content: contentEnc,
          encrypted: true,
        });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: error.message,
        });
      }
    })();
  }, []);

  const viewCard = async () => {
    try {
      const response = await token.contract.isNFogOpen(token.id);
      setNFTMetadata({
        ...nftMetadata,
        isOpen: response,
      });
      onOpen();
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.data.message,
      });
    }
  };

  return (
    <GridItem colSpan={1} bg="tomato" height="80px" width="80px">
      {nftMetadata.name}
      <Button
        colorScheme="blue"
        mr={3}
        onClick={viewCard}
        disabled={!active || token.chainId !== chainId}
      >
        View
      </Button>
      <Image src={nftMetadata.image} alt="ipfs image" />
      {token.chainId}
      <Link
        isExternal={true}
        href={
          "https://testnets.opensea.io/assets/" +
          getNetworkName(token.chainId) +
          "/" +
          token.contract.address +
          "/" +
          token.id
        }
      >
        Trade with me
      </Link>
      {active && (
        <NFogCardModal
          isOpen={isOpen}
          onClose={onClose}
          nftMetadata={nftMetadata}
          setNFTMetadata={setNFTMetadata}
          tokenId={token.id}
        />
      )}
    </GridItem>
  );
};
