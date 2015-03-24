/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var debug = require('debug')('APIService');
var marked = require('marked');
var highlight = require('highlight.js');
var renderer = require('./../utils/renderer');
var request = require('superagent');
var secrets = require('./../secrets');
var qs = require('querystring');
var url = require('url');
var routes = require('../configs/routes');

marked.setOptions({
    highlight: function (code) {
        return highlight.highlightAuto(code).value;
    }
});

// Generate an hash of valid api routes, from the /configs/apis.js file
var cache = {};

var fetchAPI = function (docParams, cb) {
    var githubRepo = docParams.repo || 'yahoo/fluxible';
    var githubPath = docParams.path;
    var githubUrl = 'https://api.github.com/repos/' + githubRepo + '/contents/';
    githubUrl += githubPath;
    githubUrl += '?' + qs.stringify({
        client_id: secrets.github.clientId,
        client_secret: secrets.github.clientSecret
    });

    request
    .get(githubUrl)
    .set('User-Agent', 'superagent')
    .end(function (err, res) {
        if (err) {
            cb && cb(err);
        }

        var md = res.body && res.body.content; // base64 encoded string of the markdown file

        if (md) {
            var mdString = new Buffer(md, 'base64').toString(); // base64 decode

            var output = marked(mdString, {renderer: renderer});

            // Replace links
            var internalLinkRegex = /href="([a-zA-Z\/\-]*\.md)/g;
            var replacements = [];
            var result;
            while ((result = internalLinkRegex.exec(output)) !== null) {
                // Get the relative github path to link
                var fixedRelativePath = url.resolve(githubPath, result[1]);
                var matchedDoc;
                // Find the relative github path in routes
                /*jshint ignore:start */
                Object.keys(routes).forEach(function (routeName) {
                    var routeConfig = routes[routeName];
                    if (fixedRelativePath === routeConfig.githubPath) {
                        matchedDoc = routeConfig;
                        return;
                    }
                });
                /*jshint ignore:end*/
                if (!matchedDoc) {
                    console.log(githubPath + ' has a broken link to ' + fixedRelativePath);
                    continue;
                }
                replacements.push([result[1], matchedDoc.path]);
                matchedDoc = null;
            }
            replacements.forEach(function (replacement) {
                output = output.replace(replacement[0], replacement[1]);
            });

            cache[githubPath] = {
                key: githubPath,
                content: output
            };

            cb && cb(null, cache[githubPath]);
        } else {
            debug('Doc not found for', githubPath, res.body);
            cache[githubPath] = {
                key: githubPath,
                content: marked('# Doc Not Found: ' + githubPath, {renderer: renderer})
            };

            cb && cb(null, cache[githubPath]);
        }
    });
};

(function refreshCacheFromGithub() {
    Object.keys(routes).forEach(function (routeName) {
        var githubPath = routes[routeName].githubPath;
        if (githubPath) {
            fetchAPI({
                path: githubPath
            });
        }
    });

    setTimeout(refreshCacheFromGithub, 60 * 60 * 1000); // refresh cache every hour
})();

module.exports = {
    name: 'docs',
    read: function (req, resource, params, config, callback) {
        // Return immediately if repo's readme is in cache
        if (cache[params.path]) {
            return callback(null, cache[params.path]);
        } else {
            return fetchAPI(params.path);
        }
    }
};
