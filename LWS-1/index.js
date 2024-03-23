// const EventEmitter = require('events');

// const emitter = new EventEmitter;
const schoolPeriod = require("./school");
const emitterClass = new schoolPeriod;

emitterClass.on('bell',({period, text})=>{
    console.log(`Running while bell ringing ${period} ${text}`)})



emitterClass.schoolPeriod()
