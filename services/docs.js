/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var fs = require('fs');
var walk = require('walk');
var request = require('request');

var content = {};
var walker = walk.walk('docs');

walker.on('file', function (root, fstats, next) {
    var key = root + '/' + fstats.name;

    fs.readFile(key, function (err, data) {
        if (err) {
            throw new Error('[read file failed] ' + err);
        }

        var options = {
            url: 'https://api.github.com/markdown',
            headers: {
                'User-Agent': 'Fluxible-Website'
            },
            json: {
                text: data.toString()
            }
        };

        request.post(options, function (err, response, body) {
            if (err) {
                throw new Error('[gh markdown failed] ' + err);
            }

            content[key] = body;
        });
    });

    next();
});

walker.on('end', function () {
    // done walking
});

module.exports = {
    name: 'docs',
    read: function (req, resource, params, config, callback) {
        callback(null, ['doc1', 'doc2']);
    }
};
