/**
 * Title: Token Handlar
 * Description:Token Handlar
 * Author: Ashish Saha
 * Date: 2024-04-05
 */

    //depandencies

    const data = require('../../lib/data');
    const utilities = require("../../helper/utilities");
    const { user } = require('../../route');

    //Modele scaffolding

    const handle = {};

    handle.tokenHandlar = (requestProperties, callback)=>{
        const acceptedMothods = ['get', 'post', 'put', 'delete']
            
        if(acceptedMothods.indexOf(requestProperties.method) > -1){
            handle._token[requestProperties.method](requestProperties,callback)
        }else{
            callback(405)
        }
        
    }

    handle._token = {};

    handle._token.post = (requestProperties, callback)=>{
        const phone = typeof(requestProperties.body.phone) === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone: false;

        const password = typeof(requestProperties.body.password) === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password: true;
 
        if(phone && password){
            data.read('users',phone, (err, userData)=>{
                const hashedPassword = utilities.hash(password)
                
                if(!err && userData){
                    if(utilities.parseJson(userData).password === hashedPassword){
                        let tokenId = utilities.createRandomString(20);
                        let expair = Date.now() + 60 *60 *1000;
                        const tokenObject = {
                            phone,
                            token: tokenId,
                            expair
                        }
                      
                        data.create('tokens', tokenId, tokenObject, (err)=>{
                            if(!err){
                                callback(200, tokenObject)
                            }else{
                              
                                callback(400, err,{Error: 'Token create problem'})
                            }
                        })



                    }else{
                        callback(400, {Error: "Password not match"})
                    }
                }else{
                    callback(404, {Error: "May Error or file not found"})
                }
            })
        }else{
            callback(400, {Error: "You have a problem in your side"})
        }

    }

    handle._token.get = (requestProperties, callback)=>{
        const id = typeof(requestProperties.quaryObject.id) === 'string' && requestProperties.quaryObject.id.trim().length === 20 ? requestProperties.quaryObject.id: false;

        if(id){
            data.read('tokens', id, (err, id)=>{
                const toekn = {...utilities.parseJson(id)}
                if(id && !err){
                    callback(200, toekn)
                }else{
                    //callback(404, `error: ${err}`)
                    callback(404, {"Error": "Requested data not found"})
                                      
                }

                //callback(`Error:${err}`, user)
                                
            })
        }else{
            callback(400, {'Error': "A problem found in your request"})
        }
     }

     handle._token.put = (requestProperties, callback)=>{
        const id = typeof(requestProperties.body.id) === 'string' && requestProperties.body.id.trim().length === 20 ? requestProperties.body.id: false;

        const extend = typeof(requestProperties.body.extend) === 'boolean' && requestProperties.body.extend === true ? true : false;

        if(id && extend){
            data.read('tokens', id, (err, tokenData)=>{
                if(!err && tokenData){
                    const tokenObject = utilities.parseJson(tokenData)
                    if(tokenObject.expair > Date.now()){
                        tokenObject.expair = Date.now() + 60 * 60 *1000;
                        data.update('tokens', id, tokenObject,(err)=>{
                            if(!err){
                                callback(200)                    
                            }else{
                                callback(500, {Error: "Update not possible"})
                            }
                        })
                    }else{
                        callback(500, {Error: "Expair Time is over"})
                       
                    }
                }else{
                    callback(400, {Error: "Can't read check you file may not exist"})
                }
            })
        }else{
            callback(400, {Error: "You have a problem to update your token, Check your id & extend validation"})
        }

     }

     handle._token.delete = (requestProperties, callback)=>{
        const id = typeof(requestProperties.quaryObject.id) === 'string' && requestProperties.quaryObject.id.trim().length === 20 ? requestProperties.quaryObject.id: false;

        if(id){
            data.read('tokens', id, (err)=>{
                if(!err){
                    data.delete('tokens',id, (err)=>{
                        if(!err){
                            callback(200, {Message: "Delete Successfully"})
                        }else{
                            callback(500, {Error: "Id deletation problem"})
                        }
                    })
                }else{
                    callback(400, {Error: "Id Not found"})
                }
            })
        }else{
            callback(400, {Error: "Please input valid id "})
        }
     }


     handle._token.verify = (id, phone, callback)=>{
        data.read('tokens', id, (err,tokenData)=>{
            if(!err && tokenData){
                if(utilities.parseJson(tokenData).phone === phone && utilities.parseJson(tokenData).expair > Date.now()){
                    callback(true)
                }else{
                    callback(false)
                }
            }else{
                callback(false)
            }
        })
     }



    module.exports= handle;