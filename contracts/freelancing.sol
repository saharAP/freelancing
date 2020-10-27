//SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import "./SafeMath.sol";
import "./Owned.sol";

/// @title A platform for eployers and freelancers
/// @author Sahar A.Panahloo
contract freelancing is Owned, Mortal{
using SafeMath for uint256;

struct Project{
  uint    id;
  string  name;
  uint    price;
  Status  status;
  address employer;
  address freelancer;
}
mapping(uint=>Project) public projects;
uint public numProjects;
enum Status{Done,NotDone,Closed,Open}

// events
event AddProject(uint projectId,string name,uint price);
event PickProject(uint projectId,address freelancer);
event CommitProject(uint projectId,address freelancer);
event CloseProject(uint projectId,address employer,address freelancer,uint price);
// modifiers
modifier verifyCaller (address _address) { require (msg.sender == _address); _;}
modifier open(uint _id){require(projects[_id].status==Status.Open);_;}
modifier done(uint _id){require(projects[_id].status==Status.Done);_;}

/// @notice Add a project as an employer
/// @dev Using SafeMath library for preventing overflow vulnerability
/// @param _name The name of the project
function addProject(string memory _name) public payable{
  
require(msg.value>0);
uint _id=numProjects;
projects[_id] = Project({id:_id,name:_name,price:msg.value,status:Status.Open,employer:msg.sender,freelancer:address(0)});
 
 numProjects=numProjects.add(1);
emit AddProject(_id,_name,msg.value);

}
/// @notice Pick an open project as a freelancer
/// @param _id The project id
/// @return The project id
function pickProject(uint _id)public open(_id) returns(uint){

projects[_id].freelancer=msg.sender;
projects[_id].status=Status.NotDone;
emit PickProject(_id,msg.sender);
return _id;
}

/// @notice Commit the project that you picked as a freelancer
/// @param _id The project id
function commitProject(uint _id)public verifyCaller(projects[_id].freelancer){
  
  projects[_id].status=Status.Done;
  emit CommitProject(_id,msg.sender); 
}

/// @notice Close the commited project as an employer, Ethers will be sent to the freelancer 
/// @dev Sending Ethers with call function and check the result
/// @param _id The project id
function closeProject(uint _id)public payable done(_id) verifyCaller(projects[_id].employer){

projects[_id].status=Status.Closed;
(bool success, )=projects[_id].freelancer.call.value(projects[_id].price)("");
if(!success) {
    // handle failure code
  projects[_id].status=Status.Done;  
}
emit CloseProject(_id,projects[_id].employer,projects[_id].freelancer,projects[_id].price);
}

/// @notice Get the project specifications
/// @dev Solidity doesnt support the struct return type in public functions
/// @param _id The project id
/// @return The project name
/// @return The project id
/// @return The project price
/// @return The project status
/// @return The employer address
/// @return The freelancer address
function returnProject(uint _id)public view returns(string memory name,uint id,uint price,uint status,address employer,address freelancer){

name=projects[_id].name;
id=projects[_id].id;
price=projects[_id].price;
status=uint(projects[_id].status);
employer=projects[_id].employer;
freelancer=projects[_id].freelancer;
}

}


