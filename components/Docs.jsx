/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var Menu = require('./Menu.jsx');
var Doc = require('./Doc.jsx');

var Component = React.createClass({
    render: function () {
        var context = this.props.context;

        return (
            <section id="docs">
                <div className="content">
                    <div className="pure-g">
                        <div className="pure-u-1 pure-u-md-5-24">
                            <div className="doc-menu">
                                <Menu config={this.props.menu} context={context} />
                            </div>
                        </div>
                        <div className="pure-u-1 pure-u-md-19-24">
                            <Doc content={this.props.content} context={this.props.context} />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
});

module.exports = Component;
