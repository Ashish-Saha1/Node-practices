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
    
        //LookUp the user phone read the token
        data.read('tokens', token, (err, tokenData)=>{
            if(!err && tokenData){
                const userPhone = utilities.parseJson(tokenData).phone;
                // Lookup the user Data
                data.read('users', userPhone, (err, userData)=>{
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
                                callback(403, {'Error': "Authentication problem Line-58"}) 
                            }
                        })
                    }else{
                        callback(403, {'Error': "User not found line-56"})
                        console.log(user);
                        
                    }
                })
            }else{
                callback(403, {'Error': "Authentication problem Line-52"})
                
                
            } 
            })
        


       }else{
        callback(400, {'Error': "A problem found in your Input"})
        console.log(protocol, url, method, successCode, timeOutSecond);
       }


console.log('ok')
    }



    handle._check.get = (requestProperties, callback)=>{
        const id = typeof(requestProperties.quaryObject.id) === 'string' && requestProperties.quaryObject.id.trim().length === 20 ? requestProperties.quaryObject.id: false;

        if(id){
            data.read('checks', id, (err, checkData)=>{
                if(!err && checkData){
                    let token = typeof(requestProperties.headersObject.token) === 'string'? requestProperties.headersObject.token : false;

                tokenHandlar._token.verify(token, utilities.parseJson(checkData).userPhone, (tokenIsValid)=>{
                    if(tokenIsValid){
                        callback(200, utilities.parseJson(checkData))
                    }else{
                        callback(403, {'Error': "Authentication Failur line-139"})
                     
                    }

                    })
                }else{
                    callback(500, {'Error': "You have a problem in your request line-133"})
                }
            })
        }else{
            callback(500, {'Error': "You have a problem in your request line-133"})
                                        
        }


     }


     handle._check.put = (requestProperties, callback)=>{    
        const id = typeof(requestProperties.body.id) === 'string' && requestProperties.body.id.trim().length === 20?requestProperties.body.id:false;

        const protocol = typeof(requestProperties.body.protocol) === 'string' && ['http','https'].indexOf(requestProperties.body.protocol)> -1? requestProperties.body.protocol:false;

       const url = typeof(requestProperties.body.url) === 'string' && requestProperties.body.url.trim().length > 0 ? requestProperties.body.url:false;

       const method = typeof(requestProperties.body.method) === 'string' && ['POST','GET','PUT','DELETE'].indexOf(requestProperties.body.method) > -1 ? requestProperties.body.method:false;

       const successCode = typeof(requestProperties.body.successCode) === 'object' && requestProperties.body.successCode instanceof Array? requestProperties.body.successCode: false;

       const timeOutSecond = typeof(requestProperties.body.timeOutSecond) === 'number' && requestProperties.body.timeOutSecond % 1 === 0 && requestProperties.body.timeOutSecond >= 1 && requestProperties.body.timeOutSecond <= 5? requestProperties.body.timeOutSecond: false;

       if(id){
            if(protocol || url || method || successCode || timeOutSecond){
                data.read('checks', id, (err, checkData)=>{
                    if(!err && checkData){
                        let token = typeof(requestProperties.headersObject.token) === 'string'? requestProperties.headersObject.token : false;
                        let checkObject = utilities.parseJson(checkData);
                        tokenHandlar._token.verify(token, checkObject.userPhone, (tokenIsValid)=>{
                            if(tokenIsValid){
                                if(protocol){
                                    checkObject.protocol = protocol;
                                }
                                if(url){
                                    checkObject.url = url;
                                }
                                if(method){
                                    checkObject.method = method;
                                }
                                if(successCode){
                                    checkObject.successCode = successCode;
                                }
                                if(timeOutSecond){
                                    checkObject.timeOutSecond = timeOutSecond;
                                }

                                //Store the checkobject
                                data.update('checks', id, checkObject, (err)=>{
                                    if(!err){
                                        callback(200)
                                    }else{
                                        callback(500, {'Error': "Server side error to update data line-199"}) 
                                    }
                                })
                            }else{
                                callback(403, {'Error': "Authentication failure line-180"}) 
                            }
                        })
                    }
                } )
            }else{
                callback(500, {'Error': "You have to provide at least one field line-176"}) 
            }
       }else{
        callback(500, {'Error': "You have a problem in your request-ID line-173"})
       }


     }

     handle._check.delete = (requestProperties, callback)=>{
        const id = typeof(requestProperties.quaryObject.id) === 'string' && requestProperties.quaryObject.id.trim().length === 20 ? requestProperties.quaryObject.id: false;

        if(id){
            data.read('checks', id, (err, checkData)=>{
                if(!err && checkData){
                    let token = typeof(requestProperties.headersObject.token) === 'string'? requestProperties.headersObject.token : false;

                tokenHandlar._token.verify(token, utilities.parseJson(checkData).userPhone, (tokenIsValid)=>{
                    if(tokenIsValid){
                        data.delete('checks', id, (err)=>{
                            if(!err){
                                
                                data.read('users', utilities.parseJson(checkData).userPhone, (err, userData)=>{
                                    let userObject = utilities.parseJson(userData);
                                    if(!err && userData){
                                        const userChecks = typeof(userObject.checks) === 'object' && userObject.checks instanceof Array ? userObject.checks: [];

                                        if(userChecks.indexOf(id) > -1){
                                            userChecks.splice(userChecks.indexOf(id), 1)
                                            //resave the data
                                            userObject.checks = userChecks;
                                            data.update('users',userObject.phone, userObject, (err)=>{
                                                if(!err){
                                                    callback(200)
                                                }else{
                                                    callback( 500,'Error: {"Server error line-244"}')
                                                }
                                            })
                                        }else{
                                            callback( 500,'Error: {"No ID exits or not match"}')
                                        }
                                    }else{
                                        callback(500, {'Error': "Server Problem Line-236"}) 
                                    }

                                })
                            }else{
                                callback(500, {'Error': "Server Problem "})
                            }
                        })
                    }else{
                        callback(403, {'Error': "Authentication Failur "})
                     
                    }

                    })
                }else{
                    callback(500, {'Error': "You have a problem in your request "})
                }
            })
        }else{
            callback(500, {'Error': "You have a problem in your request "})
                                        
        }
     }


    module.exports= handle;