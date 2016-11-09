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
 * @return {Promise}
 *
 * @param obj:
 *     @property fns {array} manditory array of functions
 *     @property data {object} optional reusable data
 *     @property cb {function} optional final callback
 *         that is invoked after all functions
 *         in chain
 *         (@)param {object} data: contains optional data
 *             and results of each function
 *         (@)param {function} breakChain: return this function
 *             anywhere inside your functions to reject the overall
 *             promise and cancel all proceeding function invokations
 *                 (@)param {string} reason: customized reason for
 *                     breaking function chain
 *
 * example of usage:
 *
 * // Function Chain Data
 * var fnChainData = {
 *     fns: [
 *         fn1,
 *         fn2,
 *         fn3
 *     ],
 *     data: {
 *         prop1: 'prop1',
 *         prop2: 'prop2',
 *         prop3: 'prop3'
 *     },
 *     cb: function (data) {
 *         console.log(data);
 *     }
 * };
 *
 *  fnChain(fnChainData);
 */
function fnChain (obj) {
    var dataCache = {},
        fns,
        cb;

    dataCache.results = [];

    if (obj.hasOwnProperty('fns')) fns = obj.fns;
    if (obj.hasOwnProperty('cb')) cb = obj.cb;
    if (obj.hasOwnProperty('data')) dataCache.data = obj.data;

    return new Promise(function (resolve, reject) {
        function recurse (data) {
            var result;

            if (fns.length) {
                result = fns[0](data, breakChain);

                fns.shift();

                if (result && result.then) {
                    result.then(function (response) {
                        if (response) data.results.push(response);

                        recurse(data);
                    });
                } else {
                    if (result) data.results.push(result);

                    return recurse(data);
                }
            } else {
                if (cb && typeof cb === 'function') cb(data);

                resolve(data);
            }
        }

        function breakChain (reason) {
            return reject({ error: reason || 'Chain was intentionally broken.' });
        }

        return recurse(dataCache);
    });
}

module.exports = fnChain;
