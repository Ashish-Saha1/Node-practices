
//Dependancies

const http = require('http');

const {handleReqRes} = require('./helper/handleReqRes');
const environments = require('./helper/environment');
const data = require('./lib/data')
// const { log } = require('console');
// const { compact } = require('lodash');

//App object - Module Scaffolding

const app = {};

// configuration

// app.config = {
//     port: 3000
// };

// File write Testing

data.create('test', 'NewFile', {'name': 'Bangladesh', 'language': 'Bangla'}, (error)=>{
    console.log('Error is', error);
})


//Server Create

app.serverCreate = function(){
    const server = http.createServer(app.handleReqRes);
    server.listen(environments.port, ()=>{
        console.log(`Node environment is running in production port ${environments.port}`)
        console.log(`Server is running on port no ${environments.port}`)
    })
}

app.handleReqRes = handleReqRes;

app.serverCreate();



