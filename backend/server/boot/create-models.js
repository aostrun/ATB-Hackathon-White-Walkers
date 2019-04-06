var async = require('async');


module.exports = async function (app) {

  //data sources
  var mongoDs = app.dataSources.db;

  var accounts = [
    "0xC6d90b31f29494E60C6A571CC27269Df103CEdbB",
    "0x72410D4171805F4a39DFeF2C2179934196d0A1B9",
    "0x72410D4171805F4a39DFeF2C2179934196d0A1BA",
  ]

  async.parallel({
    clientData: async.apply(createClientData)
  }, function(err, res) {
    if(err) throw err;
    createBlogPosts(res.clientData, function(err, res){
      if(err) throw err;
      console.log("> models created successfully");
    })
  })

  async function createClientData(cb){
    
    await mongoDs.automigrate('Client', function (err) {
      if (err) return cb(err);
      var Client = app.models.Client;
      Client.create([
      {
        username: 'test1',
        email: 'test1@test.com',
        emailVerified: true,
        password: 'test1',
        realm: 'ATB',
        WalletAddress: accounts[0],
        
      }, 
      {
        username: 'test2',
        email: 'test2@test.com',
        emailVerified: true,
        password: 'test2',
        realm: 'ATB',
        WalletAddress: accounts[1],
      }, 
      {
        username: 'test3',
        email: 'test3@test.com',
        emailVerified: true,
        password: 'test3',
        realm: 'ATB',
        WalletAddress: accounts[2],
      }], cb);
    });


  }

  async function createBlogPosts(clientData, cb){
    console.log(clientData);
    await mongoDs.automigrate('BlogPost', function(err) {
      if(err) return cb(err);

      var BlogPost = app.models.BlogPost;

      BlogPost.create([
        {
          title: "Winter is coming",
          content: "Sample content",
          clientId: clientData[0].id
          
        },
        {
          title: "You know nothing, Jon Snow.",
          content: "Sample content",
          clientId: clientData[1].id
        },
        {
          title: "A Lannister always pays his debts.",
          content: "Sample content",
          clientId: clientData[2].id
        }
      ])
    })
  }
}