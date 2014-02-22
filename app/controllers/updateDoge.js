'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    user = mongoose.model('User'),
    song = mongoose.model('Song'),
    dogeapi = require ('../libraries/dogeapi.js');

exports.refreshBalance = function(req, res) {
    song.find({}, function(err, result) {
        result.forEach(function(data){
            var songId = data._id;
            dogeapi.getAddressReceived(null, data.dogeAddress,function (error, amount) {
                if(error) {
                    console.log(error);
                }
                console.log(amount);
            });
        })
    });
};

function findContributors(songId){

}