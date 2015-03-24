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
            <ul id="navigation" role="navigation" className="Va-m reset">
                <li className={cx({'selected': selected !== 'home', 'D-ib Va-m Pos-r Fw-400': true})}>
                    <NavLink routeName="quickStart" className="D-b C-fff Td-n:h">
                        Docs
                    </NavLink>
                </li>
                <li className="D-ib Va-m Mstart-20px Pos-r Fw-400">
                    <a href="https://github.com/yahoo/fluxible" className="D-b C-fff Td-n:h" target="_blank">
                        <i className="Va-m Pos-r fa fa-github"></i> GitHub
                    </a>
                </li>
            </ul>
        );
    }
});

module.exports = TopNav;
