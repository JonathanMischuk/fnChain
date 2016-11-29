var chain = require('../lib'),
    queue = new chain.Queue(),
    req = require('superagent'),
    button = document.getElementById('button');

// function request1 (results, args) {
//     console.log(results, args);
//     return 'something';//req('POST', '/api/request1/');
// }
//
// function request2 (results, args) {
//     console.log(results, args);
//     return req('POST', '/api/request2/');
// }
//
// function request3 (results, args) {
//     console.log(results, args);
//     return req('POST', '/api/request3/');
// }

function request1 (callback) {
    callback('something');
}

function request2 (arg1, callback) {
    console.log(arg1);

    req('POST', '/api/request2/').then(function (response) {
        callback(response);
    });
}

function request3 (arg1, callback) {
    console.log(arg1);

    setTimeout(function () {
        callback('from async function', 25, 'more async values');
    }, 2000);
}

function request4 (arg1, arg2, arg3, callback) {
    console.log(arg1, arg2, arg3);

    req('POST', '/api/request3/').then(function (response) {
        callback(response);
    });
}

function clickMe () {
    var fns = [
        request1,
        request2,
        request3,
        request4
    ];

    queue(fns).then(function (results) {
        console.log(results);
        console.log('done now!');
    }).catch(function (err) {
        console.log(err);
    });
}

button.addEventListener('click', clickMe);
