/**
 * Title: Not found Handlar
 * Description:Not found Handlar
 * Author: Ashish Saha
 * Date: 2024-03-24
 */

    //Modele scaffolding

    const handle = {};

    handle.notFoundHandlars = (requestProperties, callback)=>{
        //console.log(requestProperties);
        callback(500, {
            'message': 'Requested URL was not found'
        })
    }



    module.exports= handle ;