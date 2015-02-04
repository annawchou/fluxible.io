# Features

If you're looking for deep dive into how we made Flux isomorphic, take a look at [Bringing Flux to the Server](/guides/bringing-flux-to-the-server.html). But here's the high level overview of what we provide.

## Store Isolation

[Stores](/guides/stores.html) are classes that are instantiated per request or client session. This ensures that the stores are isolated and do not bleed information between requests.

## Dehydration/Rehydration

[Stores](/guides/stores.html) can provide `dehydrate` and `rehydrate` so that you can propagate the initial server state to the client.

## Flow Regulation

Fluxible restricts access to your Flux methods so that you can't break out of the unidirectional flow. Three contexts exist:

 * **Action Context**: interface accessible by action creator methods. Passed as first parameter to all action creators.
 * **Component Context**: interface accessible by React components. Should be passed as context using React or passed as prop to top level React component and then propagated to child components that require access to it.
 * **Store Context**: interface accessible by stores. Passed as first parameter to all stores. See [Dispatchr](https://github.com/yahoo/dispatchr#constructor-1) docs.

## Pluggable

Want to add your own interfaces to the Flux flow? [Plugins](/guides/plugins.html) allow you to add methods to any of the contexts.
