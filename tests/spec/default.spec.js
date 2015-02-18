/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/* global browser, describe, it, expect */

describe('fluxible homepage', function() {
    it('should have a title', function() {
        var url = browser.baseUrl;
        if (browser.baseUrl.slice(-1) !== '/') {
            url += '/';
        }
        browser.driver.get(url);
        expect(browser.driver.getTitle()).toMatch(/Fluxible/);
    });
});
