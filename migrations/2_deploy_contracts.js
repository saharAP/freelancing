var Freelancing = artifacts.require("./Freelancing.sol");
var Proxy = artifacts.require("./Proxy.sol");
module.exports =async  function(deployer) {
  
  deployer.deploy(Freelancing);
  deployer.deploy(Proxy);

};

