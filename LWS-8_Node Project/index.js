
/**
 * Title: Initial File
 * Description: initail file to statrt server & worker
 * Author: Ashish Saha
 * Date: 2024-04-27
 */



//Dependancies

const server = require('./lib/server');
const worker = require('./lib/worker');


//App object - Module Scaffolding

const app = {};

app.init = ()=>{
    // start the server
    server.init()

    //start the worker

    worker.init()
}


app.init();

module.exports = app;



