//SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import "./MasterSlave.sol";
import "./freelancing.sol";

/// @title Proxy
/// @author Sahar A.Panahloo
contract Proxy is MasterSlave{

address private slave;

/** @dev upgrade the logic contract by 
* replacing the contract address with th Slave
* state variable which the user points to
*/
function upgrade(address _slave) external{
    require(_slave!= address(0));
    slave=_slave;
}

function breakCircuit(bool _stopped)  external {

        Freelancing(slave).breakCircuit(_stopped);
}
function addProject(string  calldata name)  external  payable{
        Freelancing(slave).addProject(name);
}
function pickProject(uint _id)  external  returns(uint){
 return Freelancing(slave).pickProject(_id);
}
function commitProject(uint _id)   external{
        Freelancing(slave).commitProject(_id);
}    
function closeProject(uint _id)  external  payable{
        Freelancing(slave).closeProject(_id);
}
function returnProject(uint _id) external  view returns(string memory name,uint id,uint price,uint status,address employer,address freelancer){
    
return  Freelancing(slave).returnProject(_id);
}

}