# fluxible.io

[![Build Status](https://travis-ci.org/yahoo/fluxible.io.svg?branch=master)](https://travis-ci.org/yahoo/fluxible.io)
[![Coverage Status](https://coveralls.io/repos/yahoo/fluxible.io/badge.svg)](https://coveralls.io/r/yahoo/fluxible.io)

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

Open [http://localhost:3000](http://localhost:3000)



### Production

To run in production, use `NODE_ENV=production npm run dev`. This will use the production
assets that `webpack` generates. NOTE, this may break your application if the asset hashes
are not on CDN.



## Testing

Unit tests can be run via `npm test`.

To run functional tests, ensure you have `webdriver` updated:

```bash
$ ./node_modules/.bin/webdriver-manager update --standalone
```

Then run `npm run func` to run protractor to execute the functional tests.



## Contributing
If you want to update the documentation on the site, you can submit a pull request to the
[fluxible](https://github.com/yahoo/fluxible) repository. The docs are pulled in from
the [yahoo/fluxible/docs](https://github.com/yahoo/fluxible/tree/master/docs) repo.



## License

Unless otherwise specified, this software is free to use under the Yahoo! Inc.
BSD license. See the [LICENSE file][] for license text and copyright
information.

[LICENSE file]: https://github.com/yahoo/fluxible.io/blob/master/LICENSE.md
