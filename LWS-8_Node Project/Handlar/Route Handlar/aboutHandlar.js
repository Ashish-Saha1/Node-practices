/**
 * Title: About Handlar
 * Description:About Handlar
 * Author: Ashish Saha
 * Date: 2024-03-24
 */

    //Modele scaffolding

    const handle = {};

    handle.aboutHandlar = (requestProperties, callback)=>{
        //console.log(requestProperties);
        callback(200, {
            'message': 'This is a sample URL For about Handlar'
        })
    }



    module.exports= handle ;