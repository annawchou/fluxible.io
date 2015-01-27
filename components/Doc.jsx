/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');

var Component = React.createClass({
    render: function () {
        return (
            <div className="doc-content" dangerouslySetInnerHTML={{__html: this.props.content}}></div>
        );
    }
});

module.exports = Component;
