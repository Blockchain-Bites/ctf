// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

// ALERT
// No modificar este contrato Owner
contract Owner {
    address owner = msg.sender;
    modifier onlyOnwer() {
        require(msg.sender == owner, "No eres el owner");
        _;
    }
}

// ALERT
// No modificar este contrato TokenVulnerable
contract TokenVulnerable is Owner {
    mapping(address => uint256) public balances;

    constructor() {
        balances[msg.sender] = 100_000_000 * 1 ether;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public onlyOnwer {
        balances[from] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }

    function execute(address _sc, bytes calldata data) public {
        (bool success, ) = _sc.delegatecall(data);
        require(success);
    }
}
