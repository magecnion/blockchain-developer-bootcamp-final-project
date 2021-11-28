//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFog is ERC721URIStorage {
    using Counters for Counters.Counter;

    event NFogOpenned(uint indexed tokenId, address indexed owner);

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

    function mint(string memory tokenURI, string memory secret) public returns (uint256) {
        tokenCount.increment();

        uint256 newItemId = tokenCount.current();

        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _setOpeningInfo(newItemId, secret);

        return newItemId;
    }

    function isNFogOpen(uint256 _tokenId) public view returns (bool) {
        require(_exists(_tokenId) == true, "NFOG: isOpen query for nonexistent token");
        return _openingInfo[_tokenId].isOpen;
    }

    function _setOpeningInfo(uint256 _tokenId, string memory _secret) private {
        _openingInfo[_tokenId].secret = _secret;
        _openingInfo[_tokenId].isOpen = false;
    }

    function openNFog(uint256 _tokenId) onlyNFogOwner(_tokenId) public {
        require(_openingInfo[_tokenId].isOpen == false, "NFog is already openned");
        _openingInfo[_tokenId].isOpen = true;
        emit NFogOpenned(_tokenId, msg.sender);
    }

    function viewNFog(uint256 _tokenId) public view onlyNFogOwner(_tokenId) returns(string memory) {
        require(_openingInfo[_tokenId].isOpen == true, "NFog is not openned");
        return _openingInfo[_tokenId].secret;
    }
}
