// let fs = require('fs');

// let readFile = fs.createReadStream(`${__dirname}/book.txt`);


// readFile.on('data', (chunk)=>{
//     console.log(chunk.toString())
// })

const http = require('http');


const server = http.createServer((req, res)=> {
        if(req.url === "/"){
            res.write('<html><head><title>Form</title></head>');
            res.write(`<body><form method= "post" action='/process'><input name='message'></form></body>`);
            res.end()
        }else if(req.url === "/process" && req.method === "POST"){
            let body = [];
            req.on('data', (chunks)=>{
                body.push(chunks)
            })
            req.on('end',()=>{
                console.log('Streaming End')
               const showBuffer = Buffer.concat(body).toString();
               console.log(showBuffer)

               res.write('Thanks For submit');
            res.end()
            })
            
        }else{
            res.write("Not Found")
            res.end()
        }
}); 

server.listen(3000)

console.log('Server is runnign port 3000')