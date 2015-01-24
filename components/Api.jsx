/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var StoreMixin = require('fluxible').StoreMixin;
var ApiStore = require('../stores/ApiStore');
var NavLink = require('flux-router-component').NavLink;

var Component = React.createClass({
    mixins: [ StoreMixin ],
    statics: {
        storeListeners: {
            _onChange: [ ApiStore ]
        }
    },
    getInitialState: function () {
        var api = this.getStore(ApiStore).getCurrent() || {};
        return api;
    },
    _onChange: function() {
        var api = this.getStore(ApiStore).getCurrent();
        this.setState(api);
    },
    render: function () {
        var context = this.props.context;

        return (
            <section id="docs">
                <div className="content">
                    <div className="pure-g">
                        <div className="pure-u-1 pure-u-md-6-24">
                            <div className="doc-menu pure-menu pure-menu-open">
                                <ul>
                                    <li><NavLink href="/overview.html" context={context}>Overview</NavLink></li>
                                    <li><NavLink href="/quick-start.html" context={context}>Quick Start</NavLink></li>
                                    <li className="pure-menu-heading">Guides</li>
                                    <li><NavLink href="/guides/flux-and-fluxible.html" context={context}>Flux &amp; Fluxible</NavLink></li>
                                    <li><NavLink href="/guides/plugins.html" context={context}>Plugins</NavLink></li>
                                    <li><NavLink href="/guides/dispatcher.html" context={context}>Dispatcher</NavLink></li>
                                    <li><NavLink href="/guides/stores.html" context={context}>Stores</NavLink></li>
                                    <li><NavLink href="/guides/actions.html" context={context}>Actions</NavLink></li>
                                    <li><NavLink href="/guides/fetching-data.html" context={context}>Fetching Data</NavLink></li>
                                    <li className="pure-menu-heading">Tutorials</li>
                                    <li><NavLink href="/tutorials/routing.html" context={context}>Routing</NavLink></li>
                                    <li><NavLink href="/tutorials/todo-mvc.html" context={context}>Todo MVC</NavLink></li>
                                    <li><NavLink href="/tutorials/chat.html" context={context}>Chat</NavLink></li>
                                </ul>
                            </div>
                        </div>
                        <div className="pure-u-1 pure-u-md-18-24">
                            <div className="doc-content" dangerouslySetInnerHTML={{__html: this.state.content}}></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
});

module.exports = Component;
