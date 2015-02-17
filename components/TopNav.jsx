/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react/addons');
var NavLink = require('flux-router-component').NavLink;

var cx = React.addons.classSet;

var TopNav = React.createClass({
    render: function() {
        var selected = this.props.selected;

        return (
            <ul>
                <li className={cx({'pure-menu-selected': selected === 'docs'})}>
                    <NavLink routeName="docs" navParams={{slug: 'quick-start'}}>
                        Docs
                    </NavLink>
                </li>
                <li className={cx({'pure-menu-selected': selected === 'apis'})}>
                    <NavLink routeName="apis" navParams={{slug: 'fluxible'}}>
                        API
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
