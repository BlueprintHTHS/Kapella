var fs = require('fs');
module.exports = (fs.existsSync('./config.js') ? require('./config') : require('./config.sample.js'));
