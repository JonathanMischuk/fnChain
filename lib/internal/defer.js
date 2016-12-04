function defer () {
    var resolve, reject, promise;

    promise = new Promise(function () {
        resolve = arguments[0];
        reject = arguments[1];
    });

    return {
        resolve: resolve,
        reject: reject,
        promise: promise
    };
}

module.exports = defer;
