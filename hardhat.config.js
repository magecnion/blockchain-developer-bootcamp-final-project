
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  networks: {
    ganache: {
      url: "http://127.0.0.1:8545",
      accounts: [process.env.PRIVATE_KEY_GANACHE],
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/" + process.env.ALCHEMY_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
