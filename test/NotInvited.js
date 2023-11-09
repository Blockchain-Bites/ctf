const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Hackeando NotInvited", function () {
  async function deployFixture() {
    const [owner, attacker] = await ethers.getSigners();

    var notInvitedC = await ethers.deployContract("NotInvited", [
      owner.address,
    ]);

    return { notInvitedC, owner, attacker };
  }

  describe("NotInvited Testing", function () {
    it("Hack the contract", async function () {
      ////////////////////////////////////////////////////////////
      ///////////////// No Modificar esta parte //////////////////
      const { notInvitedC, owner, attacker } = await loadFixture(deployFixture);
      await expect(
        notInvitedC.connect(attacker).addWhitelist(attacker.address)
      ).to.be.revertedWith("No eres el owner");
      var invited = await notInvitedC.connect(attacker).success();
      expect(invited).to.be.false;

      ////////////////////////////////////////////////////////////
      ///////////////// Aquí hackea el contrato //////////////////

      // hackea aquí

      ////////////////////////////////////////////////////////////
      ///////////////// No Modificar esta parte //////////////////
      var invited = await notInvitedC.connect(attacker).success();
      expect(invited).to.be.true;
    });
  });
});
