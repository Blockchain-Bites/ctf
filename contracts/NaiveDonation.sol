// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract NaiveDonation {
    address owner = msg.sender;

    constructor() payable {}

    modifier onlyOwnwer() {
        require(tx.origin == owner, "No es el owner");
        _;
    }

    function withdrawTokensTo(address payable to) public onlyOwnwer {
        uint256 _balance;
        uint256 _sizeCode;
        assembly {
            _balance := selfbalance()
            _sizeCode := extcodesize(caller())
        }
        require(_sizeCode == 0, "No llamadas desde SC");

        to.transfer(_balance);
    }

    function success() external view returns (bool) {
        return address(this).balance == 0;
    }

    receive() external payable {}
}
