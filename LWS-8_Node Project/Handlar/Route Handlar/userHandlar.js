/**
 * Title: User Handlar
 * Description:User Handlar
 * Author: Ashish Saha
 * Date: 2024-04-02
 */

    //Modele scaffolding

    const handle = {};

    handle.userHandlar = (requestProperties, callback)=>{
        const acceptedMothods = ['get', 'post']
            
        if(acceptedMothods.indexOf(requestProperties.method) > -1){
            handle._user[requestProperties.method](requestProperties,callback)
        }else{
            callback(405)
        }
        
    }

    handle._user = {};

    handle._user.get = (requestProperties, callback)=>{
       callback(200)
    }

    handle._user.post = (requestProperties, callback)=>{
        
     }

     handle._user.put = (requestProperties, callback)=>{
        
     }

     handle._user.delete = (requestProperties, callback)=>{
        
     }

    module.exports= handle;