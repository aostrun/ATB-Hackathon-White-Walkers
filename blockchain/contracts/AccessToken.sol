pragma solidity >=0.5 <0.6.0;
pragma experimental ABIEncoderV2;

contract AccessToken {
  
  struct AccessToken {
    bytes32 id;
    address issuer;
    address allowed;

    bytes32 contractHash;
    uint issuedAt;
    uint expiresAt;

    bool allowedConfirmation;
  }

  mapping(bytes32 => AccessToken) accessTokens;
  mapping(address => AccessToken[]) issuersTokens;
  mapping(address => AccessToken[]) allowedTokens;
  
  /**
    * @dev Issue token to another user
    * @param _allowed User that is beeing issued an access token
    * @param _expiration Number of blocks that token is valid
    * @param _contractHash Hash of the agreement between users
    * @return true if the token is generated successfully
   */
  function issueToken
    (bytes32 _id, address _allowed, uint _expiration, bytes32 _contractHash)
    public
    returns (bool)
    {
      AccessToken memory _token = AccessToken(_id, tx.origin, _allowed, _contractHash, block.number, block.number + _expiration, false);
      accessTokens[_id] = _token;
      issuersTokens[tx.origin].push(_token);
      allowedTokens[_allowed].push(_token);


      return true;
    }


  function acceptAccessToken(
    bytes32 _id, bytes32 _contractHash, bool _vote)
    public
    returns (bool)
    {
      AccessToken memory _token = accessTokens[_id];
      require(_token.allowed == tx.origin);
      require(_token.contractHash == _contractHash);

      _token.allowedConfirmation = _vote;

      return _vote;
    }

  /**
    * @dev Check if the user has the access rights to see data of another user
    * @param _issuer This users data is trying to be accessed
    * @return true if sender has rights to access _issuers data
   */
  function checkAllowance
    (address _issuer, address _allowed)
    public
    returns (bool)
  {

    AccessToken memory _token = getIssuedToken(_issuer, _allowed);
    return _token.allowedConfirmation;
    
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
    (address _issuer, address _allowed)
    internal
    returns (AccessToken storage)
    {
      uint allowedTokensLength = allowedTokens[_allowed].length;

      require(allowedTokensLength > 0, "No issued tokens!");

      /*
       *  Iterate over available tokens and
       *  find the token issued by the _issuer.
       */
      for(uint i=0; i < allowedTokensLength; i++){
        AccessToken storage _token = allowedTokens[_allowed][i];
        if(_token.issuer == _issuer && _token.expiresAt <= block.number){
          return _token;
        }
      }

      revert("No tokens were issued by the _issuer!");
    }
}