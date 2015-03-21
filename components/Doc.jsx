/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var navigateAction = require('flux-router-component').navigateAction;
var DOCS_URL = 'https://github.com/yahoo/fluxible.io/tree/master';

function isLeftClickEvent (e) {
    return e.button === 0;
}
function isModifiedEvent (e) {
    return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}

var Component = React.createClass({
    contextTypes: {
        executeAction: React.PropTypes.func
    },
    onClick: function (e) {
        var target = e.target;
        if ('A' === target.nodeName && '/' === target.getAttribute('href').substr(0, 1)) {
            if (isModifiedEvent(e) || !isLeftClickEvent(e)) {
                return;
            }
            this.context.executeAction(navigateAction, {
                url: target.getAttribute('href')
            });
            e.preventDefault();
        }
    },
    render: function () {
        var editEl;
        if (this.props.currentRoute && this.props.currentRoute.githubPath !== -1) {
            editEl = (
                <a href={DOCS_URL + this.props.currentRoute.githubPath}
                    className='edit-link'
                    target='_blank'>

                    Edit on Github
                </a>
            );
        }

        var heading;
        if (this.props.title) {
            heading = <h1>{this.props.title}</h1>;
        }

        return (
            <div className="doc-content">
                {editEl}
                {heading}
                <div onClick={this.onClick} dangerouslySetInnerHTML={{__html: this.props.content}}></div>
            </div>
        );
    }
});

module.exports = Component;
