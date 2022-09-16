const midi = require('midi');
const fs = require('fs');
const { Console } = require('node:console');
const config = require('config');
const hub = require('./midihub.js');
const portNum = config.get('midi.port');

const mormalmidi = {
     init : function (){
        console.log(`midi port from config ${config.mormalmidi.midi.port}`);

        var portName = "";
        const input = new midi.Input(); 
        
        var count = input.getPortCount();
        
        const output = fs.createWriteStream(config.get('mormalmidi.logging.std'));
        const errorOutput = fs.createWriteStream(config.get('mormalmidi.logging.err'));
        // Custom simple logger
        const logger = new Console({ stdout: output, stderr: errorOutput });
        
        for (i = 0; i < count; i++){
           logger.log(input.getPortName(i));
        }
        
        input.on('message', (_, message) => {
            if (config.get('logging.debug')){
                console.log(message)
            }
            hub.newMessage(message);
        })
        
        portName = input.getPortName(portNum);
        logger.log(`Opening port: ${portName}`)
        console.log(`Opening port: ${portName}`)
        input.openPort(0);
    },

    addMapping : function (cc, callback){
        hub.addMapping(cc, callback);
    },

    close : function(){
        input.closePort();
    }
}

module.exports = mormalmidi;
