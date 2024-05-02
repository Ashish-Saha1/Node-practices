
/**
 * Title: worker File
 * Description: worker related file
 * Author: Ashish Saha
 * Date: 2024-04-27
 */



//Dependancies
const http = require('http');
const https = require('https');
const url = require('url')
const data = require('./data');
const { parseJson } = require('../helper/utilities');
const { sendTwilioSms } = require('../helper//notification')





//worker object - Module Scaffolding

const worker = {};

//Lookup all the check
worker.getherAllChecks = ()=>{
    data.list('checks', (err, checks)=>{
        if(!err && checks && checks.length > 0){
            checks.forEach((check)=>{
                //Read the check data
                data.read('checks', check, (err, orginalCheckData)=>{
                    if(!err && orginalCheckData){
                        // Pass the data to the validator function
                        worker.validateCheckData(parseJson(orginalCheckData))
                    }else{
                        console.log('Error: Reading one of the check data');
                    }
                });
            })
        }else{
            console.log('Error: Could not find any checks to process');
        }
    })
}


// Validate the Data

worker.validateCheckData = (orginalCheckData)=>{
    if(orginalCheckData && orginalCheckData.id){
        orginalCheckData.state = typeof(orginalCheckData.state) === 'string' && ['up', 'down'].indexOf(orginalCheckData.state) > -1 ? orginalCheckData.state: 'down';

        orginalCheckData.lastChecked = typeof(orginalCheckData.lastChecked) === 'number' && orginalCheckData.lastChecked > 0 ? orginalCheckData.lastChecked : false;

        // Pass to the next function
        worker.performCheck(orginalCheckData)
    }else{
        console.log('Error: check was invalid or no ID found' );
    }
}

//To check Perform

worker.performCheck = (orginalCheckData)=>{
    let checkOutCome = {
        error: false,
        responseCode: false
    }

    let outCome = false;

    //Parse the hostname & the full url from the orginalCheckData
    const parsedUrl = url.parse(`${orginalCheckData.protocol} + '://' + ${orginalCheckData.url}`, true);
    const hostName = parsedUrl.host;
    const path = parsedUrl.path;

    //Construst the request
    const requestDetails = {
        'protocol': orginalCheckData.protocol + ":",
        'hostName': hostName,
        'method': orginalCheckData.method.toUpperCase(),
        'path': path,
        'timeOut': orginalCheckData.timeOutSecond * 1000,
    }

   const protocolSet = orginalCheckData.protocol === 'http' ? http : https;

   const req = protocolSet.request(requestDetails, (res)=>{
        //grab the status 
        const status = res.statusCode;

        // Update the checkPutCome & pass to the next function
        checkOutCome.responseCode = status;
        if(!outCome){
            worker.processCheckOutCome(orginalCheckData, checkOutCome);
            outCome = true;
        }

    })

    req.on('error', (e)=>{
        checkOutCome = {
            error: true,
            value: e,
        }
        // Update the checkPutCome & pass to the next function
        worker.processCheckOutCome(orginalCheckData, checkOutCome);
        outCome = true;
    })

    req.on('timeOut', (e)=>{
        checkOutCome = {
            error: true,
            value: 'timeOut',
        }
        // Update the checkPutCome & pass to the next function
        worker.processCheckOutCome(orginalCheckData, checkOutCome);
        outCome = true;
    })

    //Request send
    req.end()

   
}

    //Save check outcome to database & send to next process
worker.processCheckOutCome = (orginalCheckData, checkOutCome)=>{
    //Check if outCome is up or down;
    let state = !checkOutCome.error && checkOutCome.responseCode && orginalCheckData.statusCode.indexOf(checkOutCome.responseCode) > -1 ? 'up' : 'down';

    const alertWanted = orginalCheckData.lastChecked && orginalCheckData.state !== state ? true : false;

    //update the check data

    let newCheckData = orginalCheckData;
        newCheckData.state = state;
        newCheckData.lastChecked = Date.now()

        //Save the data

    data.update('checks', newCheckData.id, newCheckData, (err)=>{
        if(!err){
            //Sent the check data to next process
           if(alertWanted){
            worker.alertUserToStatusChange(newCheckData)
           }else{
            console.log('Alert is not needed as there is not status chenge');
            console.log(orginalCheckData.state, state, !checkOutCome.error,checkOutCome.responseCode);
           }
        }else{
            console.log('Error: trying to save check data of one of the checks');
        }
    })


}

//send notification(sms) to users if status is changed
worker.alertUserToStatusChange = (newCheckData)=>{
    const msg = `Alert: Your check for ${newCheckData.method} link ${newCheckData.protocol}://${newCheckData.url}  is currently ${newCheckData.state}`;

    sendTwilioSms(newCheckData.userPhone, msg, (err)=>{
        if(!err){
            console.log(`User was alerted through SMS ${msg}` );
        }else{
            console.log('There was a problem to sending sms to users');
            console.log(err);
        }
    })
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

