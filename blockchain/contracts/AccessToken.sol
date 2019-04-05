pragma solidity >=0.5 <0.6.0;
pragma experimental ABIEncoderV2;

contract AccessToken {
  
  struct AccessToken {
    //uint256 id;
    address issuer;
    address allower;

    bytes32 contractHash;
    uint issuedAt;
    uint expiresAt;
  }

  mapping(uint256 => AccessToken) accessTokens;
  mapping(address => AccessToken[]) issuersTokens;
  mapping(address => AccessToken[]) allowersTokens;
  
  /**
    * @dev Issue token to another user
    * @param _allower User that is beeing issued an access token
    * @param _expiration Number of blocks that token is valid
    * @param _contractHash Hash of the agreement between users
    * @return true if the token is generated successfully
   */
  function issueToken
    (address _allower, uint _expiration, bytes32 _contractHash)
    public
    returns (bool)
    {
      AccessToken memory _token = AccessToken(tx.origin, _allower, _contractHash, block.number, block.number + _expiration);
      issuersTokens[tx.origin].push(_token);
      allowersTokens[_allower].push(_token);


      return true;
    }

  /**
    * @dev Check if the user has the access rights to see data of another user
    * @param _issuer This users data is trying to be accessed
    * @return true if sender has rights to access _issuers data
   */
  function checkAllowance
    (address _issuer)
    public
    returns (bool)
  {

    AccessToken memory _token = getIssuedToken(_issuer);
    return true;
    
  }

  function getAllIssuedTokens()
    public
    returns (AccessToken[] memory) 
    {
      return issuersTokens[tx.origin];
    }


  /**
    * @dev Get token issued to the calling user
    * @param _issuer User that issued the token
    * @return AccessToken if there is a valid token issued, otherwise it reverts
   */
  function getIssuedToken
    (address _issuer)
    internal
    returns (AccessToken storage)
    {
      uint allowersTokensLength = allowersTokens[tx.origin].length;

      require(allowersTokensLength > 0, "No issued tokens!");

      /*
       *  Iterate over available tokens and
       *  find the token issued by the _issuer.
       */
      for(uint i=0; i < allowersTokensLength; i++){
        AccessToken storage _token = allowersTokens[tx.origin][i];
        if(_token.issuer == _issuer && _token.expiresAt <= block.number){
          return _token;
        }
      }

      revert("No tokens were issued by the _issuer!");
    }
}