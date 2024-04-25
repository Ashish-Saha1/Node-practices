/**
 * Title: Environment Variable
 * Description: To Handle all environment variable
 * Author: Ashish Saha
 * Date: 2024-03-29
 */

//Dependancies


//Module Scaffolding

const environments = {};


environments.staging = {
    envName: "staging-Check", // Name is not environments.staging is working
    port: 3000,
    secretKey: "ieurieuriueir",
    maxChecks: 5,
    twilio: {
        fromPhone: '+15005550006',
        accountSid: '',
        authToken: ''
    }
}

environments.production = {
    envName: "production-Check",
    port: 5000,
    secretKey: "dfdfdfdfdfdfd",
    maxChecks: 5,
    twilio: {
        fromPhone: '+15005550006',
        accountSid: '',
        authToken: ''
    }
}


//current environmemt

const currentEnv = typeof(process.env.NODE_ENV) === 'string'? process.env.NODE_ENV: 'staging';

// Environment To Export

const EnvironmentToExport = typeof(environments[currentEnv]) === 'object'? environments[currentEnv] :environments.staging;

//exports\

module.exports = EnvironmentToExport;