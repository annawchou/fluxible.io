/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/* global describe, it, beforeEach */
'use strict';
var expect = require('chai').expect;
var MockContext = require('fluxible/utils/MockActionContext')();
var MockService = require('fluxible-plugin-fetchr/utils/MockServiceManager');
var DocStore = require('../../../stores/DocStore');
var routes = require('../../../configs/routes.js');
var docResponse = require('../../fixtures/doc-response.js');
var mockery = require('mockery');

MockContext.Dispatcher.registerStore(DocStore);

describe('routes', function () {
    var context;

    beforeEach(function () {
        context = new MockContext();
        context.service = new MockService();
        context.service.setService('docs', function (method, params, config, callback) {
            if (params.emulateError) {
                return callback(new Error('Things went sour.'));
            }

            callback(null, docResponse);
        });
        context.service.setService('api', function (method, params, config, callback) {
            if (params.emulateError) {
                return callback(new Error('Things went sour.'));
            }

            callback(null, docResponse);
        });
        mockery.registerMock('./../utils/createAPIWhitelist', {
            fluxible: {
                label: 'Fluxible',
                repo: 'fluxible',
                path: 'docs/fluxible.md',
                routeName: 'apis',
                navParams: {
                    slug: 'fluxible'
                }
            }
        });
        mockery.enable({
            useCleanCache: true,
            warnOnUnregistered: false
        });
    });

    afterEach(function () {
        mockery.disable();
        mockery.deregisterAll();
    });

    it('should execute the home action', function (done) {
        context.executeAction(routes.home.action, {}, function (err) {
            if (err) {
                return done(err);
            }

            var docs = context.getStore(DocStore).getAll();
            expect(docs).to.be.an('object');
            done();
        });
    });

    it('should execute the apis action', function (done) {
        var payload = {
            params: {
                slug: 'fluxible'
            }
        };

        context.executeAction(routes.apis.action, payload, function (err) {
            if (err) {
                return done(err);
            }

            var docs = context.getStore(DocStore).getAll();
            expect(docs).to.be.an('object');
            done();
        });
    });

    it('should execute the docs action (without type param)', function (done) {
        var payload = {
            params: {
                slug: 'overview'
            }
        };

        context.executeAction(routes.docs.action, payload, function (err) {
            if (err) {
                return done(err);
            }

            var docs = context.getStore(DocStore).getAll();
            expect(docs).to.be.an('object');
            done();
        });
    });

    it('should execute the docs action (with type param)', function (done) {
        var payload = {
            params: {
                type: 'guides',
                slug: 'learn-stuff'
            }
        };

        context.executeAction(routes.docs.action, payload, function (err) {
            if (err) {
                return done(err);
            }

            var docs = context.getStore(DocStore).getAll();
            expect(docs).to.be.an('object');
            done();
        });
    });
});
