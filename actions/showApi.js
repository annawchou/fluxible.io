/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var ApiStore = require('../stores/ApiStore');
var debug = require('debug')('showApi');

module.exports = function (context, payload, done) {
    var apiFromCache = context.getStore(ApiStore).get(payload.repo);

    // is the content already in the store?
    if (apiFromCache) {
        context.dispatch('RECEIVE_API_SUCCESS', apiFromCache);
        context.dispatch('UPDATE_PAGE_TITLE', {
            pageTitle: 'Fluxible | API - ' + apiFromCache.title
        });
        return done();
    }

    // get content from service
    context.service.read('api', payload, {}, function (err, data) {
        if (err || !data) {
            context.dispatch('RECEIVE_API_FAILURE', payload);
            debug('err', payload);
            return done(err);
        }

        context.dispatch('RECEIVE_API_SUCCESS', {
            content: data,
            repo: payload.repo
        });
        context.dispatch('UPDATE_PAGE_TITLE', {
            pageTitle: 'Fluxible | API - ' + payload.repo
        });
        done();
    });
};
