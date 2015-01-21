/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var fs = require('fs');
var walk = require('walk');
var request = require('request');
var secrets = require('../secrets');

var content = {};
var walker = walk.walk('docs');

walker.on('file', function (root, fstats, next) {
    var key = root + '/' + fstats.name;

    fs.readFile(key, function (err, data) {
        if (err) {
            throw new Error('[read file] ' + err);
        }

        var options = {
            url: 'https://api.github.com/markdown',
            qs: {
                client_id: secrets.github.clientId,
                client_secret: secrets.github.clientSecret
            },
            headers: {
                'User-Agent': 'Fluxible-Website'
            },
            json: {
                text: data.toString()
            }
        };

        var heading = data.toString().split('\n')[0].replace('#', '').trim();

        request.post(options, function (err, response, body) {
            if (err) {
                throw new Error('[gh markdown] ' + err);
            }

            content[key] = {
                key: key,
                title: heading,
                content: body
            };

            next();
        });
    });
});

walker.on('end', function () {
    // done walking
});

module.exports = {
    name: 'docs',
    read: function (req, resource, params, config, callback) {
        callback(null, content[params.key]);
    }
};
