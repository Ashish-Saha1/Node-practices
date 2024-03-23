//Dependancies

const http = require('http');
const url = require('url')

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
    //handle req
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, "")
    const method = req.method.toLowerCase()
    const quaryObject = parseUrl.query
        console.log(quaryObject)






    //handle res
    res.end('Hellow Programars')
}

app.serverCreate();