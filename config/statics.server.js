var express = require('express');

module.exports = function (app) {
    app.use(express.static(__dirname + '/../views'));
    app.use('/public', express.static(__dirname + '/../public'));
};
