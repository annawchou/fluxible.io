/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

// some environments run the app from a different directory
process.chdir(__dirname);

require('node-jsx').install({ extension: '.jsx' });
var express = require('express');
var favicon = require('serve-favicon');
var serialize = require('serialize-javascript');
var navigateAction = require('flux-router-component').navigateAction;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
var React = require('react');
var app = require('./app');
var HtmlComponent = React.createFactory(require('./components/Html.jsx'));
var tracking = require('./configs/tracking');

var server = express();
server.set('state namespace', 'App');
server.use(favicon(__dirname + '/assets/images/favicon.ico'));
server.use('/public', express.static(__dirname + '/build'));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(csrf({cookie: true}));

// Get access to the fetchr plugin instance
var fetchrPlugin = app.getPlugin('FetchrPlugin');

// Register our services
fetchrPlugin.registerService(require('./services/docs'));
fetchrPlugin.registerService(require('./services/api'));

// Set up the fetchr middleware
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

// Every other request gets the app bootstrap
server.use(function (req, res, next) {
    var context = app.createContext({
        req: req, // The fetchr plugin depends on this
        xhrContext: {
            _csrf: req.csrfToken() // Make sure all XHR requests have the CSRF token
        }
    });

    context.executeAction(navigateAction, {
        url: req.url
    }, function (err) {
        if (err) {
            if (err.status && err.status === 404) {
                next();
            } else {
                next(err);
            }
            return;
        }

        var exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

        var AppComponent = app.getAppComponent();
        var doctype = '<!DOCTYPE html>';
        React.withContext(context.getComponentContext(), function () {
            var html = React.renderToStaticMarkup(HtmlComponent({
                state: exposed,
                markup: React.renderToString(AppComponent({
                    context: context.getComponentContext()
                })),
                tracking: tracking
            }));
            res.send(doctype + html);
        });
    });
});

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on port ' + port);
