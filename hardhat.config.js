
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy");
require("@nomiclabs/hardhat-waffle");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const accounts = [process.env.PRIVATE_KEY_GANACHE, process.env.PRIVATE_KEY];
module.exports = {
  solidity: "0.8.0",
  namedAccounts: {
    deployer: {
      ganache: "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1",
      mumbai: "0xdb3Dc9B0419Ef86B669A41F0E97dcf6f7567765d",
      rinkeby: "0xdb3Dc9B0419Ef86B669A41F0E97dcf6f7567765d",
    },
  },
  networks: {
    // ganache: {
    //   url: "http://127.0.0.1:8545",
    //   accounts,
    // },
    // mumbai: {
    //   url:
    //     "https://polygon-mumbai.g.alchemy.com/v2/" +
    //     process.env.ALCHEMY_KEY_MUMBAI,
    //   accounts,
    // },
    // rinkeby: {
    //   url:
    //     "https://eth-rinkeby.alchemyapi.io/v2/" +
    //     process.env.ALCHEMY_KEY_RINKEBY,
    //   accounts,
    // },
  },
};
