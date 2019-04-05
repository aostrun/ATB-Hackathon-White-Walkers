pragma solidity >=0.5 <0.6.0;

contract TestContract {

  address owner;
  uint8 value;
  constructor() public{
    owner = msg.sender;
  }

  modifier onlyOwner(){
    require(msg.sender == owner);
    _;  
  }

  function setValue(uint8 _value) 
    public
    onlyOwner
    {
      value = _value;
    }

  function getValue()
    public
    view
    returns(uint8)
    {
      return value;
    }




}