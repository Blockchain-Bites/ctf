// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {IERC721Receiver} from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract Whitelist {
    address private owner = msg.sender;
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    mapping(address => uint256) whitelist;

    modifier isInWhitelist() {
        require(whitelist[msg.sender] == 1, "No en whitelist");
        _;
    }

    function addWhitelist(address account) public onlyOwner {
        require(account.code.length == 0, "Agregando a un contrato");
        whitelist[account] = 1;
    }

    function transferWhitelist(address to) public isInWhitelist {
        require(to.code.length == 0, "Agregando a un contrato");
        whitelist[msg.sender] = 0;
        whitelist[to] = 1;
    }
}

contract Camouflage is ERC721, Whitelist {
    mapping(address => bool) claimed;

    constructor() ERC721("Camouflage", "CTKN") {}

    function mint(uint256 _id) public isInWhitelist {
        require(!claimed[msg.sender], "Ya ha reclamado");
        require(balanceOf(msg.sender) == 0, "No puedes tener mas de uno");

        _safeMint(msg.sender, _id);

        claimed[msg.sender] = true;
    }
}
