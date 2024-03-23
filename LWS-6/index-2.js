//Write Stream

let fs = require('fs');

let readFile = fs.createReadStream(`${__dirname}/book.txt`);
let writestreamFile = fs.createWriteStream(`${__dirname}/output.txt`);


readFile.on('data', (chunk)=>{
    writestreamFile.write(chunk)
})