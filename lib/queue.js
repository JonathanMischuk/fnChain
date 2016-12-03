/**
 * Funnel: Queue
 * ------------------------
 * function and async control
 *
 * author: Jonathan Mischuk
 *
 * @returns {Function}
 *
 * usage example:
 *
 * var queue = funnel.queue();
 *
 * queue([
 *     fn1,
 *     fn2,
 *     fn3
 * ]).then(function (results) {
 *     console.log(results);
 * }).catch(function (reason) {
 *     console.log(reason);
 * });
 */

function queue () {
    var rejects = [];

    return function (fns) {
        var results = [];

        if (rejects.length) {
            rejects.forEach(function (reject) {
                reject('Closed function queue.');
            });

            rejects = [];
        }

        return new Promise(function (resolve, reject) {
            if (!fns.length) return cancel('error: no functions were provided for chain.');

            rejects.push(reject);

            function callback () {
                var args = [].slice.call(arguments),
                    fn = fns[0];

                results = [].concat.call([], results, args);

                if (fns.length) {
                    fns.shift();

                    return fn.apply(null, [].concat.call([], args, [callback, cancel]));
                } else {
                    resolve(results);
                }
            }

            function cancel (reason) {
                return reject(reason || 'chain was cancelled.');
            }

            return callback();
        });
    }
}

module.exports = queue;
