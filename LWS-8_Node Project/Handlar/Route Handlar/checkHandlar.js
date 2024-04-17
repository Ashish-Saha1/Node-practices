/**
 * Title: Check Handlar
 * Description: Handlar to handle user define checks
 * Author: Ashish Saha
 * Date: 2024-04-16
 */

    //depandencies

    const data = require('../../lib/data');
    const utilities = require("../../helper/utilities");
    const { user } = require('../../route');
    const tokenHandlar = require("./tokenhandlar");

    //Modele scaffolding

    const handle = {};

    handle.checkHandlar = (requestProperties, callback)=>{
        const acceptedMothods = ['get', 'post', 'put', 'delete']
            
        if(acceptedMothods.indexOf(requestProperties.method) > -1){
            handle._check[requestProperties.method](requestProperties,callback)
        }else{
            callback(405)
        }
        
    }

    handle._check = {};

    handle._check.post = (requestProperties, callback)=>{
       // Validates inputes
       const protocol = typeof(requestProperties.body.protocol) === 'string' && ['http','https'].indexOf(requestProperties.body.protocol)> -1? requestProperties.body.protocol:false;

       const url = typeof(requestProperties.body.url) === 'string' && requestProperties.body.url.trim().length > 0 ? requestProperties.body.url:false;

       const method = typeof(requestProperties.body.method) === 'string' && ['post','get','put','delete'].indexOf(requestProperties.body.method) > -1 ? requestProperties.body.method:false;

       const successCode = typeof(requestProperties.body.successCode) === 'object' && requestProperties.body.successCode instanceof Array? requestProperties.body.successCode: false;

       const timeOutSecond = typeof(requestProperties.body.timeOutSecond) === 'number' && requestProperties.body.timeOutSecond % 1 === 0 && requestProperties.body.timeOutSecond >= 1 && requestProperties.body.timeOutSecond <= 5? requestProperties.body.timeOutSecond: false;

       if(protocol && url && method && successCode && timeOutSecond){
        let token = typeof(requestProperties.headersObject.token) === 'string'? requestProperties.headersObject.token : false;
        
        //LookUp


       }else{
        callback(400, {'Error': "A problem found in your Input"})
       }






    }

    handle._check.get = (requestProperties, callback)=>{
       
     }


     handle._check.put = (requestProperties, callback)=>{
        



     }

     handle._check.delete = (requestProperties, callback)=>{
       
     }


    module.exports= handle;