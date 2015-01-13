/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

module.exports = {
    name: 'docs',
    read: function (req, resource, params, config, callback) {
        callback(null, ['doc1', 'doc2']);
    }
};
