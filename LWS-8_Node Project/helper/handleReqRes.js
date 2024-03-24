// This is for Handle Request & Response

//Dependancies
const url = require('url');
const {StringDecoder} = require('string_decoder')


// Module Scaffolding

const handler = {};

handler.handleReqRes = function(req, res){
    //handle req
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, "")
    const method = req.method.toLowerCase()
    const quaryObject = parseUrl.query;
    const headersObject = req.headers;
    let realData = '';
    const decoder = new StringDecoder('utf-8');

    req.on('data', (buffer)=>{
        realData += decoder.write(buffer)
    })

    req.on('end', ()=>{
        realData += decoder.end()
      console.log(realData)
        res.end('Hellow Programars')
    })




    //handle res
    
}


module.exports = handler;