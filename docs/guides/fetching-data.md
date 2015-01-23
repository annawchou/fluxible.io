# Fetching Data

On the server, we can query the database directly to fetch some data.

On the client, however, we can NOT directly query the database.

Instead, we have to write extra code to:
 - expose a REST endpoint on the server
 - make an xhr request from the client

Only then, can the server query the database and return the results back to the client for parsing.

We want to be able to fetch the data on the server and client without extra code.

[Fetchr](https://github.com/yahoo/fetchr) is a library that manages an application's services and provides an isomorphic interface for calling the services.
Fetchr transparently changes how it calls the services based on environment:
on the server, calls are made directly to the services, while on the client,
calls are executed via XHR to a route that proxies to the individual services.
So, the service code that you write is always executed on the server,
but can be access transparently from actions without any knowledge of whether it's on the server or client.
Fetchr provides an appropriate abstraction so that you can fetch (CRUD) the data needed in your stores using the same exact syntax on server and client side.

## Using The Plugin

[fluxible-plugin-fetchr](https://github.com/yahoo/fluxible-plugin-fetchr) is how we will use Fetchr in our Fluxible applications.

```js
var Fluxible = require('fluxible');
var fetchrPlugin = require('fluxible-plugin-fetchr');
var pluginInstance = fetchrPlugin({
    xhrPath: '/api' // Path for XHR to be served from
});
var app = new Fluxible();

app.plug(pluginInstance);
```

## Services

Services are where you define your CRUD operations for a specific resource (i.e. Users, Photos, etc.).

### Creating Your Services

UserService.js
```js
module.exports = {
    //Name is required
    name: 'user',
    //At least one of the CRUD methods is Required
    read: function(req, resource, params, config, callback) {
        var data = DATABASE.getUser(params.userId);
        callback(null, data);
    },
    //other methods
    //create: function(req, resource, params, body, config, callback) {},
    //update: function(req, resource, params, body, config, callback) {},
    //delete: function(req, resource, params, config, callback) {}
}
```

### Registering Your Services

```js
pluginInstance.registerService(yourService);
```

Or if you need to do this from your application without direct access to the plugin

```js
app.getPlugin('FetchrPlugin').registerService(yourService);
```

### Exposing Your Services

Fetchr also contains an express/connect middleware that can be used as your REST endpoint from the client.

```js
var server = express();
server.use(pluginInstance.getXhrPath(), pluginInstance.getMiddleware());
```

### Accessing Your Services

To maintain the Flux unidirectional data flow, fetchers are only accessible from action creators.

```js

/**
 * Calls the user service and sends the info to the store
 *
 * @method loadUser
 * @param {Object} context The context object
 * @param {Object} payload The payload object
 * @param {Function} done Called when action has completed
 * @async
 */

module.exports = function loadUser(context, payload, done) {

    context.service.read('user', {}, {}, function (err, userInfo) {

        if (err || !userInfo) {
            context.dispatch('RECEIVE_USER_INFO_FAILURE', err);
        } else {
            context.dispatch('RECEIVE_USER_INFO_SUCCESS', userInfo);
        }

        if (done) {
            done(err);
        }
    });
};

```
