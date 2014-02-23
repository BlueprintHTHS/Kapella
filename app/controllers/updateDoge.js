'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    user = mongoose.model('User'),
    song = mongoose.model('Song'),
    dogeapi = require('../libraries/dogeapi.js');

exports.refreshBalance = function (req, res) {
    song.find({}, function (err, result) {
        result.forEach(function (data) {
            var _data = data;
            var songId = data._id;
            var oldBalance = data.dogeBalance;
            var contributors = "";
            dogeapi.getAddressReceived(null, data.dogeAddress, function (error, amount) {
                if (error) {
                    console.log(error);
                }
                if (oldBalance != 0) {
                    if (oldBalance < amount) {
                        var diff = amount - oldBalance; //new delta balance
                        var operator_fee = diff * 0.05; //fee to be deducted for operator
                        var diff_toSplit = diff - operator_fee;
                        var contributors = [];
                        data.recordings.forEach(function (obj) {
                            contributors.push(obj.user); //build an array of contributors
                        });
                        var share = diff_toSplit / contributors.length; //amount per person
                        contributors = data.recordings; //get an array of contributors
                        db.users.find({ _id: { $in: contributors }}, function (err, users) {
                            users.foreach(function (user) {
                                user.dogeBalance += share;
                                user.save(function (err) {
                                    if (err)
                                        console.log(err);
                                });
                            })

                        })
                    }
                }
            })
        });
    })
};