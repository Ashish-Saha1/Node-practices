const handle = {};

    handle.blankHandlar = (requestProperties, callback)=>{
        //console.log(requestProperties);
        callback(200, {
            'message': 'This is a sample URL For Blank no path'
        })
    }



    module.exports= handle ;