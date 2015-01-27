/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var NavLink = require('flux-router-component').NavLink;
var Doc = require('./Doc.jsx');

var Component = React.createClass({
    render: function () {

        return (
            <section id="home">
                <div className="splash-container">
                    <div className="splash">
                        <h1 className="splash-head">Fluxible</h1>
                        <p className="splash-subhead">
                            Build isomorphic Flux applications
                        </p>
                        <p>
                            <NavLink className="pure-button pure-button-primary" routeName="docs" navParams={{key: 'quick-start'}} context={this.props.context}>Get Started</NavLink>
                        </p>
                    </div>
                </div>
                <div className="content">
                    <Doc content={this.props.content} context={this.props.context} />
                </div>

                <div className="is-center">
                    <NavLink className="pure-button pure-button-primary" routeName="docs" navParams={{key: 'quick-start'}} context={this.props.context}>Get Started</NavLink>
                </div>
                <hr/>

                <div className="is-center"><cite>Splash derived from <a href="https://www.flickr.com/photos/devinmoore/2670474853" target="_blank">Blue Ring Electricity Fractal</a> by <a href="https://www.flickr.com/photos/devinmoore/" target="_blank">Devin Moore</a> used under <a href="http://creativecommons.org/licenses/by/2.0/" target="_blank">CC BY 2.0</a></cite></div>
            </section>
        );
    }
});

module.exports = Component;
