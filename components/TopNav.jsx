/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import React from 'react';
import {NavLink} from 'flux-router-component';
import cx from 'classnames';

class TopNav extends React.Component {
    render() {
        let selected = this.props.selected;

        return (
            <ul id="navigation" role="navigation" className="Va-m reset">
                <li className={cx({'selected': selected !== 'home', 'D-ib Va-m Pos-r Fw-400': true})}>
                    <NavLink routeName="quickStart" className="D-b C-#fff Td-n:h">
                        Docs
                    </NavLink>
                </li>
                <li className="D-ib Va-m Mstart-20px Pos-r Fw-400">
                    <a href="https://github.com/yahoo/fluxible" className="D-b C-#fff Td-n:h" target="_blank">
                        <i className="Va-m Pos-r fa fa-github"></i> GitHub
                    </a>
                </li>
            </ul>
        );
    }
}

export default TopNav;
