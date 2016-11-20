### fnChain

fnChain is a function control flow utility that provides a mechanism for chaining asynchronous functions and normal synchronous functions.

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
