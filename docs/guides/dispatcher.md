# Dispatcher

Dispatchr's main goal is to facilitate server-side rendering of Flux applications while also working on the client-side to encourage code reuse. In order to isolate stores between requests on the server-side, we have opted to instantiate the Dispatcher and stores classes per request.

In addition, action registration is done by stores as a unit rather than individual callbacks. This allows us to lazily instantiate stores as the events that they handle are dispatched. Since instantiation of stores is handled by the Dispatcher, we can keep track of the stores that were used during a request and dehydrate their state to the client when the server has completed its execution.

Lastly, we are able to enforce the Flux flow by restricting access to the Dispatcher from stores. Instead of stores directly requiring a singleton dispatcher, we pass a Dispatcher interface to the constructor of the stores to provide access to only the functions that should be available to it: waitFor and getStore. This prevents the stores from dispatching an entirely new action, which should only be done by action creators to enforce the unidirectional flow that is Flux.

```javascript
var Dispatchr = require('dispatchr')(),
    ExampleStore = require('./example-store.js'),
    context = {};

Dispatchr.registerStore(ExampleStore);

var dispatcher = new Dispatchr(context);

dispatcher.dispatch('NAVIGATE', {});
// Action has been handled fully
```