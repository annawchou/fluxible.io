/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

// some environments run the app from a different directory
process.chdir(__dirname);

require('babel/register');
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
var assets = require('./utils/assets');
var show404 = require('./actions/show404');
var show500 = require('./actions/show500');

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

// Set up the fetchr middleware
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

// Render the app
function renderApp(res, context) {
    var renderedApp = React.renderToString(context.createElement());
    var exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';
    var doctype = '<!DOCTYPE html>';
    var componentContext = context.getComponentContext();
    var html = React.renderToStaticMarkup(HtmlComponent({
        assets: assets,
        context: componentContext,
        state: exposed,
        markup: renderedApp,
        tracking: tracking
    }));
    res.send(doctype + html);
}

// Every other request gets the app bootstrap
server.use(function (req, res, next) {
    var context = app.createContext({
        req: req, // The fetchr plugin depends on this
        xhrContext: {
            _csrf: req.csrfToken() // Make sure all XHR requests have the CSRF token
        }
    });

    context.executeAction(navigateAction, { url: req.url }, function (err) {
        if (err) {
            if (err.status === 404 || err.statusCode === 404) {
                res.status(404);
                context.executeAction(show404, { err: err }, function () {
                    renderApp(res, context);
                });
            }
            else {
                res.status(500);
                context.executeAction(show500, { err: err }, function () {
                    console.log(err.stack || err);
                    renderApp(res, context);
                });
            }

            return;
        }

        renderApp(res, context);
    });
});

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on port ' + port);
