/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var createStore = require('fluxible/utils/createStore');
var routesConfig = require('../configs/routes');

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
        this.currentPageId = null;
        this.currentPageName = null;
        this.currentPage = null;
        this.currentRoute = null;
        this.pages = routesConfig;
        this.pageTitle = '';
    },
    changeRoute: function (route) {
        this.currentRoute = route;
        this.emitChange();
    },
    handleNavigate: function (route) {
        var pageId = route.params.key || route.params.slug;
        var pageName = route.config.page;
        var page = this.pages[pageName];

        if (pageName === this.currentPageName && pageId === this.currentPageId) {
            return;
        }

        this.currentPageId = pageId;
        this.currentPageName = pageName;
        this.currentPage = page;
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
        return {
            currentPageName: this.currentPageName,
            currentPage: this.currentPage,
            pages: this.pages,
            route: this.currentRoute,
            pageTitle: this.pageTitle
        };
    },
    rehydrate: function (state) {
        this.currentPageName = state.currentPageName;
        this.currentPage = state.currentPage;
        this.pages = state.pages;
        this.currentRoute = state.route;
        this.pageTitle = state.pageTitle;
    }
});


module.exports = ApplicationStore;
