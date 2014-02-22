'use strict';

module.exports = function(app) {
    
    // Home route
    var index = require('../controllers/index');
    app.get('/', index.render);


    // Redirect Recorder.js script
    app.get('/recorderWorker.js', function(req, res) {
        res.redirect('/lib/recorderjs/recorderWorker.js');
    })

};
