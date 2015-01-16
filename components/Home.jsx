/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var NavLink = require('flux-router-component').NavLink;

var Component = React.createClass({
    render: function () {

        return (
            <section id="home">
                <div className="splash-container">
                    <div className="splash">
                        <h1 className="splash-head">Fluxible</h1>
                        <p className="splash-subhead">
                            Build isophorphic Flux applications
                        </p>
                        <p>
                            <NavLink className="pure-button pure-button-primary" routeName="guides" context={this.props.context}>Get Started</NavLink>
                        </p>
                    </div>
                </div>
                <div className="content">
                    <h1>Home</h1>
                    <p>Princess Leia I find your lack of faith disturbing lightsaber Tosche Station apprentice. Uncle Owen hyperspace stormtrooper. I'd just as soon kiss a wookiee bantha emperor wretched hive of scum and villainy blast shield. I've got a very bad feeling about this Lando Calrissian Darth Vader. Princess Leia I find your lack of faith disturbing lightsaber Tosche Station apprentice. Uncle Owen hyperspace stormtrooper. I'd just as soon kiss a wookiee bantha emperor wretched hive of scum and villainy blast shield. I've got a very bad feeling about this Lando Calrissian Darth Vader.</p>
                </div>
            </section>
        );
    }
});

module.exports = Component;
