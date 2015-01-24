/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var createStore = require('fluxible/utils/createStore');

module.exports = createStore({
    storeName: 'ApiStore',
    initialize: function () {
        this.apis = {};
        this.current = {};
    },
    handlers: {
        'RECEIVE_API_SUCCESS': '_receiveApi'
    },
    _receiveApi: function (api) {
        if (!api || !api.hasOwnProperty('repo')) {
            return;
        }

        this.apis[api.repo] = api;
        this.current = api;
        this.emitChange();
    },
    get: function (repo) {
        return this.apis[repo];
    },
    getAll: function () {
        return this.apis;
    },
    getCurrent: function () {
        return this.current;
    },
    dehydrate: function () {
        return {
            apis: this.apis,
            current: this.current
        };
    },
    rehydrate: function (state) {
        this.apis = state.apis;
        this.current = state.current;
    }
});
