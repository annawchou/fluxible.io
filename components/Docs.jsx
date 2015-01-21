/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var StoreMixin = require('fluxible').StoreMixin;
var DocStore = require('../stores/DocStore');
var NavLink = require('flux-router-component').NavLink;

var Component = React.createClass({
    mixins: [ StoreMixin ],
    statics: {
        storeListeners: {
            _onChange: [ DocStore ]
        }
    },
    getInitialState: function () {
        var doc = this.getStore(DocStore).getCurrent();

        if (!doc) {
            doc = {};
        }

        return doc;
    },
    _onChange: function() {
        var doc = this.getStore(DocStore).getCurrent();
        this.setState(doc);
    },
    render: function () {
        var context = this.props.context;

        return (
            <section id="docs">
                <div className="pure-g">
                    <div className="pure-u-md-1-5">
                        <div className="pure-menu pure-menu-open">
                            <a className="pure-menu-heading">Fluxible Docs</a>
                            <ul>
                                <li>
                                    <NavLink href="/docs" context={context}>
                                        Overview
                                    </NavLink>
                                </li>
                                <li className="pure-menu-heading">Guides</li>
                                <li>
                                    <NavLink href="/docs/guides/routing" context={context}>
                                        Routing
                                    </NavLink>
                                </li>
                                <li className="pure-menu-disabled"><a>Todo MVC (coming soon)</a></li>
                                <li className="pure-menu-disabled"><a>Chat (coming soon)</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pure-u-md-4-5">
                        <div className="content"
                            dangerouslySetInnerHTML={{__html: this.state.content}}>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
});

module.exports = Component;
