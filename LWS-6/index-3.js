const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=>{
    const ourReadableStream = fs.createReadStream(`${__dirname}/book.txt`, 'utf8');
    ourReadableStream.pipe(res)
})


server.listen(3000);

console.log('Server from index-3.js is Running')