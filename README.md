### fnChain

fnChain is a function control flow utility that provides a mechanism for chaining asynchronous functions and normal synchronous functions.

fnChain will return a promise with all the passed argument results. You can manually reject the return promise by invoking the cancel function which is passed as the third argument to each function in the chain.

The most basic sample usage:

```
fnChain([
    function (results, callback, cancel) {
        callback('something');
    },
    function (results, callback, cancel) {
        callback('something else');
    },
    function (results, callback, cancel) {
        callback('still something else');
    }
]).then(function (results) {
    console.log(results);
}).catch(function (error) {
    console.log(error);
});
```
