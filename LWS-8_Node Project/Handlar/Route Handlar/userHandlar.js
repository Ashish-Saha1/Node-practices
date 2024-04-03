/**
 * Title: User Handlar
 * Description:User Handlar
 * Author: Ashish Saha
 * Date: 2024-04-02
 */

    //depandencies

    const data = require('../../lib/data');
    const utilities = require("../../helper/utilities")

    //Modele scaffolding

    const handle = {};

    handle.userHandlar = (requestProperties, callback)=>{
        const acceptedMothods = ['get', 'post', 'put', 'delete']
            
        if(acceptedMothods.indexOf(requestProperties.method) > -1){
            handle._user[requestProperties.method](requestProperties,callback)
        }else{
            callback(405)
        }
        
    }

    handle._user = {};

    handle._user.post = (requestProperties, callback)=>{
       const firstName = typeof(requestProperties.body.firstName) === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName: false;

       const lastName = typeof(requestProperties.body.lastName) === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName: false;

       const phone = typeof(requestProperties.body.phone) === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone: false;

       const password = typeof(requestProperties.body.password) === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password: false;

       const tosAgreement = typeof(requestProperties.body.tosAgreement) === 'boolean' && requestProperties.body.tosAgreement.trim().length > 0 ? requestProperties.body.tosAgreement: false;

       if(firstName && lastName && phone && password && tosAgreement){
            //Make sure user does not already exit
            data.read(('users',phone, (err)=>{
                if(err){
                    const userObject = {
                        firstName,
                        lastName,
                        phone,
                        password : utilities.hash(password),
                        tosAgreement
                    }

                    data.creare('users', phone, userObject, (err)=>{
                        if(!err){
                            callback(200, {mess: 'user was created successfully'})
                        }else{
                            callback(500, {Err: "Server side Error"} )
                        }
                    })

                }else{
                    callback(500, {
                        error: 'There was a problem in server side'

                    })
                }
            }))


           callback('Hellow');
            

       }else{
            callback(400, {
                error: "You have a problem in your request"
            })
       }


    }

    handle._user.get = (requestProperties, callback)=>{
        
     }

     handle._user.put = (requestProperties, callback)=>{
        
     }

     handle._user.delete = (requestProperties, callback)=>{
        
     }

    module.exports= handle;