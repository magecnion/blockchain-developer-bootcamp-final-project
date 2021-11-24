//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFog is ERC721URIStorage {
    using Counters for Counters.Counter;

    event NFogOpenned(uint indexed tokenId, address indexed owner);

    Counters.Counter private _tokenIds;

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
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _setOpeningInfo(newItemId, secret);

        return newItemId;
    }

    function isNFogOpen(uint256 _tokenId) public view returns (bool) {
        return _openingInfo[_tokenId].isOpen;
    }

    function _setOpeningInfo(uint256 _tokenId, string memory _secret) private {
        _openingInfo[_tokenId].secret = _secret;
        _openingInfo[_tokenId].isOpen = false;
    }

    function openNFog(uint256 _tokenId) onlyNFogOwner(_tokenId) public returns(string memory) {
        _openingInfo[_tokenId].isOpen = true;
        return _openingInfo[_tokenId].secret;
    }

    function viewNFog(uint256 _tokenId) onlyNFogOwner(_tokenId) public returns(string memory) {
        require(_openingInfo[_tokenId].isOpen = false, "NFog is not openned");
        emit NFogOpenned(_tokenId, msg.sender);
        return _openingInfo[_tokenId].secret;
    }

    // ERC165
}
