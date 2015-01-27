# Quick Start

If you wan't to jump right into it, check out our examples:

 - [Chat](https://github.com/yahoo/flux-examples/tree/master/chat) - Port of [Facebook's Flux chat example](https://github.com/facebook/flux/tree/master/examples/).
 - [Routing](https://github.com/yahoo/flux-examples/tree/master/routing) - Simple isomorphic routing in Flux flow.
 - [ToDo MVC](https://github.com/yahoo/flux-examples/tree/master/todo) - [ToDo MVC](https://github.com/tastejs/todomvc) example using Fluxible.

## Libraries

If you want to jump right in to the individual libraries check them out:

- [fluxible](https://github.com/yahoo/fluxible) - Pluggable container for isomorphic Flux applications that provides interfaces that are common throughout the Flux architecture and restricts usage of these APIs to only the parts that need them to enforce the unidirectional flow.

### Plugins

- [fluxible-plugin-fetchr](https://github.com/yahoo/fluxible-plugin-fetchr) - Provides isomorphic RESTful service access to your Fluxible application using Fetchr.
- [fluxible-plugin-routr](https://github.com/yahoo/fluxible-plugin-routr) - Provides routing methods to your Fluxible application using Routr.

### Libraries

- [dispatchr](https://github.com/yahoo/dispatchr) - Dispatchr's main goal is to facilitate server-side rendering of Flux applications while also working on the client-side to encourage code reuse. In order to isolate stores between requests on the server-side, we have opted to instantiate the dispatcher and stores classes per request.
- [fetchr](https://github.com/yahoo/fetchr) - Fetchr provides an abstraction so that you can fetch (CRUD) your data in your stores using the same exact syntax on server and client side.
- [routr](https://github.com/yahoo/routr) - Routr is an implementation of router-related functionalities that can be used for both server and client. This library does not use callbacks for routes, instead just mapping them to string names that can be used as application state and used within your application later. For instance in Flux, the current route would be held as state in a store.
- [flux-router-component](https://github.com/yahoo/flux-router-component) - Provides navigational React components and router mixin for applications built with Flux architecture.
