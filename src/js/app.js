/**Freelancing smart contract deployed on ropsten test network */

//var contract_address = '0xC64Cce600BCf762e495b7a0B9E4c296E3108D794'
var contract_address="0xe00145e22b21d4eecA656b1FeAaF5e878c18B318"

const STATUS_OPEN =3;
const STATUS_DONE =0;
const STATUS_NOTDONE =1;
const STATUS_CLOSED =2;
App = {
  web3Provider: null,
  contracts: {},

 

  init: async function() {
    console.log("init func!");
    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
    if (window.ethereum) {
      var ethaccount = $('#ethaccount');

      console.log("window.ethereum!");
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
        console.log("web3 initialized!");
        
        const currentAddr=App.web3Provider.selectedAddress;
        
        ethaccount.text(currentAddr);
        window.ethereum.on('accountsChanged', function (accounts) {
          // Time to reload your interface with accounts[0]!
          ethaccount.text(App.web3Provider.selectedAddress)
        });


      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      console.log("window.web3!");
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);
    console.log("web31111111111");
    return App.initContract();
  },

  initContract:  function() {
    $.getJSON('Freelancing.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var FreelancingArtifact = data;
      
      //let ins =   FreelancingArtifact.at(contract_address);
     
      App.contracts.Freelancing = TruffleContract(FreelancingArtifact);
     // App.contracts.Freelancing.at(contract_address);
      console.log("web3222222222222222");
      // Set the provider for our contract
      App.contracts.Freelancing.setProvider(App.web3Provider);
      console.log(App.web3Provider.selectedAddress);
      console.log("web333333333333333333333");
      // Use our contract to retrieve and mark the adopted pets
      return App.getProjects();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-action', App.closeProject);
    $(document).on('click', '.btn-action', App.pickProject);
    $(document).on('click', '.btn-action', App.commitProject);
    $(document).on('click', '.btn-insert', App.insertProject);
  },

  getProjects: function(projectNumbers, account) {
    var FreelancingInstance;
    console.log("web3444444444444444444");
    App.contracts.Freelancing.at(contract_address).then(function(instance) {
      FreelancingInstance = instance;
 
      return FreelancingInstance.numProjects.call();
    }).then(async function(projectNumbers) {
      console.log("numProjects: "+projectNumbers);
      var projectsRow = $('#projectsRow');
      var prjTemplate = $('#prjTemplate');
    
        projectsRow.empty();
        console.log("web35555555555555555555555555");
      for (i = 0; i < projectNumbers; i++) {
        prjTemplate = $('#prjTemplate');
        const result= await FreelancingInstance.returnProject.call(i);
        console.log(result[0]);
        const etherValue = web3.fromWei(result[2].toString(10), 'ether');
        prjTemplate.find('.project-price').text(etherValue);
        const status=result[3].toString(10);
        console.log("status:"+status)
        if(status==STATUS_CLOSED){
          prjTemplate.find('.project-status').text("Closed");
          prjTemplate.find('.btn-action').prop('disabled', true);
          prjTemplate.find('.btn-action').text("Closed");
          
        }
        else if(status==STATUS_DONE){
          prjTemplate.find('.btn-action').prop('disabled', false);
          prjTemplate.find('.project-status').text("Done");
          prjTemplate.find('.btn-action').text("Close");
        
        }
        else if(status==STATUS_NOTDONE){  
          prjTemplate.find('.btn-action').prop('disabled', false);
          prjTemplate.find('.project-status').text("Not Done");
          prjTemplate.find('.btn-action').text("Commit");       
        }else if(status==STATUS_OPEN){
          prjTemplate.find('.btn-action').prop('disabled', false);
          prjTemplate.find('.project-status').text("Open");
          prjTemplate.find('.btn-action').text("Pick"); 
        }
        prjTemplate.find('.panel-title').text(result[0]);
        prjTemplate.find('.btn-action').attr('data-id', i);
        projectsRow.append(prjTemplate.html());
        
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },
  
  insertProject: function(event) {
    
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));
    console.log("petid: "+petId);

    var x = document.getElementById("projectname");
    var projectName=x.value;
    x = document.getElementById("price");
    var price=parseFloat(x.value);
    var weiprice=1000000000000000000*price;
    console.log("project name: "+projectName);
    console.log("price:"+price);
    var freelancingInstance;

      App.contracts.Freelancing.at(contract_address).then(function(instance) {
        freelancingInstance = instance;

        // Execute adopt as a transaction by sending account
        return freelancingInstance.addProject(projectName, {from: App.web3Provider.selectedAddress,value:weiprice});
      }).then(function(result) {
      
        return App.getProjects();
      }).catch(function(err) {
        console.log(err.message);
      });
  },
  pickProject: function(event) {
    
    event.preventDefault();
    
    if($(event.target).text()=="Pick"){
    var projectId = parseInt($(event.target).data('id'));
    console.log("projectId: "+projectId);
 
    var freelancingInstance;

      App.contracts.Freelancing.at(contract_address).then(function(instance) {
        freelancingInstance = instance;

        // Execute adopt as a transaction by sending account
        return freelancingInstance.pickProject(projectId, {from: App.web3Provider.selectedAddress});
      }).then(function(result) {
   
        return App.getProjects();
      }).catch(function(err) {
        console.log(err.message);
      });
    }
  },
commitProject: function(event) {
    
    event.preventDefault();
if($(event.target).text()=="Commit"){
    var projectId = parseInt($(event.target).data('id'));
    console.log("projectId: "+projectId);
    var freelancingInstance;

      App.contracts.Freelancing.at(contract_address).then(function(instance) {
        freelancingInstance = instance;

        // Execute adopt as a transaction by sending account
        return freelancingInstance.commitProject(projectId, {from: App.web3Provider.selectedAddress});
      }).then(function(result) {
   
        return App.getProjects();
      }).catch(function(err) {
        console.log(err.message);
      });
    }
  },
  closeProject: function(event) {
    
    event.preventDefault();
if($(event.target).text()=="Close"){
    var projectId = parseInt($(event.target).data('id'));
    console.log("projectId: "+projectId);
    var freelancingInstance;

      App.contracts.Freelancing.at(contract_address).then(function(instance) {
        freelancingInstance = instance;

        // Execute adopt as a transaction by sending account
        return freelancingInstance.closeProject(projectId, {from: App.web3Provider.selectedAddress});
      }).then(function(result) {
   
        return App.getProjects();
      }).catch(function(err) {
        console.log(err.message);
      });
    }
  },
  markAdopters: function(adopters, account) {
    var FreelancingInstance;

    App.contracts.Freelancing.deployed().then(function(instance) {
      FreelancingInstance = instance;

      return FreelancingInstance.getAdopters.call();
    }).then(function(adopters) {
      for (i = 0; i < adopters.length; i++) {
        if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    var adoptionInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Adoption.deployed().then(function(instance) {
        adoptionInstance = instance;

        // Execute adopt as a transaction by sending account
        return adoptionInstance.adopt(petId, {from: account});
      }).then(function(result) {
        return App.getProjects();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
