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

// Module Scaffolding

const routes = {
    sample: sampleHandlar,
    about: aboutHandlar,
    "": blankHandlar
};



module.exports = routes;
