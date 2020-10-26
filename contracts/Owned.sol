//SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract Owned{
    
    address payable public  owner;
    
    function owned() public {
        
        owner=msg.sender;
    }
    
}

contract Mortal is Owned{
    
    function kill() public{
        
        require(msg.sender==owner);
        
        selfdestruct(owner);
    }
}
