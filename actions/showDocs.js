/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

module.exports = function (context, payload, done) {
    context.dispatch('RECEIVE_DOCS_START', payload);
    context.dispatch('UPDATE_PAGE_TITLE', 'fluxible.io');

    context.service.read('docs', {}, {}, function (err, docs) {
        if (err) {
            context.dispatch('RECEIVE_DOCS_FAILURE', payload);
            done();
            return;
        }
        context.dispatch('RECEIVE_DOCS_SUCCESS', docs);
        done();
    });
};
