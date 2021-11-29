const { expect } = require("chai");
const { ethers } = require("hardhat");

/**
 * SOME COMMENTS
 * 
 * The main goal of this tests is to check the funcionality of the openings logic.
 * 
 * As ERC721 implementation comes from OpenZeppelin, which is library for secure smart contract development
 * and build on a solid foundation of community-vetted code, the following tests are focused
 * on testing opening logic (e.g. only the owner can open a NFog, once it is open it won't be closed anymore...)
 * 
 * First, the state after NFog initialization is tested, then what should happen after mintin a NFog and
 * finally all the logic behing the opening.
 * 
 */

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

describe("NFog minting", function () {
  before(async function () {
    this.NFog = await ethers.getContractFactory("NFog");
  });
  
  it("Revert if token uri is empty", async function () {
    this.nfog = await this.NFog.deploy("Testing collection", "TEST");
    await this.nfog.deployed();
    await expect(this.nfog.mint("", "myawesomesecret")).to.be.revertedWith(
      "Token URI cannot be empty"
    );
  });
});

describe("NFog openning", function () {
  before(async function () {
    this.NFog = await ethers.getContractFactory("NFog");
  });

  beforeEach(async function () {
    this.nfog = await this.NFog.deploy("Testing collection", "TEST");
    await this.nfog.deployed();
    await this.nfog.mint("http://metadata.uri", "myawesomesecret");
  });

  it("Should to be closed after minting", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    expect(await this.nfog.tokenCount()).to.equal(1);
    expect(await this.nfog.tokenURI(1)).to.be.equal("http://metadata.uri");
    expect(await this.nfog.ownerOf(1)).to.be.equal(owner.address);
    expect(await this.nfog.isNFogOpen(1)).to.equal(false);
  });

  it("Revert when trying to view a closed NFog", async function () {
    await expect(this.nfog.viewNFog(1)).to.be.revertedWith("NFog is not open");
  });

  it("Revert if a non-owner try to open it", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    await expect(this.nfog.connect(addr1).openNFog(1)).to.be.revertedWith(
      "Only NFog owner is authorized"
    );
  });

  it("Should return secret when call view after opening", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    await expect(this.nfog.openNFog(1))
      .to.emit(this.nfog, "NFogOpen")
      .withArgs(1, owner.address);
    expect(await this.nfog.viewNFog(1)).to.equal("myawesomesecret");
  });

  it("Revert if try to reopen", async function () {
    this.nfog.openNFog(1);
    await expect(this.nfog.openNFog(1)).to.be.revertedWith(
      "NFog is already open"
    );
  });

  it("Revert if not owner try to view after opening", async function () {
    this.nfog.openNFog(1);
    const [owner, addr1, addr2] = await ethers.getSigners();
    await expect(this.nfog.connect(addr1).viewNFog(1)).to.be.revertedWith(
      "Only NFog owner is authorized"
    );
  });
});
