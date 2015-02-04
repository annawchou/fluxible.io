/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
module.exports = function createKeyFromRepoPath(api) {
    api = api || {};
    return '/apis/' +
        (api.repo || 'missing') + '/' +
        (api.path || 'missing');
}
