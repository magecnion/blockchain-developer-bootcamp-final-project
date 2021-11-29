# Design pattern decisions

## 1. Inheritance and Interfaces

For managing Non-Fungible Tokens the decision made was to use OpenZeppelin ERC721 contracts which implement the (EIP-721 standard)[https://eips.ethereum.org/EIPS/eip-721]

NFog inherits from ERC721URIStorage which means includes all functionalty gave by OpenZeppelin contracts.

because of NFog inherits from OpenZeppelin and they also implement (EIP-165 standard)[https://eips.ethereum.org/EIPS/eip-165] we have we expose the information that we implement some interfaces needed for OpenSea for trading ours non-fungible tokens through **inter-contract execution**. Before we have to allow to OpenSea to trade for us so it becomes an operator. All of this is made in their website signing the transaction by us (web3 magic!).

## 2. Access Control Design Patterns

Using `onlyNFogOwner` modifier gives access control to the opening funcionality. The rest of the access is control through the inheritance.


