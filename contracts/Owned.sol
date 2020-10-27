//SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

/// @title Store the contract owner address 
/// @author Sahar A.Panahloo
contract Owned{
    
    address payable public  owner;
    
    function owned() public {
        
        owner=msg.sender;
    }
    
}
/// @title Destroy the smart contract when needed by the owner
/// @author Sahar A.Panahloo
contract Mortal is Owned{
    
    /// @notice Destroy the smart contract
    /// @dev Destroy the smart contract using selfdestruct() function that returns all funds to the owner address
    function kill() public{
        
        require(msg.sender==owner);
        
        selfdestruct(owner);
    }
}
