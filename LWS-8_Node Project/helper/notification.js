/**
 * Title: Notifications library
 * Description: important function to notify users
 * Author: Ashish Saha
 * Date: 2024-04-22
 */

//Dependancies

const https = require('https');
// const { type } = require('os');
const { twilio } = require('./environment');
const querystring = require('querystring')


//Module scaffolding

const notifications =  {};


//send sms to using twilio api

notifications.sendTwilioSms = (phone, msg, callback)=>{
    const userPhone = typeof(phone) === 'string' && phone.trim().length === 11 ? phone.trim : false;
    const userMsg = typeof(msg) === 'string' && msg.trim().length > 0 && msg.trim().length <= 1600 ? msg.trim() : false;

    if(userPhone && userMsg){
    //configure the request payload
        const payload = {
            from: twilio.fromPhone,
            to:`+88${userPhone}`,
            body: userMsg,
        }

        // stringify Payload
        const payloadStringify = querystring.stringify(payload);

        //  configured request object details

        const requestDetails = {
            hostname: 'api.twilio.com',
            method: "POST",
            path: `/2010-04-01/Accounts/${twilio.accountSid}/Messages.json`,
            auth: `${twilio.accountSid}:${twilio.authToken}`,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
 
        }

        // instantiate the request object

        const req = https.request(requestDetails, (res)=>{
            const status = res.statusCode;
            if(status === 200 || status === 201){
                callback(false)
            }else{
                callback(`Status code returned was ${status}`)
                console.log(twilio.accountSid);
                
            }
        })

        req.on('Error', (e)=>{
            callback(e)
        });

        req.write(payloadStringify);
        req.end();

    }else{
        callback('Given parameter was invalid or missing line-25')
    }
}



//Export module

module.exports = notifications;