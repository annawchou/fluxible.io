/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/* global document */

import React from 'react';
import Home from './Home.jsx';
import Docs from './Docs.jsx';
import Status500 from './Status500.jsx';
import Status404 from './Status404.jsx';
import ApplicationStore from '../stores/ApplicationStore';
import DocStore from '../stores/DocStore';
import {RouterMixin} from 'flux-router-component';
import {NavLink} from 'flux-router-component';
import {FluxibleMixin} from 'fluxible';
import TopNav from './TopNav';
import cx from 'classnames';

var Application = React.createClass({
    mixins: [ RouterMixin, FluxibleMixin ],

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
            route: appStore.getCurrentRoute() || {}
        };
    },

    onChange: function () {
        this.setState(this.getState());
    },

    render: function () {
        var hideLogo = false;
        var Component = this.state.route && this.state.route.config && this.state.route.config.component;

        if (this.state.route && 'home' === this.state.route.name) {
            hideLogo = true;
        }

        if ('500' === this.state.currentPageName) {
            Component = Status500;
        } else if ('404' === this.state.currentPageName) {
            Component = Status404;
        }

        var logoClasses = cx({
            'V-h': hideLogo,
            'Va-m Fz-20px Lh-1.2 C-#fff Td-n:h': true
        });

        return (
            <div className="H-100%">
                <div className="wrapper Bxz-bb Mih-100%">
                    <div id="header" role="header" className="Px-10px Py-13px Ov-h Z-7 Pos-r Bgc-logo optLegibility">
                        <div className="innerwrapper spaceBetween Mx-a--sm W-90%--sm W-a--sm">
                            <NavLink className={logoClasses} routeName="home">
                                Fluxible
                            </NavLink> <TopNav selected={this.state.route.name} />
                        </div>
                    </div>
                    <Component doc={this.state.currentDoc} currentRoute={this.state.route} />
                </div>
                <div id="footer" className="P-20px Bdt-1" role="footer">
                    <div className="innerwrapper spaceBetween Mx-a--sm W-90%--sm W-a--sm">
                        <small>All code on this site is licensed under the <a href="https://github.com/yahoo/fluxible.io/blob/master/LICENSE.md">Yahoo BSD License</a>, unless otherwise stated.</small> <small>&copy; 2015 Yahoo! Inc. All rights reserved.</small>
                    </div>
                </div>
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

export default Application;
