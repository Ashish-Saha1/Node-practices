// This is for Handle Request & Response

//Dependancies
const url = require('url');
const {StringDecoder} = require('string_decoder') //Its a class
const routes = require('../route');
const {notFoundHandlars} = require('../Handlar/Route Handlar/notFoundHandlars');


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

    const requestProperties = {
        parseUrl,
        path,
        trimmedPath,
        method,
        quaryObject,
        headersObject,

    }
    
    let realData = '';
    const decoder = new StringDecoder('utf-8');

   

    const chosenHandlar = routes[trimmedPath] ? routes[trimmedPath]: notFoundHandlars;

    // chosenHandlar(requestProperties, (statusCode, payload)=>{
    //     statusCode = typeof(statusCode) === 'number'? statusCode: 500;
    //     payload = typeof(payload) === 'object'? payload: {};

    //     const payloadString = JSON.stringify(payload);
    //      res.writeHead(statusCode);
    //      res.end(payloadString);
    // })

    

    req.on('data', (buffer)=>{
        realData += decoder.write(buffer)
    })

    req.on('end', ()=>{
        realData += decoder.end()
    
        chosenHandlar(requestProperties, (statusCode, payload)=>{
            statusCode = typeof(statusCode) === 'number'? statusCode: 500;
            payload = typeof(payload) === 'object'? payload: {};
    
            const payloadString = JSON.stringify(payload);
             res.setHeader("content-Type", "application/json")
             res.writeHead(statusCode);
             res.end(payloadString);
        });

        //res.end('Hellow Programars')
    })




    //handle res
    
}


module.exports = handler;