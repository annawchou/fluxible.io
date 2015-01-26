/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var path = require('path');
var debug = require('debug')('DocsService');
var fs = require('fs');
var walk = require('walk');
var marked = require('marked');
var highlight = require('highlight.js');

var CWD = process.cwd();

var content = {};
var walker = walk.walk(path.join(CWD, 'docs'));

marked.setOptions({
    highlight: function (code) {
        return highlight.highlightAuto(code).value;
    }
});

walker.on('file', function (root, fstats, next) {
    var key = root + '/' + fstats.name;

    fs.readFile(key, function (err, data) {
        if (err) {
            throw new Error('[read file] ' + err);
        }

        var heading = data.toString().split('\n')[0].replace('#', '').trim();

        // need to strip folder path to match URL key
        key = key.replace(CWD, '');

        content[key] = {
            key: key,
            title: heading,
            content: marked(data.toString())
        };

        next();
    });
});

walker.on('end', function () {
    // done walking
    debug(content);
});

module.exports = {
    name: 'docs',
    read: function (req, resource, params, config, callback) {
        callback(null, content[params.key]);
    }
};
