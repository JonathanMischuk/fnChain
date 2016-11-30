module.exports = function (app) {
    var controllers = require('./controllers.server');

    app.post('/api/request1', controllers.request1);
    app.post('/api/request2', controllers.request2);
    app.post('/api/request3', controllers.request3);
};