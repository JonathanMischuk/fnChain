'use strict';

var express = require('express'),
    bodyParser = require('body-parser');

module.exports = function () {
    var app = express();

    //app.use(bodyParser.json());

    // api routing
    require('./routes.server')(app);

    // serve static files
    require('./statics.server')(app);

    return app;
};
