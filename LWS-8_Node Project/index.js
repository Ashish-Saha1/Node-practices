//Dependancies

const http = require('http');

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

app.handleReqRes = function(req, res){

    //handle res
    res.end('Hellow Programars')
}

app.serverCreate();