
/**
 * Title: worker File
 * Description: worker related file
 * Author: Ashish Saha
 * Date: 2024-04-27
 */



//Dependancies
const data = require('./data');
const { parseJson } = require('../helper/utilities')





//worker object - Module Scaffolding

const worker = {};

//Lookup all the check
worker.getherAllChecks = ()=>{
    data.list('checks', (err, checks)=>{
        if(!err && checks && checks.length > 0){
            checks.forEach((check)=>{
                //Read the check data
                data.read('check', (err, orginalCheckData)=>{
                    if(!err && orginalCheckData){
                        // Pass the data to the validator function
                        worker.validateCheckData(parseJson(orginalCheckData))
                    }else{
                        console.log('Error: Reading one of the check data');
                    }
                })
            })
        }else{
            console.log('Error: Could not find any checks to process');
        }
    })
}


// Validate the Data

worker.validateCheckData = ()=>{
    
}


//Timer to execute worket process once a munute
    worker.loop = ()=>{
        setInterval(() => {
            worker.getherAllChecks()
        }, 1000*60);
    }

//start the worker
worker.init = ()=>{
    //lookup all the checks
    worker.getherAllChecks();

    //Call the loop so that checks continue
    worker.loop()
};

//Exports
 module.exports = worker;

