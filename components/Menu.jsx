/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react/addons');
var cx = require('classnames');
var NavLink = require('flux-router-component').NavLink;
var docsConfig = require('./../configs/menu');

var Component = React.createClass({
    render: function () {
        var self = this;
        var menu = [];
        docsConfig.forEach(function (menuitem) {
            if (menuitem.category) {
                menu.push(<h3 key={menuitem.category}>{menuitem.category}</h3>);
            }
            var submenu = [];
            menuitem.children.forEach(function (link) {
                var classList = cx({
                    'pure-menu-selected': self.props.selected === link.routeName
                });
                submenu.push(<li key={link.label} className={classList}><NavLink routeName={link.routeName}>{link.label}</NavLink></li>);
            });

            if (submenu.length) {
                menu.push(<ul key={menuitem.category + 'sub'}>{submenu}</ul>);
            }
        });
        return (
            <div className="doc-menu">
                {menu}
            </div>
        );
    }
});

module.exports = Component;
