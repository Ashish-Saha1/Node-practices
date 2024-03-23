const EventEmitter = require('events');


class MyClass extends EventEmitter{

     schoolPeriod(){
        console.log('School Starting');
    
        setTimeout(() => {
            this.emit('bell', {period: "2nd Period", text: "has finished"})
        }, 2000);
    }
}

module.exports = MyClass;