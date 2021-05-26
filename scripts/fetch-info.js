const Test = artifacts.require("Test");

module.exports = async (callback) => {
  try {
    const testContractInstance = await Test.deployed();
    const name = await testContractInstance.getName();
    const supply = await testContractInstance.getSupply();
    console.log(`Name: ${name}, supply: ${supply}`);
    callback();
  } catch (error) {
    callback(error);
  }
};
