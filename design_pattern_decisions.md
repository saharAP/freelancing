# Design Pattern Decisions

### require()
using require() to prevent fail without throwing an exception.

### Restricting Access
restricting other contract's access to state variables by explicitly define private variables, and also restricting function access so that only the contract owner or a specific addresses are permitted to execute functions.

### Events
Using events to monitor contracts activities.

### Mortal
implementing the mortal design pattern means including the ability to destroy the contract and remove it from the blockchain using the `selfdestruct` keyword. 

### Withdrawal Pattern
using a withdraw function which users could call it and get their funds instead of sending funds to the users by the contract. It protects against re-entrancy and denial of service attacks

### Circuit Breaker
it allows contract functionality to be stopped. This would be desirable in situations where there is a live contract where a bug has been detected. Freezing the contract would be beneficial for reducing harm before a fix can be implemented. In this case freezing the contract prevents employers add new projects and freelancers pick the open projects while still allowing employers to withdraw their funds.

### Proxy Pattern 
Using the Master/Slave proxy design pattern to make the smart contract upgradable, by implementing a Proxy contract and a MasterSlave interface which is common between the proxy and the Freelancing contract.