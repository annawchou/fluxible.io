/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var PageStore = require('../stores/PageStore');

var Component = React.createClass({
    render: function() {
        return (
            <html>
            <head>
                <meta charSet="utf-8" />
                <title>{this.props.context.getStore(PageStore).getPageTitle()}</title>
                <meta name="viewport" content="width=device-width, user-scalable=no" />
                <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0/pure-min.css" />
                <link rel="stylesheet" href="/public/css/styles.css" />
            </head>
            <body>
                <h1>Fluxible</h1>
                <section id="docsapp" dangerouslySetInnerHTML={{__html: this.props.markup}}></section>
                <footer id="info">
                    <p>Yahoo &copy; 2015</p>
                    <p><a href="http://fluxible.io">Fluxible</a></p>
                </footer>
            </body>
            <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
            <script src="/public/js/common.js" defer></script>
            <script src="/public/js/main.js" defer></script>
            </html>
        );
    }
});

module.exports = Component;
