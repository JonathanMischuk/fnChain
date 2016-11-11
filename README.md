### fnChain

fnChain is a function control flow utility that provides a mechanism for chaining asynchronous functions that return promises and normal synchronous functions.

Any functions passed into fnChain can return a promise, a regular value of any type, or nothing at all. If a value is returned, it will be served to all proceeding functions in the order they are executed.

This can be used to control the sometimes pesky flow of asynchronous functions that return promises by executing them synchronously, passing the actual value of a resolved promise, not the promise itself.

The most basic sample usage:

```
fnChain({
    fns: [
        httpRequest,
        syncFn,
        functionThatReturnsPromise
    ]
});
```

fnChain accepts an initialization object. The object must have a `fns` property that will contain an array of functions.

If you provide a `data` property to the initialization object it will be served to every function in the chain:

```
fnChain({
    fns: [
        httpRequest,
        syncFn,
        functionThatReturnsPromise
    ],
    data: {
        prop: 'prop'
        someOtherProp: 25,
        someMethod: function () {
            return 'something';
        }
    }
});
```

And one of your functions could be:

```
function syncFn (args) {
    console.log(args.data);
    
    var something = args.data.someMethod();
    
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

Each function will then have access to the entire data object. The data object is attached to the args object which also has the property `results`.

Whatever is returned from the function will be added to a `results` array which is served to every proceeding function.

You can also optionally provide a `cb` property as a callback function which will only be called after every function has been executed and retired.
 
The callback function also has access to the data object, and most importantly the results array.

Example with callback function:

```
var global;

fnChain({
    fns: [
        httpRequest,
        syncFn,
        functionThatReturnsPromise
    ],
    data: {
        prop: 'prop'
        someOtherProp: 25,
        someMethod: function () {
            return 'something';
        }
    },
    cb: function (args) {
        var weHave = 'We have ' + args.results[1];
        
        global = weHave + ' else';
    }
});
```

fnChain also returns a promise that resolves the args object (data object and results array).

Example returning a promise:

```
fnChain({
    fns: [
        httpRequest,
        syncFn,
        functionThatReturnsPromise
    ],
    data: {
        prop: 'prop'
        someOtherProp: 25,
        someMethod: function () {
            return 'something';
        }
    }
}).then(function (args) {
    console.log(args);
});
```

You can also optionally pass in a `fnBreak` parameter to any function in the chain which can be used to break the function chain and automatically execute the `.catch()` exception method. You can also add a 'reason' or custom message or value to the `fnBreak()`:

```
function functionThatReturnsPromise (args, fnBreak) {
    if (something > somethingElse) {
        fnBreak('You have exceeded your limit.');
    } else {
        return 'Good job, you are under your limit.';
    }
}
```

Changes to your fnChain call:

```
fnChain({
    fns: [
        httpRequest,
        syncFn,
        functionThatReturnsPromise
    ],
    data: {
        prop: 'prop'
        someOtherProp: 25,
        someMethod: function () {
            return 'something';
        }
    }
}).then(function (args) {
    console.log(args);
}).catch(function (reason) {    // new addition
    console.log(reason);
});
```

You can also declare the initialization object somewhere else:

```
function fnChainInit () {
    return {
        fns: [
            httpRequest,
            syncFn,
            functionThatReturnsPromise
        ],
        data: {
            prop: 'prop'
            someOtherProp: 25,
            someMethod: function () {
                return 'something';
            }
        }
    }
}

fnChain(fnChainInit()).then(function (args) {
    console.log(args);
}).catch(function (reason) {
    console.log(reason);
});
```

One thing to note is that after each function in the chain is executed, it is then removed from the `fns` array. This may be something to consider when declaring the initialization object.

More notes to come, and plenty of features in mind.

Currently looking into functionality for breaking the chain of previous fnChain calls to create a last in, last out approach for promises that may have unpredictable response timing upon multiple chain calls.
