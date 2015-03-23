/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var navigateAction = require('flux-router-component').navigateAction;
var DOCS_URL = 'https://github.com/yahoo/fluxible/tree/master';

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
        if (this.props.currentRoute && this.props.currentRoute.config.githubPath !== -1) {
            editEl = (
                <a href={DOCS_URL + this.props.currentRoute.config.githubPath}
                    className="edit-github Pos-a End-10px"
                    target="_blank">
                    Edit on Github
                </a>
            );
        }
        return (
            <div id="main" role="main" className="D-tbc--sm Px-10px Pos-r">
                {editEl}
                <div onClick={this.onClick} dangerouslySetInnerHTML={{__html: this.props.content}}></div>
            </div>
        );
    }
});

module.exports = Component;
