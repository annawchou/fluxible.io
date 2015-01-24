/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var debug = require('debug')('APIService');
var marked = require('marked');
var request = require('superagent');
var secret = require('./../secrets.js');
var qs = require('querystring');

var content = {};

module.exports = {
    name: 'api',
    read: function (req, resource, params, config, callback) {
        if (content[params.repo]) {
            return callback(null, content[params.repo]);
        }

        var url = 'https://api.github.com/repos/yahoo/';
        url += params.repo;
        url += '/readme';
        url += '?' + qs.stringify({
            client_id: secret.github.clientId,
            client_secret: secret.github.clientSecret
        });

        request
        .get(url)
        .set('User-Agent', 'superagent')
        .end(function (err, res) {
            if (err) {
                callback(err);
                return;
            }
            var readme = res.body && res.body.content; // base64 encoded string of the markdown file
            if (readme) {
                var md = new Buffer(readme, 'base64').toString(); // base64 decode
                content[params.repo] = marked(md);
                callback(null, content[params.repo]);
                return;
            } else {
                debug('README not found for ' + params.repo, res.body);
                callback('README not found for ' + params.repo);
                return;
            }
        });
    }
};
