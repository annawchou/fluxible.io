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
                    <div className="citation">
                        <cite>
                            <a href="https://www.flickr.com/photos/devinmoore/2670474853" title="Splash derived from Blue Ring Electricity Fractal by Devin Moore used under CC BY 2.0" _target="blank">Citation</a>
                        </cite>
                    </div>
                </div>

                <div className="content">
                    <Doc content={this.props.content} context={this.props.context} />
                </div>

                <div className="is-center">
                    <NavLink className="pure-button pure-button-secondary" routeName="docs" navParams={{key: 'quick-start'}} context={this.props.context}>Get Started</NavLink>
                </div>
            </section>
        );
    }
});

module.exports = Component;
