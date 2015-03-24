/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var DocStore = require('../stores/DocStore');

module.exports = function (context, route, done) {
    var routeConfig = route.config || {};
    var githubPath = routeConfig.githubPath;

    if (!githubPath) {
        var err404 = new Error('Document not found');
        err404.statusCode = 404;
        return done(err404);
    }

    var pageTitle = routeConfig.pageTitle || (routeConfig.pageTitlePrefix + ' | Fluxible');

    // Load from cache
    var docFromCache = context.getStore(DocStore).get(githubPath);

    // is the content already in the store?
    if (docFromCache) {
        context.dispatch('RECEIVE_DOC_SUCCESS', docFromCache);
        context.dispatch('UPDATE_PAGE_TITLE', {
            pageTitle: pageTitle
        });
        return done();
    }

    // Load from service
    context.service.read('docs', {path: githubPath}, {}, function (err, data) {
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
            pageTitle: pageTitle
        });
        done();
    });
};
