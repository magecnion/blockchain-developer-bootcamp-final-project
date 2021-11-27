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
  Center,
  Stack,
  Text,
  Heading,
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
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { UnlockIcon, LockIcon } from "@chakra-ui/icons";


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
    <GridItem colSpan={1} height="100%" w="100%">
      {active && (
        <NFogCardModal
          isOpen={isOpen}
          onClose={onClose}
          nftMetadata={nftMetadata}
          setNFTMetadata={setNFTMetadata}
          tokenId={token.id}
        />
      )}
      <Center py={12}>
        <Box
          role={"group"}
          p={6}
          maxW={"230px"}
          w={"full"}
          bg={"white"}
          boxShadow={"2xl"}
          rounded={"lg"}
          pos={"relative"}
          zIndex={1}
        >
          <Box
            rounded={"lg"}
            mt={-12}
            pos={"relative"}
            height={"150px"}
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 5,
              left: 0,
              backgroundImage: `url(${nftMetadata.image})`,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
            <Image
              rounded={"lg"}
              height={150}
              width={200}
              objectFit={"cover"}
              src={nftMetadata.image}
              fallback={() => InfoOutlineIcon}
            />
          </Box>
          <Box>{token.isOpen ? <UnlockIcon /> : <LockIcon />}</Box>
          <Stack pt={10} align={"center"}>
            <Text
              color={"gray.500"}
              fontSize={"sm"}
              textTransform={"uppercase"}
            >
              {getNetworkName(token.chainId)}
            </Text>
            <Heading
              height="50px"
              fontSize={"xl"}
              fontFamily={"body"}
              fontWeight={500}
            >
              {nftMetadata.name}
            </Heading>

            <Stack direction={"row"} align={"center"}>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={viewCard}
                disabled={!active || token.chainId !== chainId}
              >
                Open
              </Button>
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
                Trade{<ExternalLinkIcon />}
              </Link>
            </Stack>
          </Stack>
        </Box>
      </Center>
    </GridItem>
  );
};
