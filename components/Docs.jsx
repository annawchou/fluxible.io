/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var Menu = require('./Menu.jsx');
var Doc = require('./Doc.jsx');
var cx = require('classnames');

var Component = React.createClass({
    getInitialState: function() {
        return {
            isMenuVisible: false
        };
    },
    handleMenuToggle: function () {
        this.setState({
            isMenuVisible: !this.state.isMenuVisible
        });
    },
    render: function () {
        var wrapperClasses = cx({
            'menu-on': this.state.isMenuVisible,
            'docs-page innerwrapper D-tb--sm Tbl-f Pt-20px Mb-50px Mx-a--sm W-90%--sm W-a--sm': true
        });

        return (
            <div id="docs" className={wrapperClasses}>
                <button onClick={this.handleMenuToggle} id="toggleMenuButton" className="menu-button D-n--sm Pos-a resetButton End-0 Z-7 Mend-10px">
                    <i className="fa fa-bars"></i>
                    <b className="hidden">Toggle the menu</b>
                </button>
                <Menu selected={this.props.currentRoute.name} />
                <Doc content={this.props.doc.content} currentRoute={this.props.currentRoute} />
                <div id="overlay" className="D-n Z-3 Pos-f T-0 Start-0 W-100% H-100%"></div>
            </div>
        );
    }
});

module.exports = Component;
