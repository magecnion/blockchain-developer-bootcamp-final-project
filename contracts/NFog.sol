//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

/**
 * @title NFOG for creating foggy NFTs
 * @author magecnion
 */

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFog is ERC721URIStorage {
    using Counters for Counters.Counter;

    /**
     * @dev Emitted after NFog was open
     * @param tokenId of the NFog open
     */
    event NFogOpen(uint indexed tokenId, address indexed owner);

    /**
     * @dev Total count of NFog created
     */
    Counters.Counter public tokenCount;

    struct OpeningInfo {
        string secret;
        bool isOpen;
    }

    mapping(uint256 => OpeningInfo) private _openingInfo;

    modifier onlyNFogOwner(uint256 _tokenId) {
        require(msg.sender == ownerOf(_tokenId), "Only NFog owner is authorized");
        _;
    }

    constructor(string memory _name, string memory _symbol) 
    ERC721(_name, _symbol) {}

    /**
     * @dev Mint function which inherits from ERC721 OpenZeppelin contracts
     * @param _tokenURI uri where the NFT metadata is allocated
     * @param secret used for symetric encryption
     */
    function mint(string memory _tokenURI, string memory secret) public returns (uint256) {
        require(bytes(_tokenURI).length != 0, "Token URI cannot be empty");
        tokenCount.increment();

        uint256 newItemId = tokenCount.current();

        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        _setOpeningInfo(newItemId, secret);

        return newItemId;
    }

    /**
     * @dev This function ask if NFog was already open
     * @param _tokenId of NFog which I want to know if it is open
     */
    function isNFogOpen(uint256 _tokenId) public view returns (bool) {
        require(_exists(_tokenId) == true, "NFOG: isOpen query for nonexistent token");
        return _openingInfo[_tokenId].isOpen;
    }

    /**
     * @dev This function is called after mint
     *      it initializes the secret for desencryption and isOpen to false
     * @param _tokenId of NFog which I want to know if it is open
     * @param _secret for desencryption
     */
    function _setOpeningInfo(uint256 _tokenId, string memory _secret) private {
        _openingInfo[_tokenId].secret = _secret;
        _openingInfo[_tokenId].isOpen = false;
    }

    /**
     * @dev This function open the NFog, which means that set isOpen = true
     *      which allows to view the NFog
     * @param _tokenId of NFog which I want to open
     */
    function openNFog(uint256 _tokenId) onlyNFogOwner(_tokenId) public {
        require(isNFogOpen(_tokenId) == false, "NFog is already open");
        _openingInfo[_tokenId].isOpen = true;
        emit NFogOpen(_tokenId, msg.sender);
    }

    /**
     * @dev This function allows to view the NFog
     *      which means that returns secret string for desencryption
     * @param _tokenId of NFog which I want to open
     */
    function viewNFog(uint256 _tokenId) public view onlyNFogOwner(_tokenId) returns(string memory) {
        require(isNFogOpen(_tokenId) == true, "NFog is not open");
        return _openingInfo[_tokenId].secret;
    }
}
