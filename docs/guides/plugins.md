# Plugins

Within a context, Fluxible creates interfaces providing access to only certain parts of the system. These are broken down as such:

 * **Action Context**: interface accessible by action creator methods. Passed as first parameter to all action creators.
 * **Component Context**: interface accessible by React components. Should be passed as prop to top level React component and then propagated to child components that require acess to it.
 * **Store Context**: interface accessible by stores. Passed as first parameter to all stores. See [Dispatchr docs](https://github.com/yahoo/dispatchr#constructor-1).

Fluxible Plugins allow you to extend the interface of each context type. Here, we'll give components access to the `getFoo()` function:

```js
var FluxibleApp = require('fluxible');
var app = new FluxibleApp();

app.plug({
    // Required unique name property
    name: 'TestPlugin',

    // Called after context creation to dynamically create a context plugin
    plugContext: function (options) {
        // `options` is the same as what is passed into `createContext(options)`
        var foo = options.foo;

        // Returns a context plugin
        return {
            // Method called to allow modification of the component context
            plugComponentContext: function (componentContext) {
                componentContext.getFoo = function () {
                    return foo;
                };
            },

            //plugActionContext: function (actionContext) {}
            //plugStoreContext: function (storeContext) {}

            // Allows context plugin settings to be persisted between server and client. Called on server
            // to send data down to the client
            dehydrate: function () {
                return {
                    foo: foo
                };
            },

            // Called on client to rehydrate the context plugin settings
            rehydrate: function (state) {
                foo = state.foo;
            }
        };
    },
    // Allows dehydration of application plugin settings
    dehydrate: function () { return {}; },

    // Allows rehydration of application plugin settings
    rehydrate: function (state) {}
});

var context = app.createContext({
    foo: 'bar'
});

context.getComponentContext().getFoo(); // returns 'bar'
// or this.props.context.getFoo() from a React component
```

Example plugins:
 * [fluxible-plugin-fetchr](https://github.com/yahoo/fluxible-plugin-fetchr) - Provides isomorphic RESTful service access to your Fluxible application using Fetchr.
 * [fluxible-plugin-routr](https://github.com/yahoo/fluxible-plugin-routr) - Provides routing methods to your Fluxible application using Routr.
