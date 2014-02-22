module.exports = function(app) {
    /**
     * Get array of all songs on server
     */
    app.get('/api/songs', function(req, res) {
        var songs = [];
        res.send(songs);
    });

    /**
     * Get a specific song item
     */
    app.get('/api/songs/:songId', function(req, res) {
        var id = req.params.songId;
        // Find song with id
        var song = {};
        res.send(song);
    });

    /**
     * Create a new song on the server
     */
    app.post('/api/songs', function(req, res) {

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