
//Math Object module scaffolding

const math = {};

 math.randomNumber = function(min, max){
    let minimum = min;
    let maximum = max;

    minimum === 'number'? minimum: 0;
    maximum === 'number'? maximum: 0;
   return Math.floor(Math.random() * (maximum-minimum +1)+ minimum)
} 

module.exports = math;