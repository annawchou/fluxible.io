/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var FluxibleApp = require('fluxible');
var fetchrPlugin = require('fluxible-plugin-fetchr');
var routrPlugin = require('fluxible-plugin-routr');
var routes = require('./configs/routes');
var show500 = require('./actions/show500');
var show404 = require('./actions/show404');

var app = new FluxibleApp({
    component: React.createFactory(require('./components/Application.jsx')),
    componentActionHandler: function (context, payload, done) {
        if (payload.err) {
            if (payload.err.statusCode && payload.err.statusCode === 404) {
                context.executeAction(show404, payload, done);
            }
            else {
                context.executeAction(show500, payload, done);
            }
            return;
        }
        done();
    }
});

app.plug(fetchrPlugin({ xhrPath: '/_api' }));
app.plug(routrPlugin({ routes: routes }));

app.registerStore(require('./stores/DocStore'));
app.registerStore(require('./stores/ApplicationStore'));

module.exports = app;
