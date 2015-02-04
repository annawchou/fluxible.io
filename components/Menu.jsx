/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react/addons');
var cx = React.addons.classSet;
var NavLink = require('flux-router-component').NavLink;

var Component = React.createClass({
    render: function () {
        var self = this;
        var menu = [];
        this.props.config.forEach(function (menuitem) {
            if (menuitem.category) {
                menu.push(<h3 key={menuitem.category}>{menuitem.category}</h3>);
            }

            var submenu = [];
            menuitem.children.forEach(function (link) {
                var selected = '/' + link.routeName + '/' +
                    (link.navParams.type ? link.navParams.type + '/' : '') +
                    link.navParams.key + '.md';
                submenu.push(<li key={link.label} className={cx({'pure-menu-selected': self.props.selected === selected})}><NavLink routeName={link.routeName} navParams={link.navParams}>{link.label}</NavLink></li>);
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
