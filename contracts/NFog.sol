//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFog is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct OpeningInfo {
        string secret;
        bool isOpen;
    }

    mapping(uint256 => string) private _openingInfo;

    constructor(string memory _name, string memory _symbol) 
    ERC721(_name, _symbol) {}

    function mint(string memory tokenURI, string memory secret) public returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _setOpeningInfo();

        return newItemId;
    }

    function isNFogOpen(uint256 _tokenId) public view returns (bool) {
        return _openingInfo[_tokenId].isOpen;
    }

    function _setOpeningInfo(uint256 _tokenId, string memory _secret) private {
        _openingInfo[_tokenId].secret = _secret;
        _openingInfo[_tokenId].isOpen = false;
    }

    function openNFog(uint256 _tokenId) onlyNFogOwner public returns(string) {
        _openingInfo[_tokenId].isOpen = true;
        return _openingInfo[_tokenId].secret;
    }

    function viewNFog(uint256 _tokenId) onlyNFogOwner public returns(string) {
        require(_openingInfo[_tokenId].isOpen = false, "NFog is not openned");
        return _openingInfo[_tokenId].secret;
    }

    // ERC165
}
