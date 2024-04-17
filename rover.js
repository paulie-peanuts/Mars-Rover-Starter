class Rover {
   constructor (position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110
   }
   receiveMessage(message) {
      // console.log(message)
      let commandList1 = [];
      for (command in message.commands) {
         commandList1.push(message.commands[command])
      }
      // console.log(commandList)
      return {
         "message": message.name,
         "results": commandList1,
      }
   }
}
let command = {commandType: "hi", "value": 5};
let message = {"name": "two words", "commands": command};
let fido = new Rover(55)
let response = fido.receiveMessage(message)
console.log(response)
module.exports = Rover;