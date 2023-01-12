// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

error BasicNft__RoyalityFeesPercentageLimitExceed();
contract NFT is ERC721URIStorage {
    struct Owner {
    uint256 numOfBips;
    address ownerOfNft;
}
      mapping(uint256 => Owner) private first_owner;
    
    uint public tokenCount;
    constructor() ERC721("DApp NFT", "DAPP"){}
    function mint(string memory _tokenURI, uint256 _noOfBips) external returns(uint) {
        if(_noOfBips > 1000) {
            revert  BasicNft__RoyalityFeesPercentageLimitExceed();
            }
        tokenCount ++;
        _safeMint(msg.sender, tokenCount);
        _setTokenURI(tokenCount, _tokenURI);
        first_owner[tokenCount] = Owner(_noOfBips, msg.sender);
        return(tokenCount);
    }

    function getFirstOwner(uint256 tokenId) public view returns(address) {
        return first_owner[tokenId].ownerOfNft;
    }

     function getRoyalityFees(uint256 tokenId) public view returns(uint256) {
        return first_owner[tokenId].numOfBips;
    }
}