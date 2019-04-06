'use strict';

var helpersContract = require("../../helpers.js");

const ContractName = helpersContract.getContractInstance();


module.exports = function (Client) {
  Client.validatesLengthOf('WalletAddress', { min: 40, message: { min: 'WalletAddress is too short' } });
  Client.validatesLengthOf('WalletAddress', { max: 42, message: { max: 'WalletAddress is too long' } });


  Client.issuedAccessTokens = async function (id) {
    var client = await Client.findById(id);

    var issuedAccessTokens = await AccessToken.find({where: { issuedID: id}});

    return issuedAccessTokens;
  }

  Client.remoteMethod('issuedAccessTokens', {
    accepts: {arg: 'id', type: 'any', description: 'ClientId', required: true},
    http: {path: '/:id/issuedAccessTokens', verb: 'get'},
    returns: {arg: 'issuedAccessTokens', type: 'any'}
  })

};
