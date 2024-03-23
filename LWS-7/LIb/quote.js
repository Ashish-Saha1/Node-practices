
const fs = require('fs');
const quote = {};

quote.allQuote = function(){
    const fileContent = fs.readFileSync(`${__dirname}/quoteData.txt`, 'utf8')
    const quotiArr = fileContent.split(/\r?\n/);
    return quotiArr;
}


 module.exports = quote;

