const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {


  it("constructor sets position and default values for mode and generatorWatts", function() {
    let instructionsBase = new Rover(55555);
    expect(instructionsBase.position).toEqual(55555);
    expect(instructionsBase.mode).toEqual('NORMAL');
    expect(instructionsBase.generatorWatts).toEqual(110);
  });
  it("response returned by receiveMessage contains the name of the message", function() {
    let dog = new Command("sit", 5);
    let woof = new Message("good boy", dog)
    let driver = new Rover(555)
    let response = driver.receiveMessage(woof)
    console.log(response)
    expect(response.message).toContain("good boy");
  });
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let dog = new Command("sit", 5);
    let woof = new Message("good boy", dog)
    let driver = new Rover(555)
    let response = driver.receiveMessage(woof)
    console.log(response)
    expect(response.results.length).toEqual(Object.keys(woof.commands).length);
  });  

});
