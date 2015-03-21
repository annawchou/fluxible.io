/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var DocStore = require('../stores/DocStore');

module.exports = function (context, payload, done) {
    var docFromCache = context.getStore(DocStore).get(payload.name);

    // is the content already in the store?
    if (docFromCache) {
        context.dispatch('RECEIVE_DOC_SUCCESS', docFromCache);
        context.dispatch('UPDATE_PAGE_TITLE', {
            pageTitle: payload.config && (payload.config.pageTitle || payload.config.pageTitlePrefix + ' | Fluxible')
        });
        return done();
    }

    // get content from service
    context.service.read('docs', payload, {}, function (err, data) {
        if (err) {
            return done(err);
        }

        if (!data) {
            var err404 = new Error('Document not found');
            err404.statusCode = 404;
            return done(err404);
        }

        context.dispatch('RECEIVE_DOC_SUCCESS', data);
        context.dispatch('UPDATE_PAGE_TITLE', {
            pageTitle: payload.config && (payload.config.pageTitle || payload.config.pageTitlePrefix + ' | Fluxible')
        });
        done();
    });
};
