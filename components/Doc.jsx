/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var navigateAction = require('flux-router-component').navigateAction;

function isLeftClickEvent (e) {
    return e.button === 0;
}
function isModifiedEvent (e) {
    return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}

var Component = React.createClass({
    onClick: function (e) {
        var target = e.target;
        if ('A' === target.nodeName && '/' === target.getAttribute('href').substr(0, 1)) {
            if (isModifiedEvent(e) || !isLeftClickEvent(e)) {
                return;
            }
            this.props.context.executeAction(navigateAction, {
                url: target.getAttribute('href')
            });
            e.preventDefault();
        }
    },
    render: function () {
        return (
            <div className="doc-content" onClick={this.onClick} dangerouslySetInnerHTML={{__html: this.props.content}}></div>
        );
    }
});

module.exports = Component;
