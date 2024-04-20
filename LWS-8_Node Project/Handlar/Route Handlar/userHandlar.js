/**
 * Title: User Handlar
 * Description:User Handlar
 * Author: Ashish Saha
 * Date: 2024-04-02
 */

    //depandencies

    const data = require('../../lib/data');
    const utilities = require("../../helper/utilities");
    const { user } = require('../../route');
    const tokenHandlar = require("./tokenhandlar");

    //Modele scaffolding

    const handle = {};

    handle.userHandlar = (requestProperties, callback)=>{
        const acceptedMothods = ['get', 'post', 'put', 'delete']
            
        if(acceptedMothods.indexOf(requestProperties.method) > -1){
            handle._user[requestProperties.method](requestProperties,callback)
            console.log(requestProperties.method);
        }else{
            callback(405)
        }
        
    }

    handle._user = {};

    handle._user.post = (requestProperties, callback)=>{
       const firstName = typeof(requestProperties.body.firstName) === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName: false;

       const lastName = typeof(requestProperties.body.lastName) === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName: false;

       const phone = typeof(requestProperties.body.phone) === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone: false;

       const password = typeof(requestProperties.body.password) === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password: true;

       const tosAgreement = typeof(requestProperties.body.tosAgreement) === 'boolean'? requestProperties.body.tosAgreement: false;
        

    if(firstName && lastName && phone && password  && tosAgreement){
        //Make sure user does not already exit
        data.read('users', phone, (err)=>{
         if(err){
            const userObject = {
            firstName,
            lastName,
            phone,
            password : utilities.hash(password),
            tosAgreement
        }
            //Ready to store data
        data.create('users', phone, userObject, (err)=>{
            if(!err){
                callback(200, {mess: 'user was created successfully'})
            }else{
                
                callback(500, {Err: "Server side Error"} )
            }
        })
    }else{
        callback(500, {err: "There was a problem in server side"})
        
    }
})

}else{
    callback(400, {err: "You have a problem in your side"})
    
    }

    }

    handle._user.get = (requestProperties, callback)=>{
        const phone = typeof(requestProperties.quaryObject.phone) === 'string' && requestProperties.quaryObject.phone.trim().length === 11 ? requestProperties.quaryObject.phone: false;

        if(phone){
            // Authentication check
            let token = typeof(requestProperties.headersObject.token) === 'string'? requestProperties.headersObject.token : false; 
            tokenHandlar._token.verify(token, phone, (tokenId)=>{
                if(tokenId){
                    //Lookup 
                data.read('users', phone, (err, u)=>{
                    const user = {...utilities.parseJson(u)}
                    if(user && !err){
                        delete user.password;
                        callback(200, user)
                    }else{
                        callback(404, `error: ${err}`)
                                                         
                    }
                                                     
                });
                }else{
                    callback(403, {Error: "Authentication Failure"})
                   // Here token TokenID declear false or true based on your phonenumber vs id
                    console.log(tokenId);
                }
            })

        }else{
            callback(400, {'Error': "A problem found in your request"})
        }
     }


     handle._user.put = (requestProperties, callback)=>{
        const firstName = typeof(requestProperties.body.firstName) === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName: false;

       const lastName = typeof(requestProperties.body.lastName) === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName: false;

       const phone = typeof(requestProperties.body.phone) === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone: false;

       const password = typeof(requestProperties.body.password) === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password: true;

        if(phone){
           // Authentication check
           let token = typeof(requestProperties.headersObject.token) === 'string'? requestProperties.headersObject.token : false; 
           tokenHandlar._token.verify(token, phone, (tokenId)=>{
               if(tokenId){
                   //Lookup 
           data.read('users',phone, (err, userD)=>{
            let userData = {...utilities.parseJson(userD)};
            if(!err && userData){
                if(firstName){
                    userData.firstName = firstName;
                }

                if(lastName){
                    userData.lastName = lastName;
                }

                if(password){
                    userData.password = utilities.hash(password);
                }

                data.update('users',phone, userData, (err)=>{
                    if(!err){
                        callback(200, {Massege: "Data update successfully"})
                    }else{
                        callback(500, {Error: "server side problem"})
                    }
                })


            }else{
                callback(400, {Error: "User Not found"})
            }
       })


               }else{
                   callback(403, {Error: "Authentication Failure"})
                  // Here token TokenID declear false or true based on your phonenumber vs id
                   console.log(tokenId);
               }
           })
            

          
           


        }else{
            callback(400, {Error: "invalid phone number, please try again"})
        }



     }

     handle._user.delete = (requestProperties, callback)=>{
        const phone = typeof(requestProperties.quaryObject.phone) === 'string' && requestProperties.quaryObject.phone.trim().length === 11 ? requestProperties.quaryObject.phone: false;

        if(phone){
            // Authentication check
            let token = typeof(requestProperties.headersObject.token) === 'string'? requestProperties.headersObject.token : false; 
            tokenHandlar._token.verify(token, phone, (tokenId)=>{
                if(tokenId){
                     //Lookup
            data.read('users', phone, (err)=>{
                if(!err){
                    data.delete('users',phone, (err)=>{
                        if(!err){
                            callback(200, {Message: "Delete Successfully"})
                        }else{
                            callback(500, {Error: "File deletation problem"})
                        }
                    })
                }else{
                    callback(400, {Error: "file Not found"})
                }
            })
               
                }else{
                    callback(403, {Error: "Authentication Failure"})
                   // Here token TokenID declear false or true based on your phonenumber vs id
                    console.log(tokenId);
                }
            })
           
        }else{
            callback(400, {Error: "Please input valid Phone "})
        }
     }


    module.exports= handle;