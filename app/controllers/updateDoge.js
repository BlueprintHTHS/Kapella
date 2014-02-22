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
            var oldBalance = data.dogeBalance;
            var contributions =
            dogeapi.getAddressReceived(null, data.dogeAddress,function (error, amount) {
                if(error) {
                    console.log(error);
                }
                if (oldBalance !=0) {
                    if (oldBalance < amount){
                        var diff = amount - oldBalance; //new delta balance
                        var operator_fee = diff*0.05; //fee to be deducted for operator
                        var diff_remaining = diff - operator_fee;


                    }
                }
                console.log(amount);
            });
        })
    });
};

function findContributors(songId){

}