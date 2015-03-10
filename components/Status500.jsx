/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var NavLink = require('flux-router-component').NavLink;

var Component = React.createClass({
    render: function () {
        return (
            <section id="500">
                <div className="content">
                    <h1>Error</h1>
                    <p>Sorry there was an unexpected errror.</p>
                    <p><NavLink routeName="home">Back to the home page.</NavLink></p>
                </div>
            </section>
        );
    }
});

module.exports = Component;
