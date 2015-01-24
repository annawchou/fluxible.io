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
                                    <li className="pure-menu-heading">APIs</li>
                                    <li><NavLink href="/s/api/fluxible.html" context={context}>Fluxible</NavLink></li>
                                    <li className="pure-menu-heading">Plugins</li>
                                    <li><NavLink href="/s/api/fluxible-plugin-fetchr.html" context={context}>Fluxible-plugin-Fetchr</NavLink></li>
                                    <li><NavLink href="/s/api/fluxible-plugin-routr.html" context={context}>Fluxible-plugin-Routr</NavLink></li>
                                    <li className="pure-menu-heading">Libraries</li>
                                    <li><NavLink href="/s/api/dispatchr.html" context={context}>Dispatchr</NavLink></li>
                                    <li><NavLink href="/s/api/fetchr.html" context={context}>Fetchr</NavLink></li>
                                    <li><NavLink href="/s/api/routr.html" context={context}>Routr</NavLink></li>
                                    <li><NavLink href="/s/api/flux-router-component.html" context={context}>Flux-router-component</NavLink></li>
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
