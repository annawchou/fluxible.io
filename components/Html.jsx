/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var ApplicationStore = require('../stores/ApplicationStore');
var FluxibleMixin = require('fluxible').FluxibleMixin;

var Component = React.createClass({
    mixins: [ FluxibleMixin ],
    render: function () {
        return (
            <html id="atomic" className="atomic">
                <head>
                    <meta charSet="utf-8" />
                    <title>{this.getStore(ApplicationStore).getPageTitle()}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" />
                    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Nobile" />
                    <link rel="stylesheet" href="/public/css/bundle.css" />
                    <script dangerouslySetInnerHTML={{__html: this.props.tracking}}></script>
                </head>
                <body className="Mih-100%">
                    <div id="docsapp" className="H-100%" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
                    <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
                    <script src={this.props.assets.common}></script>
                    <script src={this.props.assets.main}></script>
                </body>
            </html>
        );
    }
});

module.exports = Component;
