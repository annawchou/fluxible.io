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
        var doc = this.getStore(DocStore).getCurrent() || {};
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
                    <div className="pure-u-1 pure-u-md-1-5">
                        <div className="pure-menu pure-menu-open">
                            <NavLink href="/docs" context={context}>Quick Start</NavLink>
                            <ul>
                                <li className="pure-menu-heading">Guides</li>
                                <li><NavLink href="/docs/flux-and-fluxible" context={context}>Flux &amp; Fluxible</NavLink></li>
                                <li><NavLink href="/docs/plugins" context={context}>Plugins</NavLink></li>
                                <li><NavLink href="/docs/dispatcher" context={context}>Dispatcher</NavLink></li>
                                <li><NavLink href="/docs/stores" context={context}>Stores</NavLink></li>
                                <li><NavLink href="/docs/actions" context={context}>Actions</NavLink></li>
                                <li><NavLink href="/docs/fetching-data" context={context}>Fetching Data</NavLink></li>
                                <li className="pure-menu-heading">Tutorials</li>
                                <li><NavLink href="/docs/guides/routing" context={context}>Routing</NavLink></li>
                                <li><NavLink href="/docs/guides/todo-mvc" context={context}>Todo MVC</NavLink></li>
                                <li><NavLink href="/docs/guides/chat" context={context}>Chat</NavLink></li>
                                <li className="pure-menu-heading">GitHub Links</li>
                                <li><a href="https://github.com/yahoo/fluxible" target="_blank">fluxible</a></li>
                                <li><a href="https://github.com/yahoo/dispatchr" target="_blank">dispatchr</a></li>
                                <li><a href="https://github.com/yahoo/fetchr" target="_blank">fetchr</a></li>
                                <li><a href="https://github.com/yahoo/fluxible-plugin-fetchr" target="_blank">fluxible-plugin-fetchr</a></li>
                                <li><a href="https://github.com/yahoo/routr" target="_blank">routr</a></li>
                                <li><a href="https://github.com/yahoo/fluxible-plugin-routr" target="_blank">fluxible-plugin-routr</a></li>
                                <li><a href="https://github.com/yahoo/flux-router-component" target="_blank">flux-router-component</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pure-u-1 pure-u-md-4-5">
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
