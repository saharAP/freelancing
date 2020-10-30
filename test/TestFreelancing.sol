pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Freelancing.sol";

contract TestFreelancing {

 
    // Test for failing conditions in this contracts:
       
    Freelancing freelancing = Freelancing(DeployedAddresses.Freelancing());
    uint public initialBalance = 2 ether;
    
    uint price        = 2500;
    string name         = "student portal";
    uint   id            =   0;

   function () external payable{
    // This will NOT be executed when Ether is sent. \o/
  }

   function testForFailureIfUserPickaProjectWithoutOpenStatus()public {

        bool r;
      
       (r,)=address(freelancing).call.value(price)(abi.encodeWithSignature("addProject(string)",name));
       freelancing.pickProject(id);
      (r,)=address(freelancing).call(abi.encodeWithSignature("pickProject(uint256)",id));

       Assert.isFalse(r, "should fail if a user try to pick a project which is not open");

       
  }
 function testForFailureForCallsThatAreMadeByNotTheFreelancer()public {

        bool r;
     
        (r,)=address(freelancing).delegatecall(abi.encodeWithSignature("commitProject(uint256)",id));

        Assert.isFalse(r, "should fail if a user who is not the one that picked the project before, try to commit the project");      
  }
   function testForFailureWhenClosingAProjectThatIsNotDone()public{
        
        bool r;
        
        (r,)=address(freelancing).call(abi.encodeWithSignature("closeProject(uint256)",id));

        Assert.isFalse(r, "should fail if an employer trying to close a project which iss note done");
    } 

}
