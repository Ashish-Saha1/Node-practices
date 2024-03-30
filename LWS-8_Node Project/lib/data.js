/**
 * Title: Data File
 * Description: Where the data is saved
 * Author: Ashish Saha
 * Date: 2024-03-30
 */


//Dependancies
const fs = require('fs');
const path = require('path');


//Module scaffolding

const lib = {};


 lib.baseDir = path.join(__dirname, "../.data/")

//Write Data to file

lib.create = function(dir, file, data, callback){

    fs.open(lib.baseDir + dir + '/' + file + '.json'+ 'wx', (err1, fileDescriptor)=>{
            if(!err1 && fileDescriptor){
                const stringData = JSON.stringify(data);
                //Write data to file & close it

                



            }else{
                callback('Could not found file, may it already exits')
            }
    })
}