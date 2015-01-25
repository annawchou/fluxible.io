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
            context.dispatch('UPDATE_PAGE_TITLE', {
                pageTitle: 'Fluxible | A Pluggable Container for Isomorphic Flux Applications'
            });
            done();
        }
    },
    docs: {
        path: '/:type?/:key.html',
        method: 'get',
        page: 'docs',
        label: 'docs',
        action: function (context, payload, done) {
            var params = {
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
