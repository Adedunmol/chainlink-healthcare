// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";


contract Achievements is ERC1155, Ownable, Pausable, ERC1155Supply {

    string public baseTokenUri;
    
    constructor(string memory _uri) payable ERC1155(_uri) {
        baseTokenUri = _uri;
    }

    function setURI(string memory newuri) public onlyOwner {
        baseTokenUri = newuri;
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        require(account != address(0), "Can't mint to zero address");
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        require(to != address(0), "Can't mint to zero address");
        require(ids.length == amounts.length, "Lengths do not match");
        _mintBatch(to, ids, amounts, data);
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        whenNotPaused
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function uri(uint256 _tokenId) override public view returns (string memory) {
        return string(
            abi.encodePacked(
                baseTokenUri,
                Strings.toString(_tokenId),
                ".json"
            )
        );
    }

    function getSupplyCount(uint256 tokenId) public view returns (uint256) {
        return totalSupply(tokenId);
    }
}