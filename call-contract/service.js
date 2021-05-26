// REQUIRED MODULES
const path = require("path");
require("dotenv").config({
  path: "./.env",
});

const web3 = require("web3");
const Tx = require("ethereumjs-tx").Transaction;
const cron = require("node-cron");

// ABIs
const testContract = require("./abis/test-contract");

// Infura HttpProvider Endpoint
web3js = new web3(
  new web3.providers.HttpProvider(
    "https://ropsten.infura.io/v3/dedac6824bfa4dd5833903d6efa48af8"
  )
);

let counter = 1;
const runTransaction = () => {
  var myAddress = process.env.MY_PUBLIC_ADDRESS;
  var privateKey = Buffer.from(process.env.MY_PRIVATE_KEY, "hex");
  //contract abi is the array that you can get from the ethereum wallet or etherscan
  var contractABI = testContract.abi;
  var contractAddress = "0xB7B1200C5a343CaF399CF59a064223F2b9AfEE7f";
  //creating contract object
  var contract = new web3js.eth.Contract(contractABI, contractAddress);
  var count;
  // get transaction count, later will used as nonce
  web3js.eth.getTransactionCount(myAddress).then(function (v) {
    console.log("Count: " + v);
    count = v;

    //creating raw tranaction
    var rawTransaction = {
      from: myAddress,
      gasPrice: web3js.utils.toHex(20 * 1e9),
      gasLimit: web3js.utils.toHex(210000),
      to: contractAddress,
      value: "0x0",
      data: contract.methods.setName("FROM NODE - " + counter).encodeABI(),
      nonce: web3js.utils.toHex(count),
    };
    console.log(rawTransaction);
    //creating tranaction via ethereumjs-tx
    var transaction = new Tx(rawTransaction, {
      chain: "ropsten",
      hardfork: "petersburg",
    });
    //signing transaction with private key
    transaction.sign(privateKey);
    //   sending transacton via web3js module
    web3js.eth
      .sendSignedTransaction("0x" + transaction.serialize().toString("hex"))
      .on("transactionHash", (res) => {
        console.log(res);
        counter++;
      });
  });
};

cron.schedule(" */15 * * * *", function () {
  console.log("Transaction Started - " + counter);
  runTransaction();
});
