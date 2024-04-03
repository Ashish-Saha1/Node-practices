/**
 * Title: Utilities
 * Description:Utilities
 * Author: Ashish Saha
 * Date: 2024-04-03
 */


//Module scaffoling

const utility = {};


    //Parse json string to object validition check
utility.ParseJson = (str)=>{
    let checkStr;
    try{
        checkStr = JSON.parse(str)
    }catch{
        checkStr = {}
    }

    return checkStr;
}

module.exports = utility;