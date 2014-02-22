var mongoose = require('mongoose');
var Song = mongoose.model('Song');

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
                res.statusCode = 503;
                res.send({err: err});
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
        song.save(function(err) {
            if (!err) {
                song.generateAddress(function(err) {
                    if (!err) {
                        res.send(song);
                    } else {
                        res.statusCode = 503;
                        res.send({err: err});
                    }
                });
            } else {
                res.statusCode = 503;
                res.send({err: err});
            }
        });
    });

    /**
     * Vote for a song - begin transaction session
     */
    app.post('/votes', function(req, res) {
        var songId = req.body.songId;
    });

    app.put('/votes/:voteId', function(req, res) {

    });

    /**
     * Get user data
     */
    app.get('/users/:id', function(req, res) {

    });
};