/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/*global document, window */
'use strict';

var React = require('react');
var app = require('./app');
var dehydratedState = window.App; // sent from the server

// for chrome dev tool support
window.React = React;

app.rehydrate(dehydratedState, function (err, context) {
    if (err) {
        throw err;
    }

    window.context = context;

    var AppComponent = app.getAppComponent();
    React.render(
        AppComponent({
            context: context.getComponentContext()
        }),
        document.getElementById('docsapp')
    );
});
