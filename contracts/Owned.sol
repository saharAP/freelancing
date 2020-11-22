//SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;


/// @title Owned
/// @author Sahar A.Panahloo
contract Owned{
    
    address payable public  owner;
    
     /// @notice Store the contract owner address
    function owned() public {
        
        owner=msg.sender;
    }
    
}
/// @title Mortal
/// @author Sahar A.Panahloo
contract Mortal is Owned{
    
    /// @notice Destroy the smart contract
    /// @dev Destroy the smart contract using selfdestruct() function that returns all funds to the owner address
    function kill() public{
        
        require(msg.sender==owner);
        
        selfdestruct(owner);
    }
}
