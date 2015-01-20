/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');

var Component = React.createClass({
    render: function () {

        return (
            <section id="docs">
                <div className="content"
                    dangerouslySetInnerHTML={{__html: this.props.content}}>
                </div>
            </section>
        );
    }
});

module.exports = Component;
