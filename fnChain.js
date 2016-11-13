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
 *     @property fns {array} mandatory array of functions
 *     @property data {object} optional reusable data
 *     @property cb {function} optional final callback
 *         that is invoked after all functions
 *         in chain
 *         (@)param {object} data: contains optional data
 *             and results of each function
 *         (@)param {function} fnBreak: return this function
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
 *     args: {
 *         prop1: 'prop1',
 *         prop2: 'prop2',
 *         prop3: 'prop3'
 *     }
 * };
 *
 *  fnChain(fnChainData);
 */
/*function fnChain (obj) {
    var results = [],
        fns,
        args;

    if (obj.hasOwnProperty('fns')) fns = obj.fns;
    if (obj.hasOwnProperty('args')) args = obj.args;

    return new Promise(function (resolve, reject) {
        function recurse () {
            var result;

            console.log(results);

            if (fns.length) {
                result = fns[0](args, results, fnBreak);

                fns.shift();

                if (result && result.then) {
                    result.then(function (response) {
                        if (response) results.push(response);

                        recurse();
                    });
                } else {
                    if (result) results.push(result);

                    return recurse();
                }
            } else {
                console.log('results resolved:', results);
                resolve(results);
            }
        }

        function fnBreak (reason) {
            return reject({ error: reason || 'Chain was intentionally broken.' });
        }

        return recurse();
    });
}*/

/*function fnChain (obj) {
    var dataCache = {},
        fns;

    dataCache.results = [];

    if (obj.hasOwnProperty('fns')) fns = obj.fns;
    if (obj.hasOwnProperty('args')) dataCache.args = obj.args;

    return new Promise(function (resolve, reject) {
        function recurse (data) {
            var result;

            if (fns.length) {
                result = fns[0](data, fnBreak);

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
                resolve(data);
            }
        }

        function fnBreak (reason) {
            return reject({ error: reason || 'Chain was intentionally broken.' });
        }

        return recurse(dataCache);
    });
}*/

function fnChain (fns, args) {
    var results = [];

    return new Promise(function (resolve, reject) {
        function recurse (results, args) {
            var result;

            if (fns.length) {
                result = fns[0](results, args, fnBreak);

                fns.shift();

                if (result && result.then) {
                    result.then(function (response) {
                        if (response) results.push(response);

                        recurse(results, args);
                    });
                } else {
                    if (result) results.push(result);

                    return recurse(results, args);
                }
            } else {
                resolve({
                    results: results,
                    args: args
                });
            }
        }

        function fnBreak (reason) {
            return reject({ error: reason || 'Chain was intentionally broken.' });
        }

        return recurse(results, args);
    });
}

module.exports = fnChain;
