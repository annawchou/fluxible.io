/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/* global document */
'use strict';
var React = require('react');
var Home = require('./Home.jsx');
var Docs = require('./Docs.jsx');
var ApplicationStore = require('../stores/ApplicationStore');
var RouterMixin = require('flux-router-component').RouterMixin;
var NavLink = require('flux-router-component').NavLink;
var StoreMixin = require('fluxible').StoreMixin;
var TopNav = require('./TopNav');

var Application = React.createClass({
    mixins: [ RouterMixin, StoreMixin ],
    statics: {
        storeListeners: [ ApplicationStore ]
    },
    getInitialState: function () {
        return this.getStore(ApplicationStore).getState();
    },
    onChange: function () {
        var state = this.getStore(ApplicationStore).getState();
        this.setState(state);
    },
    render: function () {
        var page;
        var hideLogo = false;
        var logo = (
            <NavLink className="pure-menu-heading" routeName="home" context={this.props.context}>
                Fluxible
            </NavLink>
        );

        if (!this.props.hideLogo) {
        }

        if ('home' === this.state.currentPageName) {
            page = <Home context={this.props.context} />;
            hideLogo = true;
        }
        else if ('docs' === this.state.currentPageName) {
            page = <Docs context={this.props.context} />;
        }

        return (
            <div>
                <div className="header">
                    <div className="home-menu pure-menu pure-menu-open pure-menu-horizontal">
                        <div className="content">
                            <TopNav selected={this.state.currentPageName} links={this.state.pages} context={this.props.context}/>
                            {hideLogo ? '' : logo}
                        </div>
                    </div>
                </div>
                {page}
            </div>
        );
    },

    componentDidUpdate: function (prevProps, prevState) {
        var newState = this.state;

        if (newState.pageTitle === prevState.pageTitle) {
            return;
        }

        document.title = newState.pageTitle;
    }
});

module.exports = Application;
