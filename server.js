/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import express from 'express';
import favicon from 'serve-favicon';
import serialize from 'serialize-javascript';
import {navigateAction} from 'flux-router-component';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import React from 'react';
import app from './app';
import html from './components/Html.jsx';
import tracking from './configs/tracking';
import assets from './utils/assets';
import show404 from './actions/show404';
import show500 from './actions/show500';

const HtmlComponent = React.createFactory(html);
const server = express();

server.set('state namespace', 'App');
server.use(favicon(__dirname + '/assets/images/favicon.ico'));
server.use('/public', express.static(__dirname + '/build'));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(csrf({cookie: true}));

// Get access to the fetchr plugin instance
const fetchrPlugin = app.getPlugin('FetchrPlugin');

// Register our services
fetchrPlugin.registerService(require('./services/docs'));

// Set up the fetchr middleware
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

// Render the app
function renderApp(res, context) {
    const renderedApp = React.renderToString(context.createElement());
    const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';
    const doctype = '<!DOCTYPE html>';
    const componentContext = context.getComponentContext();
    const html = React.renderToStaticMarkup(HtmlComponent({
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
    const context = app.createContext({
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

const port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on port ' + port);
