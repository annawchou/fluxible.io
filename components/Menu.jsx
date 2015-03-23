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
                menu.push(<h3 className="Fz-14px Bdt-1 Pt-20px" key={menuitem.category}>{menuitem.category}</h3>);
            }
            var submenu = [];
            menuitem.children.forEach(function (link) {
                var classList = cx({
                    'selected': self.props.selected === link.routeName
                });
                submenu.push(<li key={link.label} className={classList}><NavLink className="D-b Td-n:h Py-5px" routeName={link.routeName}>{link.label}</NavLink></li>);
            });

            if (submenu.length) {
                menu.push(<ul className="reset" key={menuitem.category + 'sub'}>{submenu}</ul>);
            }
        });
        return (
            <div id="aside" className="D-tbc Va-t W-150px--sm End-0 Pt-20px Pb-40px Pstart-10px Pend-50px--sm Z-5 End-a--sm Z-0 Start-0" role="aside" onClick={self.handleClick}>
                {menu}
            </div>
        );
    },
    handleClick: function () {
        this.props.onClickEvent();
    }
});

module.exports = Component;
