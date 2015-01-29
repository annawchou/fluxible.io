/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var debug = require('debug')('APIService');
var marked = require('marked');
var renderer = require('./../utils/renderer');
var request = require('superagent');
var secrets = require('./../secrets');
var qs = require('querystring');
var apiConfig = require('./../configs/apis');

// Generate an array of repos, from the /configs/apis.js file
var whitelistedRepos = apiConfig.reduce(function (whitelist, item) {
    item.children.forEach(function (link) {
        whitelist.push(link.navParams.key);
    });
    return whitelist;
}, []);

var cache = {};

var fetchReadme = function (repo, cb) {
    var key = '/apis/' + repo + '.md';
    var url = 'https://api.github.com/repos/yahoo/';
    url += repo;
    url += '/readme';
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

        var readme = res.body && res.body.content; // base64 encoded string of the markdown file

        if (readme) {
            var readmeString = new Buffer(readme, 'base64').toString(); // base64 decode
            var apiString = readmeString.split('[//]: # (API_START)', 2);
            apiString = apiString && apiString[1] && apiString[1].split('[//]: # (API_STOP)', 2)[0];
            apiString = apiString || '# API Coming Soon';
            cache[key] = {
                key: key,
                title: repo + ' API',
                content: marked(apiString, {renderer: renderer})
            };

            cb && cb(null, cache[key]);
        } else {
            debug('README not found for repo' + repo, res.body);
            cache[key] = {
                key: key,
                title: repo + ' API',
                content: marked('# API Not Found: ' + repo)
            };

            cb && cb(new Error('API Not Found: ' + repo));
        }
    });
};

(function refreshCacheFromGithub() {
    whitelistedRepos.forEach(function (repo) {
        fetchReadme(repo);
    });

    setTimeout(refreshCacheFromGithub, 1 * 60 * 60 * 1000); // refresh cache every hour
})();

module.exports = {
    name: 'api',
    read: function (req, resource, params, config, callback) {
        // Throw an error if repo is not in whitelist
        if (whitelistedRepos.indexOf(params.repo) === -1) {
            return callback(new Error('API Not Found: ' + params.repo));
        }

        // Return immediately if repo's readme is in cache
        if (cache[params.key]) {
            return callback(null, cache[params.key]);
        } else {
            return fetchReadme(params.repo, callback);
        }
    }
};
