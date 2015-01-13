/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var createStore = require('fluxible/utils/createStore');

module.exports = createStore({
    storeName: 'DocsStore',
    handlers: {
        'RECEIVE_DOCS_SUCCESS': '_receiveDocs'
    },
    initialize: function () {
        this.docs = [];
    },
    _receiveDocs: function (docs) {
        this.docs = docs;
        this.emitChange();
    },
    getAll: function () {
        return this.docs;
    },
    dehydrate: function () {
        return {
            docs: this.docs
        };
    },
    rehydrate: function (state) {
        this.docs = state.docs;
    }
});
