/**
 * This is a javascript code for testing Freelancing.sol
 */
let BN = web3.utils.BN
let Freelancing = artifacts.require('Freelancing')

contract('Freelancing', function(accounts) {

    const employer    = accounts[1]
    const alice  = accounts[2]
    const zeroAddress = '0x0000000000000000000000000000000000000000'

    const price        = "2500"
    const name         = "student portal"
    const id            =   0;

    const status_Open   =   3;
    const status_NotDone=   1;
    const status_Done   =   0;
    const status_Closed =   2;
    

    let instance

    beforeEach(async () => {
        instance = await Freelancing.new()
    })

    it("should add a project with the provided name, price and an appropriate status", async() => {
        const tx = await instance.addProject(name,{from: employer,value:price})
                
        const result = await instance.returnProject.call(id)

        assert.equal(result[0], name, 'the name of the last added item does not match the expected value')
        assert.equal(result[2].toString(10), price, 'the price of the last added project does not equal to the value which is sent')
        assert.equal(result[3].toString(10), status_Open, 'the state of the recently added project is not "Open"')
        assert.equal(result[4], employer, 'the address adding the project does not listed as the employer')
        assert.equal(result[5], zeroAddress, 'the freelancer address does not set to 0 when a project is added')
    })

    it("should emit an AddProject event when a project is added", async()=> {
        let eventEmitted = false
        const tx = await instance.addProject(name,{from: employer,value:price})
        
        if (tx.logs[0].event == "AddProject") {
            eventEmitted = true
        }

        assert.equal(eventEmitted, true, 'adding a project does not emit an add project event')
    })
    it("should change the status of the project to Not Done when picking the project", async() => {
        var tx = await instance.addProject(name,{from: employer,value:price})
        
        tx = await instance.pickProject(id,{from: alice})
        const result = await instance.returnProject.call(id)

        assert.equal(result[5], alice, 'the freelancer address does not set to alice when she pick a project')
        assert.equal(result[3].toString(10), status_NotDone, 'the status of the recently picked project is not "NotDone"')
    })
    it("should change the status of the project to Done when committing the project", async() => {
        var tx = await instance.addProject(name,{from: employer,value:price})
        
        tx = await instance.pickProject(id,{from: alice})
        tx = await instance.commitProject(id,{from: alice})

        const result = await instance.returnProject.call(id)

        assert.equal(result[3].toString(10), status_Done, 'the status of the commited project is not "Done"')
    })
    it("should allow the employer to close the commited project and send the price to the freelancer accordingly", async() => {

        var tx = await instance.addProject(name,{from: employer,value:price})
        
        tx = await instance.pickProject(id,{from: alice})
        tx = await instance.commitProject(id,{from: alice})


        var aliceBalanceBefore = await web3.eth.getBalance(alice)
        

        tx = await instance.closeProject(id,{from: employer})

        var aliceBalanceAfter = await web3.eth.getBalance(alice)

        const result = await instance.returnProject.call(id)

        assert.equal(result[3].toString(10), status_Closed, 'the status of the project is not "Closed"')
        assert.equal(new BN(aliceBalanceAfter).toString(), new BN(aliceBalanceBefore).add(new BN(price)).toString(), "alice's balance should be increased by the price of the project")
    })
    it("should emit an CloseProject event when a project is closed by the employer", async()=> {
        let eventEmitted = false
        var tx = await instance.addProject(name,{from: employer,value:price})
        tx = await instance.pickProject(id,{from: alice})
        tx = await instance.commitProject(id,{from: alice})
        tx = await instance.closeProject(id,{from: employer})
        
        if (tx.logs[0].event == "CloseProject") {
            eventEmitted = true
        }

        assert.equal(eventEmitted, true, 'closing a project does not emit a close project event')
    })



})
