'use strict';

var helpersContract = require("../../helpers.js");
var LoopBackContext = require('loopback-context');

const AccessTokenContract = helpersContract.getContractInstance();
const web3 = helpersContract.getWeb3();

var account = "";


module.exports = async function (Client) {
  Client.validatesLengthOf('WalletAddress', { min: 40, message: { min: 'WalletAddress is too short' } });
  Client.validatesLengthOf('WalletAddress', { max: 42, message: { max: 'WalletAddress is too long' } });


  await web3.eth.getAccounts((err, accounts) => {
    console.log(accounts);
    account = accounts[0];
  })

  Client.issuedAccessTokens = async function (id) {
    var client = await Client.findById(id);
    const AccessRequest = Client.app.models.AccessRequest;

    var issuedAccessTokens = await AccessRequest.find({where: { issuer: id}});

    return issuedAccessTokens;
  }

  Client.remoteMethod('issuedAccessTokens', {
    accepts: {arg: 'id', type: 'any', description: 'ClientId', required: true},
    http: {path: '/:id/issuedAccessTokens', verb: 'get'},
    returns: {arg: 'issuedAccessTokens', type: 'any'}
  })

  Client.receivedAccessTokens = async function (id) {

    const AccessRequest = Client.app.models.AccessRequest;
    var receivedRequests = await AccessRequest.find({where: {allowed: id}});

    return receivedRequests;
  }

  Client.remoteMethod('receivedAccessTokens', {
    accepts: {arg: 'id', type: 'any', description: 'ClientId', required: true},
    http: {path: '/:id/receivedAccessTokens', verb: 'get'},
    returns: {arg: 'issuedAccessTokens', type: 'any'}
  })


  Client.getBlogPosts = async function (id, req) {

    const BlogPost = Client.app.models.BlogPost;

    var client = await Client.findById(id);

    var blogPosts = await BlogPost.find({where: {clientId: id}});

    console.log("req id: " + req.accessToken.userId);
    console.log("sent id: " + id);
    if(req.accessToken.userId == id){
      console.log("Owner requesting blogpost!");
      return blogPosts;
    }

    var issuer = client.WalletAddress;

    var caller = await Client.findById(req.accessToken.userId);

    var isAvailable = await AccessTokenContract.methods.checkAllowance(issuer, caller.WalletAddress).call({from: account, gas: 500000});
    console.log("isAvailable: " + isAvailable);
    if(isAvailable){
      return blogPosts;
    }

    var error = new Error();
    error.status = 401;
    error.message = 'Insufficient access rights!';
    error.code = 'NOT_AUTHORIZED';

    return error;
  }

  Client.remoteMethod('getBlogPosts', {
    accepts: [
      {arg: 'id', type: 'any', description: 'ClientId', required: true},
      { arg: 'req', type: 'object', 'http': {source: 'req'}}
    ],
    http: {path: '/:id/getBlogPosts', verb: 'get'},
    returns: {arg: 'blogPosts', type: 'any'}
  })
};
