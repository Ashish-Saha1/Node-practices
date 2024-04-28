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


//Read Data from file

lib.read = function(dir, file, callback){
    fs.readFile(`${lib.baseDir + dir}/${file}.json`,'utf8',(err, data)=>{
            callback(err, data)
    } )
}

// Update Data 

lib.update = function(dir, file, data, callback){
    fs.open(lib.baseDir+dir+"/"+file+".json", "r+", (err, fileDescriptor)=>{
        if(!err && fileDescriptor){
            const stringData = JSON.stringify(data);

            fs.ftruncate(fileDescriptor, (err)=>{
                if(!err){
                    fs.writeFile(fileDescriptor, stringData, (err)=>{
                        if(!err){
                            fs.close(fileDescriptor,(err)=>{
                                if(!err){
                                    callback(false)
                                }else{
                                    callback('file close problem')
                                }
                            })
                        }else{
                            callback("File write problem")
                        }
                    })
                }else{
                    callback("truncate problem")
                }
            })
        }else{
            callback('File can not open')
        }
    })
}

//Delete Data

lib.delete = function(dir,file,callback){
    fs.unlink(lib.baseDir+dir+"/"+file+".json", (err)=>{
        if(!err){
            callback(false)
        }else{
            callback('Problem in deletion')
        }
    })
}


//List all the item in a directory

lib.list = (dir, callback)=>{
    fs.readdir(`${lib.baseDir + dir}/`, (err, fileNames)=>{
        if(!err && fileNames && fileNames.length > 0){
            let trimedFileName = []
            fileNames.forEach((fileName)=>{
                trimedFileName.push(fileName.replace('.json', ""));
                
            })
            callback(false, trimedFileName)
        }else{
            callback('Error reading directory')
        }
    })
}


module.exports = lib;