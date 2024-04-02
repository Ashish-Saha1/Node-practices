/**
 * Title: Routes
 * Description: Application Routes
 * Author: Ashish Saha
 * Date: 2024-03-24
 */

//Dependancies
const {sampleHandlar} = require('./Handlar/Route Handlar/sampleHandlar')
const {aboutHandlar} = require('./Handlar/Route Handlar/aboutHandlar')
const {blankHandlar} = require('./Handlar/Route Handlar/blankHandlar')
const {userHandlar} = require('./Handlar/Route Handlar/userHandlar')

// Module Scaffolding

const routes = {
    sample: sampleHandlar,
    about: aboutHandlar,
    "": blankHandlar,
    user: userHandlar
};



module.exports = routes;
