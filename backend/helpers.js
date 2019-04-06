const Web3 = require("web3") // import web3 v1.0 constructor
//var contract_artifacts = require('./VerificationRequestData.json');

var HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = "combine swap jacket ranch dad lyrics job sweet puppy column famous guitar"; // 12 word mnemonic

// Load your contract here!
var contract_artifacts = require('../blockchain/build/contracts/AccessToken.json');


// use globally injected web3 to find the currentProvider and wrap with web3 v1.0
const getWeb3 = () => {

  //var httpProvider = new Web3(new Web3.providers.HttpProvider("http://ganache:8545"));
  //var httpProvider = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  
  //var provider = new Web3HDWalletProvider(mnemonic, httpProvider, 1);
  
  var provider = new HDWalletProvider(mnemonic, "http://ganache:8545", 1);


  return new Web3(provider);
}

// assumes passed-in web3 is v1.0 and creates a function to receive contract name
const getContractInstance = () => {
  /*
    Retrieve the first contract from the truffle migrations.
    This return a single contract so if multiple contract are deployed
    this needs to be changed!
  */
  const web3 = getWeb3();

  const deployedAddress = contract_artifacts.networks[Object.keys(contract_artifacts.networks)[0]].address;
  //const deployedAddress = "0x00000000";
  console.log("Deployed address: " + deployedAddress)
  const instance = new web3.eth.Contract(contract_artifacts.abi, deployedAddress);
  return instance
}

module.exports = { getWeb3, getContractInstance }
