// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTCollection is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    
    uint256 public constant MAX_SUPPLY = 1000;
    uint256 public constant MINT_PRICE = 0.01 ether;
    
    string private _baseTokenURI;

    event NFTMinted(address indexed to, uint256 indexed tokenId, string tokenURI);

    constructor(address initialOwner, string memory baseURI)
        ERC721("NFT Bazaar Collection", "NBAZ")
        Ownable(initialOwner)
    {
        _baseTokenURI = baseURI;
    }

    function mint(string calldata tokenURI) external payable {
        require(_nextTokenId < MAX_SUPPLY, "Max supply reached");
        require(msg.value >= MINT_PRICE, "Insufficient ETH for mint");

        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);

        emit NFTMinted(msg.sender, tokenId, tokenURI);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        _requireOwned(tokenId);
        return super.tokenURI(tokenId);
    }

    function setBaseURI(string calldata baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function totalSupply() external view returns (uint256) {
        return _nextTokenId;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}