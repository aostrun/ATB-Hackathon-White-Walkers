'use strict';

var helpersContract = require("../../helpers.js");

const AccessTokenContract = helpersContract.getContractInstance();
const web3 = helpersContract.getWeb3();

var account = "";
module.exports = async function(BlogPost) {

  await web3.eth.getAccounts((err, accounts) => {
    console.log(accounts);
    account = accounts[0];
  })

  BlogPost.beforeRemote('findById', async function(ctx, blogPost, next){
    const Client = BlogPost.app.models.Client;

    console.log(blogPost);
    if(ctx.req.accessToken.userId === blogPost.clientId){
      console.log("Owner requesting blogpost!");
      next();
    }

    var issuer = await Client.findById(blogPost.clientId);
    issuer = issuer.WalletAddress;

    var isAvailable = await AccessTokenContract.methods.checkAllowance(issuer).call({from: account, gas: 500000});

    if(isAvailable){
      next();
    }

    var error = new Error();
    error.status = 401;
    error.message = 'Insufficient access rights!';
    error.code = 'NOT_AUTHORIZED';

    next(error);
  })

};
