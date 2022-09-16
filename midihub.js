const mapping = new Map();
const midihub = {
    
    addMapping: function (ccvalue, callback){
        mapping.set(ccvalue, callback);
    },
    newMessage: function (message){
        if (mapping.has(message[1])){
            mapping.get(message[1])(message[2]);
        };
    }
};
module.exports = midihub;
