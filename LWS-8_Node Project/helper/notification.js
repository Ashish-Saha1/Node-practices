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

        // request object configured details

        const requestDetails = {
            
        }


    }else{
        callback('Given parameter was invalid or missing line-25')
    }
}



//Export module

module.exports = notifications;