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
    recordings: [{
        user: ObjectId,
        path: String
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
        dogeapi.getNewAddress(songID, function (error, address) {
                if(error) {
                    done(error);
                }
            this.dogeAddress = address;
            })
        done(false, this.dogeAddress)
    },

    /**
     * Update the current dogecoin balance
     */
    updateBalance: function(done) {
        dogeapi.getAddressReceived(null, this.dogeAddress, function (error, amount) {
            if(error) {
                done(error)
            }
            this.dogeBalance = amount;
        });
        done(false, this.dogeBalance);
    }
};

mongoose.model('Song', SongSchema);