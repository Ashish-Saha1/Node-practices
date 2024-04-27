
/**
 * Title: Server File
 * Description: Server related file
 * Author: Ashish Saha
 * Date: 2024-04-27
 */



//Dependancies

const http = require('http');

const {handleReqRes} = require('../helper/handleReqRes');





//server object - Module Scaffolding

const server = {};

server.config = {
    port : 3000,
}

//Server Create

server.serverCreate = function(){
    const createServerVariable = http.createServer(server.handleReqRes);
    createServerVariable.listen(server.config.port, ()=>{
      
        console.log(`Listening to port no ${server.config.port}`)
    })
}

server.handleReqRes = handleReqRes;

server.init = ()=>{
    server.serverCreate()
};

//Exports
 module.exports = server;

