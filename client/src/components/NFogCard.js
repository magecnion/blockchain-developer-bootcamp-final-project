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
import { decrypt } from "../utils/encryption";
import { retrieveFromIPFS } from "../utils/ipfs";
import { useEffect, useState } from "react";
import { useContract } from "../hooks/useContract";
import { useWalletProvider } from "../hooks/useProvider";
import { useWeb3React } from "@web3-react/core";
const nfogJSON = require("../contracts/NFog.json");

export const NFogCard = ({ token }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const contract = useContract(
    process.env.REACT_APP_NFOG_CONTRACT_ADDRESS,
    nfogJSON.abi,
    useWalletProvider()
  );
  const [nftMetadata, setNFTMetadata] = useState({
    name: "",
    description: "",
    image: "",
    content: "",
  });
  const { activate, active, account, deactivate, chainId, error } =
    useWeb3React();

  useEffect(() => {
    (async () => {
      const {
        name,
        description,
        content: contentCid,
        image: imageCid,
      } = await retrieveFromIPFS(token.uri);
      const contentEnc = await retrieveFromIPFS(contentCid);
      const image = "https://ipfs.io/ipfs/" + imageCid;
      setNFTMetadata({
        name,
        description,
        image: image, // TODO
        content: contentEnc,
      });
    })();
  }, []);

  const open = async () => {
    const receipt = await contract.openNFog(token.id);
    console.log(receipt);
    const secret = await contract.viewNFog(token.id);

    setNFTMetadata({
      ...nftMetadata,
      content: decrypt(nftMetadata.content, secret),
    });
  };

  return (
    <Box bg="tomato" height="80px" width="80px">
      {nftMetadata.name}

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
            <Button colorScheme="blue" mr={3} onClick={open} disabled={!active}>
              Open
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
