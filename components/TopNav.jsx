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
        var context = this.props.context;

        return (
            <ul>
                <li className={cx({'pure-menu-selected': selected === 'docs'})}>
                    <NavLink routeName="docs" navParams={{key: 'quick-start'}} context={context}>
                        Docs
                    </NavLink>
                </li>
                <li>
                    <NavLink routeName="apis" navParams={{key: 'fluxible'}} context={context}>
                        API
                    </NavLink>
                </li>
                <li>
                    <NavLink routeName="github" context={context} target="_blank">
                        <i className="fa fa-github"></i> GitHub
                    </NavLink>
                </li>
            </ul>
        );
    }
});

module.exports = TopNav;
