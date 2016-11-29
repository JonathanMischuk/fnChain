function request1 (req, res) {
    setTimeout(function () {
        res.send('response for request 1');
    }, 3000);
}

function request2 (req, res) {
    setTimeout(function () {
        res.send('response for request 2');
    }, 3000);
}

function request3 (req, res) {
    setTimeout(function () {
        res.send('response for request 3');
    }, 3000);
}

exports.request1 = request1;
exports.request2 = request2;
exports.request3 = request3;
