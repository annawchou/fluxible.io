# Welcome

These docs are meant to help you get started building isomorphic apps with the
Fluxible libraries.


## Prerequisites

You should already be familiar with the following:

 - [Node.js](http://nodejs.org/)
 - [Express](http://expressjs.com/)
 - [React](http://facebook.github.io/react/)
 - [Flux](https://facebook.github.io/flux/)

Going forward we'll assume you know this stuff fairly well.


## Meet the Family

 - [`fluxible`](#fluxible) - Pluggable container and data flow regulator.
 - [`dispatchr`](#dispatchr) - Payload broadcasting and store helpers.
 - [`fetchr`](#fetchr) - Bridges data requests between client and server.
 - [`fluxible-plugin-fetchr`](#fluxible-plugin-fetchr) - Polymorphic RESTful services.
 - [`routr`](#routr) - Aligns routing at the client and server.
 - [`fluxible-plugin-routr`](#fluxible-plugin-routr) - Polymorphic routing behavior.
 - [`flux-router-component`](#flux-router-component) - React components and mixins for routing.


## `fluxible`

The main pluggable container. It provides interfaces that are common throughout
the Flux architecture and restricts usage of these APIs to only the parts that
need them to enforce the unidirectional flow.

GitHub Repo: https://github.com/yahoo/fluxible


## `dispatchr`

Dispatchr's main goal is to facilitate server-side rendering of Flux
applications while also working on the client-side to encourage code reuse. One
main difference between this and Facebook's dispatcher is that on the server,
we instantiate the dispatcher and store classes per request to encapsulate
data, preventing leaking to incorrect.

GitHub Repo: https://github.com/yahoo/dispatchr


## `fetchr`

Fetchr provides an appropriate abstraction so that you can fetch (CRUD) your
data in your stores using the same exact syntax on server and client side.

On the server, stores can call the database directly to fetch some data. On the
client, however, stores can NOT call the database in the same way. Instead, xhr
requests need to be made to the server (then to the database) and then the
response can be parsed client side.

GitHub Repo: https://github.com/yahoo/fetchr


## `fluxible-plugin-fetchr`

Provides isomorphic RESTful service access to your Fluxible application using
fetchr.

GitHub Repo: https://github.com/yahoo/fluxible-plugin-fetchr


## `routr`

Routr library is an implementation of router-related functionalities that can
be used for both server and client. This library does not use callbacks for
routes, instead just mapping them to string names that can be used as
application state and used within your application later. For instance in Flux,
the current route would be held as state in a store.

GitHub Repo: https://github.com/yahoo/routr


## `fluxible-plugin-routr`

Provides routing methods to your Fluxible application using routr.

GitHub Repo: https://github.com/yahoo/fluxible-plugin-routr


## `flux-router-component`

Provides navigational React components and router mixin for applications built
with Flux architecture. Please check out examples of how to use these
components.

GitHub Repo: https://github.com/yahoo/flux-router-component
