// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

library LibNotInvited {
    struct StorageApp {
        address owner;
        mapping(address => bool) whitelist;
    }

    function getStorage()
        internal
        pure
        returns (StorageApp storage storageApp)
    {
        assembly {
            storageApp.slot := 7
        }
    }
}

contract NotInvited {
    struct Aplicant {
        uint256 timestamp;
        address aplicant;
        bytes32 message;
    }

    Aplicant aplicantOne;
    Aplicant aplicantTwo;
    Aplicant aplicantThree;

    modifier onlyOwner() {
        LibNotInvited.StorageApp storage s = LibNotInvited.getStorage();
        require(s.owner == msg.sender, "No eres el owner");
        _;
    }

    constructor(address _owner) {
        LibNotInvited.StorageApp storage s = LibNotInvited.getStorage();
        s.owner = _owner;
    }

    function applyToBeApplicant(uint256 _n) public {
        if (_n == 1) {
            aplicantOne = Aplicant(block.timestamp, msg.sender, bytes32(_n));
        } else if (_n == 2) {
            aplicantTwo = Aplicant(block.timestamp, msg.sender, bytes32(_n));
        } else if (_n == 3) {
            aplicantThree = Aplicant(block.timestamp, msg.sender, bytes32(_n));
        } else revert();
    }

    function chooseAplicant() public onlyOwner {
        uint256 ixWinner = (uint256(
            keccak256(abi.encode(block.timestamp, block.coinbase))
        ) % 3) + 1;

        if (ixWinner == 1) {
            addWhitelist(aplicantOne.aplicant);
        } else if (ixWinner == 2) {
            addWhitelist(aplicantTwo.aplicant);
        } else if (ixWinner == 3) {
            addWhitelist(aplicantThree.aplicant);
        }
    }

    function addWhitelist(address _account) public onlyOwner {
        LibNotInvited.StorageApp storage s = LibNotInvited.getStorage();
        s.whitelist[_account] = true;
    }

    function success() public view returns (bool) {
        LibNotInvited.StorageApp storage s = LibNotInvited.getStorage();
        return s.whitelist[msg.sender];
    }
}
