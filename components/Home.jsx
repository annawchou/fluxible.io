/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var NavLink = require('flux-router-component').NavLink;
var Doc = require('./Doc.jsx');

var Component = React.createClass({
    render: function () {
        return (
            <div className="home-page">
                <div id="splash" className="D-tb W-100% Bdb-1 Pos-r">
                    <div className="D-tbc Ta-c Va-m Bgz-cv Ov-h Pos-r W-100% Start-0 Pb-30px Bg-splash">
                        <h1 className="Mx-a W-50% Pos-r Ov-h C-fff Fw-300 Tsh-1 Fz-450%">Fluxible</h1>
                        <p className="Mt-0 C-fff Tsh-1 Fz-120%">Build isomorphic Flux applications</p>
                        <p>
                            <NavLink className="D-ib Mb-10px Px-20px Py-10px C-fff Bdrs-5px Td-n:h Bg-t Fw-b Bd-2" routeName="quickStart">Get Started</NavLink>
                        </p>
                    </div>
                    <div className="Pos-a End-10px B-5px C-eee Fz-80%">
                        <cite>
                            <a href="https://www.flickr.com/photos/devinmoore/2670474853" title="Splash derived from Blue Ring Electricity Fractal by Devin Moore used under CC BY 2.0" _target="blank">&copy; Devon Moore</a>
                        </cite>
                    </div>
                </div>

                <div className="features innerwrapper Bxz-bb Pt-20px Px-10px Mb-20px Mx-a--sm W-90%--sm W-a">
                    <Doc content={this.props.doc.content} />

                    <div className="Ta-c">
                        <NavLink className="D-ib Mt-20px Mb-10px Px-20px Py-10px C-fff Bgc-logo Bdrs-5px Td-n:h" routeName="quickStart">Get Started</NavLink>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Component;
