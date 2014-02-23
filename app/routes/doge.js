'use strict';
module.exports = function(app) {

    // Home route
    var doge = require('../controllers/updateDoge');
    app.get('/api/refreshBalances',doge.refreshBalance);
};
