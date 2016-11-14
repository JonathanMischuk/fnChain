### fnChain

fnChain is a function control flow utility that provides a mechanism for chaining asynchronous functions that return promises and normal synchronous functions.

Any functions passed into fnChain can return a promise, a regular value of any type, or nothing at all. If a value is returned, it will be served to all proceeding functions in the order they are executed.

This can be used to control the sometimes pesky flow of asynchronous functions that return promises by executing them synchronously, passing the actual value of a resolved promise, not the promise itself.

The most basic sample usage:

```
fnChain([
    httpRequest,
    syncFn,
    functionThatReturnsPromise
]);
```

fnChain accepts a mandatory `fns` array that will contain all the functions to be executed.

If you provide a `args` object on initialization it will be served to every function in the chain:

```
fnChain([
    httpRequest,
    syncFn,
    functionThatReturnsPromise
], {
    prop: 'prop'
    someOtherProp: 25,
    someMethod: function () {
        return 'something';
    }
});
```

And one of your functions could be:

```
function syncFn (results, args) {
    console.log(results, args);
    
    var something = args.someMethod();
    
    return something + ' else.';
}
```

Another function:

```
function httpRequest () {
    // some sort of http api is assumed:
    return http.post('/api/something/', { data: 'something });
}
```

Each function will then have access to the optional `args` object.

Whatever is returned from the function will be added to the `results` array which is served to every proceeding function.

fnChain will return a promise that resolves an new object containing the results array and the args object.

Example returning a promise:

```
fnChain([
    httpRequest,
    syncFn,
    functionThatReturnsPromise
], {
    prop: 'prop'
    someOtherProp: 25,
    someMethod: function () {
        return 'something';
    }
}).then(function (results) {
    console.log(results);
});
```

You can also optionally pass in a `fnBreak` parameter to any function in the chain which can be used to break the function chain and automatically execute the `.catch()` exception method. You can also add a 'reason' or custom message or value to the `fnBreak()`:

```
function functionThatReturnsPromise (results, args, fnBreak) {
    if (something > somethingElse) {
        fnBreak('You have exceeded your limit.');
    } else {
        return 'Good job, you are under your limit.';
    }
}
```

Changes to your fnChain call:

```
fnChain([
    httpRequest,
    syncFn,
    functionThatReturnsPromise
], {
    prop: 'prop'
    someOtherProp: 25,
    someMethod: function () {
        return 'something';
    }
}).then(function (results) {
    console.log(results);
}).catch(function (reason) {    // new addition
    console.log(reason);
});
```

You can also declare the initialization object somewhere else:

```
var fns = [
    httpRequest,
    syncFn,
    functionThatReturnsPromise
];

var args = {
    prop: 'prop'
    someOtherProp: 25,
    someMethod: function () {
        return 'something';
    }
};

fnChain(fns, args)
    .then(function (results) {
        console.log(results);
    }).catch(function (reason) {
        console.log(reason);
    });
```

One thing to note is that after each function in the chain is executed, it is then removed from the `fns` array. This may be something to consider when declaring the initialization object.

More notes to come, and plenty of features in mind.

Currently looking into functionality for breaking the chain of previous fnChain calls to create a last in, last out approach for promises that may have unpredictable response timing upon multiple chain calls.
