/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
module.exports = function createKeyFromRepoPath(type, path, slug) {
    return '/' + type + '/' + (path ? path + '/' : '') + slug + '.md';
}