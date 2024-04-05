
//Dependancies

const http = require('http');

const {handleReqRes} = require('./helper/handleReqRes');
const environments = require('./helper/environment');
const data = require('./lib/data');
const { error } = require('console');


//App object - Module Scaffolding

const app = {};

// configuration

// app.config = {
//     port: 3000
// };

// File write Testing

// data.create('test', 'NewFile', {'name': 'Bangladesh', 'language': 'Bangla'}, (error)=>{
//     console.log('Error is', error);
// })

// File Read

// data.read('test', 'NewFile', (error, result)=>{
//     console.log(error, result);
// })

//File Update

// data.update('test', 'NewFile', {'name': 'India', 'language': 'Hindi'}, (error)=>{
//     console.log('Error is', error);
// })

//File delete

// data.delete('test', 'NewFile', (error)=>{
//     console.log(error)
// })


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



