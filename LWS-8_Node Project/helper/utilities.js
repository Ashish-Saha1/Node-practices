/**
 * Title: Utilities
 * Description:Utilities
 * Author: Ashish Saha
 * Date: 2024-04-03
 */


//Dependancies

const crypto = require('crypto');
const environment = require('./environment')

//Module scaffoling

const utility = {};


    //Parse json string to object validition check
utility.parseJson = (str)=>{
    let checkStr;
    try{
        checkStr = JSON.parse(str)
    }catch{
        checkStr = {}
    }

    return checkStr;
}



utility.hash = (str)=>{
    if(typeof(str) === 'string' && str.length > 0){
        const hash = crypto
        .createHmac('sha256', environment.secretKey)
        .update('str')
        .digest('hex');
        // To show the Hash key in console
        console.log("Hash key:",hash)
        return hash;
    }else{
        return false;
    }
}



utility.createRandomString = (string)=>{
    const probableCharacter = 'abcdefghijklmnopqrstuvwxyz1234567890'
    let output = '';
    for(let i =1; i<=string; i++){
        let random = Math.round(Math.random()*probableCharacter.length)
       output += probableCharacter.charAt(random)
    }

    return output;
}


console.log('');




module.exports = utility;