'use strict';

var app = require('./config/app.server')();

app.listen(process.env.PORT || 3000);
console.log('Express server started on port:', process.env.PORT || 3000);
