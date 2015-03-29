/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/* global describe, it, beforeEach */
'use strict';
import {expect} from 'chai';
import ApplicationStore from '../../../stores/ApplicationStore';
import routesConfig from '../../../configs/routes';

describe('application store', function () {
    let storeInstance;
    let homeRoute = {
        params: { key: 'home' },
        config: { page: 'Home' }
    };

    beforeEach(function () {
        storeInstance = new ApplicationStore();
    });

    it('should instantiate correctly', function (done) {
        expect(storeInstance).to.be.an('object');
        expect(storeInstance.currentPageName).to.equal(null);
        expect(storeInstance.currentRoute).to.equal(null);
        expect(storeInstance.pageTitle).to.equal('');
        done();
    });

    it('should handle navigate', function (done) {
        storeInstance.changeRoute(homeRoute);
        storeInstance.handleNavigate(homeRoute);

        expect(storeInstance.getCurrentRoute()).to.equal(homeRoute);
        done();
    });

    it('should update page title', function (done) {
        let title = { pageTitle: 'Fluxible Rocks' };
        storeInstance.updatePageTitle(title);

        expect(storeInstance.pageTitle).to.equal(title.pageTitle);
        done();
    });

    it('should get current page title', function (done) {
        let title = { pageTitle: 'Fluxible Rocks' };
        storeInstance.updatePageTitle(title);

        expect(storeInstance.getPageTitle()).to.equal(title.pageTitle);
        done();
    });

    it('should get current route', function (done) {
        storeInstance.changeRoute(homeRoute);
        storeInstance.handleNavigate(homeRoute);

        expect(storeInstance.getCurrentRoute()).to.equal(homeRoute);
        done();
    });

    it('should dehydrate', function (done) {
        storeInstance.changeRoute(homeRoute);
        storeInstance.handleNavigate(homeRoute);
        let title = { pageTitle: 'Fluxible Rocks' };
        storeInstance.updatePageTitle(title);

        let state = storeInstance.dehydrate();
        expect(state.currentPageName).to.equal(null);
        expect(state.route).to.equal(homeRoute);
        expect(state.pageTitle).to.equal(title.pageTitle);
        done();
    });

    it('should rehydrate', function (done) {
        let title = { pageTitle: 'Fluxible Rocks' };
        let state = {
            currentPageName: null,
            route: homeRoute,
            pageTitle: title.pageTitle
        };

        storeInstance.rehydrate(state);

        expect(storeInstance.currentPageName).to.equal(null);
        expect(storeInstance.currentRoute).to.equal(homeRoute);
        expect(storeInstance.pageTitle).to.equal(title.pageTitle);
        done();
    });
});
