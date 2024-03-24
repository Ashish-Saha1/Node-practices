
const myFun = require("./school");


const eventsEmitter = require('events');

const emits = new eventsEmitter;

emits.on('bell', ({first,secoend})=>{
    console.log(`start Class ${first} & ${secoend}`);
    
})


myFun()


