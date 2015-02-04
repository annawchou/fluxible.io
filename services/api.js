/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var debug = require('debug')('APIService');
var marked = require('marked');
var renderer = require('./../utils/renderer');
var createKey = require('./../utils/createAPIKey');
var request = require('superagent');
var secrets = require('./../secrets');
var qs = require('querystring');

// Generate an hash of valid api routes, from the /configs/apis.js file
var apiConfig = require('./../configs/apis');
var createWhitelist = require('./../utils/createAPIWhitelist');
var apiRoutesWhitelist = createWhitelist(apiConfig);

var cache = {};

var fetchAPI = function (route, cb) {
    var api = apiRoutesWhitelist[route];
    var key = createKey(api);

    if (!api) {
        cache[key] = {
            key: key,
            content: marked('# API Not Found.', {renderer: renderer})
        };
        return cb && cb(cache[key]); // cache[key] contains the error, thus first parameter of done
    }

    var url = 'https://api.github.com/repos/yahoo/';
    url += api.repo;
    url += '/contents/';
    url += '/docs/fetchr.md';
    url += '?' + qs.stringify({
        client_id: secrets.github.clientId,
        client_secret: secrets.github.clientSecret
    });

    request
    .get(url)
    .set('User-Agent', 'superagent')
    .end(function (err, res) {
        if (err) {
            cb && cb(err);
        }

        var md = res.body && res.body.content; // base64 encoded string of the markdown file

        if (md) {
            var mdString = new Buffer(md, 'base64').toString(); // base64 decode

            cache[key] = {
                key: key,
                content: marked(mdString, {renderer: renderer})
            };

            cb && cb(null, cache[key]);
        } else {
            debug('API not found for', api.label, res.body);
            cache[key] = {
                key: key,
                content: marked('# API Not Found: ' + api.label, {renderer: renderer})
            };

            cb && cb(null, cache[key]);
        }
    });
};

(function refreshCacheFromGithub() {
    // For non whitelisted urls
    fetchAPI();

    // For whitelisted urls
    Object.keys(apiRoutesWhitelist).forEach(function (slug) {
        fetchAPI(slug);
    });

    setTimeout(refreshCacheFromGithub, 1 * 60 * 60 * 1000); // refresh cache every hour
})();

module.exports = {
    name: 'api',
    read: function (req, resource, params, config, callback) {
        var key = params.key;

        // Return immediately if repo's readme is in cache
        if (cache[key]) {
            return callback(null, cache[key]);
        } else {
            return fetchAPI(params.slug, callback);
        }
    }
};
