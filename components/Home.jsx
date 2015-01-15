/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var StoreMixin = require('fluxible').StoreMixin;
var DocsStore = require('../stores/DocsStore');

var Component = React.createClass({
    mixins: [ StoreMixin ],
    statics: {
        storeListeners: {
            _onChange: [ DocsStore ]
        }
    },
    getInitialState: function () {
        return this._getState();
    },
    _getState: function () {
        return {
            docs: this.getStore(DocsStore).getAll()
        };
    },
    _onChange: function () {
        this.setState(this._getState());
    },
    render: function () {
        var main;
        var docs = this.state.docs;
        var docItems = docs.map(function (doc) {
            return (
                <li>{doc}</li>
            );
        }, this);

        if (docs.length) {
            main = (
                <section id="main">
                    <ul id="doc-list">
                        {docItems}
                    </ul>
                </section>
            );
        }

        return (
            <div>
                <h1>Home</h1>
                {main}
            </div>
        );
    }
});

module.exports = Component;
