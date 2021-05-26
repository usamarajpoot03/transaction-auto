var Test = artifacts.require("Test.sol");

require("dotenv").config({
  path: "../.env",
});

module.exports = async function (deployer, network, [defaultAccount]) {
  await deployer.deploy(Test);
  // if (network.startsWith("rinkyby_infura")) {
  // } else if (network.startsWith("mainnet")) {
  // } else {
  // }
};
