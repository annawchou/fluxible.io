# fluxible.io

The doc site for [Fluxible](https://github.com/yahoo/fluxible).


## Setup

```bash
$ npm install
```

## Run the app

```bash
$ npm run dev
```

This will use `nodemon` and `webpack` to watch for changes and restart and
rebuild as needed.

Open http://localhost:3000

### Production

To run in production, use `NODE_ENV=production npm run dev`. This will use the production
assets that `webpack` generates. NOTE, this may break your application if the asset hashes
are not on CDN.


## License

Unless otherwise specified, this software is free to use under the Yahoo! Inc.
BSD license. See the [LICENSE file][] for license text and copyright
information.

[LICENSE file]: https://github.com/yahoo/fluxible.io/blob/master/LICENSE.md
