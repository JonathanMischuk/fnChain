/**
 * Function Chain: Funnel
 * ------------------------
 * function and async control
 *
 * author: Jonathan Mischuk
 *
 * @param fns: mandatory array of functions
 *
 * @return {Promise}
 *
 * usage example:
 *
 * // Function Chain Data
 * fnChain.pipe([
 *     fn1,
 *     fn2,
 *     fn3
 * ]).then(function (results) {
 *     console.log(results);
 * }).catch(function (reason) {
 *     console.log(reason);
 * });
 */

function funnel (fns) {'use strict';
    var results = [];

    return new Promise(function (resolve, reject) {
        if (!fns.length) return cancel('error: no functions were provided for chain.');

        function callback () {
            var args = [].slice.call(arguments),
                fn = fns[0];

            results = [].concat.call([], results, args);

            if (fns.length) {
                fns.shift();

                return fn.call(null, callback, cancel);
            } else {
                resolve(results);
            }
        }

        // cancel function chain and
        // immediately reject promise
        function cancel (reason) {
            return reject(reason || 'chain was cancelled.');
        }

        return callback();
    });
}

module.exports = funnel;
