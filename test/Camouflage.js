const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Hackeando Camouflage", function () {
  async function deployFixture() {
    const [owner, attacker] = await ethers.getSigners();

    const Camouflage = await ethers.getContractFactory("Camouflage", owner);
    const camouflage = await Camouflage.deploy();

    return { camouflage, owner, attacker };
  }

  describe("Camouflage Testing", function () {
    it("Hack the contract", async function () {
      ////////////////////////////////////////////////////////////
      ///////////////// No Modificar esta parte //////////////////
      const { camouflage, owner, attacker } = await loadFixture(deployFixture);
      await camouflage.addWhitelist(attacker.address);

      ////////////////////////////////////////////////////////////
      ///////////////// Aquí hackea el contrato //////////////////

      // hackea aquí

      ////////////////////////////////////////////////////////////
      ///////////////// No Modificar esta parte //////////////////
      var balanceAttacker = await camouflage.balanceOf(attacker.address);
      expect(balanceAttacker).to.be.greaterThan(10n);
    });
  });
});
