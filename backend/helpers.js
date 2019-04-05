const Web3 = require("web3") // import web3 v1.0 constructor
//var contract_artifacts = require('./VerificationRequestData.json');

// Load your contract here!
var contract_artifacts = require('../blockchain/build/contracts/TestContract.json');


// use globally injected web3 to find the currentProvider and wrap with web3 v1.0
const getWeb3 = () => {
  const myWeb3 = new Web3(new Web3.providers.HttpProvider("http://ganache:8545"))
  //const myWeb3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

  return myWeb3
}

// assumes passed-in web3 is v1.0 and creates a function to receive contract name
const getContractInstance = () => {
  /*
    Retrieve the first contract from the truffle migrations.
    This return a single contract so if multiple contract are deployed
    this needs to be changed!
  */
  const web3 = getWeb3();

  const deployedAddress = contract_artifacts.networks[Object.keys(contract_artifacts.networks)[0]].address
  console.log("Deployed address: " + deployedAddress)
  const instance = new web3.eth.Contract(contract_artifacts.abi, deployedAddress);
  return instance
}

module.exports = { getWeb3, getContractInstance }
