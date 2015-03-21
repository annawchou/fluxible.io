/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var createStore = require('fluxible/addons').createStore;
var routes = require('../configs/routes');

var ApplicationStore = createStore({
    storeName: 'ApplicationStore',
    handlers: {
        'CHANGE_ROUTE_START': 'changeRoute',
        'CHANGE_ROUTE_SUCCESS': 'handleNavigate',
        'UPDATE_PAGE_TITLE': 'updatePageTitle',
        'STATUS_500': 'status500',
        'STATUS_404': 'status404'
    },
    initialize: function (dispatcher) {
        this.currentPageName = null;
        this.currentRoute = null;
        this.pageTitle = '';
    },
    changeRoute: function (route) {
        this.currentRoute = route;
        this.emitChange();
    },
    handleNavigate: function (route) {
        this.currentPageName = null;
        this.emitChange();
    },
    updatePageTitle: function (title) {
        this.pageTitle = title.pageTitle;
        this.emitChange();
    },
    status500: function () {
        this.currentPageName = '500';
        this.emitChange();
    },
    status404: function () {
        this.currentPageName = '404';
        this.emitChange();
    },
    getCurrentPageName: function () {
        return this.currentPageName;
    },
    getPageTitle: function () {
        return this.pageTitle;
    },
    getCurrentRoute: function () {
        return this.currentRoute;
    },
    dehydrate: function () {
        if (this.currentRoute) {
            delete this.currentRoute.config;
        }
        return {
            currentPageName: this.currentPageName,
            route: this.currentRoute,
            pageTitle: this.pageTitle
        };
    },
    rehydrate: function (state) {
        this.currentPageName = state.currentPageName;
        this.currentRoute = state.route;
        if (state.route) {
            this.currentRoute.config = routes[this.currentRoute.name];
        }
        this.pageTitle = state.pageTitle;
    }
});


module.exports = ApplicationStore;
