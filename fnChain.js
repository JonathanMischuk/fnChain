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
 * @param fns: mandatory array of functions
 * @param args: custom arguments that are passed to all functions in chain
 *
 * example of usage:
 *
 * // Function Chain Data
 * fnChain([
 *      fn1,
 *      fn2,
 *      fn3
 * ],{
 *      prop1: 'prop1',
 *      prop2: 'prop2',
 *      prop3: 'prop3'
 * });
 */
function fnChain (fns, args) {
    var results = [];

    args = args || {};

    return new Promise(function (resolve, reject) {
        if (!fns.length) return cancel('ERR: No functions provided.');

        function recurse (results, args) {
            var result;

            if (fns.length) {

                // invoke next function in chain and
                // pass results, optional args and
                // cancel/reject promise function
                result = fns[0](results, args, cancel);

                // remove the current function from chain
                fns.shift();

                if (result && result.then) {
                    result.then(function (response) {
                        if (response) results.push(response);

                        recurse(results, args);
                    });
                } else if (result) {
                    results.push(result);

                    return recurse(results, args);
                }
            } else {
                resolve({
                    results: results,
                    args: args
                });
            }
        }

        // cancel function chain and
        // immediately reject promise
        function cancel (reason) {
            return reject({ error: reason || 'Chain was intentionally broken.' });
        }

        return recurse(results, args);
    });
}

module.exports = fnChain;
