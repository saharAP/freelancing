# Freelancing Platform
The freelancing platform is a decentralized platform on the Ethereum Blockchain for freelancers and employers.  

## Story

 An employer adds a project including a name and a price. The newly created project's status is Open. The employer also sends the price in Ether to the smart contract as a guarantee. A freelancer could pick a project with the status Open. As the freelancer picks the project, the project's status changes to Not Done. After completing the project, the freelancer could commit the project, and the project's status changes to Done. If the employer verifies the project by closing it, the smart contract will send the price to the freelancer, and the project's status will change to Close.

## Dependencies
### truffle
install [truffle](https://github.com/trufflesuite/truffle)
```
sudo npm install -global truffle
```
On Windows: before you install truffle ensure you install windows-build-tools
```
npm install -global --production windows-build-tools
npm install -global truffle
```
For installing project requirements simpley run the command in the project root directory
```
npm install
```
## Deploy the contract to the ganache network

Run ganache-cli network with the bellow configuration that is written in the `truffle-config.js"
```
   development: {
		host: "127.0.0.1",     // Localhost (default: none)
		port: 8545,            // Standard Ethereum port (default: none)
		network_id: "*",       // Any network (default: none)
		},
```

Compile and deploy the contracts

```
truffle compile
truffle migrate --reset
```
Once the block containing the contract has been added to the chain, we can test it:
```
truffle test
```

## run the web interface
 
 To start the web interface on `http://localhost:3000/` run this command in the project directory.
 The interface connects to the smart contract which has been deployed on the `ropsten` test network.
 ```
 npm start
 ```
 Also the web interface is hosted on [IPFS](https://ipfs.io/) network and you can access it through the bellow link.
 
 https://ipfs.io/ipfs/QmS4CA1WdwMffRCBdgceUnk7ChYcmbsnr5zAYqor46HaKo/

 

 





 
