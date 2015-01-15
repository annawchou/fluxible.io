/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var NavLink = require('flux-router-component').NavLink;

var TopNav = React.createClass({
    getDefaultProps: function () {
        return {
            selected: 'home',
            links: {}
        };
    },
    render: function() {
        var selected = this.props.selected;
        var links = this.props.links;
        var context = this.props.context;
        var linkHTML = Object.keys(links).map(function (name) {
            var className;
            var link = links[name];

            if (selected === name) {
                className = 'pure-menu-selected';
            }

            return (
                <li className={className} key={link.path}>
                    <NavLink routeName={link.page} context={context} target={link.target}>{link.label}</NavLink>
                </li>
            );
        });

        return (
            <ul>
                {linkHTML}
            </ul>
        );
    }
});

module.exports = TopNav;
