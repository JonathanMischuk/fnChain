/**
 * // Function Chain
 *
 * author: Jonathan Mischuk
 *
 * function and async control passing
 * response value of promise or the
 * return value to the next function
 * if desired.
 *
 * @param fns: mandatory array of functions
 *
 * @return {Promise}
 *
 * example of usage:
 *
 * // Function Chain Data
 * fnChain([
 *      fn1,
 *      fn2,
 *      fn3
 * ]).then(function (results) {
 *      console.log(resulst);
 * }).catch(function (error) {
 *      console.log(error);
 * });
 */
function fnChain (fns) {
    var results = [];

    return new Promise(function (resolve, reject) {
        if (!fns.length) return cancel('ERR: No functions provided.');

        function callback () {
            var args = [].slice.apply(arguments),
                fn = fns[0];

            // concatenate stored results with new arguments
            results = [].concat.call([], results || [], args || []);

            if (fns.length) {
                fns.shift();

                return fn(results, callback, cancel);
            } else {
                resolve(results);
            }
        }

        // cancel function chain and
        // immediately reject promise
        function cancel (reason) {
            return reject(reason || 'Chain was intentionally broken.');
        }

        return callback();
    });
}

module.exports = fnChain;
