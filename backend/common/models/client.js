'use strict';

var helpersContract = require("../../helpers.js");

const ContractName = helpersContract.getContractInstance();


module.exports = function (Client) {
  Client.validatesLengthOf('WalletAddress', { min: 40, message: { min: 'WalletAddress is too short' } });
  Client.validatesLengthOf('WalletAddress', { max: 42, message: { max: 'WalletAddress is too long' } });
};
