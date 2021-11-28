const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFog", function () {
  before(async function () {
    this.NFog = await ethers.getContractFactory("NFog");
  });

  beforeEach(async function () {
    this.nfog = await this.NFog.deploy("Testing collection", "TEST");
    await this.nfog.deployed();
  });

  it("Returns after initialization", async function () {
    expect(await this.nfog.tokenCount()).to.equal(0);
    expect(await this.nfog.isNFogOpen(0)).to.equal(false);
    await expect(this.nfog.viewNFog(0)).to.be.revertedWith(
      "ERC721: owner query for nonexistent token"
    );
    await expect(this.nfog.tokenURI(0)).to.be.revertedWith(
      "ERC721URIStorage: URI query for nonexistent token"
    );
  });
});
