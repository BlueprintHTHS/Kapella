'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var dogeapi = require ('../libraries/dogeapi.js')
var Schema = mongoose.Schema;

/**
 * User Schema
 */
var SongSchema = new Schema({
    title: String,
    artist: String,
    genre: String,
    duration: Number,
    recordings: [{
        user: mongoose.Schema.ObjectId,
        filename: String
    }],
    dogeAddress: String,
    dogeBalance: Number
});

/**
 * Methods
 */
SongSchema.methods = {
    /**
     * Generate a new dogecoin address for the song
     */
    generateAddress: function(done) {
        var _this = this;
        dogeapi.getNewAddress(this._id, function (error, address) {
                if(error) {
                    done(error);
                }
            _this.dogeAddress = address;
            })
        done(false, this.dogeAddress)
    },

    /**
     * Update the current dogecoin balance
     */
    updateBalance: function(done) {
        var _this = this;
        dogeapi.getAddressReceived(null, this.dogeAddress, function (error, amount) {
            if(error) {
                done(error)
            }
            _this.dogeBalance = amount;
        });
        done(false, this.dogeBalance);
    }
};

mongoose.model('Song', SongSchema);