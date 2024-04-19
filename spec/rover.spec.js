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
    let woof = new Message("good boy", dog);
    let driver = new Rover(555);
    let response = driver.receiveMessage(woof);
    expect(response.message).toContain("good boy");
  });
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(message.commands.length);
  });  
  it("responds correctly to the status check command", function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results[0].roverStatus).toEqual({mode: rover.mode, generatorWatts: rover.generatorWatts, position: rover.position});
  });  
  it("responds correctly to the mode change command", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toEqual(true);
    expect(rover.mode).toEqual(commands[0].value);
  });  
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 10)];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results[1].completed).toEqual(false);
  });  
  it("responds with the position for the move command", function() {
    let commands = [new Command('MODE_CHANGE', 'NORMAL'), new Command('MOVE', 10)];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover();
    let response = rover.receiveMessage(message);
    expect(message.commands[1].value).toEqual(rover.position);
  });  
});
