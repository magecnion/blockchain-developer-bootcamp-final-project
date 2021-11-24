const { ethers } = require("hardhat");

async function main() {
  // We get the contract to deploy
  const NFog = await ethers.getContractFactory("NFog");
  const nfog = await NFog.deploy("NFogCollection", "NFOG");

  console.log("NFog deployed to:", nfog.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
