var mongoose = require('mongoose');
var Song = mongoose.model('Song');
var path = require('path');
var appDir = path.dirname(require.main.filename);
var uploadDir = path.join(appDir, 'public/uploads');
var uuid = require('node-uuid');
var fs = require('fs');

function sendError(res, err) {
    res.statusCode = 503;
    res.send({err: err});
}
module.exports = function(app) {
    /**
     * Get array of all songs on server
     */
    app.get('/api/songs', function(req, res) {
        Song.find(function(err, songs) {
            res.send(songs);
        });
    });

    /**
     * Get a specific song item
     */
    app.get('/api/songs/:songId', function(req, res) {
        var id = req.params.songId;
        Song.findById(id, function(err, song) {
            if (!err) {
                res.send(song);
            } else {
                sendError(res, err);
            }
        });
    });

    /**
     * Refresh the dogecoin balance and return new song data
     */
    app.get('/api/songs/:songId/balance', function(req, res) {
        var id = req.params.songId;
        Song.findById(id, function(err, song) {
            if (err) {
                sendError(res, err);
            } else {
                song.updateBalance(function(err) {
                    if (err) {
                        sendError(res, err);
                    } else {
                        res.send(song);
                    }
                })
            }
        });
    });

    /**
     * Create a new song on the server
     */
    app.post('/api/songs', function(req, res) {
        var song = new Song({
            title: req.body.title,
            artist: req.body.artist
        });
        console.log(req.body.title);
        song.save(function(err) {
            if (!err) {
                song.generateAddress(function(err) {
                    if (!err) {
                        res.send(song);
                    } else {
                        sendError(res, err);
                    }
                });
            } else {
                sendError(res, err);
            }
        });
    });

    /**
     * Submit a new recording
     */
    app.post('/api/songs/:songId/recordings', function(req, res) {
        var songId = req.params.songId;
        var recordingData = req.body.data;
        var filename = uuid.v1() + '.wav';
        fs.writeFile(path.join(uploadDir, filename), recordingData, function(err) {
            if (!err) {
                var recording = {
                    filename: filename
                };
                Song.findByIdAndUpdate(
                    songId,
                    {$push: {recordings: recording}},
                    {safe: true, upsert: true},
                    function(err, song) {
                        if (!err) {
                            res.send(song.recordings[song.recordings.length-1]); // TODO: find better way of returning inserted object
                        } else {
                            sendError(res, err);
                        }
                    }
                )
            } else {
                sendError(res, err);
            }
        })
    });

    /**
     * Vote for a song - begin transaction session
     */
    app.post('/api/votes', function(req, res) {
        var songId = req.body.songId;
    });

    app.put('/api/votes/:voteId', function(req, res) {

    });

    /**
     * Get user data
     */
    app.get('/api/users/:id', function(req, res) {

    });


};