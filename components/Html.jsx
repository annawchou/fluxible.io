/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var PageStore = require('../stores/PageStore');

var Component = React.createClass({
    render: function () {
        return (
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <title>{this.props.context.getStore(PageStore).getPageTitle()}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0/pure-min.css" />
                    <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0/grids-responsive-min.css" />
                    <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" />
                    <link rel="stylesheet" href="/public/css/theme.css" />
                </head>
                <body>
                    <section id="docsapp" dangerouslySetInnerHTML={{__html: this.props.markup}}></section>
                    <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
                     <div className="footer l-box is-center">
                         Yahoo! &copy; 2015
                     </div>
                    <script src="/public/js/common.js" defer></script>
                    <script src="/public/js/main.js" defer></script>
                </body>
            </html>
        );
    }
});

module.exports = Component;
