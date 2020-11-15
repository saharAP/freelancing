# Design Pattern Decisions

### require()
using require() to prevent fail without throwing an exception.

### Restricting Access
restricting access to state variables and functions by explicitly define private variables.

### Events
Using events to monitor contracts activities.

-restricting function access so that only the contract owner or a specific addresses are permitted to execute functions

### Mortal
implementing the mortal design pattern means including the ability to destroy the contract and remove it from the blockchain using the `selfdestruct` keyword. 

### Wthdrawal pattern
using a withdraw function which users could call it and get their funds instead of sending funds by the contract. It protects against re-entrancy and denial of service attacks

### Circuit Breaker
it allows contract functionality to be stopped. This would be desirable in situations where there is a live contract where a bug has been detected. Freezing the contract would be beneficial for reducing harm before a fix can be implemented. In this case freezing the contract prevents employers add new projects and freelancers pick the open projects while still allowing employers to withdraw their funds.