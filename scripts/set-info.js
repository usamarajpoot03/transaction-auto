const Test = artifacts.require("Test");

module.exports = async (callback) => {
  try {
    const testContractInstance = await Test.deployed();
    const tx1 = await testContractInstance.setName("Testing");
    const tx2 = await testContractInstance.setSupply(465);
    console.log(tx1.tx, tx2.tx);
    callback();
  } catch (error) {
    callback(error);
  }
};
