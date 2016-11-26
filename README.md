### fnChain

fnChain is a function control flow utility that provides a mechanism for chaining asynchronous functions and normal synchronous functions.

Whatever arguments you pass into the callback function will be added to a results array and carried through to each function in the chain as the first argument.

The second argument is always the callback function which must be called to proceed to the next function in the chain.

fnChain will return a promise with all the passed argument results. You can manually reject the returned promise by invoking the cancel function which is passed as the third argument to each function in the chain.

Usage example:

```javascript
fnChain([
    function (callback) {
        callback('something');
    },
    function (arg1, callback) {
        setTimeout(function () {
            callback('something else', 'and something more');
        }, 3000);
    },
    function (arg1, arg2, callback, cancel) {
        http.post('/api/something/', [arg1, arg2])
            .then(function (response) {
                callback(response);
            })
            .catch(function (reason) {
                cancel(reason);
            });
    }
]).then(function (results) {
    console.log(results); // ['something', 'something else', 'and something more', Response]
}).catch(function (reason) {
    console.log(reason); // reason passed into cancel()
});
```
