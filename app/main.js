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

function request2 (callback) {
    req('POST', '/api/request2/').then(function (response) {
        callback(response);
    });
}

function request3 (callback) {
    setTimeout(function () {
        callback('from async function', 25, 'more async values');
    }, 1000);
}

function request4 (callback) {
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

    chain.funnel(fns).then(function (results) {
        console.log(results);
        console.log('done now!');
    }).catch(function (err) {
        console.log(err);
    });
}

button.addEventListener('click', clickMe);
