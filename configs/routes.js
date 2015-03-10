/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var showDoc = require('../actions/showDoc');

var createKey = require('./../utils/createAPIKey');

// Generate an hash of valid api routes, from the /configs/apis.js file
var apiConfig = require('./apis');
var createWhitelist = require('./../utils/createAPIWhitelist');
var apiRoutesWhitelist = createWhitelist(apiConfig);

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
                key: createKey('api', api.repo, api.navParams && api.navParams.slug),
                slug: slug,
                pageTitle: ((api && api.label) || 'Missing') + ' API'
            };
            context.executeAction(showDoc, params, done);
        }
    },
    docs: {
        path: '/:type(tutorials|guides|community)?/:slug.html',
        method: 'get',
        page: 'docs',
        label: 'docs',
        action: function (context, payload, done) {
            var params = {
                resource: 'docs',
                key: createKey('docs', payload.params.type, payload.params.slug)
            };
            context.executeAction(showDoc, params, done);
        }
    }
};
