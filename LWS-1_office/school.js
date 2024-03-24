const eventsEmitter = require('events');

const emits = new eventsEmitter;

function myFun(){
    console.log('School starts');
 
    setTimeout(() => {
        emits.emit('bell', {
            first: `After ring bell`,
            secoend: "Teachet is coming to join class"
        });
    }, 2000);
    
}

module.exports = myFun;