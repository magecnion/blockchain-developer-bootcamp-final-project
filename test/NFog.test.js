const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFog initialization", function () {
  before(async function () {
    this.NFog = await ethers.getContractFactory("NFog");
  });

  beforeEach(async function () {
    this.nfog = await this.NFog.deploy("Testing collection", "TEST");
    await this.nfog.deployed();
  });

  it("Should return zero tokens", async function () {
    expect(await this.nfog.tokenCount()).to.equal(0);
  });

  it("Should revert when asking for some token id", async function () {
    await expect(this.nfog.isNFogOpen(0)).to.be.revertedWith(
      "NFOG: isOpen query for nonexistent token"
    );
    await expect(this.nfog.viewNFog(0)).to.be.revertedWith(
      "ERC721: owner query for nonexistent token"
    );
    await expect(this.nfog.tokenURI(0)).to.be.revertedWith(
      "ERC721URIStorage: URI query for nonexistent token"
    );
  });
});
