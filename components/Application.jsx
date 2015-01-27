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
var DocStore = require('../stores/DocStore');
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
        return this.getState();
    },
    getState: function () {
        var appStore = this.getStore(ApplicationStore);
        var docStore = this.getStore(DocStore);
        return {
            currentDoc: docStore.getCurrent() || {},
            currentPageName: appStore.getCurrentPageName(),
            pageTitle: appStore.getPageTitle(),
            route: appStore.getCurrentRoute()
        };
    },
    onChange: function () {
        this.setState(this.getState());
    },
    render: function () {
        var page;
        var hideLogo = false;
        var logo = (
            <NavLink className="pure-menu-heading" routeName="home" context={this.props.context}>
                Fluxible
            </NavLink>
        );

        if ('home' === this.state.currentPageName) {
            page = <Home context={this.props.context} content={this.state.currentDoc.content} />;
            hideLogo = true;
        }
        else if ('docs' === this.state.currentPageName) {
            page = <Docs context={this.props.context} content={this.state.currentDoc.content} />;
        }

        return (
            <div>
                <div className="header">
                    <div className="home-menu pure-menu pure-menu-open pure-menu-horizontal">
                        <div className="content">
                            <TopNav selected={this.state.currentPageName} context={this.props.context}/>
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

        // log pageview
        if (ga) {
            ga('set', {
                page: newState.route.url,
                title: newState.pageTitle
            });
            ga('send', 'pageview');
        }
    }
});

module.exports = Application;
