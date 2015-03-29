/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import React from 'react';
import {navigateAction} from 'flux-router-component';

const DOCS_URL = 'https://github.com/yahoo/fluxible/tree/master';

function isLeftClickEvent (e) {
    return e.button === 0;
}

function isModifiedEvent (e) {
    return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}

class Doc extends React.Component {
    onClick(e) {
        let target = e.target;

        if ('A' === target.nodeName && '/' === target.getAttribute('href').substr(0, 1)) {
            if (isModifiedEvent(e) || !isLeftClickEvent(e)) {
                return;
            }

            this.context.executeAction(navigateAction, {
                url: target.getAttribute('href')
            });

            e.preventDefault();
        }
    }

    render() {
        let editEl;

        if (this.props.currentRoute && this.props.currentRoute.config.githubPath !== -1) {
            editEl = (
                <a href={DOCS_URL + this.props.currentRoute.config.githubPath}
                    className="edit-github Pos-a End-10px T-18px"
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
}

Doc.contextTypes = {
    executeAction: React.PropTypes.func
};

export default Doc;
