/**
 * Title: Sample handlar
 * Description:Sample handlar
 * Author: Ashish Saha
 * Date: 2024-03-24
 */

    //Modele scaffolding

    const handle = {};

    handle.sampleHandlar = (requestProperties, callback)=>{
        //console.log(requestProperties);
        callback(200, {
            'message': 'This is a sample URL'
        })
    }



    module.exports= handle ;