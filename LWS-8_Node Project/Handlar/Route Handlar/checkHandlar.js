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
    const {maxChecks} = require('../../helper/environment')

    //Modele scaffolding

    const handle = {};

    handle.checkHandlar = (requestProperties, callback)=>{
        const acceptedMothods = ['get', 'post', 'put', 'delete']
            
        if(acceptedMothods.indexOf(requestProperties.method) > -1){
            handle._check[requestProperties.method](requestProperties,callback)
        }else{
            callback(405, {Error: 'Method not allowed'})
            console.log(`Error is ${requestProperties.method}`);
            console.log(acceptedMothods.indexOf(requestProperties.method))
        }
        
    }

    handle._check = {};

    handle._check.post = (requestProperties, callback)=>{
       // Validates inputes
       const protocol = typeof(requestProperties.body.protocol) === 'string' && ['http','https'].indexOf(requestProperties.body.protocol)> -1? requestProperties.body.protocol:false;

       const url = typeof(requestProperties.body.url) === 'string' && requestProperties.body.url.trim().length > 0 ? requestProperties.body.url:false;

       const method = typeof(requestProperties.body.method) === 'string' && ['POST','GET','PUT','DELETE'].indexOf(requestProperties.body.method) > -1 ? requestProperties.body.method:false;

       const successCode = typeof(requestProperties.body.successCode) === 'object' && requestProperties.body.successCode instanceof Array? requestProperties.body.successCode: false;

       const timeOutSecond = typeof(requestProperties.body.timeOutSecond) === 'number' && requestProperties.body.timeOutSecond % 1 === 0 && requestProperties.body.timeOutSecond >= 1 && requestProperties.body.timeOutSecond <= 5? requestProperties.body.timeOutSecond: false;

       if(protocol && url && method && successCode && timeOutSecond){
        let token = typeof(requestProperties.headersObject.token) === 'string'? requestProperties.headersObject.token : false;
        console.log(protocol);
        //LookUp the user phone read the token
        data.read('tokens', token, (err, tokenData)=>{
            if(!err && tokenData){
                const userPhone = utilities.parseJson(tokenData).phone;
                // Lookup the user Data
                data.read('users', user, (err, userData)=>{
                    if(!err && userData){
                        tokenHandlar._token.verify(token, userPhone, (tokenIsValid)=>{
                            if(tokenIsValid){
                                const userObject = utilities.parseJson(userData);
                                const userChecks = typeof(userObject.checks) === 'object' && userObject.checks instanceof Array ? userObject.checks: [];

                                if(userChecks.length < maxChecks){
                                    const checkId = utilities.createRandomString(20);
                                    const checkObject = {
                                        id: checkId,
                                        userPhone,
                                        protocol,
                                        url,
                                        method,
                                        successCode,
                                        timeOutSecond
                                    }
                                    //Save the checkObject
                                    data.create('checks', checkId, checkObject, (err)=>{
                                        if(!err){
                                           //Add check check ID to the users objecy
                                           userObject.checks = userChecks;
                                           userObject.checks.push(checkId)

                                           //save the new user data
                                    data.update('users', userPhone, userObject, (err)=>{
                                        if(!err){
                                            callback(200, checkObject)
                                        }else{
                                            callback(500, {'Error': "Server Side problem to update data"})
                                        }
                                    })

                                        }else{
                                            callback(500, {'Error': "Server Side problem"}) 
                                        }
                                    })



                                }else{
                                    callback(403, {'Error': "User has already reach max check limit"}) 
                                }

                            }else{
                                callback(403, {'Error': "Authentication problem"}) 
                            }
                        })
                    }else{
                        callback(403, {'Error': "User not found"})
                    }
                })
            }else{
                callback(403, {'Error': "Authentication problem"})
            } 
            })
        


       }else{
        callback(400, {'Error': "A problem found in your Input"})
        console.log(protocol, url, method, successCode, timeOutSecond);
       }


console.log('ok')
    }



    // handle._check.get = (requestProperties, callback)=>{
       
    //  }


    //  handle._check.put = (requestProperties, callback)=>{
        



    //  }

    //  handle._check.delete = (requestProperties, callback)=>{
       
    //  }


    module.exports= handle;