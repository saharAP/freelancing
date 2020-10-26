# Freelancing Platform
The freelancing platform is a decentralized platform on the Ethereum Blockchain for freelancers and employers.  

## Story

 An employer adds a project with a name and a price. The employer also sends the price in Ether to the smart contract as a guarantee. Every freelancer could pick a project with the status Open. As the freelancer pick the project, its status changes to Not Done. After completing the project, the freelancer could commit the project, and its status changes to Done. If the employer verifies the project with closing the project, the smart contract sends the price to the freelancer. 

## Testing

The freelancing directory is a truffle project that contains the required contracts, migration and test files, and also a node project for implementing the interface.

To test The smart contract start your development blockchain by running these commands in the projectd directory:

 `$ truffle compile` 
 
 `$ truffle migrate` 
  
 `$ truffle test` 
 
 the `migrate` command deploys the contract on local `ganache-cli` which is running on port 8545
 
 ## running interface
 
 To start the web interface on `http://localhost:3000/` run this command in the project directory.
 
 `$ npm start`

 





 
