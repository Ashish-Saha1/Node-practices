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


 lib.baseDir = path.join(__dirname, "/../.data/")

//Write Data to file

lib.create = function(dir, file, data, callback){

    fs.open(`${lib.baseDir + dir}/${file}.json`, 'wx', (err1, fileDescriptor)=>{
            if(!err1 && fileDescriptor){
                const stringData = JSON.stringify(data);
                //Write data to file & close it
            fs.writeFile(fileDescriptor, stringData, (err2)=>{
                if(!err2){
                    fs.close(fileDescriptor, (err3)=>{
                        if(!err3){
                            callback(false)
                        }else{
                            callback('Error closing the new file');
                            
                        }
                    })
                }else{
                    callback('Error Writing to a new file')
                    
                }
            })
                



            }else{
                callback('Could not found file, may it already exits')
                
            }
    })
}

// lib.create = (dir, file, data, callback)=>{
//     fs.open(lib.baseDir+dir+'/'+file+'.json', 'wx', (err1, fileDescriptor)=>{
//         if(!err1 && fileDescriptor){
//             const stringData = JSON.stringify(data);
//             fs.writeFile(fileDescriptor, stringData, (err2)=>{
//                 if(!err2){
//                     fs.close(fileDescriptor, (err3)=>{
//                         if(!err3){
//                             callback(false)
//                         }else{
//                             callback(err3)
//                         }
//                     })
//                 }else{
//                     callback(err2)
//                 }
//             })
//         }else{
//             callback(err1) 
//         }
//     })
// }

module.exports = lib;