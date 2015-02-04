/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
module.exports = function createAPIWhitelistFromConfig(config) {
    if (!config) {
        return [];
    }

    return config.reduce(function (whitelist, item) {
        item.children.forEach(function (api) {
            whitelist[api.navParams.slug] = api;
        });
        return whitelist;
    }, {});
}
