//SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

interface MasterSlave{

function breakCircuit(bool _stopped)        external    ;
function addProject(string  calldata name)  external    payable;
function pickProject(uint _id)              external    returns(uint);
function commitProject(uint _id)            external    ; 
function closeProject(uint _id)             external    payable; 
function returnProject(uint _id)            external    view returns(string memory name,uint id,uint price,uint status,address employer,address freelancer);
}