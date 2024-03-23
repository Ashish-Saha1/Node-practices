let http = require('http');

let server = http.createServer(function(req,res){
    

    if(req.url === "/"){
        res.write('Connecton Start')
        res.write('Connecton Continue')
        res.end()
    }else if(req.url === "/about-us"){
        res.write('This is a page of including About Us')
        res.end()
    }else{
        res.write('No Data found')
        res.end()
    }
});




// server.on('connection', ()=>{
//     console.log('Connection established')
// })
server.listen(3000);
console.log('Server is running on port no 3000')