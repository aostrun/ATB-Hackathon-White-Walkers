'use strict';

var helpersContract = require("../../helpers.js");

const AccessToken = helpersContract.getContractInstance();
const web3 = helpersContract.getWeb3();

module.exports = function(AccessRequest) {

  AccessRequest.tokenIssued = async function (id, issuedTx){

    var request = await AccessRequest.findById(id);
    request.issuedTx = issuedTx;

    request.save();
    return true;
  }

  AccessRequest.remoteMethod('tokenIssued', {
    accepts: [
      {arg: 'id', type: 'any', description: 'AccessRequestId', required: true},
      {arg: 'issuedTx', type: 'any', description: 'Transaction that contains token issuing', required: true}
    ],
    http: {path: '/:id/tokenIssued', verb: 'post'},
    returns: {arg: 'success', type: 'any'}
  })



};
