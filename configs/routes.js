/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var showDoc = require('../actions/showDoc');

// Generate an hash of valid api routes, from the /configs/apis.js file
var apiConfig = require('./apis');
var apiRoutesWhitelist = apiConfig.reduce(function (whitelist, item) {
    item.children.forEach(function (api) {
        whitelist[api.navParams.slug] = api;
    });
    return whitelist;
}, {});

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
        path: '/api/:slug.html',
        method: 'get',
        page: 'apis',
        label: 'API',
        action: function (context, payload, done) {
            var slug = payload.params.slug;
            var api = apiRoutesWhitelist[slug] || {};

            var params = {
                resource: 'api',
                key: '/apis/' +
                    (api.repo || 'missing') + '/' +
                    (api.path || 'missing'),
                slug: slug,
                pageTitle: api.label || 'Missing API' + ' | Fluxible'
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
