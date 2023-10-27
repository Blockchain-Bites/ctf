const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Hackeando", function () {
  async function deployFixture() {
    const [owner, attacker] = await ethers.getSigners();

    const TokenVulnerable = await ethers.getContractFactory(
      "TokenVulnerable",
      owner
    );
    const tokenVulnerable = await TokenVulnerable.deploy();

    return { tokenVulnerable, owner, attacker };
  }

  describe("TokenVulnerable Testing", function () {
    it("Hack the contract", async function () {
      ////////////////////////////////////////////////////////////
      ///////////////// No Modificar esta parte //////////////////
      const { tokenVulnerable, owner, attacker } = await loadFixture(
        deployFixture
      );
      var totalBalance = ethers.parseEther("100000000");
      var balOwner = await tokenVulnerable.balanceOf(owner.address);
      expect(balOwner).to.be.equal(
        totalBalance,
        "El balance del owner debe ser 100000000 al iniciar"
      );

      ////////////////////////////////////////////////////////////
      ///////////////// Aquí hackea el contrato //////////////////

      // hackea aquí

      ////////////////////////////////////////////////////////////
      ///////////////// No Modificar esta parte //////////////////
      balOwner = await tokenVulnerable.balanceOf(owner.address);
      expect(balOwner).to.be.equal(0, "El balance del owner debería ser cero");
      var balAttacker = await tokenVulnerable.balanceOf(attacker.address);
      expect(balAttacker).to.be.equal(
        totalBalance,
        "El balance del atacanta debe ser 100000000"
      );
    });
  });
});
