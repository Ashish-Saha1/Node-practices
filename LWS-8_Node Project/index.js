
//Dependancies

const http = require('http');

const {handleReqRes} = require('./helper/handleReqRes');
const { log } = require('console');
const { compact } = require('lodash');
//App object - Module Scaffolding

const app = {};

// configuration

app.config = {
    port: 3000
};


//Server Create

app.serverCreate = function(){
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, ()=>{
        console.log(`Server is running on port no ${app.config.port}`)
    })
}

app.handleReqRes = handleReqRes;

app.serverCreate();



