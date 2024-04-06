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
            data.read('users',phone, (err, userD)=>{
                let userData= utilities.parseJson(userD);
                if(!err && userData){
                    if(userData.password === utilities.hash(password)){
                        let tokenId = createRandomString(20);
                        let expair = Date.now() + 60 *60 *1000;
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
        
     }

     handle._token.put = (requestProperties, callback)=>{
        



     }

     handle._token.delete = (requestProperties, callback)=>{
       
     }


    module.exports= handle;