/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var NavLink = require('flux-router-component').NavLink;
var cx = require('classnames');

var TopNav = React.createClass({
    render: function() {
        var selected = this.props.selected;

        return (
            <ul>
                <li className={cx({'pure-menu-selected': selected !== 'home'})}>
                    <NavLink routeName="quickStart">
                        Docs
                    </NavLink>
                </li>
                <li>
                    <a href="https://github.com/yahoo/fluxible" target="_blank">
                        <i className="fa fa-github"></i> GitHub
                    </a>
                </li>
            </ul>
        );
    }
});

module.exports = TopNav;
