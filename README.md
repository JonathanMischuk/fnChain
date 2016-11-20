### fnChain

fnChain is a function control flow utility that provides a mechanism for chaining asynchronous functions and normal synchronous functions.

Whatever arguments you pass into the callback function will be added to a results array and carried through to each function in the chain as the first argument.

The second argument is always the callback function.

fnChain will return a promise with all the passed argument results. You can manually reject the returned promise by invoking the cancel function which is passed as the third argument to each function in the chain.

Usage example:

```
fnChain([
    function (results, callback, cancel) {
        callback('something');
    },
    function (results, callback, cancel) {
        setTimeout(function () {
            callback('something else');
        }, 3000);
    },
    function (results, callback, cancel) {
        http.post('/api/something/', results)
            .then(function (response) {
                callback(response);
            })
            .catch(function (reason) {
                cancel(reason);
            });
    }
]).then(function (results) {
    console.log(results);
}).catch(function (error) {
    console.log(error);
});
```
