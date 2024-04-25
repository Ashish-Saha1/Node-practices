
//Dependancies

const http = require('http');

const {handleReqRes} = require('./helper/handleReqRes');
const environments = require('./helper/environment');
const data = require('./lib/data');
const { sendTwilioSms } = require('./helper/notification');


//App object - Module Scaffolding

const app = {};

//For check & delete next time

sendTwilioSms('01717712627', "Hellow world", (err)=>{
    console.log('The Error was', err);
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



