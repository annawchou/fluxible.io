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
            <section id="404">
                <div className="content">
                    <h1>Not found</h1>
                    <p>Sorry we couldn't find that resource.</p>
                    <p><NavLink routeName="home">Back to the home page.</NavLink></p>
                </div>
            </section>
        );
    }
});

module.exports = Component;
