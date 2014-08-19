'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

// Extend the base configuration in all.js with environment
// specific configuration
module.exports = {
    root: rootPath,
    port: process.env.PORT || 3000,
    db: process.env.MONGOHQ_URL || 'mongodb://localhost/kapella',
    templateEngine: 'swig',

    // The secret should be set to a non-guessable string that
    // is used to compute a session hash
    sessionSecret: 'MEAN',
    // The name of the MongoDB collection to store sessions in
    sessionCollection: 'sessions',

    app: {
        name: 'Kapella'
    },
    facebook: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
    },
    dogeapi: {
        apikey: 'API_KEY'
    }
};
