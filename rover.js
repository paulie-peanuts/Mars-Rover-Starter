const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   constructor (position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110
   }
   receiveMessage(message) {
      // console.log(message)
      let commandList = [];
      // if (Array.isArray(message)) {
      //    for (let i=0; i < message.length; i++) {
      //       for (let command in message[i].commands) {
      //          commandList.push(message[i].commands[command])
      //       }
      //    }
      // } else {
      //    for (let command in message.commands) {
      //       commandList.push(message.commands[command])
      //    }
      // }
      // console.log(commandList)
      for (let i=0; i<message.commands.length; i++) {
         if (message.commands[i].commandType === "STATUS_CHECK") {
            let object = {completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}};
            commandList.push(object);
         }
         if (message.commands[i].commandType === "MODE_CHANGE") {
            let object = {completed: true};
            this.mode = message.commands[i].value;
            commandList.push(object);
         }
         if (message.commands[i].commandType === "MOVE") {
            if (this.mode === "NORMAL") {
               let object = {completed: true};
               this.position = message.commands[i].value
               // console.log("hi")
               commandList.push(object);
            } else {
               commandList.push({completed:false})
            }
         }
      }

      // if (message.commands.commandType.includes("STATUS_CHECK")) {
         // console.log(`position: ${this.position}`)
         // console.log(this.position)
         // console.log(commandList)
      // }
      return {
         "message": message.name,
         "results": commandList, 
      }
   }
}
// let command1 = {commandType: "STATUS_CHECK", value: 5};
// let message1 = {name: "two words", commands: command1};
// let fido = new Rover(55)
// let response1 = fido.receiveMessage(message1)
// console.log(response1.results)
let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 10000)];
let message = new Message('Test message with two commands', commands);
let rover = new Rover(98382);    // Passes 98382 as the rover's position.
let response = rover.receiveMessage(message);
console.log(response);
console.log(rover)
module.exports = Rover;
