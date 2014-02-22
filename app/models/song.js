'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * User Schema
 */
var SongSchema = new Schema({
    title: String,
    artist: String,
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
        // TODO: use dogeapi to generate new address
        done(false);
    },

    /**
     * Update the current dogecoin balance
     */
    updateBalance: function(done) {
        // TODO: use dogeapi to get new balance and save to model
        done(false, this.dogeBalance);
    }
};

mongoose.model('Song', SongSchema);