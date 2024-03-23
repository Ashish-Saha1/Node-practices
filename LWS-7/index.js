//Dependancies
const math = require('./LIb/math');
const quote = require('./LIb/quote');

// App object - Module scaffolding
const app = {};

// configuration 
    app.config = {
        timeBetweenQuotes: 1000
    }

    //Function That prints a random number
    app.printQuote = function(){
        const quoteLength = quote.allQuote().length-1;
        const randomNumber = math.randomNumber(0, quoteLength);
       
       const randomQuote = quote.allQuote()[randomNumber];
       console.log(randomQuote)
        
        
    }
        //console.log(app.printQuote())
 

    app.infiniteLoop = function printQuote(){
        setInterval(() => {
            app.printQuote()
        }, app.config.timeBetweenQuotes);
    }

    app.infiniteLoop()