const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Hackeando NaiveDonation", function () {
  async function deployFixture() {
    const [owner, attacker] = await ethers.getSigners();

    const naiveDonation = await ethers.deployContract("NaiveDonation", {
      value: BigInt(3e18),
    });

    return { naiveDonation, owner, attacker };
  }

  describe("NaiveDonation Testing", function () {
    it("Hack the contract", async function () {
      ////////////////////////////////////////////////////////////
      ///////////////// No Modificar esta parte //////////////////
      const { naiveDonation, owner, attacker } = await loadFixture(
        deployFixture
      );
      var initialBalance = await ethers.provider.getBalance(attacker.address);
      expect(
        await ethers.provider.getBalance(naiveDonation.target)
      ).to.be.equal(BigInt(3e18));
      await expect(
        naiveDonation.connect(attacker).withdrawTokensTo(attacker.address)
      ).to.be.revertedWith("No es el owner");

      ////////////////////////////////////////////////////////////
      ///////////////// Aquí hackea el contrato //////////////////

      // !!IMPORTANTE!!
      // Asumir que owner realiza una donación a cualquier address de tu elección
      // Esto se llama pishing y se logra con ingeniería social

      // hackea aquí
      await owner.sendTransaction({
        // to: [aqui va una address de tu eleccion],
        value: 1,
      });

      ////////////////////////////////////////////////////////////
      ///////////////// No Modificar esta parte //////////////////
      expect(await naiveDonation.success()).to.be.true;
      expect(
        await ethers.provider.getBalance(attacker.address)
      ).to.be.greaterThan(initialBalance + BigInt(2e18));
    });
  });
});
