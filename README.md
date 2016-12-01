### funnel

funnel is a function control flow utility for taming asynchronous and synchronous functions.

Whatever arguments you pass into the callback function will be added to a results array, and depending on the method, carried through to each function in the funnel as the first arguments.

The callback function is always after the arguments, and it must be called to proceed to the next function in the funnel.

funnel will return a promise with all the passed argument results. You can manually reject the returned promise by invoking the cancel function which is passed as the last argument to each function in the funnel.

Usage example:

```javascript
funnel.pipe([
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
