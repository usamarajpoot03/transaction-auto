const path = require("path");
require("dotenv").config({
  path: "./.env",
});
const HDWalletProvider = require("@truffle/hdwallet-provider");
const MetaMaskAccountIndex = 0;

module.exports = {
  networks: {
    development: {
      port: 7545,
      host: "127.0.0.1",
      network_id: 5777,
    },
    ropsten_infura: {
      provider: function () {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          "https://ropsten.infura.io/v3/dedac6824bfa4dd5833903d6efa48af8",
          MetaMaskAccountIndex
        );
      },
      network_id: 3,
      skipDryRun: true,
    },
  },
  compilers: {
    solc: {
      version: "^0.6.2",
    },
  },
};
