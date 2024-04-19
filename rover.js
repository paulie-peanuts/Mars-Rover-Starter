const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   constructor (position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }
   receiveMessage(message) {
      let commandList = [];

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
               this.position = message.commands[i].value;
               commandList.push(object);
            } else {
               commandList.push({completed:false});
            }
         }
      }
      return {
         "message": message.name,
         "results": commandList, 
      }
   }
}

module.exports = Rover;
