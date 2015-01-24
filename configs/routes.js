/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var showDoc = require('../actions/showDoc');

module.exports = {
    home: {
        path: '/',
        method: 'get',
        page: 'home',
        label: 'Home',
        action: function (context, payload, done) {
            var params = {
                resource: 'docs',
                key: '/docs/home.md',
                pageTitle: 'Fluxible | A Pluggable Container for Isomorphic Flux Applications'
            };
            context.executeAction(showDoc, params, done);
        }
    },
    apis: {
        path: '/api/:key.html',
        method: 'get',
        page: 'apis',
        label: 'API',
        action: function (context, payload, done) {
            var params = {
                resource: 'api',
                key: 'api/' + payload.params.key,
                repo: payload.params.key
            };
            context.executeAction(showDoc, params, done);
        }
    },
    docs: {
        path: '/:type(tutorials|guides)?/:key.html',
        method: 'get',
        page: 'docs',
        label: 'docs',
        action: function (context, payload, done) {
            var params = {
                resource: 'docs',
                key: '/docs/' +
                    (payload.params.type ? payload.params.type + '/' : '') +
                    payload.params.key + '.md'
            };
            context.executeAction(showDoc, params, done);
        }
    },
    github: {
        path: 'https://github.com/yahoo/fluxible',
        method: 'get',
        page: 'github',
        label: 'GitHub',
        target: '_blank',
        action: function (context, payload, done) {
            done();
        }
    }
};
