var contract_address = '0xC64Cce600BCf762e495b7a0B9E4c296E3108D794'
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
      console.log("window.ethereum!");
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
        console.log("web3 initialized!");
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

    return App.initContract();
  },

  initContract:  function() {
    $.getJSON('Freelancing.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var FreelancingArtifact = data;
      
      //let ins =   FreelancingArtifact.at(contract_address);
     
      App.contracts.Freelancing = TruffleContract(FreelancingArtifact);
     // App.contracts.Freelancing.at(contract_address);
      
      // Set the provider for our contract
      App.contracts.Freelancing.setProvider(App.web3Provider);
      console.log(App.web3Provider.selectedAddress);
      // Use our contract to retrieve and mark the adopted pets
      return App.getProjects();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-action', App.handleAdopt);
    $(document).on('click', '.btn-insert', App.insertProject);
  },

  getProjects: function(projectNumbers, account) {
    var FreelancingInstance;

    App.contracts.Freelancing.at(contract_address).then(function(instance) {
      FreelancingInstance = instance;
      
      return FreelancingInstance.numProjects.call();
    }).then(async function(projectNumbers) {
      console.log("numProjects: "+projectNumbers);
      var projectsRow = $('#projectsRow');
      var prjTemplate = $('#prjTemplate');
    
        projectsRow.empty();
      
      for (i = 0; i < projectNumbers; i++) {
        const result= await FreelancingInstance.returnProject.call(i);
        console.log(result[0]);
        const etherValue = web3.fromWei(result[2].toString(10), 'ether');
        prjTemplate.find('.project-price').text(etherValue);
        const status=result[3].toString(10);
        
        if(status==STATUS_CLOSED){
          prjTemplate.find('.project-status').text("Closed");
          prjTemplate.find('.btn-action').prop('disabled', true);
          prjTemplate.find('.btn-action').text("Closed");
        }
        else if(status==STATUS_DONE){
          prjTemplate.find('.project-status').text("Done");
          prjTemplate.find('.btn-action').text("Close");
        }
        else if(status==STATUS_NOTDONE){  
          petTemplate.find('.project-status').text("Not Done");
          prjTemplate.find('.btn-action').text("Commit");
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
      /*  var numprj=FreelancingInstance.numProjects.call();
        var projectsRow = $('#projectsRow');
        var prjTemplate = $('#prjTemplate');
        prjTemplate.find('.project-price').text(price);
        prjTemplate.find('.panel-title').text(projectName);
        prjTemplate.find('.btn-action').attr('data-id', numprj-1);
        projectsRow.append(prjTemplate.html());*/
        return App.getProjects();
      }).catch(function(err) {
        console.log(err.message);
      });
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
