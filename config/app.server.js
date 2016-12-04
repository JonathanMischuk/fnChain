var express = require('express');

module.exports = function () {
    var app = express();

    // api routing
    require('./routes.server')(app);

    // serve static files
    require('./statics.server')(app);

    return app;
};
