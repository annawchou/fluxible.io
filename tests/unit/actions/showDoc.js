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
var showDoc = require('../../../actions/showDoc');
var docResponse = require('../../fixtures/doc-response.js');

MockContext.Dispatcher.registerStore(DocStore);

describe('controller actions', function () {
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
    });

    it('should load data from the service', function (done) {
        var params = {
            resource: 'docs',
            key: '/docs/quick-start.md'
        };

        context.executeAction(showDoc, params, function (err) {
            if (err) {
                return done(err);
            }

            var docs = context.getStore(DocStore).getAll();
            expect(docs).to.be.an('object');

            done();
        });
    });

    it('should load data from the cache', function (done) {
        var params = {
            resource: 'docs',
            key: '/docs/quick-start.md'
        };

        context.executeAction(showDoc, params, function (err) {
            if (err) {
                return done(err);
            }

            var doc = context.getStore(DocStore).getCurrent();
            expect(doc).to.be.an('object');

            // execute again
            context.executeAction(showDoc, params, function (err) {
                if (err) {
                    return done(err);
                }

                done();
            });
        });
    });

    it('should handle a service error', function (done) {
        var params = {
            resource: 'docs',
            key: '/docs/slow-start.md',
            emulateError: true
        };

        context.executeAction(showDoc, params, function (err) {
            expect(err).to.be.an('object');
            done();
        });
    });
});

