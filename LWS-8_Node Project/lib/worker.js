
/**
 * Title: worker File
 * Description: worker related file
 * Author: Ashish Saha
 * Date: 2024-04-27
 */



//Dependancies






//worker object - Module Scaffolding

const worker = {};

//Lookup all the check
worker.getherAllChecks = ()=>{
    
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

