/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

module.exports = function (context, payload, done) {
    context.dispatch('STATUS_500', payload);
    done();
};
