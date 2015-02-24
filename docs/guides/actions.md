# Actions

Actions (or action controllers) are functions that are called by interacting with components on the client or as an entry point for incoming requests on the server.

The action controllers decide what the application should do for the given action based on the interaction payload and the context of the current application. The action controllers can make use of the current [actionContext](http://fluxible.io/api/fluxible-context.html#getactioncontext-) to execute I/O calls via the service instance and dispatch data through the dispatcher instance so that stores can handle the new data.

```js
// context is the actionContext
module.exports = function fooAction(context, payload, done) {
    var options = {
        params: 'this is a param'
    };

    // async I/O
    context.service.read('foo', options, function (err, data) {
        if (err) {
            return done(err);
        }

        context.dispatch('RECEIVE_FOO', {
            data: data
        });

        done();
    });
};
```

Any store that listens to the `RECEIVE_FOO` event, will recieve the `data` payload and update their store accordingly.
