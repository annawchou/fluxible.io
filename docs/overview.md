# Overview

Fluxible is a pluggable React application container that implements the Flux architecture. We provide core fluxible-plugins that build on top of our libraries and complement Fluxible. These libraries are standalone and are not tied to Fluxible. We assume that you are familiar with [Flux](http://facebook.github.io/flux/docs/overview.html) and [React.js](http://facebook.github.io/react/); if not, please review the concepts first.

## Application

- [fluxible](https://github.com/yahoo/fluxible) - Pluggable container for isomorphic flux applications that provides interfaces that are common throughout the Flux architecture and restricts usage of these APIs to only the parts that need them to enforce the unidirectional flow.

## Plugins

 - [fluxible-plugin-fetchr](https://github.com/yahoo/fluxible-plugin-fetchr) - Provides isomorphic RESTful service access to your Fluxible application using
fetchr.
 - [fluxible-plugin-routr](https://github.com/yahoo/fluxible-plugin-routr) - Provides routing methods to your Fluxible application using routr.

## Libraries

 - [dispatchr](https://github.com/yahoo/dispatchr) - Dispatchr's main goal is to facilitate server-side rendering of Flux
applications while also working on the client-side to encourage code reuse. One
main difference between this and Facebook's dispatcher is that on the server,
we instantiate the dispatcher and store classes per request to encapsulate
data, preventing leaking to incorrect.
 - [fetchr](https://github.com/yahoo/fetchr) - Fetchr provides an appropriate abstraction so that you can fetch (CRUD) your
data in your stores using the same exact syntax on server and client side.
 - [routr](https://github.com/yahoo/routr) - Routr library is an implementation of router-related functionalities that can
be used for both server and client. This library does not use callbacks for
routes, instead just mapping them to string names that can be used as
application state and used within your application later. For instance in Flux,
the current route would be held as state in a store.
 - [flux-router-component](https://github.com/yahoo/flux-router-component) - Provides navigational React components and router mixin for applications built with Flux architecture.

