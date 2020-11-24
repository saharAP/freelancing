# Avoiding Common Attacks

### Reentrancy
using the Checks-Effects-Interactions Pattern. the best way to prevent this attack is to avoid using any state changes after external calls. In this case, because the state of the project has changed to Close first, the attacker's fallback function can not reenter the function.
```
function closeProject(uint _id)public payable done(_id) verifyCaller(projects[_id].employer){

projects[_id].status=Status.Closed;
(bool success, )=projects[_id].freelancer.call.value(projects[_id].price)("");
require (success);
 
emit CloseProject(_id,projects[_id].employer,projects[_id].freelancer,projects[_id].price);

}
```
Also the withdrawal pattern protects against this attack.

### Integer Overflow and Underflow
prevent this attack by using `SafeMath` library for checking before adding and subtracting.

### DoS with (Unexpected) revert
prevent this attack by avoiding using state changes after external calls, avoid using external calls inside for loops, and also using the withdrawal pattern that uses a pull over push payment pattern.

### DoS with Block Gas Limit
using `.call()` for sending Ether instead of `.send()` and `.transfer()`. 
