# Bringing Flux to the Server

Isomorphic Flux requires changes architecture so that server rendering is isolated between requests.

 * Stores are classes instead of singleton objects
 * Dispatcher is contextually aware and handles store instantiation
